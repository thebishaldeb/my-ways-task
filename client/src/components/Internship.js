import React from 'react';
import { List, Card, Button } from 'antd';
import { Link } from 'react-router-dom';
import { getInternship } from '../functions';
import { Spin } from './';

class Home extends React.Component {
  state = {
    loading: true,
    internship: {},
  };

  async UNSAFE_componentWillMount() {
    this.setState({ loading: true });
    let id = this.props.match.params.id;
    const internship = await getInternship(id);
    if (!internship) this.props.history.push('/page-not-found');
    this.setState({ internship, loading: false });
  }

  render() {
    const { loading, internship } = this.state;
    return loading ? (
      <Spin />
    ) : (
      <Card
        title={
          <h1>
            Name - <strong>{internship.name}</strong>
          </h1>
        }
      >
        <h2>
          <i>List of Applicants</i>
        </h2>
        <List
          grid={{
            gutter: 16,
            xs: 1,
            sm: 2,
            md: 4,
            lg: 4,
            xl: 6,
            xxl: 3,
          }}
          dataSource={internship.users}
          renderItem={item => (
            <List.Item>
              <Card title={item.username} hoverable>
                <Link to={`/${internship._id}/${item._id}`}>
                  <Button type="primary" ghost>
                    Message
                  </Button>
                </Link>
              </Card>
            </List.Item>
          )}
        />
      </Card>
    );
  }
}

export default Home;
