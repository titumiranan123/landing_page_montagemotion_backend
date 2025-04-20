export interface IHeader {
  id?: string;
  thumbnail: string;
  video_link: string;
  isActive:string
  type: "main" |"shorts" | "talking" | "podcast" | "graphic" | "advertising" | "website" ;                   
}
