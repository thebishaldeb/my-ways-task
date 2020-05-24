import React from 'react';
import {
  Input,
  Form,
  Card,
  Button,
  Divider,
  Alert,
  Switch,
  Row,
  Col,
} from 'antd';
import { getValidation } from '../functions';

import { Spin } from './';
import config from '../config';
import io from 'socket.io-client';

const { TextArea } = Input;

class Home extends React.Component {
  state = {
    loading: true,
    chat: [],
    content: '',
    sender: 'company',
    data: {},
  };

  componentDidMount() {
    this.setState({ loading: true });
    let id = this.props.match.params.id;
    let userId = this.props.match.params.userId;
    (async () => {
      const data = await getValidation(id, userId, this.redirect);
      this.setState({ data, loading: false });
    })();
    this.socketStart(`${id}-${userId}`);
  }

  redirect = () => this.props.history.push('/page-not-found');

  onChange = checked => {
    this.setState({ sender: checked ? 'company' : 'user' });
  };

  socketStart = room => {
    this.socket = io(config[process.env.NODE_ENV].endpoint);
    this.socket.emit('room', room);
    this.socket.on(room, chat => {
      this.setState({ chat });
    });
    this.socket.on(`${room}-1`, msg => {
      this.setState({ chat: [...this.state.chat, msg] });
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.socket.emit('message', {
      sender: this.state.sender,
      content: this.state.content,
      id: this.props.match.params.id,
      userId: this.props.match.params.userId,
    });
    this.setState({ content: '' });
  };

  handleContent = event => {
    this.setState({
      content: event.target.value,
    });
  };

  render() {
    const { loading, data, chat } = this.state;
    return loading ? (
      <Spin />
    ) : (
      <Card>
        <Col
          xs={{ offset: 0, span: 24 }}
          sm={{ offset: 1, span: 22 }}
          md={{ offset: 2, span: 20 }}
          lg={{ offset: 5, span: 14 }}
        >
          <h2>
            Internship: <strong>{data.name}</strong>
          </h2>
          <h3>
            User: <i>{data.users[0].username}</i>
          </h3>
          <Switch defaultChecked onChange={this.onChange} />{' '}
          <span>{`Message as ${
            this.state.sender === 'company' ? 'Recruiter' : 'User'
          }`}</span>
          <Divider />
          <Row gutter={0}>
            {' '}
            {chat.map(item => (
              <Col span={18} offset={item.sender === 'company' ? 0 : 6}>
                <Alert
                  message={
                    <div style={{ overflow: 'hidden' }}>
                      <span
                        style={
                          item.sender === 'company' ? {} : { float: 'right' }
                        }
                      >
                        <strong>
                          {item.sender === 'company' ? 'Recruiter - ' : ''}
                        </strong>
                        {item.content}
                        <strong>
                          {item.sender === 'company'
                            ? ''
                            : ` - ${data.users[0].username}`}
                        </strong>
                      </span>
                    </div>
                  }
                  type={item.sender === 'company' ? 'info' : 'success'}
                  style={{ marginBottom: '20px' }}
                />
              </Col>
            ))}
            <Row style={{ width: '100%', margin: '20px 0' }}>
              <Col xs={16} sm={20} md={18} lg={19}>
                <TextArea
                  onChange={e => this.handleContent(e)}
                  placeholder="Type Your Message"
                  autoSize={{ minRows: 3 }}
                  value={this.state.content}
                />
              </Col>
              <Col xs={8} sm={4} md={6} lg={5}>
                <Button
                  block
                  onClick={e => this.handleSubmit(e)}
                  type="primary"
                >
                  Submit
                </Button>
              </Col>
            </Row>
          </Row>
        </Col>
      </Card>
    );
  }
}

export default Home;
