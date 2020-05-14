import { Card, List, Button } from 'antd';
import React from 'react';

import { connect } from 'umi';
import moment from 'moment';
import { ConnectState } from '@/models/connect';
import AvatarList from '../AvatarList';
import { ProjectListItemDataType } from '../../data.d';
import { ModalState } from '../../model';
import styles from './index.less';

const Projects: React.FC<Partial<ModalState>> = (props) => {
  const { projectList, currentUser } = props;
  return (
    <>
      {
        currentUser?.currentAuthority === 'admin' ? <Button style={{marginBottom: 24}} type="primary">创建</Button> : null
      }
      <List<ProjectListItemDataType>
        className={styles.coverCardList}
        rowKey="id"
        grid={{ gutter: 24, xxl: 3, xl: 2, lg: 2, md: 2, sm: 2, xs: 1 }}
        dataSource={projectList}
        renderItem={(item) => (
          <List.Item>
            <Card className={styles.card} hoverable cover={<img alt={item.title} src={item.cover}/>}>
              <Card.Meta title={<a>{item.title}</a>} description={item.desc} />
              <div className={styles.cardItemContent}>
                <span>{moment(item.updatedAt).fromNow()}</span>
                <div className={styles.avatarList}>
                  {/* <AvatarList size="small">
                    {item.members.map((member) => (
                      <AvatarList.Item
                        key={`${item.id}-avatar-${member.id}`}
                        src={member.avatar}
                        tips={member.name}
                      />
                    ))}
                  </AvatarList> */}
                </div>
              </div>
            </Card>
          </List.Item>
        )}
      />
    </>
  );
};

export default connect(({ accountAndcenter, user, }: { accountAndcenter: ModalState, user: ConnectState['user'], }) => ({
  currentUser: user.currentUser,
  projectList: accountAndcenter.projectList,
}))(Projects);
