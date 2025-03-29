export interface IHeader {
  id?: string;
  thumbmnail: string;
  video_link: string;
  isActive:string
  type: "short_video" | "talking_head" | "podcast" | "thumbnail";
}
