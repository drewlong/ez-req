import React, { Component } from 'react';

export default class Header extends Component{
  constructor(props){
    super(props);
    this.state = {

    }
  }

  render(){
    return(
      <div className="header">
        <div className="header-logo-cont">
          <div style={{flex: 1}}></div>
          <div className="header-logo">EZ Req</div>
          <div style={{flex: 1}}></div>
        </div>
        <div style={{flex: 5}}></div>
      </div>
    )
  }
};
