import { PlusOutlined, ContactsOutlined, ClusterOutlined, TeamOutlined, WomanOutlined, ManOutlined } from '@ant-design/icons';
import { Avatar, Card, Col, Divider, Input, Row, Tag } from 'antd';
import React, { Component, useState, useRef } from 'react';
import { GridContent } from '@ant-design/pro-layout';
import { Link, connect, Dispatch } from 'umi';
import { RouteChildrenProps } from 'react-router';
import { ModalState } from './model';
import Projects from './components/Projects';
import Articles from './components/Articles';
import { CurrentUser, TagType } from './data.d';
import styles from './Center.less';

interface CenterProps extends RouteChildrenProps {
  dispatch: Dispatch<any>;
  match: {
    params: {
      id: string;
    };
  };
  currentUser: Partial<CurrentUser>;
  isMe: boolean;
  articleCount: number;
  projectCount: number;
  currentUserLoading: boolean;
}
interface CenterState {
  tabKey?: 'articles' | 'applications' | 'projects';
}

const operationTabList = (isMe: boolean, articleCount: number, projectCount: number) => {
  return isMe ? [
    {
      key: 'articles',
      tab: (
        <span>
          文章 <span style={{ fontSize: 14 }}>({articleCount})</span>
        </span>
      ),
    },
    {
      key: 'projects',
      tab: (
        <span>
          项目 <span style={{ fontSize: 14 }}>({projectCount})</span>
        </span>
      ),
    },
  ] : [
    {
      key: 'articles',
      tab: (
        <span>
          文章 <span style={{ fontSize: 14 }}>({articleCount})</span>
        </span>
      ),
    }
  ];
}

const TagList: React.FC<{ tags: CurrentUser['tags'] }> = ({ tags }) => {
  const ref = useRef<Input | null>(null);
  const [newTags, setNewTags] = useState<TagType[]>([]);
  const [inputVisible, setInputVisible] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>('');

  const showInput = () => {
    setInputVisible(true);
    if (ref.current) {
      // eslint-disable-next-line no-unused-expressions
      ref.current?.focus();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputConfirm = () => {
    let tempsTags = [...newTags];
    if (inputValue && tempsTags.filter((tag) => tag.label === inputValue).length === 0) {
      tempsTags = [...tempsTags, { key: `new-${tempsTags.length}`, label: inputValue }];
    }
    setNewTags(tempsTags);
    setInputVisible(false);
    setInputValue('');
  };

  return (
    <div className={styles.tags}>
      <div className={styles.tagsTitle}>标签</div>
      {(tags || []).concat(newTags).map((item) => (
        <Tag key={item.key}>{item.label}</Tag>
      ))}
      {inputVisible && (
        <Input
          ref={ref}
          type="text"
          size="small"
          style={{ width: 78 }}
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputConfirm}
          onPressEnter={handleInputConfirm}
        />
      )}
      {!inputVisible && (
        <Tag onClick={showInput} style={{ borderStyle: 'dashed' }}>
          <PlusOutlined />
        </Tag>
      )}
    </div>
  );
};

class Center extends Component<CenterProps, CenterState> {
  state: CenterState = {
    tabKey: 'articles',
  };

  public input: Input | null | undefined = undefined;

  componentDidMount() {
    const { dispatch, match } = this.props;
    dispatch({
      type: 'accountAndcenter/fetchCurrent',
      payload: {
        id: match.params.id,
      }
    });
    dispatch({
      type: 'accountAndcenter/fetchArticle',
      payload: {
        authorId: match.params.id,
        currentPage: 1,
        count: 10,
      }
    });
  }

  onTabChange = (key: string) => {
    // If you need to sync state to url
    // const { match } = this.props;
    // router.push(`${match.url}/${key}`);
    this.setState({
      tabKey: key as CenterState['tabKey'],
    });
  };

  renderChildrenByTabKey = (tabKey: CenterState['tabKey']) => {
    if (tabKey === 'projects') {
      return <Projects />;
    }
    if (tabKey === 'articles') {
      return <Articles />;
    }
    return null;
  };

  renderUserInfo = (currentUser: Partial<CurrentUser>) => (
    <div className={styles.detail}>
      <p>
        {currentUser.sex ? <ManOutlined style={{ marginRight: 8 }}/> : <WomanOutlined style={{ marginRight: 8 }}/>}
        {currentUser.age} 岁
      </p>
      <p>
        <ClusterOutlined
          style={{
            marginRight: 8,
          }}
        />
        {currentUser.groupName ? currentUser.groupName : '未加入工作室'}
      </p>
    </div>
  );

  render() {
    const { tabKey } = this.state;
    const { currentUser = {}, currentUserLoading, isMe = false, articleCount = 0, projectCount = 0 } = this.props;
    const dataLoading = currentUserLoading || !(currentUser && Object.keys(currentUser).length);
    return (
      <GridContent>
        <Row gutter={24}>
          <Col lg={7} md={24}>
            <Card bordered={false} style={{ marginBottom: 24 }} loading={dataLoading}>
              {!dataLoading && (
                <div>
                  <div className={styles.avatarHolder}>
                    <img alt="" src={currentUser.avatar} />
                    <div className={styles.name}>{currentUser.name}</div>
                    <div>{currentUser.signature}</div>
                  </div>
                  {this.renderUserInfo(currentUser)}
                  <Divider dashed />
                  <TagList tags={currentUser.tags || []} />
                  <Divider style={{ marginTop: 16 }} dashed />
                  <div className={styles.team}>
                    <div className={styles.teamTitle}>团队</div>
                    <Row gutter={36}>
                      {currentUser.notice &&
                        currentUser.notice.map((item) => (
                          <Col key={item.id} lg={24} xl={12}>
                            <Link to={item.href}>
                              <Avatar size="small" src={item.logo} icon={<TeamOutlined/>} />
                              {item.member}
                            </Link>
                          </Col>
                        ))}
                    </Row>
                  </div>
                </div>
              )}
            </Card>
          </Col>
          <Col lg={17} md={24}>
            <Card
              className={styles.tabsCard}
              bordered={false}
              tabList={operationTabList(isMe, articleCount, projectCount)}
              activeTabKey={tabKey}
              onTabChange={this.onTabChange}
            >
              {this.renderChildrenByTabKey(tabKey)}
            </Card>
          </Col>
        </Row>
      </GridContent>
    );
  }
}

export default connect(
  ({
    loading,
    accountAndcenter,
  }: {
    loading: { effects: { [key: string]: boolean } };
    accountAndcenter: ModalState;
  }) => ({
    currentUser: accountAndcenter.currentUser,
    isMe: accountAndcenter.isMe,
    articleCount: accountAndcenter.articleCount,
    projectCount: accountAndcenter.projectCount,
    currentUserLoading: loading.effects['accountAndcenter/fetchCurrent'],
  }),
)(Center);
