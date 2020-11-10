import React from 'react';
import './style.css';
import {digitChecking, changeInputHelper, changeListHelper,
  сalculating}  from '../OtherFunctions.js';
import ExchangeRow from './ExchangeRow';
import SelectRow from './SelectRow';
export default class Converter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentValueLeft: { tag: 'USD', value: '', rate: 1 },
      currentValueRight: { tag: 'RUB', value: '', rate: 1 },
      rate: {},
    };
    this.getRate();
    this.handleChangeInput = this.handleChangeInput.bind(this);
  }

  handleChangelist(e) {
    let [currentValueLeft, currentValueRight] = Object.values(this.state);
    const [target, currentRate] = [e.target, this.state.rate[e.target.value]];
    if (target.name === 'left') {
      currentValueRight.value = сalculating(currentValueLeft.value, currentRate,
        currentValueRight.rate);
      changeListHelper(currentValueLeft, currentRate, target.value);
    }else changeListHelper(currentValueRight, currentRate, target.value, currentValueLeft);
    this.setStateHelper(currentValueRight, currentValueLeft);
  }

  handleClickLink(e) {
    e.preventDefault();
    this.setStateHelper(this.state.currentValueLeft, this.state.currentValueRight);
  }

  handleChangeInput(e) {
    const target = e.target;
    if (digitChecking(target.value) !== null) {
      let [currentValueLeft, currentValueRight] = Object.values(this.state);
      if (target.name === 'left') changeInputHelper(currentValueRight, currentValueLeft, target.value);
      else changeInputHelper(currentValueLeft, currentValueRight, target.value);
      this.setStateHelper(currentValueRight, currentValueLeft);
    }
  }

  setStateHelper(currentValueRight, currentValueLeft){
    this.setState({
      currentValueRight: currentValueRight,
      currentValueLeft: currentValueLeft,
    });
  }

  getRate() {
    fetch('https://www.cbr-xml-daily.ru/daily_json.js')
      .then(response => {
        return response.json();
      })
      .then(response => {
        const [data, valutes, currentValueLeft] = [response.Valute, {RUB: 1},
          this.state.currentValueLeft];
        for (let item in data)
          valutes[data[item.toString()].CharCode] =  data[item.toString()].Value /
            data[item.toString()].Nominal;
        currentValueLeft.rate = valutes.USD;
        this.setState({
          rate: valutes,
          currentValueLeft: currentValueLeft,
        });
      });
  }

  render() {
    return (
      <div className="mainBoard">
        <div>
          <h3>Конвертер Валют</h3>
          <SelectRow
            rate={this.state.rate}
            onChange={(e) => this.handleChangelist(e)}
            leftTag = {this.state.currentValueLeft.tag}
            RightTag = {this.state.currentValueRight.tag}
          />
          <ExchangeRow
            currentValueLeft={this.state.currentValueLeft}
            currentValueRight={this.state.currentValueRight}
            onChange={this.handleChangeInput}
          />
          <div className="flexRow">
            <a href="#" onClick={(e) => this.handleClickLink(e)}>Поменять местами</a>
          </div>
        </div>
      </div>
    );
  }
}
