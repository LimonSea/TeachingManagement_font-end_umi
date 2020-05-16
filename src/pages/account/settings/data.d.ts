export interface TagType {
  key: string;
  label: string;
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
