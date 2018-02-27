import React, { Component } from 'react';
import FontAwesome from '@fortawesome/fontawesome';
import FASolid from '@fortawesome/fontawesome-free-solid';

// Layout
import Header from './components/header';
import SideBar from './components/sidebar';
import Results from './components/results';

export default class Main extends Component{
  constructor(props){
    super(props);
    this.state = {
      results: ''
    }
  }

  handleResults = (e) => {
    this.setState({results: e})
  }
  render(){
    return(
      <div className="main">
        <Header />
        <div className="content">
          <SideBar results={this.handleResults}/>
          <Results res={this.state.results} />
        </div>
      </div>
    )
  }
};
