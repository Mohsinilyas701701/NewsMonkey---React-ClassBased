import React, { Component } from "react";
import spinnerImg from "../assets/Spinner.gif";

export default class Spinner extends Component {
  render() {
    return (
      <div className='d-flex justify-content-center my-5'>
        <img src={spinnerImg} alt='' />
      </div>
    );
  }
}
