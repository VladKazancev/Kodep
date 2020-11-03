import React from 'react';
import '../style.css';
import InputValue from './InputValue';
export default function ExchangeRow(props) {
  return (
    <div className="flexRow">
      <InputValue
        value={props.currentValueLeft.value}
        current={props.currentValueLeft.tag}
        name='left'
        onChange={props.onChange}
      />
      ==
      <InputValue
        value={props.currentValueRight.value}
        current={props.currentValueRight.tag}
        name='right'
        onChange={props.onChange}
      />
    </div>
  );
}
