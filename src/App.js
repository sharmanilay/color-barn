import React, { Component } from "react";
import NavBar from './navbar/navbar';
import MainForm from './form';
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <NavBar />
        </header>
        <MainForm />
      </div>
    );
  }
}

export default App;
