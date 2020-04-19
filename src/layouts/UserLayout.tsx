import { DefaultFooter, MenuDataItem, getMenuData, getPageTitle } from '@ant-design/pro-layout';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Link, useIntl, ConnectProps, connect } from 'umi';
import React from 'react';
import SelectLang from '@/components/SelectLang';
import { ConnectState } from '@/models/connect';
import logo from '../assets/logo.svg';
import styles from './UserLayout.less';

export interface UserLayoutProps extends Partial<ConnectProps> {
  breadcrumbNameMap: {
    [path: string]: MenuDataItem;
  };
}

const UserLayout: React.FC<UserLayoutProps> = (props) => {
  const {
    route = {
      routes: [],
    },
  } = props;
  const { routes = [] } = route;
  const {
    children,
    location = {
      pathname: '',
    },
  } = props;

  const { breadcrumb } = getMenuData(routes);
  const title = getPageTitle({
    pathname: location.pathname,
    breadcrumb,
    ...props,
  });
  return (
    <HelmetProvider>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={title} />
      </Helmet>

      <div className={styles.container}>
        <div className={styles.lang}>
          <SelectLang />
        </div>
        <div className={styles.content}>
          <div className={styles.top}>
            <div className={styles.header}>
              <Link to="/">
                <img alt="logo" className={styles.logo} src={logo} />
                <span className={styles.title}>猎风</span>
              </Link>
            </div>
            <div className={styles.desc}>猎风工作室教学管理平台</div>
          </div>
          {children}
        </div>
        <DefaultFooter
          copyright="2020 猎风工作室"
          links={[
            {
              key: 'Powered by Ant Design Pro',
              title: 'Powered by Ant Design Pro',
              href: 'https://pro.ant.design',
              blankTarget: true,
            },
          ]}
        />
      </div>
    </HelmetProvider>
  );
};

export default connect(({ settings }: ConnectState) => ({ ...settings }))(UserLayout);
