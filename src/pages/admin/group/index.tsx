import React, { FC, useEffect } from 'react';
import { Card, Avatar, Divider, List, Input, message } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect, Dispatch, Link } from 'umi';
import { ConnectState } from '@/models/connect';
import { CurrentUser } from '@/models/user';
import { StateType } from './model';
import styles from './style.less';

interface TaskDetailProps {
  currentUser: CurrentUser;
  dispatch: Dispatch<any>;
  adminAndGroup: StateType;
  loading: boolean;
  studentLoading: boolean;
  teacherLoading: boolean;
}

export const TaskDetail: FC<TaskDetailProps> = (props) => {
  const { dispatch, adminAndGroup: { detail, members }, loading } = props;

  useEffect(() => {
    dispatch({
      type: 'adminAndGroup/fetchDetail',
    });
  }, []);

  const handleSearch = (value: string) => {
    dispatch({
      type: 'adminAndGroup/addMember',
      payload: { id: value },
    })
  }

  return (
    <div>
      <PageHeaderWrapper
        title={detail.name}
        // content='暂无描述'
        extra={
          <Input.Search
            placeholder="请输入用户id"
            enterButton="添加成员"
            onSearch={handleSearch}
          />
        }
      >
        <div className={styles.standardList}>
          <Card
            className={styles.listCard}
            bordered={false}
            style={{ marginTop: 16 }}
            bodyStyle={{ padding: '32px' }}
            loading={loading}
          >
            <Divider orientation="left">{`成员(${members.length})`}</Divider>
            <List
              grid={{
                column: 4,
                gutter: 16
              }}
              dataSource={members}
              renderItem={item => (
                <List.Item>
                  <Link to={`/account/center/${item.id}`}>
                    <Card hoverable>
                      <Card.Meta
                        avatar={<Avatar src={item.avatar}>{item.id}</Avatar>}
                        title={item.name}
                      />
                    </Card>
                  </Link>
                </List.Item>
              )}
            />
          </Card>
        </div>
      </PageHeaderWrapper>
    </div>
  );
};

export default connect(
  ({
    adminAndGroup,
    loading,
    user,
  }: {
    adminAndGroup: StateType;
    loading: {
      models: { [key: string]: boolean };
      effects: { [key: string]: boolean };
    };
    user: ConnectState['user']
  }) => ({
    adminAndGroup,
    currentUser: user.currentUser,
    loading: loading.effects['adminAndGroup/fetchDetail'],
  }),
)(TaskDetail);
