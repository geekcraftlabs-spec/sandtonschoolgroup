export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  sizes: string[];
  category: "boys" | "girls" | "sportswear" | "swimwear" | "bags";
}

// GIRLS UNIFORM (g1.jpg – g12.jpg)
export const girlsProducts: Product[] = [
  { id: "g1", name: "Girls Basher", description: "School basher for girls, comfortable and durable.", price: 595, image: "/images/g1.jpg", sizes: ["S (34)", "M (36)", "L (38)", "XL (40)"], category: "girls" },
  { id: "g2", name: "SSG Girls Tie", description: "Official school tie for girls.", price: 300, image: "/images/g2.jpg", sizes: ["One Size"], category: "girls" },
  { id: "g3", name: "SSG Alice Band (Thin)", description: "Thin alice band with school logo.", price: 100, image: "/images/g3.jpg", sizes: ["One Size"], category: "girls" },
  { id: "g4", name: "SSG Beanie", description: "Warm beanie with school crest.", price: 320, image: "/images/g4.jpg", sizes: ["One Size"], category: "girls" },
  { id: "g5", name: "SSG Blazer", description: "Tailored navy blazer with gold crest.", price: 1600, image: "/images/g5.jpg", sizes: ["S (34)", "M (36)", "L (38)", "XL (40)"], category: "girls" },
  { id: "g6", name: "SSG Floppy Hat", description: "Sun protection hat with school logo.", price: 350, image: "/images/g6.jpg", sizes: ["One Size"], category: "girls" },
  { id: "g7", name: "SSG Long Sleeve Jersey", description: "Warm long sleeve jersey for winter.", price: 560, image: "/images/g7.jpg", sizes: ["S", "M", "L", "XL"], category: "girls" },
  { id: "g8", name: "SSG School Scarf", description: "School scarf with gold stripes.", price: 400, image: "/images/g8.jpg", sizes: ["One Size"], category: "girls" },
  { id: "g9", name: "SSG Short Sleeve Jersey", description: "Lightweight short sleeve jersey.", price: 480, image: "/images/g9.jpg", sizes: ["S", "M", "L", "XL"], category: "girls" },
  { id: "g10", name: "SSG Short Sleeve Shirt", description: "Crisp short sleeve formal shirt.", price: 380, image: "/images/g10.jpg", sizes: ["S (34)", "M (36)", "L (38)", "XL (40)"], category: "girls" },
  { id: "g11", name: "SSG Skirt", description: "Pleated school skirt, knee-length.", price: 580, image: "/images/g11.jpg", sizes: ["S (34)", "M (36)", "L (38)", "XL (40)"], category: "girls" },
  { id: "g12", name: "SSG Tracksuit", description: "Complete tracksuit set for sports.", price: 1400, image: "/images/g12.jpg", sizes: ["S", "M", "L", "XL"], category: "girls" },
];

// BOYS UNIFORM – all .jpeg
export const boysProducts: Product[] = [
  { id: "b1", name: "SSG Beanie", description: "Warm beanie with school crest.", price: 320, image: "/images/b1.jpeg", sizes: ["One Size"], category: "boys" },
  { id: "b2", name: "SSG Blazer", description: "Tailored navy blazer with gold crest.", price: 1600, image: "/images/b2.jpeg", sizes: ["S (34)", "M (36)", "L (38)", "XL (40)"], category: "boys" },
  { id: "b3", name: "SSG Boys Socks", description: "Official school socks for boys.", price: 300, image: "/images/b3.jpeg", sizes: ["S", "M", "L"], category: "boys" },
  { id: "b4", name: "SSG Cap 8 Panel", description: "8-panel school cap with embroidered logo.", price: 400, image: "/images/b4.jpeg", sizes: ["One Size"], category: "boys" },
  { id: "b5", name: "SSG Floppy Hat", description: "Sun protection hat with school logo.", price: 350, image: "/images/b5.jpeg", sizes: ["One Size"], category: "boys" },
  { id: "b6", name: "SSG Long Sleeve Jersey", description: "Warm long sleeve jersey for winter.", price: 560, image: "/images/b6.jpeg", sizes: ["S", "M", "L", "XL"], category: "boys" },
  { id: "b7", name: "SSG School Scarf", description: "School scarf with gold stripes.", price: 400, image: "/images/b7.jpeg", sizes: ["One Size"], category: "boys" },
  { id: "b8", name: "SSG Short Sleeve Jersey", description: "Lightweight short sleeve jersey.", price: 480, image: "/images/b8.jpeg", sizes: ["S", "M", "L", "XL"], category: "boys" },
  { id: "b9", name: "SSG Short Sleeve Shirt", description: "Crisp short sleeve formal shirt.", price: 380, image: "/images/b9.jpeg", sizes: ["S (34)", "M (36)", "L (38)", "XL (40)"], category: "boys" },
  { id: "b10", name: "SSG Tie", description: "Official school tie with gold stripes.", price: 300, image: "/images/b10.jpeg", sizes: ["One Size"], category: "boys" },
  { id: "b11", name: "SSG Tracksuit", description: "Complete tracksuit set for sports.", price: 1400, image: "/images/b11.jpeg", sizes: ["S", "M", "L", "XL"], category: "boys" },
];

