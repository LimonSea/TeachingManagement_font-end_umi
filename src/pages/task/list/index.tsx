import React, { FC, useEffect } from 'react';
import { Card, Input, List, Radio, Tag } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect, Dispatch, Link } from 'umi';
import moment from 'moment';
import { StateType } from './model';
import { TaskDetailDataType } from './data.d';
import styles from './style.less';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const { Search } = Input;
const PageSize = 10;
const statusNames = {
  'published': { color: 'volcano', name: '已发布' },
  'submitted': { color: 'green', name: '已提交' },
  'returned': { color: 'red', name: '需修正' },
  'revised': { color: 'blue', name: '已批改' },
}

interface BasicListProps {
  taskAndList: StateType;
  dispatch: Dispatch<any>;
  loading: boolean;
}

const ListContent = ({
  data: { deadline, usertask },
}: {
  data: TaskDetailDataType;
}) => (
  <div className={styles.listContent}>
    <div className={styles.listContentItem}>
      <span>截止时间 </span>
      <span>{moment(deadline).format('YYYY-MM-DD HH:mm')}</span>
    </div>
    <div className={styles.listContentItem}>
      <Tag color={statusNames[usertask.status].color}>{statusNames[usertask.status].name}</Tag>
    </div>
  </div>
);

export const BasicList: FC<BasicListProps> = (props) => {
  const {
    loading,
    dispatch,
    taskAndList: { list, totalCount },
  } = props;

  useEffect(() => {
    dispatch({
      type: 'taskAndList/fetchList',
      payload: {
        count: PageSize,
        currentPage: 1,
      },
    });
  }, []);

  const paginationProps = {
    showQuickJumper: true,
    pageSize: PageSize,
    total: totalCount,
    onChange: (page: number) => {
      dispatch({
        type: 'taskAndList/fetchList',
        payload: {
          count: PageSize,
          currentPage: page,
        },
      });
    }
  };

  const extraContent = (
    <div className={styles.extraContent}>
      <RadioGroup defaultValue="all">
        <RadioButton value="all">全部</RadioButton>
        <RadioButton value="progress">进行中</RadioButton>
        <RadioButton value="waiting">已结束</RadioButton>
      </RadioGroup>
      <Search className={styles.extraContentSearch} placeholder="请输入" onSearch={() => ({})} />
    </div>
  );

  return (
    <div>
      <PageHeaderWrapper>
        <div className={styles.standardList}>
          <Card
            className={styles.listCard}
            bordered={false}
            title="作业列表"
            style={{ marginTop: 24 }}
            bodyStyle={{ padding: '0 32px 40px 32px' }}
            extra={extraContent}
          >

            <List
              size="large"
              rowKey="id"
              loading={loading}
              pagination={paginationProps}
              dataSource={list}
              renderItem={(item) => (
                <List.Item
                  actions={[
                    <Link to={`/task/detail/${item.id}/${item.usertask.userId}`}>去查看</Link>
                  ]}
                >
                  <List.Item.Meta
                    title={<Link to={`/task/detail/${item.id}/${item.usertask.userId}`}>{item.title}</Link>}
                  />
                  <ListContent data={item} />
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
    taskAndList,
    loading,
  }: {
    taskAndList: StateType;
    loading: {
      models: { [key: string]: boolean };
    };
  }) => ({
    taskAndList,
    loading: loading.models.taskAndList,
  }),
)(BasicList);
