import React, { Component } from 'react';
import Axios from 'axios';

export default class SideBar extends Component{
  constructor(props){
    super(props);
    this.state = {
      req_type: 'GET',
      results: '',
      url: '',
      params: {},
      count: 0
    }
  }

  handleReqSelect = (e) => {
    this.setState({req_type: e.target.value})
  }
  handleSubmit = (e) => {
    var t = this
    if(t.state.req_type === "GET"){
      Axios.get(t.state.url)
      .then(function (response) {
        t.props.results(JSON.stringify(response.data, null, 2))
      })
      .catch(function (error) {
        t.props.results(error)
      });
    }else{
      var params = {}
      Object.keys(this.state.params).map(function(p){
        var key = this.refs[p + "-key"].value
        var val = this.refs[p + "-value"].value
        var chk = this.refs[p + "-check"].checked
        if(chk){
          params[key] = parseInt(val, 10)
        }else{
          params[key] = val
        }
        return params
      }, this)
      Axios.post(t.state.url, params)
      .then(function (response) {
        t.props.results(JSON.stringify(response.data, null, 2))
      })
      .catch(function (error) {
        t.props.results(error)
      });
    }
  }
  handleURL = (e) => {
    var url = e.target.value
    this.setState({url: url})
  }
  handleAddParam = () => {
    var params = this.state.params
    params["param" + String(this.state.count + 1)] = {}
    params["param" + String(this.state.count + 1)]["key"] = "value"
    this.setState({
      params: params,
      count: this.state.count + 1
    })
  }
  handleChangeParam = (e) => {
    var params = this.state.params
    var key = this.refs[e + "-key"].value
    var val = this.refs[e + "-value"].value
    params[e] = {[key]: val}
    this.setState({params: params})
  }
  handleRemoveParam = (e) => {
    var params = this.state.params
    delete params[e]
    this.setState({params: params})
  }
  handleClear = () => {
    this.setState({
      req_type: 'GET',
      results: '',
      url: '',
      params: {},
      count: 0
    })
  }
  render(){
    return(
      <div className="sidebar">
        <div className="sidebar-item">
          <button className="btn btn-sm btn-block btn-success" onClick={this.handleSubmit}>Submit</button>
        </div>
        <div className="sidebar-item">
          Request Type: &nbsp;
          <select className="custom-select" onChange={this.handleReqSelect} value={this.state.req_type}>
            <option value="GET">GET</option>
            <option value="POST">POST</option>
          </select>
        </div>
        <br />
        <div className="sidebar-item">
          URL:<br />
        <input type="text" onChange={this.handleURL} value={this.state.url}/>
        </div>
        <div className="sidebar-item"></div>
        <div className="sidebar-item">
        {this.state.req_type === "POST" &&
            <button className="btn btn-sm btn-flat btn-warning" onClick={this.handleAddParam}>
            <i className="fas fa-plus"></i> Add Params
          </button>
        }{this.state.req_type === "GET" &&
          <button className="btn btn-sm btn-flat btn-disabled" disabled>
            <i className="fas fa-plus"></i> Add Params
          </button>
        }
        </div>
        <div className="sidebar-params">
          {Object.keys(this.state.params).map(function(p){
            return(
              <div className="sidebar-item" id={p}>
                {Object.keys(this.state.params[p]).map(function(k){
                  return(
                    <div>
                      <input type="text" className="sidebar-key" value={k} ref={p + "-key"} onChange={() => {this.handleChangeParam(p)}} />
                      &nbsp; : &nbsp;
                      <input type="text" className="sidebar-value" value={this.state.params[p][k]} ref={p + "-value"} onChange={() => {this.handleChangeParam(p)}} />
                      <button onClick={() => this.handleRemoveParam(p)} class="btn btn-sm btn-flat btn-danger" style={{float: 'right'}}>
                        <i className="fas fa-times"></i>
                      </button>
                      <br />
                      <div style={{display: 'flex', flexDirection: 'row', width: '70px'}}>
                        <div style={{flex: 1}}>
                          <input type="checkbox" ref={p + "-check"}/>
                        </div>
                        <div style={{flex: 1}}>
                          <span style={{fontSize: '0.75em'}}>Integer?</span>
                        </div>
                      </div>
                    </div>
                  )
                }, this)}
              </div>
            )
          }, this)}
          <div className="sidebar-item">
            <button className="btn btn-sm btn-block btn-danger" onClick={this.handleClear}>CLEAR ALL</button>
          </div>
        </div>
      </div>
    )
  }
};
