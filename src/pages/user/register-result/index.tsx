import { Button, Result } from 'antd';
import get from 'lodash/get';
import { Link } from 'umi';
import React from 'react';
import { RouteChildrenProps } from 'react-router';
import styles from './style.less';

const actions = (
  <div className={styles.actions}>
    <a href="">
      <Button size="large" type="primary">
        查看邮箱
      </Button>
    </a>
    <Link to="/user/login">
      <Button size="large">去登录</Button>
    </Link>
  </div>
);

const RegisterResult: React.FC<RouteChildrenProps> = ({ location }) => (
  <Result
    className={styles.registerResult}
    status="success"
    title={<div className={styles.title}>你的账户：{get(location, 'state.account')} 注册成功</div>}
    subTitle="激活邮件已发送到你的邮箱中，邮件有效期为24小时。请及时登录邮箱，点击邮件中的链接激活帐户。"
    extra={actions}
  />
);

export default RegisterResult;
