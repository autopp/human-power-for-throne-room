import React, { Component } from 'react';
import { sprintf } from 'sprintf-js';
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

  C(x, y) {
    if (x < y) {
      return 0;
    }

    let r = 1;
    for (let i = 0; i < y; i++) {
      r *= x - i;
      r /= y - i;
    }

    return r;
  }

  calcProbabilityOfAccident() {
    let { throne, action, other } = this.state;
    let total = throne + action + other;

    if (total <= 5) {
      return throne >= 1 && action === 0 ? 100 : 0;
    }

    return (this.C(throne + other, 5) - this.C(other, 5)) / this.C(total, 5) * 100;
  }

  calcProbabilityOfDoubleThroneAction() {
    let { throne, action, other } = this.state;
    let total = throne + action + other

    if (total <= 5) {
      return throne >= 2 && action >= 1 ? 100 : 0;
    }

    let throne0 = this.C(action + other, 5);
    let throne1 = this.C(throne, 1) * this.C(action + other, 4);
    let throne2 = this.C(throne, 2) * this.C(other, 3);
    let throne3 = this.C(throne, 3) * this.C(other, 2);
    let throne4 = this.C(throne, 4) * this.C(other, 1);
    let throne5 = this.C(throne, 5);

    return 100 - (throne0 + throne1 + throne2 + throne3 + throne4 + throne5) / this.C(total, 5) * 100;
  }

  render() {
    return (
      <div className="container">
        <h1>Human power for throne room</h1>
        <div>玉座の間の枚数: <input type="number" value={this.state.throne} min="1" max="10" step="1" onChange={this.onChangeThrone} /></div>
        <div>玉座の間以外のアクションカードの枚数: <input type="number" value={this.state.action} min="1" max="100" step="1" onChange={this.onChangeAction} /></div>
        <div>それ以外のアクションカードの枚数: <input type="number" value={this.state.other} min="0" max="100" step="1" onChange={this.onChangeOther} /></div>
        <div>玉座事故を引き起こす確率: {sprintf("%.1f", this.calcProbabilityOfAccident())}%</div>
        <div>玉座の間2枚とそれ以外のアクションカードを引ける確率: {sprintf("%.1f", this.calcProbabilityOfDoubleThroneAction())}%</div>
      </div>
    );
  }
}

export default App;
