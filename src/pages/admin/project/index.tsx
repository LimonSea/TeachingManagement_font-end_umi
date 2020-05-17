import React, { FC, useRef, useState, useEffect } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { ConnectState } from '@/models/connect';
import { CurrentUser } from '@/models/user';
import {
  Avatar,
  Button,
  Card,
  Input,
  List,
  Modal,
} from 'antd';

import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect, Dispatch } from 'umi';
import moment from 'moment';
import OperationModal from './components/OperationModal';
import { StateType } from './model';
import { BasicListItemDataType, Member } from './data.d';
import styles from './style.less';

const { Search } = Input;

interface ProjectProps {
  adminAndproject: StateType;
  dispatch: Dispatch<any>;
  loading: boolean;
  currentUser: CurrentUser;
  users: Member[];
}

const ListContent = ({
  data: { createdAt, github, status },
}: {
  data: BasicListItemDataType;
}) => (
  <div className={styles.listContent}>
    <div className={styles.listContentItem}>
      <div>github</div>
      <a href={github} target="_blank">{github}</a>
    </div>
    <div className={styles.listContentItem}>
      <span>创建时间</span>
      <p>{moment(createdAt).format('YYYY-MM-DD HH:mm')}</p>
    </div>
    <div className={styles.listContentItem}>
      <span>状态</span>
      <p>{status}</p>
    </div>
  </div>
);

export const Project: FC<ProjectProps> = (props) => {
  const addBtn = useRef(null);
  const {
    loading,
    dispatch,
    adminAndproject: { list, totalCount, users },
    currentUser,
  } = props;
  const [done, setDone] = useState<boolean>(false); // true: 显示操作成功界面
  const [visible, setVisible] = useState<boolean>(false); // true: 显示modal
  const [current, setCurrent] = useState<Partial<BasicListItemDataType> | undefined>(undefined); // 编辑初始值

  useEffect(() => {
    if (!currentUser.groupId) return;
    dispatch({
      type: 'adminAndproject/fetchList',
      payload: {
        count: 5,
        currentPage: 1,
      },
    });
    dispatch({
      type: 'adminAndproject/fetchMember',
    })
  }, [currentUser.groupId]);

  const paginationProps = {
    showQuickJumper: true,
    pageSize: 5,
    total: totalCount,
    onChange: (page: number) => {
      dispatch({
        type: 'adminAndproject/fetchList',
        payload: {
          count: 5,
          currentPage: page,
        },
      });
    }
  };

  const showModal = () => {
    setVisible(true);
    setCurrent(undefined);
  };

  const showEditModal = (item: BasicListItemDataType) => {
    setVisible(true);
    setCurrent(item);
  };

  const deleteItem = (id: number) => {
    dispatch({
      type: 'adminAndproject/delete',
      payload: { id },
    });
  };

  const handleDelete = (currentItem: BasicListItemDataType) => {
    Modal.confirm({
      title: '删除项目',
      content: '确定删除该项目吗？',
      okText: '确认',
      cancelText: '取消',
      onOk: () => deleteItem(currentItem.id),
    });
  };

  const extraContent = (
    <div className={styles.extraContent}>
      <Search className={styles.extraContentSearch} placeholder="请输入" onSearch={() => ({})} />
    </div>
  );

  const handleDone = () => {
    setDone(false);
    setVisible(false);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleSubmit = (values: BasicListItemDataType) => {
    // const id = current ? current.id : '';
    // 有current 表示更新已有项目，没有则表示新添加项目
    const payload = current ? { ...values, id: current.id } : values;
    setDone(true);
    dispatch({
      type: 'adminAndproject/submitAndUpdate',
      payload,
    });
  };

  return (
    <div>
      <PageHeaderWrapper>
        <div className={styles.standardList}>
          <Card
            className={styles.listCard}
            bordered={false}
            title="所有项目"
            style={{ marginTop: 24 }}
            bodyStyle={{ padding: '0 32px 40px 32px' }}
            extra={extraContent}
          >
            <Button
              type="dashed"
              style={{ width: '100%', marginBottom: 8 }}
              onClick={showModal}
              ref={addBtn}
            >
              <PlusOutlined />
              添加
            </Button>

            <List
              size="large"
              rowKey="id"
              loading={loading}
              pagination={paginationProps}
              dataSource={list}
              renderItem={(item) => (
                <List.Item
                  actions={[
                    <a
                      key="edit"
                      onClick={(e) => {
                        e.preventDefault();
                        showEditModal(item);
                      }}
                    >
                      编辑
                    </a>,
                    <a
                      key="delete"
                      onClick={() => handleDelete(item)}
                    >
                      删除
                    </a>
                  ]}
                >
                  <List.Item.Meta
                    avatar={<Avatar src={item.cover} shape="square" size="large" style={{backgroundColor: item.cover}}>{item.title}</Avatar>}
                    title={<a href={item.href}>{item.title}</a>}
                    description={item.desc}
                  />
                  <ListContent data={item} />
                </List.Item>
              )}
            />
          </Card>
        </div>
      </PageHeaderWrapper>

      <OperationModal
        done={done}
        users={users}
        current={current}
        visible={visible}
        onDone={handleDone}
        onCancel={handleCancel}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default connect(
  ({
    adminAndproject,
    loading,
    user,
  }: {
    adminAndproject: StateType;
    loading: {
      models: { [key: string]: boolean };
    };
    user: ConnectState['user']
  }) => ({
    adminAndproject,
    currentUser: user.currentUser,
    loading: loading.models.adminAndproject,
  }),
)(Project);
