import React, { FC, useEffect } from 'react';
import { Card, Input, List, Radio, Tag } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect, Dispatch, Link } from 'umi';
import moment from 'moment';
import { ConnectState } from '@/models/connect';
import { CurrentUser } from '@/models/user';
import { StateType } from './model';
import { BasicListItemDataType } from './data.d';
import styles from './style.less';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const { Search } = Input;

interface BasicListProps {
  taskAnddetail: StateType;
  dispatch: Dispatch<any>;
  loading: boolean;
  match: any;
  currentUser: CurrentUser;
}

export const BasicList: FC<BasicListProps> = (props) => {
  const { loading, dispatch, match, taskAnddetail: { detail }, currentUser } = props;

  useEffect(() => {
    dispatch({
      type: 'taskAnddetail/fetchDetail',
      payload: {
        id: match.params.id,
        userId: match.params.userId,
      },
    });
  }, []);

  return (
    <div>
      <PageHeaderWrapper>
        <div className={styles.standardList}>
          <Card
            className={styles.listCard}
            bordered={false}
            title={detail.title}
            style={{ marginTop: 16 }}
            bodyStyle={{ padding: '0 32px 32px 32px' }}
            loading={loading}
            extra={<span>截止时间： {moment(detail.deadline).format('YYYY-MM-DD HH:mm')}</span>}
          >
            <div dangerouslySetInnerHTML={{__html: detail.content}} />
          </Card>
          <Card
            className={styles.listCard}
            bordered={false}
            style={{ marginTop: 16 }}
            bodyStyle={{ padding: '32px' }}
            loading={loading}
          >
            {
              currentUser.currentAuthority === 'user' && detail.usertask?.status === 'published' ?
              <div>编辑器</div> : <div dangerouslySetInnerHTML={{__html: detail.usertask?.submitContent || '<p>学生暂未作答</p>'}} />
            }
          </Card>
          <Card
            className={styles.listCard}
            bordered={false}
            style={{ marginTop: 16 }}
            bodyStyle={{ padding: '32px' }}
            loading={loading}
          >
            {
              currentUser.currentAuthority === 'admin' && detail.usertask?.status === ('returned' || 'revised') ?
              <div>编辑器</div> : <div dangerouslySetInnerHTML={{__html: detail.usertask?.submitContent || '<p>教师暂未批改</p>'}} />
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
    };
    user: ConnectState['user']
  }) => ({
    taskAnddetail,
    currentUser: user.currentUser,
    loading: loading.models.taskAnddetail,
  }),
)(BasicList);
