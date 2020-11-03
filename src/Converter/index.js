import React from 'react';
import './style.css';
import {digitChecking} from '../OtherFunctions.js';
import ExchangeRow from './ExchangeRow';
import SelectRow from './SelectRow';
export default class Converter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rate: [{ tag: 'RUB', value: 1 }],
      currentValueLeft: { tag: 'USD', value: '', rate: 1 },
      currentValueRight: { tag: 'RUB', value: '', rate: 1 },
    };
    this.getRate();
    this.handleChangeInput = this.handleChangeInput.bind(this);
  }

  handleChangelist(e) {
    const currentRate = this.state.rate.find((element) => {
      return element.tag === e.target.value ? true : false;
    });
    const currentValueRight = this.state.currentValueRight;
    const currentValueLeft = this.state.currentValueLeft;
    if (e.target.name === 'left') {
      const valueRight = this.state.currentValueLeft.value *
        currentRate.value / this.state.currentValueRight.rate;
      currentValueRight.value = isNaN(valueRight) ? '' : Number(valueRight.toFixed(3));
      currentValueLeft.tag = e.target.value;
      currentValueLeft.rate = currentRate.value;
    }
    else {
      currentValueRight.tag = e.target.value;
      currentValueRight.rate = currentRate.value;
      const valueRight = this.state.currentValueLeft.value *
        this.state.currentValueLeft.rate / currentRate.value;
      currentValueRight.value = isNaN(valueRight) ? '' : Number(valueRight.toFixed(3));
    }
    this.setState({
      currentValueRight: currentValueRight,
      currentValueLeft: currentValueLeft,
    });

  }

  handleClick(e) {
    e.preventDefault();
    const currentValueRight = this.state.currentValueRight;
    const currentValueLeft = this.state.currentValueLeft;
    this.setState({
      currentValueRight: currentValueLeft,
      currentValueLeft: currentValueRight,
    });
  }

  handleChangeInput(e) {
    if (digitChecking(e.target.value) !== null) {
      const currentValueRight = this.state.currentValueRight;
      const currentValueLeft = this.state.currentValueLeft;
      if (e.target.name === 'left') {
        const valueRight = e.target.value * this.state.currentValueLeft.rate /
          this.state.currentValueRight.rate;
        currentValueRight.value = isNaN(valueRight) ? '' : Number(valueRight.toFixed(3));
        currentValueLeft.value = e.target.value;
      } else {
        const valueLeft = e.target.value * this.state.currentValueRight.rate /
        this.state.currentValueLeft.rate;
        currentValueLeft.value = isNaN(valueLeft) ? '' : Number(valueLeft.toFixed(3));
        currentValueRight.value = e.target.value;
      }
      this.setState({
        currentValueRight: currentValueRight,
        currentValueLeft: currentValueLeft,
      });
    }
  }

  getRate() {
    fetch('https://www.cbr-xml-daily.ru/daily_json.js')
      .then(response => {
        return response.json();
      })
      .then(response => {
        let valutes = [];
        const data = response.Valute;
        for (let item in data) {
          valutes.push({
            tag: data[item.toString()].CharCode,
            value: data[item.toString()].Value / data[item.toString()].Nominal
          });

        }
        const currentValueLeft = this.state.currentValueLeft;
        const rateUSD = valutes.find((element) => {
          return element.tag === 'USD' ? true : false;
        });
        currentValueLeft.rate = rateUSD.value;
        this.setState({
          rate: this.state.rate.concat(valutes),
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
            <a href="#" onClick={(e) => this.handleClick(e)}>Поменять местами</a>
          </div>
        </div>
      </div>
    );
  }
}
