import React, { FC, useEffect } from 'react';
import BraftEditor from 'braft-editor';
import { Form, Button } from 'antd';
import { UserTaskDataType } from '../data';
import styles from '../style.less';
import 'braft-editor/dist/index.css';

interface StudentEditorProps {
  userTask: Partial<UserTaskDataType> | undefined;
  onSubmit: (values: UserTaskDataType) => void;
  loading: boolean;
}

const formLayout = {
  wrapperCol: { span: 24 },
};

const StudentEditor: FC<StudentEditorProps> = (props) => {
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
        studentContent: values.studentContent.toHTML()
      } as UserTaskDataType );
    }
  };

  return (
    <Form {...formLayout} form={form} onFinish={handleFinish}>
      <Form.Item
        name="studentContent"
        style={{ boxSizing: 'border-box' }}
        rules={[{ required: true, message: '请输入作业内容', }]}
      >
        <BraftEditor
          className={styles.editor}
          // controls={
          //   ['bold', 'italic', 'underline', 'strike-through', 'code', 'media', 'emoji' ]
          // }
          contentStyle={{height: 400}}
          placeholder="作业内容"
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

export default StudentEditor;
