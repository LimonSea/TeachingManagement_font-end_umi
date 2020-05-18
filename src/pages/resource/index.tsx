import { PlusOutlined } from '@ant-design/icons';
import { Button, Card, List, Typography } from 'antd';
import React, { Component } from 'react';

import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect, Dispatch } from 'umi';
import { StateType } from './model';
import { CardListItemDataType } from './data.d';
import styles from './style.less';

const { Paragraph } = Typography;

interface CardListProps {
  resourceList: StateType;
  dispatch: Dispatch<any>;
  loading: boolean;
}
interface CardListState {
  visible: boolean;
  done: boolean;
  current?: Partial<CardListItemDataType>;
}

class CardList extends Component<CardListProps, CardListState> {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'resourceList/fetch',
      payload: {
        count: 8,
      },
    });
  }

  render() {
    const {
      resourceList: { list },
      loading,
    } = this.props;

    const content = (
      <div className={styles.pageHeaderContent}>
        <p>
          工作室专享资源，方便同学们查阅资料和下载。
        </p>
      </div>
    );

    const nullData: Partial<CardListItemDataType> = {};
    return (
      <PageHeaderWrapper content={content}>
        <div className={styles.cardList}>
          <List<Partial<CardListItemDataType>>
            rowKey="id"
            loading={loading}
            grid={{ gutter: 24, lg: 3, md: 2, sm: 1, xs: 1 }}
            dataSource={[nullData, ...list]}
            renderItem={(item) => {
              if (item && item.id) {
                return (
                  <List.Item key={item.id}>
                    <Card
                      hoverable
                      className={styles.card}
                      actions={[<a key="option1">操作一</a>, <a key="option2">操作二</a>]}
                    >
                      <Card.Meta
                        avatar={<img alt="" className={styles.cardAvatar} src={item.avatar} />}
                        title={<a>{item.title}</a>}
                        description={
                          <Paragraph className={styles.item} ellipsis={{ rows: 3 }}>
                            {item.description}
                          </Paragraph>
                        }
                      />
                    </Card>
                  </List.Item>
                );
              }
              return (
                <List.Item>
                  <Button type="dashed" className={styles.newButton}>
                    <PlusOutlined /> 新增产品
                  </Button>
                </List.Item>
              );
            }}
          />
        </div>
      </PageHeaderWrapper>
    );
  }
}

export default connect(
  ({
    resourceList,
    loading,
  }: {
    resourceList: StateType;
    loading: {
      models: { [key: string]: boolean };
    };
  }) => ({
    resourceList,
    loading: loading.models.resourceList,
  }),
)(CardList);
