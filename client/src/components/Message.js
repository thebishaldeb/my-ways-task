import React from 'react';
import { List, Card, Button } from 'antd';
import { Link } from 'react-router-dom';
import { getMessages } from '../functions';
import { Spin } from './';

class Home extends React.Component {
  state = {
    loading: true,
    messages: {},
  };

  async UNSAFE_componentWillMount() {
    this.setState({ loading: true });
    let id = this.props.match.params.id;
    let userId = this.props.match.params.userId;
    const messages = await getMessages(id, userId);
    if (!messages) this.props.history.push('/page-not-found');
    this.setState({ messages, loading: false });
  }

  render() {
    const { loading, messages } = this.state;
    return loading ? (
      <Spin />
    ) : (
      <Card title={<h1>{messages.message}</h1>}>
        {/* <List
                        grid={{
                            gutter: 16,
                            xs: 1,
                            sm: 2,
                            md: 4,
                            lg: 4,
                            xl: 6,
                            xxl: 3,
                        }}
                        dataSource={messages.users}
                        renderItem={item => (
                            <List.Item>
                                <Card title={item.username}
                                    hoverable
                                ><Link to={`/${item._id}`} ><Button type="primary" ghost >Message</Button></Link></Card>
                            </List.Item>
                        )}
                    /> */}
      </Card>
    );
  }
}

export default Home;
