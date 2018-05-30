import React, { Component } from 'react';
import { sprintf } from 'sprintf-js';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { throne: 1, action: 1, other: 0, hand: 5 };
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

  onChangeHand = e => {
    this.setState({ hand: parseInt(e.target.value, 10) });
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
    let { throne, action, other, hand } = this.state;
    let total = throne + action + other;

    if (total <= hand) {
      return throne >= 1 && action === 0 ? 100 : 0;
    }

    return (this.C(throne + other, hand) - this.C(other, hand)) / this.C(total, hand) * 100;
  }

  calcProbabilityOfDoubleThroneAction() {
    let { throne, action, other, hand } = this.state;
    let total = throne + action + other

    if (hand < 3) {
      return 0;
    }

    if (total <= hand) {
      return throne >= 2 && action >= 1 ? 100 : 0;
    }

    let complementaryEvent = this.C(action + other, hand) + this.C(throne, 1) * this.C(action + other, hand - 1);

    for (let i = 2; i < hand; i++) {
      complementaryEvent += this.C(throne, i) * this.C(other, hand - i)
    }
    complementaryEvent += this.C(throne, hand);

    return Math.abs(100 - complementaryEvent / this.C(total, hand) * 100);
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            <h1>Human power for throne room</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-3">
            <div>玉座の間の枚数:</div>
          </div>
          <div className="col-lg-2">
            <input type="number" value={this.state.throne} min="1" max="10" step="1" onChange={this.onChangeThrone} />
          </div>
        </div>
        <div className="row">
          <div className="col-lg-3">
            <div>玉座の間以外のアクションカードの枚数:</div>
          </div>
          <div className="col-lg-2">
            <input type="number" value={this.state.action} min="1" max="100" step="1" onChange={this.onChangeAction} />
          </div>
        </div>
        <div className="row">
          <div className="col-lg-3">
            <div>それ以外のカードの枚数</div>
          </div>
          <div className="col-lg-2">
            <input type="number" value={this.state.other} min="0" max="100" step="1" onChange={this.onChangeOther} />
          </div>
        </div>
        <div className="row">
          <div className="col-lg-3">
            <div>手札枚数</div>
          </div>
          <div className="col-lg-2">
            <input type="number" value={this.state.hand} min="2" max="20" step="1" onChange={this.onChangeHand} />
          </div>
        </div>
        <h3>玉座事故を引き起こす確率 = {sprintf("%.2f", this.calcProbabilityOfAccident())}%</h3>
        <h3>玉座の間2枚とそれ以外のアクションカードを引ける確率 = {sprintf("%.2f", this.calcProbabilityOfDoubleThroneAction())}%</h3>
      </div>
    );
  }
}

export default App;
