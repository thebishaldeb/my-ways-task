import React from 'react';
import { Routes, Layout } from './components';
import { BrowserRouter } from 'react-router-dom';
import 'antd/dist/antd.css';
const App = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes />
      </Layout>
    </BrowserRouter>
  );
};

export default App;
