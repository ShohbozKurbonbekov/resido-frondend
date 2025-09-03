export interface CommentType {
  id: number;
  name: string;
  date: string;
  text: string;
  avatar: string;
}

interface WriterType {
  name: string;
  bio: string;
  avatar: string;
  social: {
    facebook: string;
    twitter: string;
    instagram: string;
    youtube: string;
    linkedin: string;
  };
}
export interface BlogType {
  tags: string[];
  date: string;
  id: number;
  image: string;
  title: string;
  description: string;
  quote: string;
  comments: CommentType[];
  writer: WriterType;
}
