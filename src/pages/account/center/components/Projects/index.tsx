import { Card, List, Avatar } from 'antd';
import React from 'react';

import { connect } from 'umi';
import moment from 'moment';
import AvatarList from '../AvatarList';
import { ProjectListItemDataType } from '../../data.d';
import { ModalState } from '../../model';
import styles from './index.less';

const Projects: React.FC<Partial<ModalState>> = (props) => {
  const { projectList } = props;
  return (
    <>
      <List<ProjectListItemDataType>
        className={styles.coverCardList}
        rowKey="id"
        grid={{ gutter: 24, xxl: 3, xl: 2, lg: 2, md: 2, sm: 2, xs: 1 }}
        dataSource={projectList}
        renderItem={(item) => (
          <List.Item>
            <Card className={styles.card} hoverable cover={<Avatar src={item.cover} shape="square" size={150} style={{backgroundColor: item.cover}}>{item.title}</Avatar>}>
              <Card.Meta title={<a>{item.title}</a>} description={item.desc} />
              <div className={styles.cardItemContent}>
                <span>{moment(item.updatedAt).fromNow()}</span>
                <div className={styles.avatarList}>
                  <AvatarList size="small">
                    {item.users.map((user: any) => (
                      <AvatarList.Item
                        key={`${item.id}-avatar-${user.id}`}
                        src={user.avatar}
                        tips={user.name}
                      />
                    ))}
                  </AvatarList>
                </div>
              </div>
            </Card>
          </List.Item>
        )}
      />
    </>
  );
};

export default connect(({ accountAndcenter, }: { accountAndcenter: ModalState }) => ({
  projectList: accountAndcenter.projectList,
}))(Projects);
