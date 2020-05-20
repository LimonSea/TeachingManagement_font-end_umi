import React, { FC, useEffect } from 'react';
import BraftEditor from 'braft-editor';
import moment from 'moment';
import { Button, Form, DatePicker, Input, Select, Drawer } from 'antd';
import { BasicListItemDataType, Member } from '../data.d';
import styles from '../style.less';
import 'braft-editor/dist/index.css';

interface OperationModalProps {
  visible: boolean;
  users: Member[];
  current: Partial<BasicListItemDataType> | undefined;
  onSubmit: (values: BasicListItemDataType) => void;
  onCancel: () => void;
}

const formLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 },
};

const OperationModal: FC<OperationModalProps> = (props) => {
  const [form] = Form.useForm();
  const { visible, current, users, onCancel, onSubmit } = props;

  useEffect(() => {
    if (form && !visible) {
      form.resetFields();
    }
    if (form && visible && current) {
      form.setFieldsValue({
        ...current,
        content: BraftEditor.createEditorState(current.content),
        deadline: current.deadline ? moment(current.deadline) : null,
        users: current.users?.map(item => {return item.id || item}) || [],
      });

    }
  }, [props.visible]);

  const handleSubmit = () => {
    if (!form) return;
    form.submit();
  };

  const handleFinish = (values: { [key: string]: any }) => {
    if (onSubmit) {
      onSubmit({
        ...values,
        content: values.content.toHTML()
      } as BasicListItemDataType );
    }
  };

  const getModalContent = () => {
    return (
      <Form {...formLayout} form={form} onFinish={handleFinish}>
        <Form.Item
          name="title"
          label="作业名称"
          rules={[{ required: true, message: '请输入作业名称' }]}
        >
          <Input placeholder="请输入" />
        </Form.Item>
        <Form.Item
          name="content"
          label="内容"
          style={{ boxSizing: 'border-box' }}
          rules={[{ required: true, message: '请输入作业内容', }]}
        >
          <BraftEditor
            className={styles.editor}
            controls={
              ['bold', 'italic', 'underline', 'strike-through', 'code', 'media', 'emoji' ]
            }
            contentStyle={{height: 300}}
            placeholder="作业内容"
          />
        </Form.Item>
        <Form.Item
          name="users"
          label="发给谁"
          rules={[{ required: true, message: '请选择成员' }]}
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
          name="deadline"
          label="截止时间"
          rules={[{ required: true, message: '请选择截止时间' }]}
        >
          <DatePicker
            showTime
            placeholder="请选择"
            format="YYYY-MM-DD HH:mm:ss"
            style={{ width: '100%' }}
          />
        </Form.Item>
      </Form>
    );
  };

  return (
    <Drawer
      title={`作业${current ? '编辑' : '添加'}`}
      width={720}
      destroyOnClose
      visible={visible}
      onClose={onCancel}
      footer={
        <div style={{ textAlign: 'right' }}>
          <Button onClick={onCancel} style={{ marginRight: 8 }}>取消</Button>
          <Button onClick={handleSubmit} type="primary">发布</Button>
        </div>
      }
    >
      {getModalContent()}
    </Drawer>
  );
};

export default OperationModal;
