export interface ITestimonial {
  id?: string;
  name: string;
  designation: string;
  message?: string;
  video_message?: string;
  position?: number;
  type: "short_video" | "talking_head" | "podcast" | "thumbnail";
}
