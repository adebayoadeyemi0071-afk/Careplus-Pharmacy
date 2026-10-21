
"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type FormEvent,
} from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Camera,
  CheckCircle2,
  ExternalLink,
  FileSearch,
  Info,
  ScanLine,
  ShieldAlert,
  ShieldCheck,
  Square,
  XCircle,
} from "lucide-react";

import { products, type Product } from "@/data/products";

type BarcodeDetection = {
  rawValue?: string;
};

type BarcodeDetectorInstance = {
  detect: (
    source: HTMLVideoElement
  ) => Promise<BarcodeDetection[]>;
};

type BarcodeDetectorConstructor = {
  new (options?: {
    formats?: string[];
  }): BarcodeDetectorInstance;

  getSupportedFormats?: () => Promise<string[]>;
};

type WindowWithBarcodeDetector = Window & {
  BarcodeDetector?: BarcodeDetectorConstructor;
};

type VerificationOutcome =
  | "catalogue_match"
  | "possible_mismatch"
  | "inconclusive"
  | "not_found";

interface VerificationResult {
  outcome: VerificationOutcome;
  barcodeProduct: Product | null;
  registrationProduct: Product | null;
}

function normalizeIdentifier(
  value: string | undefined
): string {
  return (value ?? "")
    .trim()
    .replace(/[\s-]/g, "")
    .toUpperCase();
}

function findProductByBarcode(
  barcode: string
): Product | null {
  const normalized = normalizeIdentifier(barcode);

  if (!normalized) return null;

  return (
    products.find(
      (product) =>
        Boolean(product.barcode) &&
        normalizeIdentifier(product.barcode) === normalized
    ) ?? null
  );
}

function findProductByRegistration(
  registrationNumber: string
): Product | null {
  const normalized = normalizeIdentifier(registrationNumber);

  if (!normalized) return null;

  return (
    products.find(
      (product) =>
        Boolean(product.nafdacRegistrationNumber) &&
        normalizeIdentifier(
          product.nafdacRegistrationNumber
        ) === normalized
    ) ?? null
  );
}

function evaluateVerification(
  barcode: string,
  registrationNumber: string
): VerificationResult | null {
  const hasBarcode = Boolean(barcode.trim());
  const hasRegistration = Boolean(
    registrationNumber.trim()
  );

  if (!hasBarcode && !hasRegistration) {
    return null;
  }

  const barcodeProduct = hasBarcode
    ? findProductByBarcode(barcode)
    : null;

  const registrationProduct = hasRegistration
    ? findProductByRegistration(registrationNumber)
    : null;

  /*
   * A potential mismatch is shown only when BOTH identifiers
   * match separate products in the local catalogue.
   */
  if (
    barcodeProduct &&
    registrationProduct &&
    barcodeProduct.id !== registrationProduct.id
  ) {
    return {
      outcome: "possible_mismatch",
      barcodeProduct,
      registrationProduct,
    };
  }

  /*
   * If both values were supplied, but only one could be
   * matched, we cannot reconcile both identifiers.
   */
  if (
    hasBarcode &&
    hasRegistration &&
    Boolean(barcodeProduct) !==
      Boolean(registrationProduct)
  ) {
    return {
      outcome: "inconclusive",
      barcodeProduct,
      registrationProduct,
    };
  }

  if (barcodeProduct || registrationProduct) {
    return {
      outcome: "catalogue_match",
      barcodeProduct,
      registrationProduct,
    };
  }

  return {
    outcome: "not_found",
    barcodeProduct: null,
    registrationProduct: null,
  };
}

