import React, { FC, useEffect } from 'react';
import { Card, Avatar, Space, Divider } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect, Dispatch, Link } from 'umi';
import moment from 'moment';
import { ConnectState } from '@/models/connect';
import { CurrentUser } from '@/models/user';
import StudentEditor from './components/studentEditor';
import TeacherEditor from './components/teacherEditor';
import { StateType } from './model';
import { UserTaskDataType } from './data';
import styles from './style.less';

interface TaskDetailProps {
  match: any;
  currentUser: CurrentUser;
  dispatch: Dispatch<any>;
  taskAnddetail: StateType;
  loading: boolean;
  studentLoading: boolean;
  teacherLoading: boolean;
}

export const TaskDetail: FC<TaskDetailProps> = (props) => {
  const { match, dispatch, currentUser, taskAnddetail: { detail, user, publisher }, loading, studentLoading, teacherLoading } = props;

  useEffect(() => {
    dispatch({
      type: 'taskAnddetail/fetchDetail',
      payload: {
        id: match.params.id,
        userId: match.params.userId,
      },
    });
  }, []);

  const studentSubmit = (values: UserTaskDataType) => {
    dispatch({
      type: 'taskAnddetail/studentSubmit',
      payload: {
        ...values,
        id: detail.id,
      },
    });
  }

  const teacherSubmit = (values: UserTaskDataType) => {
    dispatch({
      type: 'taskAnddetail/teacherSubmit',
      payload: {
        ...values,
        id: detail.id,
        userId: user.id,
      },
    });
  }

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
            bodyStyle={{ padding: '0 32px 32px' }}
            title={
              <Space>
                <Avatar src={user.avatar}>{user.name}</Avatar>
                <Link to={`/account/center/${user.id}`}>{user.name}</Link>
              </Space>
            }
            extra='—— 学生答案'
          >
            {
              // 是本人，没提交
              currentUser.id === user.id && detail.usertask?.status === 'published' ?
                <StudentEditor
                  userTask={detail.usertask}
                  onSubmit={studentSubmit}
                  loading={studentLoading}
                /> :
                <div dangerouslySetInnerHTML={{__html: detail.usertask?.studentContent || '<p>学生暂未作答</p>'}} />

            }
          </Card>
          <Card
            className={styles.listCard}
            bordered={false}
            style={{ marginTop: 16 }}
            bodyStyle={{ padding: '0 32px 32px' }}
            title={
              <Space>
                <Avatar src={publisher.avatar}>{publisher.name}</Avatar>
                <Link to={`/account/center/${publisher.id}`}>{publisher.name}</Link>
              </Space>
            }
            extra='—— 教师评语'
          >
            {
              // 是发布者本人，学生已提交
              currentUser.id === publisher.id && detail.usertask?.status === 'submitted' ?
                <TeacherEditor
                  userTask={detail.usertask}
                  onSubmit={teacherSubmit}
                  loading={teacherLoading}
                /> :
                <div dangerouslySetInnerHTML={{__html: detail.usertask?.teacherContent || '<p>教师暂未批改</p>'}} />
            }
          </Card>

        </div>
      </PageHeaderWrapper>
    </div>
  );
};

export default connect(
  ({
    taskAnddetail,
    loading,
    user,
  }: {
    taskAnddetail: StateType;
    loading: {
      models: { [key: string]: boolean };
      effects: { [key: string]: boolean };
    };
    user: ConnectState['user']
  }) => ({
    taskAnddetail,
    currentUser: user.currentUser,
    loading: loading.effects['taskAnddetail/fetchDetail'],
    studentLoading: loading.effects['taskAnddetail/studentSubmit'],
    teacherLoading: loading.effects['taskAnddetail/teacherSubmit'],
  }),
)(TaskDetail);
