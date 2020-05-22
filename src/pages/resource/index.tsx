import { PlusOutlined } from '@ant-design/icons';
import { Button, Card, List, Typography, Divider, Modal } from 'antd';
import React, { FC, useEffect, useState } from 'react';

import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect, Dispatch } from 'umi';
import { ConnectState } from '@/models/connect';
import { CurrentUser } from '@/models/user';
import OperationModal from './components/OperationModal';
import { StateType } from './model';
import { CardListItemDataType, typeNames } from './data.d';
import styles from './style.less';

const { Paragraph } = Typography;

interface CardListProps {
  resourceList: StateType;
  dispatch: Dispatch<any>;
  loading: boolean;
  currentUser: CurrentUser;
}

export const CardList: FC<CardListProps> = (props) => {
  const { dispatch, loading, resourceList: { list }, currentUser } = props;
  const [visible, setVisible] = useState<boolean>(false); // true: 显示modal
  const [current, setCurrent] = useState<Partial<CardListItemDataType> | undefined>(undefined);

  useEffect(() => {
    dispatch({
      type: 'resourceList/fetchList'
    });
  }, []);

  const showModal = () => {
    setVisible(true);
    setCurrent(undefined);
  };

  const showEditModal = (item: CardListItemDataType) => {
    setVisible(true);
    setCurrent(item);
  };

  const handleSubmit = (values: CardListItemDataType) => {
    dispatch({
      type: 'resourceList/submitAndUpdate',
      payload: current ? { id: current.id, ...values } : values,
    });
    setVisible(false);
  };

  const deleteItem = (id: number) => {
    dispatch({
      type: 'resourceList/delete',
      payload: { id },
    });
  };

  const handleDelete = (id: number) => {
    Modal.confirm({
      title: '删除资源',
      content: '确定删除该资源吗？',
      okText: '确认',
      cancelText: '取消',
      onOk: () => deleteItem(id),
    });
  };


  const content = (
    <div className={styles.pageHeaderContent}>
      <p>
        工作室专享资源，方便同学们查阅资料和下载。
      </p>
    </div>
  );

  return (
    <PageHeaderWrapper
      content={content}
      extra={currentUser.currentAuthority === 'admin' ?
        <Button type="primary" onClick={showModal}><PlusOutlined /> 新增资源</Button> :
        null
      }
    >
      {
        Object.keys(list).map(key => (
          <>
            <Divider>{typeNames[key]}</Divider>
            <div className={styles.cardList}>
              <List<Partial<CardListItemDataType>>
                rowKey="id"
                loading={loading}
                grid={{ gutter: 24, lg: 3, md: 2, sm: 1, xs: 1 }}
                dataSource={list[key]}
                renderItem={(item) => {
                  if (item && item.id) {
                    return (
                      <List.Item key={item.id}>
                        <Card
                          hoverable
                          className={styles.card}
                          bodyStyle={{height: 100}}
                          actions={
                            currentUser.currentAuthority === 'admin' ?
                              [
                                <a key="edit" onClick={() => showEditModal(item)}>编辑</a>,
                                <a key="delete" onClick={() => handleDelete(item.id)} >删除</a>
                              ] : []
                          }
                        >
                          <Card.Meta
                            avatar={<img alt="" className={styles.cardAvatar} src={item.cover} />}
                            title={<a href={item.href} target="_blank">{item.title}</a>}
                            description={
                              <Paragraph className={styles.item} ellipsis={{ rows: 3 }}>
                                {item.desc}
                              </Paragraph>
                            }
                          />
                        </Card>
                      </List.Item>
                    );
                  }
                  return null;
                }}
              />
            </div>
          </>
        ))
      }
      <OperationModal
        current={current}
        visible={visible}
        onCancel={() => setVisible(false)}
        onSubmit={handleSubmit}
      />
    </PageHeaderWrapper>
  );
}

export default connect(
  ({
    resourceList,
    loading,
    user,
  }: {
    resourceList: StateType;
    loading: {
      models: { [key: string]: boolean };
    };
    user: ConnectState['user'],
  }) => ({
    resourceList,
    currentUser: user.currentUser,
    loading: loading.models.resourceList,
  }),
)(CardList);
