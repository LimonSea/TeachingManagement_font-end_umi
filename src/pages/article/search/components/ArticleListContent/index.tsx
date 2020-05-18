import { Avatar } from 'antd';
import React from 'react';
import moment from 'moment';
import styles from './index.less';
import { Link } from 'umi';

interface ArticleListContentProps {
  data: {
    desc: React.ReactNode;
    updatedAt: string;
    authorId: number;
    user: {
      avatar: string;
      name: string;
      groupId: number;
      group: {
        name: string;
      }
    }
  };
}

const ArticleListContent: React.FC<ArticleListContentProps> = ({
  data: { desc, updatedAt, authorId, user },
}) => (
  <div className={styles.listContent}>
    <div className={styles.description}>{desc}</div>
    <div className={styles.extra}>
      <Avatar src={user.avatar} size="small" >{user.name}</Avatar>
      <Link to={`/account/center/${authorId}`}>{user.name}</Link> 发布于 <Link to={`/group/center/${user.groupId}`}>{user.group.name}</Link>
      <em>{moment(updatedAt).format('YYYY-MM-DD HH:mm')}</em>
    </div>
  </div>
);

export default ArticleListContent;
