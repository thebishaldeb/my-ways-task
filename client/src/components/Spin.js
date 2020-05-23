import React from 'react';
import { Spin } from 'antd';
import '../App.css';

class Home extends React.Component {
  render() {
    return (
      <div className="spin">
        <Spin />
      </div>
    );
  }
}

export default Home;
