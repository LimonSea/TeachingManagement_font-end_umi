import { UploadOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Input, Upload, Form, Avatar } from 'antd';
import { connect } from 'umi';
import React, { Component } from 'react';
import { CurrentUser } from '../data.d';
import styles from './BaseView.less';

const getBase64 = (img: any, callback: any) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

interface BaseViewProps {
  currentUser?: CurrentUser;
  onfinish: any;
}

interface updateBaseInfoValues {
  mail: string;
  mobile: string;
  name: string;
  signature: string;
}

class BaseView extends Component<BaseViewProps> {
  view: HTMLDivElement | undefined = undefined;

  state: {avatar: string, dbavatar: string} = {
    avatar: this.props.currentUser?.avatar || '', // 展示的头像地址
    dbavatar: '', // 存储到数据库的头像地址
  }

  handleChange = (info: any) => {
    if (info.file.status === 'done') {
      getBase64(info.file.originFileObj, (imageUrl: any) => {
        this.setState({
          avatar: imageUrl,
          dbavatar: info.file.response.name,
        })
      })
    }
  }

  getViewDom = (ref: HTMLDivElement) => {
    this.view = ref;
  };

  handleFinish = (values: updateBaseInfoValues) => {
    if (this.state.dbavatar) this.props.onfinish({...values, avatar: this.state.dbavatar});
    else this.props.onfinish({...values});
  };

  render() {
    const { currentUser } = this.props;
    return (
      <div className={styles.baseView} ref={this.getViewDom}>
        <div className={styles.left}>
          <Form
            layout="vertical"
            onFinish={this.handleFinish}
            initialValues={currentUser}
            hideRequiredMark
          >
            <Form.Item
              name="mail"
              label="邮箱"
              rules={[
                {
                  required: true,
                  message: '请输入您的邮箱!',
                },
              ]}
            >
              <Input disabled/>
            </Form.Item>
            <Form.Item
              name="name"
              label="昵称"
              rules={[
                {
                  required: true,
                  message: '请输入您的昵称!',
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="signature"
              label="个人简介"
              rules={[
                {
                  required: true,
                  message: '请输入个人简介!',
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="mobile"
              label="联系电话"
              rules={[
                {
                  required: true,
                  message: '请输入您的联系电话!',
                },
              ]}
            >
              <Input disabled/>
            </Form.Item>
            <Form.Item>
              <Button htmlType="submit" type="primary">
                更新基本信息
              </Button>
            </Form.Item>
          </Form>
        </div>
        <div className={styles.right}>
          <div className={styles.avatar_title}>头像</div>
          <div className={styles.avatar}>
            <img src={this.state.avatar} alt="默认头像" />
          </div>
          <Upload
            accept='.jpg,.png,.jpeg'
            action='/server/upload'
            data={{type: 'avatar'}}
            onChange={this.handleChange}
            showUploadList={false}
          >
            <div className={styles.button_view}>
              <Button>
                <UploadOutlined />
                更换头像
              </Button>
            </div>
          </Upload>
        </div>
      </div>
    );
  }
}

export default connect(
  ({
    accountAndsettings,
  }: {
    accountAndsettings: {
      currentUser: CurrentUser;
    };
  }) => ({
    currentUser: accountAndsettings.currentUser,
  }),
)(BaseView);
