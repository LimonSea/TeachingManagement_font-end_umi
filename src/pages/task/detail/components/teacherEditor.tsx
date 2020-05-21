import React, { FC, useEffect } from 'react';
import BraftEditor from 'braft-editor';
import { Form, Button, Rate } from 'antd';
import { UserTaskDataType } from '../data';
import styles from '../style.less';
import 'braft-editor/dist/index.css';

interface TeacherEditorProps {
  userTask: Partial<UserTaskDataType> | undefined;
  onSubmit: (values: UserTaskDataType) => void;
  loading: boolean;
}

const formLayout = {
  wrapperCol: { span: 24 },
};

const TeacherEditor: FC<TeacherEditorProps> = (props) => {
  const [form] = Form.useForm();
  const { userTask, onSubmit, loading } = props;

  useEffect(() => {
    if (form && userTask) {
      form.setFieldsValue({
        studentContent: BraftEditor.createEditorState(userTask.studentContent),
      });
    }
  }, [userTask]);

  const handleFinish = (values: { [key: string]: any }) => {
    if (onSubmit) {
      onSubmit({
        ...values,
        teacherContent: values.teacherContent.toHTML()
      } as UserTaskDataType );
    }
  };

  return (
    <Form {...formLayout} form={form} onFinish={handleFinish}>
      <Form.Item
        name="rate"
        rules={[{ required: true, message: '请打分' }]}
      >
        <Rate />
      </Form.Item>
      <Form.Item
        name="teacherContent"
        style={{ boxSizing: 'border-box' }}
        rules={[{ required: true, message: '请输入评语', }]}
      >
        <BraftEditor
          className={styles.editor}
          controls={
            ['bold', 'italic', 'underline', 'strike-through', 'code', 'media', 'emoji' ]
          }
          contentStyle={{height: 100}}
          placeholder="请输入评语"
        />
      </Form.Item>
      <Form.Item
        style={{
          marginTop: 24,
          marginRight: 0,
        }}
      >
        <Button type="primary" htmlType="submit" loading={loading}>
          提交
        </Button>
      </Form.Item>
    </Form>
  );
};

export default TeacherEditor;
