import React from 'react';
import moment from 'moment';
import styles from './index.less';

export interface ApplicationsProps {
  data: {
    desc?: string;
    updatedAt?: any;
    authorId?: number;
    user: {
      avatar?: string;
      name?: string;
      groupId?: number;
      group?: {
        name?: string;
      }
    }
  };
}
const ArticleListContent: React.FC<ApplicationsProps> = ({
  data: { desc, updatedAt },
}) => (
  <div className={styles.listContent}>
    <div className={styles.description}>{desc}</div>
    <div className={styles.extra}>
      {moment(updatedAt).format('YYYY-MM-DD HH:mm')}
    </div>
  </div>
);

export default ArticleListContent;
