export interface IPackage {
  id: number;
  name: "Basic" | "Standard" | "Premium";
  price: number;
  duration: number;
  delivery_days: number;
  revisions: number;
  features: string[];
  type: "short_video" | "talking_head" | "podcast" | "thumbnail";
}
