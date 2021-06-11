import React from 'react';
import styled from "styled-components";
import './App.css';

const Containter = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  text-align: center;
  height: 100vh;
  background-color: pink;
`;

const Header = styled.div`
  display: flex;
  height: 10%;
  justify-content: center;
  align-items: center;
  color: white;
  background-color: #282c34;
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
        
      </Containter>
    </div>
  );
}

export default App;
