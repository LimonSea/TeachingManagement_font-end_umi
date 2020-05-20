export interface Member {
  avatar: string;
  name: string;
  id: number;
}

export interface BasicListItemDataType {
  id: number;
  groupId: number;
  title: string;
  content: string;
  deadline: string;
  updatedAt: string;
  createdAt: string;
  users?: Member[];
}
