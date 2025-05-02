export interface IVideo {
  id?: string;
  title: string;
  description: string;
  thumbnail: string;
  video_link: string;
  is_visible: boolean;
  is_feature: boolean;
  position?: number;
  type: 
    | "main"
    | "shorts"
    | "talking"
    | "podcast"
    | "graphic"
    | "advertising"
    | "website";
  subType?: 
    | "full"
    | "short"
    | "hook"
    | "thumbnail"
    | "poster"
    | "uiux_design"
    | "web_development"
    | "ovc"
    | "reels";
}
