import React from 'react';
import './App.css'
import { Form, Input, Button } from 'antd'
import { GlobalStyles } from './Global';

function App() {
  return (
    <>
      <GlobalStyles />
      <h2>Hamro Service</h2>
      <Form>
        <Form.Item label='username'>
          <Input />
        </Form.Item>
        <Button  type='dashed'> click me </Button>
      </Form>
    </>
  );
}

export default App;
