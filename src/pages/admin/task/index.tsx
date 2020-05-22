import React, { FC, useRef, useState, useEffect } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Card, Col, Input, List, Modal, Progress, Radio, Row, message } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect, Dispatch, Link } from 'umi';
import moment from 'moment';
import OperationModal from './components/OperationModal';
import { StateType } from './model';
import { BasicListItemDataType } from './data.d';
import styles from './style.less';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const { Search } = Input;
const PageSize = 10;

interface BasicListProps {
  adminAndtask: StateType;
  dispatch: Dispatch<any>;
  loading: boolean;
}

const ListContent = ({
  data: { deadline, percent },
}: {
  data: BasicListItemDataType;
}) => (
  <div className={styles.listContent}>
    <div className={styles.listContentItem}>
      <span>截止时间 </span>
      <span>{moment(deadline).format('YYYY-MM-DD HH:mm')}</span>
    </div>
    <div className={styles.listContentItem}>
      <Progress percent={percent} strokeWidth={6} style={{ width: 180 }} />
    </div>
  </div>
);

export const BasicList: FC<BasicListProps> = (props) => {
  const addBtn = useRef(null);
  const {
    loading,
    dispatch,
    adminAndtask: { list, users, totalCount },
  } = props;
  const [visible, setVisible] = useState<boolean>(false);
  const [current, setCurrent] = useState<Partial<BasicListItemDataType> | undefined>(undefined);

  useEffect(() => {
    dispatch({
      type: 'adminAndtask/fetchList',
      payload: {
        count: PageSize,
        currentPage: 1,
      },
    });
    dispatch({
      type: 'adminAndtask/fetchMember',
    })
  }, []);

  const paginationProps = {
    showQuickJumper: true,
    pageSize: PageSize,
    total: totalCount,
    onChange: (page: number) => {
      dispatch({
        type: 'adminAndtask/fetchList',
        payload: {
          count: PageSize,
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
      type: 'adminAndtask/delete',
      payload: { id },
    });
  };

  const handleDelete = (currentItem: BasicListItemDataType) => {
    Modal.confirm({
      title: '删除作业',
      content: '确定删除该作业吗？',
      okText: '确认',
      cancelText: '取消',
      onOk: () => deleteItem(currentItem.id),
    });
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

  const handleCancel = () => {
    setVisible(false);
  };

  const handleSubmit = (values: BasicListItemDataType) => {
    dispatch({
      type: 'adminAndtask/submitAndUpdate',
      payload: current ? { id: current.id, ...values } : values,
    });
    setVisible(false);
  };

  return (
    <div>
      <PageHeaderWrapper>
        <div className={styles.standardList}>
          {/* <Card bordered={false}>
            <Row>
              <Col sm={8} xs={24}>
                <Info title="待批改" value="8个作业" bordered />
              </Col>
              <Col sm={8} xs={24}>
                <Info title="本周任务平均处理时间" value="32分钟" bordered />
              </Col>
              <Col sm={8} xs={24}>
                <Info title="本周完成任务数" value="24个任务" />
              </Col>
            </Row>
          </Card> */}

          <Card
            className={styles.listCard}
            bordered={false}
            title="作业列表"
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
                    title={<Link to={`/admin/taskoverview/${item.id}`}>{item.title}</Link>}
                  />
                  <ListContent data={item} />
                </List.Item>
              )}
            />
          </Card>
        </div>
      </PageHeaderWrapper>

      <OperationModal
        current={current}
        visible={visible}
        users={users}
        onCancel={handleCancel}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default connect(
  ({
    adminAndtask,
    loading,
  }: {
    adminAndtask: StateType;
    loading: {
      models: { [key: string]: boolean };
    };
  }) => ({
    adminAndtask,
    loading: loading.models.adminAndtask,
  }),
)(BasicList);
