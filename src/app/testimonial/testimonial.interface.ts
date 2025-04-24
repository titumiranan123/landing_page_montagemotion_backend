export interface ITestimonial {
  id?: string;
  name: string;
  designation: string;
  message?: string;
  image:string
  video_message?: string;
  position?: number;
  type: "main" |"shorts" | "talking" | "podcast" | "graphic" | "advertising" | "website" ; 
}
