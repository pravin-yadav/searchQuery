import React, { Component } from "react"
import ReactDOM from "react-dom"
import axios from "axios"
require("./App.css")

class App extends Component {
  state = {
    searchData: [],
    value: ""
  }
  componentDidUpdate() {
    this.handleRequest()
  }
  handleRequest() {
    if (this.state.value.length > 1) {
      axios
        .get(`https://www.pixaat.com/api/styles/ac?q=${this.state.value}&t=ht`)
        .then(response => {
          this.setState({ searchData: response.data.s.HT })
        })
        .catch(error => {
          throw error
        })
    }
  }
  handleUpdateInput = event => {
    this.setState({
      value: event.target.value
    })

    if (this.myInput == null) {
      ReactDOM.findDOMNode(this.refs.myInput).focus()
    }
  }

  render() {
    if (this.state.searchData) {
      var dataValue = this.state.searchData.map((search, id) => {
        return <option key={id}>{search}</option>
      })
    }
    return (
      <div className="app">
        <div className="title">Pixaat</div>

        <input
          type="text"
          list="browsers"
          name="myBrowser"
          autoFocus="autofocus"
          value={this.state.value}
          ref={myInput => (this.myInput = myInput)}
          autoComplete="off"
          onChange={this.handleUpdateInput.bind(this)}
          maxLength="50"
        />
        <datalist id="browsers">{dataValue}</datalist>
      </div>
    )
  }
}

export default App
