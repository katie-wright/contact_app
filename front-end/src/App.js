import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

class App extends Component {
  componentWillMount(){
    axios.put('http://localhost:8080/contacts/1', {updateInfo: {
      lastName: "Wrightt",
      email: "ka.wright@gmail.com"
    }})
    .then(res=>{
      console.log(res.data);
    })
    .catch(err=>{
      console.log(err);
    })
  }
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
