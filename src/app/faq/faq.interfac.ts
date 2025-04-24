interface item {
  question: string;
  answer: string;
  isVisible: boolean;
  position:number
}

export interface IFaq {
  id?: string;
  title:string
  sub_title:string
  faqs: item[]
  type: "main" |"shorts" | "talking" | "podcast" | "graphic" | "advertising" | "website" ;  
}
