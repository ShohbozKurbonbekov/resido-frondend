export interface CommentType {
  id: number;
  name: string;
  date: string;
  text: string;
  avatar: string;
}

export interface SocialType {
  facebook: string;
  twitter: string;
  instagram: string;
  youtube: string;
  linkedin: string;
}
export interface WriterType {
  name: string;
  bio: string;
  avatar: string;
  social: SocialType;
}
export interface BlogType {
  tags: string[];
  date: string | number;
  id: number;
  image: string;
  category: string;
  title: string;
  description: string;
  quote: string;
  comments: CommentType[];
  writer: WriterType;
}
