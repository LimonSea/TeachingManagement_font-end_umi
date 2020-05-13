import React from 'react';
import styles from './index.less';
import moment from 'moment';

export interface ApplicationsProps {
  data: {
    desc?: string;
    updatedAt?: any;
    avatar?: string;
    owner?: string;
    authorId?: number;
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
