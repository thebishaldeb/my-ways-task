import React from 'react';
import { List, Card, Button } from 'antd';
import { Link } from 'react-router-dom';
import { getInternships } from '../functions';
import { Spin } from './';

class Home extends React.Component {
  state = {
    loading: true,
    internships: [],
  };

  async UNSAFE_componentWillMount() {
    this.setState({ loading: true });
    const internships = await getInternships();
    this.setState({ internships, loading: false });
  }

  render() {
    const { loading, internships } = this.state;
    return loading ? (
      <Spin />
    ) : (
      <Card
        title={
          <h1>
            <strong>List of Internships</strong>
          </h1>
        }
      >
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
          dataSource={internships}
          renderItem={item => (
            <List.Item>
              <Card title={item.name} hoverable>
                <Link to={`/${item._id}`}>
                  <Button type="primary" ghost>
                    See Details
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
