export interface IVideo {
  id?: string;
  thumbnail: string;
  video_link: string;
  isVisible: boolean;
  position?: number;
  type: "short_video" | "talking_head" | "podcast" | "thumbnail";
}
