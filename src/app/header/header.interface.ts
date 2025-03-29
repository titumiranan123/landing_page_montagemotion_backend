export interface IHeader {
  id?: string;
  thumbnail: string;
  video_link: string;
  isActive:string
  type: "short_video" | "talking_head" | "podcast" | "thumbnail";
}
