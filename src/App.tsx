import React from 'react';
import styled from "styled-components";
import { Form, Select, Input, InputNumber, Button, Row, Col } from "antd";
import './App.css';

const Containter = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  text-align: center;
  height: 100vh;
  background-color: pink;
`;

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>

      <Containter>
        <Row>
            <Col span={12}>本金：</Col>
            <Col span={9}>
              fol
            </Col>
            <Col span={3}></Col>
          </Row>
      </Containter>
    </div>
  );
}

export default App;
