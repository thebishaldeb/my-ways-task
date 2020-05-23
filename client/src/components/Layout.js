import React from 'react';
import { PageHeader } from 'antd';
import { Link } from 'react-router-dom';

const Layout = props => {
  return (
    <div>
      <PageHeader
        className="site-page-header"
        title={<Link to="/">Home</Link>}
        subTitle="Welcome to MyWays"
        backIcon={false}
      />
      <div>{props.children}</div>
    </div>
  );
};

export default Layout;