export default function MedicineVerificationPage() {
  const [barcode, setBarcode] = useState("");
  const [registrationNumber, setRegistrationNumber] =
    useState("");

  const [result, setResult] =
    useState<VerificationResult | null>(null);

  const [formError, setFormError] = useState("");
  const [cameraMessage, setCameraMessage] = useState("");
  const [scannerOpen, setScannerOpen] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const detectorRef =
    useRef<BarcodeDetectorInstance | null>(null);

  const stopCamera = useCallback(() => {
    streamRef.current?.getTracks().forEach((track) => {
      track.stop();
    });

    streamRef.current = null;
    detectorRef.current = null;

    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }

    setIsScanning(false);
  }, []);

  /*
   * Always release the camera when the page is left.
   */
  useEffect(() => {
    return () => {
      streamRef.current?.getTracks().forEach((track) => {
        track.stop();
      });
    };
  }, []);

  /*
   * CAMERA SCANNER
   *
   * BarcodeDetector is not supported in every browser.
   * Manual entry remains available as a fallback.
   */
  const startCamera = async () => {
    setFormError("");
    setCameraMessage("");

    const detectorConstructor = (
      window as WindowWithBarcodeDetector
    ).BarcodeDetector;

    if (!detectorConstructor) {
      setScannerOpen(false);

      setCameraMessage(
        "Automatic barcode scanning is not supported in this browser. Enter the barcode manually instead."
      );

      return;
    }

    if (!navigator.mediaDevices?.getUserMedia) {
      setScannerOpen(false);

      setCameraMessage(
        "Camera access is unavailable. Enter the barcode manually instead."
      );

      return;
    }

    setScannerOpen(true);

    try {
      const stream =
        await navigator.mediaDevices.getUserMedia({
          audio: false,
          video: {
            facingMode: { ideal: "environment" },
          },
        });

      streamRef.current = stream;

      /*
       * Let React render the video element before attaching
       * the camera stream.
       */
      await new Promise<void>((resolve) => {
        window.setTimeout(resolve, 0);
      });

      const video = videoRef.current;

      if (!video) {
        stopCamera();
        setScannerOpen(false);

        setCameraMessage(
          "The camera preview could not be opened. Please enter the barcode manually."
        );

        return;
      }

      video.srcObject = stream;
      await video.play();

      const preferredFormats = [
        "ean_13",
        "ean_8",
        "upc_a",
        "upc_e",
        "code_128",
        "code_39",
        "qr_code",
      ];

      const supportedFormats =
        detectorConstructor.getSupportedFormats
          ? await detectorConstructor.getSupportedFormats()
          : preferredFormats;

      const formats = preferredFormats.filter(
        (format) => supportedFormats.includes(format)
      );

      if (formats.length === 0) {
        stopCamera();
        setScannerOpen(false);

        setCameraMessage(
          "This browser cannot scan a supported barcode format. Please enter the code manually."
        );

        return;
      }

      detectorRef.current = new detectorConstructor({
        formats,
      });

      setIsScanning(true);
    } catch (error) {
      console.error("Camera scanner error:", error);

      stopCamera();
      setScannerOpen(false);

      setCameraMessage(
        "We couldn't access the camera. Check browser permissions or enter the barcode manually."
      );
    }
  };

  /*
   * Repeatedly inspect the video feed until a code is
   * detected or the customer stops the scanner.
   */
  useEffect(() => {
    if (!isScanning) return;

    let cancelled = false;
    let timeoutId: number | undefined;

    const scanFrame = async () => {
      if (cancelled) return;

      const video = videoRef.current;
      const detector = detectorRef.current;

      if (
        video &&
        detector &&
        video.readyState >= 2
      ) {
        try {
          const detections = await detector.detect(video);

          const detectedCode = detections
            .map((item) => item.rawValue?.trim())
            .find((value) => Boolean(value));

          if (detectedCode) {
            setBarcode(detectedCode);
            setFormError("");

            setResult(
              evaluateVerification(
                detectedCode,
                registrationNumber
              )
            );

            setCameraMessage(
              "Barcode captured. Review the result below."
            );

            stopCamera();
            setScannerOpen(false);

            return;
          }
        } catch (error) {
          console.error("Barcode detection error:", error);

          setCameraMessage(
            "The barcode could not be read. Try adjusting the lighting and positioning the barcode inside the camera frame."
          );
        }
      }

      timeoutId = window.setTimeout(() => {
        void scanFrame();
      }, 350);
    };

    void scanFrame();

    return () => {
      cancelled = true;

      if (timeoutId !== undefined) {
        window.clearTimeout(timeoutId);
      }
    };
  }, [
    isScanning,
    registrationNumber,
    stopCamera,
  ]);

  const handleVerify = (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setFormError("");
    setCameraMessage("");
    setIsVerifying(true);

    const verification = evaluateVerification(
      barcode,
      registrationNumber
    );

    if (!verification) {
      setFormError(
        "Scan a barcode or enter a NAFDAC registration number first."
      );

      setResult(null);
      setIsVerifying(false);

      return;
    }

    setResult(verification);
    setIsVerifying(false);
  };

  const clearVerification = () => {
    setBarcode("");
    setRegistrationNumber("");
    setResult(null);
    setFormError("");
    setCameraMessage("");
  };

  const matchedProducts = result
    ? [
        result.barcodeProduct,
        result.registrationProduct,
      ].filter(
        (product, index, all): product is Product =>
          Boolean(product) &&
          all.findIndex(
            (candidate) =>
              candidate?.id === product?.id
          ) === index
      )
    : [];

  return (
    <main className="min-h-screen bg-[#FAFCFB]">
      {/* HEADER */}
      <section className="border-b border-[#DDE9E5] bg-white">
        <div className="mx-auto max-w-6xl px-5 py-8 sm:px-8">
          <Link
            href="/order-success"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#5F706C] transition hover:text-[#086B57]"
          >
            <ArrowLeft size={16} />
            Back to Order Summary
          </Link>

          <p className="mt-7 text-xs font-extrabold uppercase tracking-[0.2em] text-[#086B57]">
            CarePlus Pharmacy
          </p>

          <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-[#063D35] sm:text-5xl">
            Verify your medicine
          </h1>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-[#5F706C] sm:text-base">
            Check whether a barcode or NAFDAC registration
            number matches a product record in the current
            CarePlus catalogue.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-7 px-5 py-9 sm:px-8 lg:grid-cols-[minmax(0,1fr)_320px] lg:py-12">
        {/* VERIFICATION FORM */}
        <div className="rounded-3xl border border-[#DDE9E5] bg-white p-6 shadow-sm sm:p-8">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#E5F5F0]">
              <ScanLine className="h-6 w-6 text-[#086B57]" />
            </div>

            <div>
              <h2 className="text-xl font-extrabold text-[#102A26]">
                Check product information
              </h2>

              <p className="mt-2 text-sm leading-6 text-[#5F706C]">
                Scan the package barcode or enter its NAFDAC
                registration number. You can enter both to
                compare their catalogue records.
              </p>
            </div>
          </div>

          {/* CAMERA */}
          <div className="mt-7 rounded-2xl border border-[#DDE9E5] bg-[#F7FBF9] p-4">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="text-sm font-extrabold text-[#102A26]">
                  Scan package barcode
                </h3>

                <p className="mt-1 text-xs leading-5 text-[#71817D]">
                  Camera access may be required.
                </p>
              </div>

              {!isScanning ? (
                <button
                  type="button"
                  onClick={startCamera}
                  className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-[#086B57] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#063D35]"
                >
                  <Camera size={17} />
                  Open Scanner
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    stopCamera();
                    setScannerOpen(false);
                    setCameraMessage("Scanner stopped.");
                  }}
                  className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl border border-[#DDE9E5] bg-white px-4 py-3 text-sm font-bold text-[#102A26]"
                >
                  <Square size={15} />
                  Stop Scanner
                </button>
              )}
            </div>

            {scannerOpen && (
              <div className="mt-4 overflow-hidden rounded-2xl bg-[#102A26]">
                <video
                  ref={videoRef}
                  autoPlay
                  muted
                  playsInline
                  className="max-h-[360px] min-h-[180px] w-full object-cover"
                />

                {isScanning && (
                  <div className="px-4 py-3 text-center text-xs font-semibold text-white">
                    Position the barcode inside the camera view.
                  </div>
                )}
              </div>
            )}

            {cameraMessage && (
              <p className="mt-3 text-xs leading-5 text-[#5F706C]">
                {cameraMessage}
              </p>
            )}
          </div>

          <form onSubmit={handleVerify} className="mt-7 space-y-5">
            <div>
              <label
                htmlFor="barcode"
                className="mb-2 block text-sm font-bold text-[#102A26]"
              >
                Barcode / product code
              </label>

              <input
                id="barcode"
                type="text"
                value={barcode}
                onChange={(event) => {
                  setBarcode(event.target.value);
                  setResult(null);
                }}
                placeholder="Scan or enter the printed code"
                autoComplete="off"
                className="h-12 w-full rounded-xl border border-[#DDE9E5] bg-white px-4 text-sm text-[#102A26] outline-none transition placeholder:text-[#9BAAA6] focus:border-[#086B57] focus:ring-4 focus:ring-[#086B57]/10"
              />
            </div>

            <div>
              <label
                htmlFor="nafdac-registration"
                className="mb-2 block text-sm font-bold text-[#102A26]"
              >
                NAFDAC registration number
              </label>

              <input
                id="nafdac-registration"
                type="text"
                value={registrationNumber}
                onChange={(event) => {
                  setRegistrationNumber(event.target.value);
                  setResult(null);
                }}
                placeholder="Enter the number printed on the pack"
                autoComplete="off"
                className="h-12 w-full rounded-xl border border-[#DDE9E5] bg-white px-4 text-sm text-[#102A26] outline-none transition placeholder:text-[#9BAAA6] focus:border-[#086B57] focus:ring-4 focus:ring-[#086B57]/10"
              />

              <p className="mt-2 text-xs leading-5 text-[#71817D]">
                Enter the registration number as printed on
                the packaging. Remove extra spaces if necessary.
              </p>
            </div>

            {formError && (
              <p
                role="alert"
                className="rounded-xl border border-[#F0C7C7] bg-[#FFF6F6] px-4 py-3 text-sm font-semibold text-[#B43B3B]"
              >
                {formError}
              </p>
            )}

            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                type="submit"
                disabled={isVerifying}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#086B57] px-5 py-3.5 text-sm font-extrabold text-white transition hover:bg-[#063D35] disabled:opacity-60"
              >
                <FileSearch size={18} />
                {isVerifying
                  ? "Checking..."
                  : "Check Product Details"}
              </button>

              <button
                type="button"
                onClick={clearVerification}
                className="inline-flex items-center justify-center rounded-xl border border-[#DDE9E5] bg-white px-5 py-3.5 text-sm font-bold text-[#102A26] transition hover:bg-[#F1F8F5]"
              >
                Clear
              </button>
            </div>
          </form>

          {/* RESULTS */}
          {result && (
            <section
              aria-live="polite"
              className="mt-8 border-t border-[#DDE9E5] pt-7"
            >
              {result.outcome === "catalogue_match" && (
                <div className="rounded-2xl border border-[#C8E8D8] bg-[#F0FAF4] p-5">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-6 w-6 shrink-0 text-[#16845E]" />

                    <div>
                      <h3 className="text-lg font-extrabold text-[#185C40]">
                        Product record found
                      </h3>

                      <p className="mt-2 text-sm leading-6 text-[#42685F]">
                        At least one identifier matches a product
                        record in the current CarePlus catalogue.
                        This is not a live NAFDAC lookup and does
                        not confirm that your physical medicine
                        pack is genuine.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {result.outcome === "possible_mismatch" && (
                <div className="rounded-2xl border border-[#F0C7C7] bg-[#FFF6F6] p-5">
                  <div className="flex items-start gap-3">
                    <XCircle className="mt-0.5 h-6 w-6 shrink-0 text-[#D64545]" />

                    <div>
                      <h3 className="text-lg font-extrabold text-[#9E3030]">
                        Potential product mismatch
                      </h3>

                      <p className="mt-2 text-sm leading-6 text-[#934646]">
                        The barcode and registration number match
                        two different catalogue products. This
                        could be a data-entry or packaging
                        discrepancy; it does not, on its own,
                        prove that the medicine is counterfeit.
                      </p>

                      <p className="mt-3 text-sm font-bold text-[#9E3030]">
                        Contact CarePlus support before relying
                        on this result.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {result.outcome === "inconclusive" && (
                <div className="rounded-2xl border border-[#E9D7A7] bg-[#FFF9EA] p-5">
                  <div className="flex items-start gap-3">
                    <ShieldAlert className="mt-0.5 h-6 w-6 shrink-0 text-[#9A6A00]" />

                    <div>
                      <h3 className="text-lg font-extrabold text-[#6F4D00]">
                        We couldn&apos;t reconcile both identifiers
                      </h3>

                      <p className="mt-2 text-sm leading-6 text-[#876A2B]">
                        One identifier matched a product record,
                        but the other could not be matched. The
                        information is inconclusive and needs
                        further checking.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {result.outcome === "not_found" && (
                <div className="rounded-2xl border border-[#DDE9E5] bg-[#F7FBF9] p-5">
                  <div className="flex items-start gap-3">
                    <Info className="mt-0.5 h-6 w-6 shrink-0 text-[#086B57]" />

                    <div>
                      <h3 className="text-lg font-extrabold text-[#102A26]">
                        We couldn&apos;t match this information
                      </h3>

                      <p className="mt-2 text-sm leading-6 text-[#5F706C]">
                        This code did not match a product in our
                        local catalogue. The product may not be
                        listed yet, or the code may have been
                        entered incorrectly. This result alone
                        does not mean that the medicine is fake.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {matchedProducts.length > 0 && (
                <div className="mt-5 space-y-4">
                  {matchedProducts.map((product) => (
                    <div
                      key={product.id}
                      className="rounded-2xl border border-[#DDE9E5] bg-white p-5"
                    >
                      <p className="text-xs font-extrabold uppercase tracking-wider text-[#086B57]">
                        Catalogue product
                      </p>

                      <h4 className="mt-2 text-lg font-extrabold text-[#102A26]">
                        {product.name}
                      </h4>

                      <p className="mt-2 text-sm text-[#5F706C]">
                        Category: {product.category}
                      </p>

                      {product.manufacturer && (
                        <p className="mt-2 text-sm text-[#5F706C]">
                          Manufacturer: {product.manufacturer}
                        </p>
                      )}

                      {product.nafdacRegistrationNumber && (
                        <p className="mt-2 text-sm text-[#5F706C]">
                          NAFDAC registration number:{" "}
                          <span className="font-bold text-[#102A26]">
                            {product.nafdacRegistrationNumber}
                          </span>
                        </p>
                      )}

                      <div className="mt-4 flex flex-wrap gap-4">
                        {product.nafdacRecordUrl && (
                          <a
                            href={product.nafdacRecordUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-sm font-bold text-[#086B57] hover:underline"
                          >
                            View listed NAFDAC record
                            <ExternalLink size={14} />
                          </a>
                        )}

                        {product.manufacturerWebsite && (
                          <a
                            href={product.manufacturerWebsite}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-sm font-bold text-[#086B57] hover:underline"
                          >
                            Manufacturer website
                            <ExternalLink size={14} />
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <Link
                href="/customer-care"
                className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-[#DDE9E5] bg-white px-5 py-3.5 text-sm font-extrabold text-[#086B57] transition hover:bg-[#F1F8F5]"
              >
                Contact Customer Care
                <ArrowRight size={17} />
              </Link>
            </section>
          )}
        </div>

        {/* SIDE INFORMATION */}
        <aside className="space-y-5">
          <div className="rounded-3xl border border-[#DDE9E5] bg-white p-6">
            <ShieldCheck className="h-7 w-7 text-[#086B57]" />

            <h2 className="mt-4 text-lg font-extrabold text-[#102A26]">
              What this check means
            </h2>

            <p className="mt-3 text-sm leading-6 text-[#5F706C]">
              This prototype checks product identifiers against
              CarePlus&apos;s local catalogue. A match is not proof
              of authenticity.
            </p>

            <p className="mt-3 text-sm leading-6 text-[#5F706C]">
              Genuine verification will require appropriate
              NAFDAC, manufacturer, GS1, or product-specific
              authentication services.
            </p>
          </div>

          <div className="rounded-3xl bg-[#E5F5F0] p-6">
            <h2 className="text-lg font-extrabold text-[#063D35]">
              Concerned about a medicine?
            </h2>

            <p className="mt-2 text-sm leading-6 text-[#42685F]">
              If the packaging looks altered or the information
              seems inconsistent, seek advice from a licensed
              pharmacist and contact CarePlus.
            </p>

            <Link
              href="/customer-care"
              className="mt-4 inline-flex items-center gap-2 text-sm font-extrabold text-[#086B57] hover:underline"
            >
              Customer Care
              <ArrowRight size={16} />
            </Link>
          </div>

          <Link
            href="/shop"
            className="flex items-center justify-center gap-2 rounded-xl border border-[#DDE9E5] bg-white px-5 py-3.5 text-sm font-bold text-[#102A26] hover:bg-[#F1F8F5]"
          >
            Back to Shop
          </Link>
        </aside>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-12 sm:px-8">
        <div className="flex items-start gap-3 rounded-2xl border border-[#E9D7A7] bg-[#FFF9EA] p-4">
          <Info className="mt-0.5 h-5 w-5 shrink-0 text-[#9A6A00]" />

          <p className="text-xs leading-6 text-[#876A2B]">
            No live database query, package-level authentication,
            or counterfeit determination is performed in this
            frontend prototype. Barcode values must be obtained
            from accurate product packaging or authorised
            product data before the catalogue can match them.
          </p>
        </div>
      </section>
    </main>
  );
}
