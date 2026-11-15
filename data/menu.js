const u = (id) =>
  `https://images.unsplash.com/${id}?w=500&auto=format&fit=crop&q=60`;

export const TIER1 = [
  { id: "all", label: "All" },
  { id: "foods", label: "Foods" },
  { id: "drinks", label: "Drinks" },
  { id: "addons", label: "Add-ons" },
];

export const TIER2 = [
  { id: "all", label: "All" },
  { id: "signature", label: "Signature Series" },
  { id: "premium", label: "Premium" },
  { id: "pasta", label: "Pasta" },
  { id: "grill", label: "Grill" },
  { id: "cocktails", label: "Cocktails" },
];

export const SECTIONS = {
  signature: "SIGNATURE SERIES",
  premium: "PREMIUM",
  pasta: "PASTA",
  grill: "GRILL",
  cocktails: "COCKTAILS",
};

export const MENU = [
  {
    id: 1,
    name: "Capo Signature Latte",
    price: 199,
    img: u("photo-1544145945-f90425340c7e"),
    tier1: "drinks",
    tier2: "signature",
  },
  {
    id: 2,
    name: "Ube Velvet Special",
    price: 199,
    img: u("photo-1517701550927-30cf4ba1dba5"),
    tier1: "drinks",
    tier2: "signature",
  },
  {
    id: 3,
    name: "Matcha Cloud Shake",
    price: 219,
    img: u("photo-1536256263959-770b48d82b0a"),
    tier1: "drinks",
    tier2: "signature",
  },
  {
    id: 4,
    name: "USDA PRIME RIB EYE",
    price: 999,
    img: "",
    tier1: "foods",
    tier2: "premium",
  },
  {
    id: 5,
    name: "Classic Rib Eye Steak",
    price: 599,
    img: "",
    tier1: "foods",
    tier2: "premium",
  },
  {
    id: 6,
    name: "Shank Steak",
    price: 299,
    img: "",
    tier1: "foods",
    tier2: "premium",
  },
];

export const peso = (n) => `₱${n.toFixed(2)}`;
