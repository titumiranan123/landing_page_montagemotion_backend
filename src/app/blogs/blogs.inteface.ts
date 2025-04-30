export interface IBlog {
    id?: string;
    title: string;
    short_description: string;
    description: string;
    image: string;
    is_publish?: boolean;
    is_feature?: boolean;
    is_position?:boolean
    created_at: Date;
    updated_at: Date;
  }
  