// SWIMWEAR (sw1.jpg – sw4.jpg, sw3.png)
export const swimwearProducts: Product[] = [
  { id: "sw1", name: "Sports Swimming Cap (Boys and Girls)", description: "Silicone swim cap with school logo.", price: 400, image: "/images/sw1.jpg", sizes: ["One Size"], category: "swimwear" },
  { id: "sw2", name: "SSG Boys Jammer", description: "Comfortable swim jammer for boys.", price: 420, image: "/images/sw2.jpg", sizes: ["S (34)", "M (36)", "L (38)", "XL (40)"], category: "swimwear" },
  { id: "sw3", name: "SSG Girls Costume", description: "School swim costume for girls.", price: 480, image: "/images/sw3.png", sizes: ["S (34)", "M (36)", "L (38)", "XL (40)"], category: "swimwear" },
  { id: "sw4", name: "Swimming Towel", description: "Large swimming towel with school crest.", price: 500, image: "/images/sw4.jpg", sizes: ["One Size"], category: "swimwear" },
];

// SPORTSWEAR (s1.jpg – s9.jpg)
export const sportswearProducts: Product[] = [
  { id: "s1", name: "Sports Swimming Cap (Boys and Girls)", description: "Silicone swim cap with school logo.", price: 400, image: "/images/s1.jpg", sizes: ["One Size"], category: "sportswear" },
  { id: "s2", name: "SSG Peak Cap", description: "Peak cap with school emblem.", price: 350, image: "/images/s2.jpg", sizes: ["One Size"], category: "sportswear" },
  { id: "s3", name: "SSG Sport Shirt", description: "Moisture-wicking sport shirt for training.", price: 520, image: "/images/s3.jpg", sizes: ["S", "M", "L", "XL"], category: "sportswear" },
  { id: "s4", name: "SSG Sport Short", description: "Breathable sport shorts for PE.", price: 550, image: "/images/s4.jpg", sizes: ["S (34)", "M (36)", "L (38)", "XL (40)"], category: "sportswear" },
  { id: "s5", name: "SSG Sport Skirt", description: "Sport skirt for girls with school colors.", price: 520, image: "/images/s5.jpg", sizes: ["S (34)", "M (36)", "L (38)", "XL (40)"], category: "sportswear" },
  { id: "s6", name: "SSG Sport Socks", description: "Official sport socks.", price: 300, image: "/images/s6.jpg", sizes: ["S", "M", "L"], category: "sportswear" },
  { id: "s7", name: "SSG T/SHT Hercules", description: "Training t-shirt with Hercules design.", price: 350, image: "/images/s7.jpg", sizes: ["S", "M", "L", "XL"], category: "sportswear" },
  { id: "s8", name: "SSG T/SHT Sparticus", description: "Training t-shirt with Sparticus design.", price: 350, image: "/images/s8.jpg", sizes: ["S", "M", "L", "XL"], category: "sportswear" },
  { id: "s9", name: "SSG T/SHT Troy", description: "Training t-shirt with Troy design.", price: 350, image: "/images/s9.jpg", sizes: ["S", "M", "L", "XL"], category: "sportswear" },
];

// BAGS (bag1.jpg – bag3.jpg)
export const bagProducts: Product[] = [
  { id: "bag1", name: "Sports Bag", description: "Durable sports bag with school logo.", price: 520, image: "/images/bag1.jpg", sizes: ["One Size"], category: "bags" },
  { id: "bag2", name: "SSG Lunch Bag", description: "Insulated lunch bag with school branding.", price: 380, image: "/images/bag2.jpg", sizes: ["One Size"], category: "bags" },
  { id: "bag3", name: "SSG School Bag", description: "Large school backpack with laptop compartment.", price: 489, image: "/images/bag3.jpg", sizes: ["One Size"], category: "bags" },
];