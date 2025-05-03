interface item {
  id: string;
  faq_id: string;
  question: string;
  answer: string;
  is_visible: boolean;
  position: number;
}

export interface IFaq {
  id?: string;
  title: string;
  sub_title: string;
  is_visible: boolean;
  faqs: item[];
  type:
    | "main"
    | "shorts"
    | "talking"
    | "podcast"
    | "graphic"
    | "advertising"
    | "website";
}
