export interface IVideo {
  id?: string;
  title:string
  description:string;
  thumbnail: string;
  video_link: string;
  isVisible: boolean;
  isFeature:boolean
  position?: number;
  type: "main" |"shorts" | "talking" | "podcast" | "graphic" | "advertising" | "website" ; 
}
