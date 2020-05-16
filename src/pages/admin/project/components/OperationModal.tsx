import React, { FC, useEffect } from 'react';
import moment from 'moment';
import { Modal, Result, Button, Form, DatePicker, Input, Select, Radio } from 'antd';
import { BasicListItemDataType, Member } from '../data.d';
import styles from '../style.less';

interface OperationModalProps {
  done: boolean;
  visible: boolean;
  current: Partial<BasicListItemDataType> | undefined;
  users: Member[];
  onDone: () => void;
  onSubmit: (values: BasicListItemDataType) => void;
  onCancel: () => void;
}

const colorList = ['#f05654', '#ffc64b', '#eaff56', '#bddd22', '#7bcfa6', '#177cb0', '#8d4bbb' ];
const { TextArea } = Input;
const formLayout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 13 },
};

const OperationModal: FC<OperationModalProps> = (props) => {
  const [form] = Form.useForm();
  const { done, visible, current, users, onDone, onCancel, onSubmit } = props;

  useEffect(() => {
    if (form && !visible) {
      form.resetFields();
    }
    if (form && visible && current) {
      form.setFieldsValue({
        ...current,
        users: current.users?.map(item => item.id) || [],
        createdAt: current.createdAt ? moment(current.createdAt) : null,
      });
    }
  }, [props.visible]);

  // 表单提交
  const handleFinish = (values: { [key: string]: any }) => {
    if (onSubmit) {
      onSubmit(values as BasicListItemDataType);
    }
  };

  const modalFooter = done
    ? { footer: null, onCancel: onDone }
    : { okText: '保存', cancelText: '取消', onOk: () => form.submit(), onCancel };

  const getModalContent = () => {
    if (done) {
      return (
        <Result
          status="success"
          title="操作成功"
          extra={
            <Button type="primary" onClick={onDone}>
              知道了
            </Button>
          }
          className={styles.formResult}
        />
      );
    }
    return (
      <Form {...formLayout} form={form} onFinish={handleFinish}>
        <Form.Item
          name="title"
          label="项目名称"
          rules={[{ required: true, message: '请输入项目名称' }]}
        >
          <Input placeholder="请输入" />
        </Form.Item>
        <Form.Item
          name="cover"
          label="项目代表色"
          rules={[{ required: true, message: '请选择一个颜色' }]}
        >
          <Radio.Group>
            {
              colorList.map((item) => {
                return (
                  <Radio value={item} key={item}>
                    <div style={{width:16, height:16, backgroundColor:item, display: 'inline-block', borderRadius: 2}}/>
                  </Radio>
                )
              })
            }
          </Radio.Group>
        </Form.Item>
        <Form.Item
          name="createdAt"
          label="开始时间"
          rules={[{ required: true, message: '请选择开始时间' }]}
        >
          <DatePicker
            showTime
            placeholder="请选择"
            format="YYYY-MM-DD HH:mm:ss"
            style={{ width: '100%' }}
          />
        </Form.Item>
        <Form.Item
          name="users"
          label="项目组成员"
          rules={[{ required: true, message: '请选择项目组成员' }]}
        >
          <Select mode="multiple" placeholder="请选择">
            {
              users?.map((item) => {
                return (
                  <Select.Option value={item.id} key={item.id}>{item.name}</Select.Option>
                )
              })
            }
          </Select>
        </Form.Item>
        <Form.Item
          name="desc"
          label="项目描述"
          rules={[{ required: true, message: '请输入至少五个字符的项目描述！', min: 5 }]}
        >
          <TextArea rows={3} placeholder="请输入至少五个字符" />
        </Form.Item>
        <Form.Item
          name="github"
          label="github地址"
          rules={[{ required: true, message: '请输入github地址' }]}
        >
          <Input placeholder="请输入" />
        </Form.Item>
        <Form.Item
          name="status"
          label="状态"
          rules={[{ required: true, message: '请选择项目状态' }]}
        >
          <Select placeholder="请选择">
            <Select.Option value="normal">待启动</Select.Option>
            <Select.Option value="started">已启动</Select.Option>
            <Select.Option value="finished">已结束</Select.Option>
          </Select>
        </Form.Item>
      </Form>
    );
  };

  return (
    <Modal
      title={done ? null : `项目${current ? '编辑' : '添加'}`}
      className={styles.standardListForm}
      width={640}
      bodyStyle={done ? { padding: '72px 0' } : { padding: '28px 0 0' }}
      destroyOnClose
      visible={visible}
      {...modalFooter}
    >
      {getModalContent()}
    </Modal>
  );
};

export default OperationModal;
