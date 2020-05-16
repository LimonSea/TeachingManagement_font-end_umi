export interface Member {
  avatar: string;
  name: string;
  id: number;
}

export interface BasicListItemDataType {
  id: number;
  groupId: number;
  title: string;
  cover: string;
  desc: string;
  github: string;
  status: string;
  updatedAt: number;
  createdAt: number;
  members?: Member[];

  owner?: string;
  avatar?: string;
  percent?: number;
  logo?: string;
  href?: string;
  body?: any;
  subDescription?: string;
  activeUser?: number;
  newUser?: number;
  star?: number;
  like?: number;
  message?: number;
  content?: string;
  members?: Member[];
}
