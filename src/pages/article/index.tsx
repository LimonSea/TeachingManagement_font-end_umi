import { Button, Card, Form, Avatar, Space, Divider, Row, Col } from 'antd';
import { connect, Dispatch, Link } from 'umi';
import BraftEditor from 'braft-editor';
import React, { FC, useEffect } from 'react';
import _ from 'lodash';
import 'braft-editor/dist/index.css';
import { UserOutlined } from '@ant-design/icons';
import moment from 'moment';
import { ConnectState } from '@/models/connect';
import { CurrentUser } from '@/models/user';
import styles from './style.less';
import { ModalState } from './model';

const FormItem = Form.Item;
interface ArticleProps {
  submitting: boolean;
  dispatch: Dispatch<any>;
  article: any;
  match: any;
  currentUser?: CurrentUser;
}

const Article: FC<ArticleProps> = (props) => {
  const { submitting, dispatch, match, article, currentUser } = props;
  const [form] = Form.useForm();

  useEffect(() => {
    if (dispatch) {
      dispatch({
        type: 'articleDetail/showArticle',
        payload: {
          id: match.params.id
        }
      });
    }
  }, []);

  // 当文章评论变化时(评论成功后) 清空输入框
  useEffect(() => {
    form.setFieldsValue({content: BraftEditor.createEditorState(null)});
  }, [article.commentsCount]);

  const onFinish = (values: { [key: string]: any }) => {
    dispatch({
      type: 'articleDetail/submitComment',
      payload: {
        content: values.content.toHTML(),
        associateId: article.id,
        associateType: 'article'
      },
    });
  };

  return (
    <>
      {/* 文章 */}
      <Card
        bordered={false}
        title={article.title}
        headStyle={{fontSize: 24}}
        bodyStyle={{fontSize: 16, marginBottom: 24}}
      >
        <Space style={{display: 'flex', marginBottom: 24}}>
          <Avatar src={article.user?.avatar}>{article.user?.name}</Avatar>
          <Link to={`/account/center/${article.authorId}`}>{article.user?.name}</Link>发布于
          <Link to={`/group/center/${article.groupId}`}>{article.user?.group?.name}</Link>
          {moment(article.updatedAt).format('YYYY-MM-DD HH:mm')}
        </Space>
        <Divider style={{marginBottom: 24}}/>
        <div dangerouslySetInnerHTML={{__html: article.content}} />
      </Card>
      {/* 评论 */}
      <Card bordered={false}>
        {
          currentUser && currentUser.avatar ?
          <Form
            hideRequiredMark
            layout="inline"
            colon={false}
            style={{
              margin: '8px 0 24px 0',
            }}
            form={form}
            onFinish={onFinish}
          >
            <FormItem
              name="content"
              label={<Avatar src={currentUser.avatar} icon={<UserOutlined/>}/>}
              style={{
                width: '90%',
                marginRight: 0,
                paddingRight: 16,
                boxSizing: 'border-box'
              }}
              rules={[
                {
                  required: true,
                  message: '请输入评论内容',
                },
              ]}
            >
              <BraftEditor
                className={styles.editor}
                controls={
                  ['underline', 'strike-through', 'emoji', 'code']
                }
                contentStyle={{height: 100}}
                placeholder="说两句"
              />
            </FormItem>
            <FormItem
              style={{
                marginTop: 24,
                marginRight: 0,
              }}
            >
              <Button type="primary" htmlType="submit" loading={submitting}>
                评论
              </Button>
            </FormItem>
          </Form> :
          <div className={styles.loginBtn}>
            <Link to={`/user/login?redirect=${window.location.href}`}>
              <Button size="large">登录后才能评论哟</Button>
            </Link>
          </div>
        }
        <Divider orientation="right">评论 {article.commentsCount}</Divider>
        {
          _.map(article.comments, (item, index) => {
            return (
              <>
                {
                  index ? <Divider/> : null
                }
                <Row gutter={16}>
                  <Col>
                    <Avatar src={item.avatar}>{item.owner}</Avatar>
                  </Col>
                  <Col>
                    <Space>
                      <Link to={`/account/center/${item.authorId}`}>{item.owner}</Link>
                      {moment(item.updatedAt).format('YYYY-MM-DD HH:mm')}
                    </Space>
                    <div dangerouslySetInnerHTML={{__html: item.content}} />
                  </Col>
                </Row>
              </>
            )
          })
        }
      </Card>
      </>
  );
};

export default connect(
  ({
    articleDetail,
    loading,
    user,
  }: {
    user: ConnectState['user'],
    articleDetail: ModalState,
    loading: { effects: { [key: string]: boolean } }
  }) => ({
    article: articleDetail.article,
    submitting: loading.effects['articleDetail/submitComment'],
    currentUser: user.currentUser,
}))(Article);
