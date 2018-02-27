import React, { Component } from 'react';
import Highlight from 'react-syntax-highlight';

export default class Results extends Component{
  constructor(props){
    super(props);
    this.state = {
      results: ''
    }
  }

  componentDidMount = () => {
    this.setState({
      results: this.props.res
    })
  }

  componentWillRecieveUpdates = () => {
    this.setState({
      results: this.props.res
    })
  }

  render(){
    return(
      <div className="results">
        <div className="code-cont">
          <Highlight lang={"json"} value={this.props.res} />
        </div>
      </div>
    )
  }
};
