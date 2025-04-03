export interface IFaq {
  id?: string;
  question: string;
  answer: string;
  isVisible: boolean;
  type: "short_video" | "talking_head" | "podcast" | "thumbnail";
}
