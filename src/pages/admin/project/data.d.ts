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
  users?: Member[];
}
