import React, { FC, useEffect } from 'react';
import { Card, Avatar, Space, Divider, List } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect, Dispatch, Link } from 'umi';
import moment from 'moment';
import { ConnectState } from '@/models/connect';
import { CurrentUser } from '@/models/user';
import { StateType } from './model';
import { UserTaskDataType } from './data';
import styles from './style.less';

interface TaskDetailProps {
  match: any;
  currentUser: CurrentUser;
  dispatch: Dispatch<any>;
  adminAndTaskOverview: StateType;
  loading: boolean;
  studentLoading: boolean;
  teacherLoading: boolean;
}

export const TaskDetail: FC<TaskDetailProps> = (props) => {
  const { match, dispatch, adminAndTaskOverview: { detail, submitted, notSubmitted }, loading } = props;

  useEffect(() => {
    dispatch({
      type: 'adminAndTaskOverview/fetchDetail',
      payload: {
        id: match.params.id,
      },
    });
  }, []);

  return (
    <div>
      <PageHeaderWrapper
        title={detail.title}
        extra={<span>截止时间： {moment(detail.deadline).format('YYYY-MM-DD HH:mm')}</span>}
        content={<div dangerouslySetInnerHTML={{__html: detail.content}} />}
      >
        <div className={styles.standardList}>
          <Card
            className={styles.listCard}
            bordered={false}
            style={{ marginTop: 16 }}
            bodyStyle={{ padding: '32px' }}
            loading={loading}
          >
            <Divider orientation="left">{`未完成(${notSubmitted.length})`}</Divider>
            <List
              grid={{
                column: 4,
                gutter: 16
              }}
              dataSource={notSubmitted}
              renderItem={item => (
                <List.Item>
                  <Link to={`/task/detail/${detail.id}/${item.id}`}>
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
            <Divider orientation="left">{`已完成(${submitted.length})`}</Divider>
            <List
              grid={{
                column: 4,
                gutter: 16
              }}
              dataSource={submitted}
              renderItem={item => (
                <List.Item>
                  <Link to={`/task/detail/${detail.id}/${item.id}`}>
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
    adminAndTaskOverview,
    loading,
    user,
  }: {
    adminAndTaskOverview: StateType;
    loading: {
      models: { [key: string]: boolean };
      effects: { [key: string]: boolean };
    };
    user: ConnectState['user']
  }) => ({
    adminAndTaskOverview,
    currentUser: user.currentUser,
    loading: loading.effects['adminAndTaskOverview/fetchDetail'],
  }),
)(TaskDetail);
