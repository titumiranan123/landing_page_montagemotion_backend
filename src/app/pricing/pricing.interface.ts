

interface IFeature{
  feature:string
  isActive:boolean
}
export interface IPackage {
  id: number;
  name: "Basic" | "Standard" | "Premium";
  price: number;
  duration: number;
  delivery_days: number;
  revisions: number;
  features: IFeature[];
  type: "main" |"shorts" | "talking" | "podcast" | "graphic" | "advertising" | "website" ;  
}
