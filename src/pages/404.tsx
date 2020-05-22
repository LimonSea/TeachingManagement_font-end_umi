import { Button, Result } from 'antd';
import React from 'react';
import { Link } from 'umi';

const NoFoundPage: React.FC<{}> = () => (
  <Result
    status="404"
    title="404"
    subTitle="抱歉，此页面不存在。"
    extra={
      <Button type="primary">
        <Link to="/">去首页</Link>
      </Button>
    }
  />
);

export default NoFoundPage;
