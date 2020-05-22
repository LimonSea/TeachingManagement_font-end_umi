import React, { FC, useEffect } from 'react';
import { Form, Input, Select, Modal } from 'antd';
import { CardListItemDataType, typeNames } from '../data.d';

interface OperationModalProps {
  visible: boolean;
  current: Partial<CardListItemDataType> | undefined;
  onSubmit: (values: CardListItemDataType) => void;
  onCancel: () => void;
}

const formLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 },
};

const OperationModal: FC<OperationModalProps> = (props) => {
  const [form] = Form.useForm();
  const { visible, current, onCancel, onSubmit } = props;

  useEffect(() => {
    if (form && !visible) {
      form.resetFields();
    }
    if (form && visible && current) {
      form.setFieldsValue(current);
    }
  }, [props.visible]);

  const handleSubmit = () => {
    if (!form) return;
    form.submit();
  };

  const handleFinish = (values: { [key: string]: any }) => {
    if (onSubmit) {
      onSubmit(values as CardListItemDataType );
    }
  };

  const getModalContent = () => {
    return (
      <Form {...formLayout} form={form} onFinish={handleFinish}>
        <Form.Item
          name="title"
          label="名称"
          rules={[{ required: true, message: '请输入资源名称' }]}
        >
          <Input placeholder="请输入" />
        </Form.Item>
        <Form.Item
          name="desc"
          label="描述"
          rules={[{ required: true, message: '请输入资源描述' }]}
        >
          <Input placeholder="请输入" />
        </Form.Item>
        <Form.Item
          name="cover"
          label="头像网址"
          rules={[{ required: true, message: '请输入图片的网络地址' }]}
        >
          <Input placeholder="请输入" />
        </Form.Item>
        <Form.Item
          name="href"
          label="网址"
          rules={[{ required: true, message: '请输入网址' }]}
        >
          <Input placeholder="请输入" />
        </Form.Item>
        <Form.Item
          name="type"
          label="类别"
          rules={[{ required: true, message: '请选择类别' }]}
        >
          <Select placeholder="请选择">
            {
              Object.keys(typeNames).map(key => (
                <Select.Option value={key}>{typeNames[key]}</Select.Option>
              ))
            }
          </Select>
        </Form.Item>
      </Form>
    );
  };

  return (
    <Modal
      title={`资源${current ? '编辑' : '添加'}`}
      width={720}
      destroyOnClose
      visible={visible}
      onCancel={onCancel}
      onOk={handleSubmit}
      okText='提交'
      cancelText='取消'
    >
      {getModalContent()}
    </Modal>
  );
};

export default OperationModal;
