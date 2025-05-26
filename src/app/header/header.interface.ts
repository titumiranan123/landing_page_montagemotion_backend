export interface IHeader {
  id?: string;
  title: string;
  description: string;
  book_link: string;
  thumbnail: string;
  alt: string;
  video_link: string;
  type:
    | "main"
    | "shorts"
    | "talking"
    | "podcast"
    | "graphic"
    | "advertising"
    | "website";
  created_at?: Date;
  updated_at?: Date;
}
