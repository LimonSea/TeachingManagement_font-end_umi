import { Button, Card, Input, Form } from 'antd';
import { connect, Dispatch } from 'umi';
import React, { FC } from 'react';
import BraftEditor from 'braft-editor';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import 'braft-editor/dist/index.css';
import styles from './style.less';

const FormItem = Form.Item;
interface BasicFormProps {
  submitting: boolean;
  dispatch: Dispatch<any>;
}

const BasicForm: FC<BasicFormProps> = (props) => {
  const { submitting } = props;
  const [form] = Form.useForm();
  const formItemLayout = {
    labelCol: {
      xs: {
        span: 6,
      },
      sm: {
        span: 3,
      },
    },
    wrapperCol: {
      xs: {
        span: 10,
      },
      sm: {
        span: 19,
      },
      md: {
        span: 19,
      },
    },
  };
  const submitFormLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 10,
        offset: 7,
      },
    },
  };

  const onFinish = (values: { [key: string]: any }) => {
    const { dispatch } = props;
    dispatch({
      type: 'articleForm/submitForm',
      payload: {
        title: values.title,
        content: values.content.toHTML(),
        desc: values.content.toText().slice(0, 140),
      },
    });
  };

  return (
    <PageHeaderWrapper>
      <Card bordered={false}>
        <Form
          hideRequiredMark
          colon={false}
          style={{
            marginTop: 8,
          }}
          form={form}
          name="article"
          initialValues={{
            public: '1',
          }}
          onFinish={onFinish}
        >
          <FormItem
            {...formItemLayout}
            label="文章标题"
            name="title"
            rules={[
              {
                required: true,
                message: '请输入文章标题',
              },
            ]}
          >
            <Input placeholder="给文章起个名字" />
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="文章正文"
            name="content"
            rules={[
              {
                required: true,
                message: '请输入正文内容',
              },
            ]}
          >
            <BraftEditor
              className={styles.editor}
              placeholder="请输入正文内容"
            />
          </FormItem>
          <FormItem
            {...submitFormLayout}
            style={{
              marginTop: 32,
            }}
          >
            <Button type="primary" htmlType="submit" loading={submitting}>
              发布
            </Button>
            {/* <Button
              style={{
                marginLeft: 8,
              }}
            >
              保存
            </Button> */}
          </FormItem>
        </Form>
      </Card>
    </PageHeaderWrapper>


  );
};

export default connect(({ loading }: { loading: { effects: { [key: string]: boolean } } }) => ({
  submitting: loading.effects['articleForm/submitForm'],
}))(BasicForm);
