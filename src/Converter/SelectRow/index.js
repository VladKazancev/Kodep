import React from 'react';
import '../style.css';
export default function SelectRow(props) {
  const options = Object.keys(props.rate).map((current, index) => {
    return <option key={index} value={current}>{current}</option>
  });
  return (
    <div className="flexRow">
      Вы переводите из
      <select name="left" onChange={(e) => props.onChange(e)} value={props.leftTag}>
        {options}
      </select>
        в
      <select name="right" onChange={(e) => props.onChange(e)} value={props.RightTag}>
        {options}
      </select>
    </div>
  );
}
