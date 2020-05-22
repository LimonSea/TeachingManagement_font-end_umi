// import { StarTwoTone, LikeOutlined, MessageFilled } from '@ant-design/icons';
import { List, Tag, Button } from 'antd';
import React, { useState } from 'react';

import { connect, Link, Dispatch } from 'umi';
import ArticleListContent from '../ArticleListContent';
import { ListItemDataType } from '../../data.d';
import { ModalState } from '../../model';
import styles from './index.less';
import { LoadingOutlined } from '@ant-design/icons';

const pageSize = 10;
interface ArticlesProps {
  dispatch: Dispatch<any>;
  accountAndcenter: ModalState;
  loading: boolean;
}
const Articles: React.FC<Partial<ArticlesProps>> = (props) => {
  const { dispatch, accountAndcenter: { list }, loading } = props;
  const [currentPage, setCurrentPage] = useState(1);

  // const IconText: React.FC<{
  //   icon: React.ReactNode;
  //   text: React.ReactNode;
  // }> = ({ icon, text }) => (
  //   <span>
  //     {icon} {text}
  //   </span>
  // );

  const fetchMore = () => {
    dispatch({
      type: 'accountAndcenter/appendFetch',
      payload: {
        count: pageSize,
        currentPage: currentPage + 1,
      },
    });
    setCurrentPage(currentPage + 1);
  };

  const loadMore = list.length > 0 && (
    <div style={{ textAlign: 'center', marginTop: 16 }}>
      <Button onClick={fetchMore} style={{ paddingLeft: 48, paddingRight: 48 }}>
        {loading ? (
          <span>
            <LoadingOutlined /> 加载中...
          </span>
        ) : (
          '加载更多'
        )}
      </Button>
    </div>
  );

  return (
    <List<ListItemDataType>
      size="large"
      loading={list.length === 0 ? loading : false}
      className={styles.articleList}
      rowKey="id"
      itemLayout="vertical"
      dataSource={list}
      loadMore={loadMore}
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

export default connect(({
  accountAndcenter,
  loading }: {
    accountAndcenter: ModalState,
    loading: { models: { [key: string]: boolean } };
  }) => ({
  accountAndcenter,
  loading: loading.models.accountAndcenter,
}))(Articles);
