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
  name: string;
  avatar: string;
  id: string;
  notice: NoticeType[];
  email: string;
  signature: string;
  title: string;
  groupName: string;
  tags: TagType[];
  notifyCount: number;
  unreadCount: number;
  country: string;
  geographic: GeographicType;
  address: string;
  phone: string;
}

export interface Member {
  avatar: string;
  name: string;
  id: string;
}

export interface ListItemDataType {
  id: string;
  title: string;
  avatar: string;
  authorId: string;
  owner: string;
  type: string;
  status: string;
  updatedAt: number;
  createdAt: number;
  desc: string;
  content: string;

  cover?: string;
  percent?: number;
  logo?: string;
  href?: string;
  body?: any;
  subDescription?: string;
  description?: string;
  activeUser?: number;
  newUser?: number;
  star?: number;
  like?: number;
  message?: number;
  members?: Member[];
}
