import React from 'react';
import './style.css';
export default function InputValue (props){
  return (
    <div className="flexBox">
      <input name = {props.name} value = {props.value} onChange = {props.onChange} className="text" type="text" />
      <div>{props.current}</div>
    </div>
  );
}