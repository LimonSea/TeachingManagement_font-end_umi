import { Avatar } from 'antd';
import React from 'react';
import moment from 'moment';
import styles from './index.less';

export interface ApplicationsProps {
  data: {
    desc?: string;
    updatedAt?: any;
    avatar?: string;
    owner?: string;
  };
}
const ArticleListContent: React.FC<ApplicationsProps> = ({
  data: { desc, updatedAt, avatar, owner },
}) => (
  <div className={styles.listContent}>
    <div className={styles.description}>{desc}</div>
    <div className={styles.extra}>
      <Avatar src={avatar} size="small" />
      {/* <a href={href}>{owner}</a> 发布在 <a href={href}>{href}</a> */}
      <a>{owner}</a>
      <em>{moment(updatedAt).format('YYYY-MM-DD HH:mm')}</em>
    </div>
  </div>
);

export default ArticleListContent;
