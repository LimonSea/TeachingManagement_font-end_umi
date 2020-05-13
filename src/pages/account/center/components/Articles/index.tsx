// import { StarTwoTone, LikeOutlined, MessageFilled } from '@ant-design/icons';
import { List, Tag } from 'antd';
import React from 'react';

import { connect, Link } from 'umi';
import ArticleListContent from '../ArticleListContent';
import { ListItemDataType } from '../../data.d';
import { ModalState } from '../../model';
import styles from './index.less';

const Articles: React.FC<Partial<ModalState>> = (props) => {
  const { list } = props;
  // const IconText: React.FC<{
  //   icon: React.ReactNode;
  //   text: React.ReactNode;
  // }> = ({ icon, text }) => (
  //   <span>
  //     {icon} {text}
  //   </span>
  // );
  return (
    <List<ListItemDataType>
      size="large"
      className={styles.articleList}
      rowKey="id"
      itemLayout="vertical"
      dataSource={list}
      renderItem={(item) => (
        <List.Item
          key={item.id}
          // actions={[
          //   <IconText key="star" icon={<StarTwoTone />} text={item.star} />,
          //   <IconText key="like" icon={<LikeOutlined />} text={item.like} />,
          //   <IconText key="message" icon={<MessageFilled />} text={item.message} />,
          // ]}
        >
          <List.Item.Meta
            title={
              <Link to={`/article/${item.id}`}>{item.title}</Link>
            }
            description={
              <span>
                <Tag>{item.type}</Tag>
              </span>
            }
          />
          <ArticleListContent data={item} />
        </List.Item>
      )}
    />
  );
};

export default connect(({ accountAndcenter }: { accountAndcenter: ModalState }) => ({
  list: accountAndcenter.list,
}))(Articles);
