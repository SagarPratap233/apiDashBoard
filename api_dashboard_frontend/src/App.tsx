import React from 'react';
import logo from './logo.svg';
import './App.css';
import CurlInputForm from './components/CurlInputForm'

const App: React.FC = () => {
  return (
    <div>
      <h1>API Monitoring DashBoard</h1>
      <CurlInputForm />
    </div>
  )
}

export default App;
