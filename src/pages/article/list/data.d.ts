export interface ListItemDataType {
  id: number;
  title: string;
  authorId: number;
  type: string;
  status: string;
  desc: string;
  content: string;
  updatedAt: string;
  createdAt: string;
  user: {
    name: string;
    avatar: string;
    groupId: number;
    group: {
      name: string;
    }
  }
}
