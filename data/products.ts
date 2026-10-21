export type ProductCategory =
  | "Pain Relief"
  | "Vitamins & Supplements"
  | "Personal Care"
  | "Baby & Family"
  | "Digestive Health"
  | "Cold & Flu";

export type PrescriptionVerificationLevel =
  | "none"
  | "prescription";

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  price: number;
  image: string;
  description: string;
  stock: number;

  requiresPrescription: boolean;

  prescriptionVerificationLevel: PrescriptionVerificationLevel;

  nafdacRegistrationNumber?: string;
  manufacturer?: string;
  manufacturerWebsite?: string;
  barcode?: string;

  /*
   * Official NAFDAC Greenbook product record.
   *
   * This is useful later for product verification
   * and internal admin reference.
   */
  nafdacRecordUrl?: string;

  popular: boolean;
  newest: boolean;
}

export const products: Product[] = [
  // =========================================================
  // PAIN RELIEF
  // =========================================================

  {
    id: "paracetamol-500mg",
    name: "Paracetamol 500mg",
    category: "Pain Relief",
    price: 1500,
    image: "/images/products/paracetamol.jpg",
    description:
      "A commonly used medicine for temporary relief of pain and fever.",
    stock: 40,
    requiresPrescription: false,
    prescriptionVerificationLevel: "none",
    popular: true,
    newest: false,
  },

  {
    id: "ibuprofen-400mg",
    name: "Ibuprofen 400mg",
    category: "Pain Relief",
    price: 2500,
    image: "/images/products/ibuprofen.jpg",
    description:
      "An over-the-counter pain relief medicine commonly used for temporary relief of pain and inflammation.",
    stock: 28,
    requiresPrescription: false,
    prescriptionVerificationLevel: "none",
    popular: true,
    newest: true,
  },

  {
    id: "pain-relief-balm",
    name: "Pain Relief Balm",
    category: "Pain Relief",
    price: 3200,
    image: "/images/products/pain-relief-balm.jpg",
    description:
      "A topical balm designed for convenient application during everyday muscle and joint discomfort.",
    stock: 20,
    requiresPrescription: false,
    prescriptionVerificationLevel: "none",
    popular: true,
    newest: true,
  },

  {
    id: "diclofenac-sodium-50mg",
    name: "Diclofenac Sodium 50mg",
    category: "Pain Relief",
    price: 2800,
    image: "/images/products/diclofenac-sodium-50mg.jpg",
    description:
      "Diclofenac sodium 50mg tablet. Prescription-only medicine. A valid prescription is required before dispensing.",
    stock: 18,
    requiresPrescription: true,
    prescriptionVerificationLevel: "prescription",
    nafdacRegistrationNumber: "A4-100734",
    manufacturer: "Merit Organics Limited",
    nafdacRecordUrl:
      "https://greenbook.nafdac.gov.ng/products/details/7606",
    popular: false,
    newest: true,
  },

  {
    id: "nci-tramadol-50mg",
    name: "NCI Tramadol 50 Capsules",
    category: "Pain Relief",
    price: 4500,
    image: "/images/products/nci-tramadol-50mg.jpg",
    description:
      "Tramadol hydrochloride 50mg capsules. Prescription-only medicine. A valid prescription is required before dispensing.",
    stock: 12,
    requiresPrescription: true,
    prescriptionVerificationLevel: "prescription",
    nafdacRegistrationNumber: "A4-4990",
    manufacturer: "Mancare Pharmaceuticals Pvt Ltd",
    nafdacRecordUrl:
      "https://greenbook.nafdac.gov.ng/products/details/10812",
    popular: false,
    newest: true,
  },

  {
    id: "pregalad-75mg",
    name: "Pregalad 75mg Capsules",
    category: "Pain Relief",
    price: 6000,
    image: "/images/products/pregalad-75mg.jpg",
    description:
      "Pregabalin 75mg capsules. Prescription-only medicine. A valid prescription is required before dispensing.",
    stock: 10,
    requiresPrescription: true,
    prescriptionVerificationLevel: "prescription",
    nafdacRegistrationNumber: "B4-9656",
    manufacturer: "Globela Pharma Pvt Ltd",
    nafdacRecordUrl:
      "https://greenbook.nafdac.gov.ng/products/details/7739",
    popular: false,
    newest: true,
  },

  // =========================================================
  // VITAMINS & SUPPLEMENTS
  // =========================================================

  {
    id: "vitamin-c-1000mg",
    name: "Vitamin C 1000mg",
    category: "Vitamins & Supplements",
    price: 4500,
    image: "/images/products/vitamin-c.jpg",
    description:
      "A daily vitamin C supplement for everyday nutritional support.",
    stock: 24,
    requiresPrescription: false,
    prescriptionVerificationLevel: "none",
    popular: true,
    newest: true,
  },

  {
    id: "vitamin-d3-1000iu",
    name: "Vitamin D3 1000 IU",
    category: "Vitamins & Supplements",
    price: 5000,
    image: "/images/products/vitamin-d.jpg",
    description:
      "A vitamin D3 supplement suitable for adding vitamin D to your daily routine.",
    stock: 22,
    requiresPrescription: false,
    prescriptionVerificationLevel: "none",
    popular: true,
    newest: true,
  },

  {
    id: "zinc-50mg",
    name: "Zinc 50mg",
    category: "Vitamins & Supplements",
    price: 3800,
    image: "/images/products/zinc.jpg",
    description:
      "A zinc supplement designed for convenient daily nutritional support.",
    stock: 26,
    requiresPrescription: false,
    prescriptionVerificationLevel: "none",
    popular: false,
    newest: true,
  },

  {
    id: "daily-multivitamins",
    name: "Daily Multivitamins",
    category: "Vitamins & Supplements",
    price: 5500,
    image: "/images/products/multivitamin.jpg",
    description:
      "A blend of vitamins and minerals designed for everyday nutritional support.",
    stock: 18,
    requiresPrescription: false,
    prescriptionVerificationLevel: "none",
    popular: true,
    newest: false,
  },

  {
    id: "omega-3-capsules",
    name: "Omega 3 Capsules",
    category: "Vitamins & Supplements",
    price: 8500,
    image: "/images/products/omega-3.jpg",
    description:
      "An omega-3 supplement containing essential fatty acids for everyday nutritional support.",
    stock: 12,
    requiresPrescription: false,
    prescriptionVerificationLevel: "none",
    popular: true,
    newest: true,
  },

  {
    id: "nutrition-supplement",
    name: "Complete Nutrition Supplement",
    category: "Vitamins & Supplements",
    price: 12500,
    image: "/images/products/nutrition-supplement.jpg",
    description:
      "A nutritional supplement designed to complement a balanced everyday diet.",
    stock: 10,
    requiresPrescription: false,
    prescriptionVerificationLevel: "none",
    popular: false,
    newest: true,
  },

  {
    id: "king-capsule",
    name: "King Capsule",
    category: "Vitamins & Supplements",
    price: 4000,
    image: "/images/products/king-capsule.jpg",
    description:
      "A ferrous fumarate, vitamin and mineral formulation. Prescription-only medicine.",
    stock: 16,
    requiresPrescription: true,
    prescriptionVerificationLevel: "prescription",
    nafdacRegistrationNumber: "A4-1202",
    manufacturer: "SKG - Pharma Ltd",
    nafdacRecordUrl:
      "https://greenbook.nafdac.gov.ng/products/details/6557",
    popular: false,
    newest: true,
  },

  {
    id: "ferrous-sulphate-200mg",
    name: "Ferrous Sulphate 200mg",
    category: "Vitamins & Supplements",
    price: 1800,
    image: "/images/products/ferrous-sulphate-200mg.jpg",
    description:
      "Ferrous sulphate 200mg tablet. Prescription-only medicine.",
    stock: 20,
    requiresPrescription: true,
    prescriptionVerificationLevel: "prescription",
    nafdacRegistrationNumber: "A11-100593",
    manufacturer: "Leady Pharmaceuticals Industries Limited",
    nafdacRecordUrl:
      "https://greenbook.nafdac.gov.ng/products/details/6545",
    popular: false,
    newest: false,
  },

  {
    id: "alben-ferrous-sulphate-200mg",
    name: "Alben Ferrous Sulphate 200mg",
    category: "Vitamins & Supplements",
    price: 2200,
    image:
      "/images/products/alben-ferrous-sulphate-200mg.jpg",
    description:
      "Ferrous sulphate 200mg tablet. Prescription-only medicine.",
    stock: 14,
    requiresPrescription: true,
    prescriptionVerificationLevel: "prescription",
    nafdacRegistrationNumber: "A11-0047",
    manufacturer: "Alben Healthcare Industries Limited",
    nafdacRecordUrl:
      "https://greenbook.nafdac.gov.ng/products/details/4404",
    popular: false,
    newest: false,
  },

  // =========================================================
  // PERSONAL CARE
  // =========================================================

  {
    id: "hand-sanitizer",
    name: "Hand Sanitizer",
    category: "Personal Care",
    price: 2000,
    image: "/images/products/hand-sanitizer.jpg",
    description:
      "A convenient hand sanitizer for everyday hand hygiene at home, work or on the go.",
    stock: 32,
    requiresPrescription: false,
    prescriptionVerificationLevel: "none",
    popular: true,
    newest: false,
  },

  {
    id: "toothpaste",
    name: "Daily Care Toothpaste",
    category: "Personal Care",
    price: 2800,
    image: "/images/products/toothpaste.jpg",
    description:
      "An everyday toothpaste designed for regular oral hygiene.",
    stock: 30,
    requiresPrescription: false,
    prescriptionVerificationLevel: "none",
    popular: true,
    newest: false,
  },

  {
    id: "mouthwash",
    name: "Daily Care Mouthwash",
    category: "Personal Care",
    price: 3500,
    image: "/images/products/mouthwash.jpg",
    description:
      "A mouthwash designed to complement a regular oral-care routine.",
    stock: 24,
    requiresPrescription: false,
    prescriptionVerificationLevel: "none",
    popular: false,
    newest: true,
  },

  {
    id: "body-lotion",
    name: "Moisturising Body Lotion",
    category: "Personal Care",
    price: 4500,
    image: "/images/products/body-lotion.jpg",
    description:
      "A daily body lotion for keeping skin moisturised and comfortable.",
    stock: 20,
    requiresPrescription: false,
    prescriptionVerificationLevel: "none",
    popular: true,
    newest: true,
  },

  {
    id: "feminine-hygiene",
    name: "Feminine Hygiene Pads",
    category: "Personal Care",
    price: 3000,
    image: "/images/products/feminine-hygiene.jpg",
    description:
      "Everyday feminine hygiene pads designed for personal comfort and convenience.",
    stock: 35,
    requiresPrescription: false,
    prescriptionVerificationLevel: "none",
    popular: true,
    newest: false,
  },

  {
    id: "razor-blades",
    name: "Razor Blades",
    category: "Personal Care",
    price: 2500,
    image: "/images/products/razor-blades.jpg",
    description:
      "Replacement razor blades for everyday personal grooming.",
    stock: 18,
    requiresPrescription: false,
    prescriptionVerificationLevel: "none",
    popular: false,
    newest: true,
  },

  {
    id: "rebactin-cream",
    name: "Rebactin Cream",
    category: "Personal Care",
    price: 6500,
    image: "/images/products/rebactin-cream.jpg",
    description:
      "Topical betamethasone, clotrimazole and neomycin cream. Prescription-only medicine.",
    stock: 12,
    requiresPrescription: true,
    prescriptionVerificationLevel: "prescription",
    nafdacRegistrationNumber: "B4-7722",
    manufacturer: "Lesanto Laboratories",
    nafdacRecordUrl:
      "https://greenbook.nafdac.gov.ng/products/details/5348",
    popular: false,
    newest: true,
  },

  {
    id: "clotrimazole-betamethasone-neomycin-cream",
    name: "Clotrimazole + Betamethasone + Neomycin Cream",
    category: "Personal Care",
    price: 7000,
    image:
      "/images/products/clotrimazole-betamethasone-neomycin.jpg",
    description:
      "Topical clotrimazole, betamethasone and neomycin cream. Prescription-only medicine.",
    stock: 10,
    requiresPrescription: true,
    prescriptionVerificationLevel: "prescription",
    nafdacRegistrationNumber: "A4-100374",
    manufacturer: "Lesanto Laboratories",
    nafdacRecordUrl:
      "https://greenbook.nafdac.gov.ng/products/details/6171",
    popular: false,
    newest: true,
  },

  {
    id: "clanosten-plus-cream",
    name: "Clanosten Plus Cream",
    category: "Personal Care",
    price: 7500,
    image: "/images/products/clanosten-plus-cream.jpg",
    description:
      "Topical clotrimazole and antibiotic-containing cream. Prescription-only medicine.",
    stock: 10,
    requiresPrescription: true,
    prescriptionVerificationLevel: "prescription",
    nafdacRegistrationNumber: "B4-2122",
    manufacturer: "Kwality Pharmaceuticals Ltd",
    nafdacRecordUrl:
      "https://greenbook.nafdac.gov.ng/products/details/6168",
    popular: false,
    newest: false,
  },

  // =========================================================
  // BABY & FAMILY
  // =========================================================

  {
    id: "baby-wipes",
    name: "Baby Wipes",
    category: "Baby & Family",
    price: 3500,
    image: "/images/products/baby-wipes.jpg",
    description:
      "Convenient baby wipes for everyday baby-care routines.",
    stock: 25,
    requiresPrescription: false,
    prescriptionVerificationLevel: "none",
    popular: true,
    newest: false,
  },

  {
    id: "baby-formula",
    name: "Baby Formula",
    category: "Baby & Family",
    price: 9500,
    image: "/images/products/baby-formula.jpg",
    description:
      "Infant formula product for families who use formula as part of their feeding routine.",
    stock: 12,
    requiresPrescription: false,
    prescriptionVerificationLevel: "none",
    popular: true,
    newest: true,
  },

  {
    id: "acimox-suspension-125mg-5ml",
    name: "Acimox Suspension 125mg/5mL",
    category: "Baby & Family",
    price: 3500,
    image:
      "/images/products/acimox-suspension-125mg-5ml.jpg",
    description:
      "Amoxicillin 125mg/5mL oral suspension. Prescription-only medicine.",
    stock: 12,
    requiresPrescription: true,
    prescriptionVerificationLevel: "prescription",
    nafdacRegistrationNumber: "A11-0155",
    manufacturer: "A.C. Drugs Ltd",
    nafdacRecordUrl:
      "https://greenbook.nafdac.gov.ng/products/details/6679",
    popular: false,
    newest: true,
  },

  {
    id: "eficef-100-suspension",
    name: "Eficef 100 Powder for Oral Suspension",
    category: "Baby & Family",
    price: 5000,
    image: "/images/products/eficef-100.jpg",
    description:
      "Cefixime 100mg oral suspension. Prescription-only medicine.",
    stock: 10,
    requiresPrescription: true,
    prescriptionVerificationLevel: "prescription",
    nafdacRegistrationNumber: "A4-100373",
    manufacturer: "Associated Biotech",
    nafdacRecordUrl:
      "https://greenbook.nafdac.gov.ng/products/details/6097",
    popular: false,
    newest: true,
  },

  {
    id: "erythro-suspension-250mg",
    name: "Erythro Powder for Oral Suspension 250mg/5mL",
    category: "Baby & Family",
    price: 4500,
    image:
      "/images/products/erythro-suspension-250mg.jpg",
    description:
      "Erythromycin 250mg/5mL oral suspension. Prescription-only medicine.",
    stock: 10,
    requiresPrescription: true,
    prescriptionVerificationLevel: "prescription",
    nafdacRegistrationNumber: "A4-7003",
    manufacturer: "Emzor Pharmaceutical Industries Limited",
    nafdacRecordUrl:
      "https://greenbook.nafdac.gov.ng/products/details/11495",
    popular: false,
    newest: true,
  },

  // =========================================================
  // DIGESTIVE HEALTH
  // =========================================================

  {
    id: "imodium",
    name: "Anti-Diarrheal Capsules",
    category: "Digestive Health",
    price: 3000,
    image: "/images/products/imodium.jpg",
    description:
      "A digestive-health medicine intended for temporary management of diarrhoea symptoms.",
    stock: 15,
    requiresPrescription: false,
    prescriptionVerificationLevel: "none",
    popular: true,
    newest: true,
  },

  {
    id: "fama-omeprazole-20mg",
    name: "Fama Omeprazole Capsules B.P. 20mg",
    category: "Digestive Health",
    price: 5000,
    image:
      "/images/products/fama-omeprazole-20mg.jpg",
    description:
      "Omeprazole 20mg capsules. Prescription-only medicine.",
    stock: 14,
    requiresPrescription: true,
    prescriptionVerificationLevel: "prescription",
    nafdacRegistrationNumber: "B4-9671",
    manufacturer: "Impulse Pharma Pvt. Ltd.",
    nafdacRecordUrl:
      "https://greenbook.nafdac.gov.ng/products/details/7228",
    popular: false,
    newest: true,
  },

  {
    id: "loperamide-2mg",
    name: "Loperamide Tablets BP 2mg",
    category: "Digestive Health",
    price: 3500,
    image: "/images/products/loperamide-2mg.jpg",
    description:
      "Loperamide hydrochloride 2mg tablets. Prescription-only medicine.",
    stock: 12,
    requiresPrescription: true,
    prescriptionVerificationLevel: "prescription",
    nafdacRegistrationNumber: "A4-101386",
    manufacturer: "SSM Formulations Private Limited",
    nafdacRecordUrl:
      "https://greenbook.nafdac.gov.ng/products/details/11630",
    popular: false,
    newest: true,
  },

  {
    id: "shalmet-400-metronidazole",
    name: "Shalmet 400 Tablets",
    category: "Digestive Health",
    price: 3000,
    image:
      "/images/products/shalmet-400-metronidazole.jpg",
    description:
      "Metronidazole 400mg tablets. Prescription-only medicine.",
    stock: 14,
    requiresPrescription: true,
    prescriptionVerificationLevel: "prescription",
    nafdacRegistrationNumber: "A11-100615",
    manufacturer: "Shalina Laboratories Pvt Ltd",
    nafdacRecordUrl:
      "https://greenbook.nafdac.gov.ng/products/details/6804",
    popular: false,
    newest: false,
  },

  // =========================================================
  // COLD & FLU
  // =========================================================

  {
    id: "antiseptic-liquid",
    name: "Antiseptic Liquid",
    category: "Cold & Flu",
    price: 3500,
    image: "/images/products/antiseptic.jpg",
    description:
      "An antiseptic liquid for suitable everyday household hygiene and first-aid uses.",
    stock: 22,
    requiresPrescription: false,
    prescriptionVerificationLevel: "none",
    popular: true,
    newest: false,
  },

  {
    id: "vapour-rub",
    name: "Vapour Rub",
    category: "Cold & Flu",
    price: 4000,
    image: "/images/products/vapourub.jpg",
    description:
      "A topical vapour rub commonly used as part of a cold and flu comfort routine.",
    stock: 20,
    requiresPrescription: false,
    prescriptionVerificationLevel: "none",
    popular: true,
    newest: true,
  },

  {
    id: "salbutamol-4mg",
    name: "Salbutamol 4mg Tablet",
    category: "Cold & Flu",
    price: 3000,
    image: "/images/products/salbutamol-4mg.jpg",
    description:
      "Salbutamol 4mg tablets. Prescription-only medicine.",
    stock: 15,
    requiresPrescription: true,
    prescriptionVerificationLevel: "prescription",
    nafdacRegistrationNumber: "04-0062",
    manufacturer: "Vitabiotics Nigeria Limited",
    nafdacRecordUrl:
      "https://greenbook.nafdac.gov.ng/products/details/6824",
    popular: false,
    newest: true,
  },

  {
    id: "macdech-aminophylline-100mg",
    name: "Macdech Aminophylline 100mg Tablets",
    category: "Cold & Flu",
    price: 4000,
    image:
      "/images/products/macdech-aminophylline-100mg.jpg",
    description:
      "Aminophylline 100mg tablets. Prescription-only medicine.",
    stock: 12,
    requiresPrescription: true,
    prescriptionVerificationLevel: "prescription",
    nafdacRegistrationNumber: "B4-6947",
    manufacturer: "Mancare Pharmaceuticals Pvt Ltd",
    nafdacRecordUrl:
      "https://greenbook.nafdac.gov.ng/products/details/5174",
    popular: false,
    newest: false,
  },

  {
    id: "brozelin-syrup",
    name: "Brozelin Syrup",
    category: "Cold & Flu",
    price: 4200,
    image: "/images/products/brozelin-syrup.jpg",
    description:
      "A salbutamol, ambroxol hydrochloride and guaifenesin syrup. Prescription-only medicine.",
    stock: 12,
    requiresPrescription: true,
    prescriptionVerificationLevel: "prescription",
    nafdacRegistrationNumber: "A4-3215",
    manufacturer: "The Madras Pharmaceuticals",
    nafdacRecordUrl:
      "https://greenbook.nafdac.gov.ng/products/details/5764",
    popular: false,
    newest: true,
  },
];

export type ShopCategory =
  | "All Products"
  | ProductCategory
  | "Prescription Medicines";

export const categories = [
  "All Products",
  "Pain Relief",
  "Vitamins & Supplements",
  "Personal Care",
  "Baby & Family",
  "Digestive Health",
  "Cold & Flu",
  "Prescription Medicines",
] as const;