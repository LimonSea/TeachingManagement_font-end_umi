export interface CardListItemDataType {
  id: number;
  groupId: number;
  title: string;
  cover: string;
  desc: string;
  download: string;
  href: string;
  type: string;
}

export interface ListType {
  list: { [key: string]: CardListItemDataType[] };
}

export const typeNames = {
  'font-end': '前端',
  'back-end': '后端',
  'game': '游戏',
  'AI': '人工智能',
}
