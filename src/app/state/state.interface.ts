export interface IState {
  id?: string;
  isActive:boolean,
  states: {
    title: string;
    count: number;
    unit: string;
    isPublish:boolean
  }[];
  type:
    | "main"
    | "shorts"
    | "talking"
    | "podcast"
    | "graphic"
    | "advertising"
    | "website";
}
