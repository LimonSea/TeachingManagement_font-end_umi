import { EditOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { history } from 'umi';
import { ClickParam } from 'antd/es/menu';
import React from 'react';
import classNames from 'classnames';
import HeaderDropdown from '../HeaderDropdown';
import styles from './index.less';

interface SelectWritingProps {
  className?: string;
}

const SelectWriting: React.FC<SelectWritingProps> = (props) => {
  const { className } = props;
  const menus = [
    {
      key: 'article',
      name: '写文章',
    }
  ];

  const onMenuClick = (event: ClickParam) => {
    const { key } = event;
    history.push(`/writing/${key}`);
  };

  const dropdownMenu = (
    <Menu className={styles.menu} onClick={onMenuClick}>
      {
        menus.map((item) => (
          <Menu.Item key={item.key}>
            {item.name}
          </Menu.Item>
        ))
      }
    </Menu>
  )
  return (
    <HeaderDropdown overlay={dropdownMenu} placement="bottomRight">
      <span className={classNames(styles.dropDown, className)}>
        <EditOutlined title="写作" />
      </span>
    </HeaderDropdown>
  );
};

export default SelectWriting;
