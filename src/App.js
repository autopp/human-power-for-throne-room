import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { throne: 1, action: 1, other: 0 };
  }

  onChangeThrone = e => {
    this.setState({ throne: parseInt(e.target.value, 10) });
  }

  onChangeAction = e => {
    this.setState({ action: parseInt(e.target.value, 10) });
  }

  onChangeOther = e => {
    this.setState({ other: parseInt(e.target.value, 10) });
  }

  render() {
    return (
      <div>
        <h1>Human power for throne room</h1>
        <div>玉座の間の枚数: <input type="number" value={this.state.throne} min="1" max="10" step="1" onChange={this.onChangeThrone} /></div>
        <div>玉座の間以外のアクションカードの枚数: <input type="number" value={this.state.action} min="1" max="100" step="1" onChange={this.onChangeAction} /></div>
        <div>それ以外のアクションカードの枚数: <input type="number" value={this.state.other} min="0" max="100" step="1" onChange={this.onChangeOther} /></div>
      </div>
    );
  }
}

export default App;
