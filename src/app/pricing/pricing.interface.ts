interface Package {
  id: number;
  name: "Basic" | "Standard" | "Premium";
  price: number;
  duration: number;
  delivery_days: number;
  revisions: number;
  features: string[];
  is_active: boolean;
  isTaking: boolean;
  isPodcast: boolean;
  isThubnail: boolean;
  isShort: boolean;
}
