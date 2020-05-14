export interface TagType {
  key: string;
  label: string;
}

export interface GeographicType {
  province: {
    label: string;
    key: string;
  };
  city: {
    label: string;
    key: string;
  };
}

export interface NoticeType {
  id: string;
  title: string;
  logo: string;
  description: string;
  updatedAt: string;
  member: string;
  href: string;
  memberLink: string;
}

export interface CurrentUser {
  id: number;
  name: string;
  avatar: string;
  email: string;
  signature: string;
  mobile: string;
  groupId: number;
  groupName: string;
  title?: string;
  notice?: NoticeType[];
  tags?: TagType[];
  notifyCount?: number;
  unreadCount?: number;
  country?: string;
  geographic?: GeographicType;
  address?: string;
}

export interface Member {
  avatar: string;
  name: string;
  id: string;
}

export interface ListItemDataType {
  id: number;
  title: string;
  avatar: string;
  authorId: string;
  owner: string;
  type: string;
  status: string;
  desc: string;
  content: string;
  updatedAt: string;
  createdAt: string;
}

export interface ProjectListItemDataType {
  id: number,
  groupId: number,
  cover: string,
  title: string,
  desc: string,
  github: string,
  status: string,
  createdAt: string,
  updatedAt: string,
}
