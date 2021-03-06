import React from 'react';
import ReactDOM from 'react-dom';

import './app.css';

class Notification extends React.Component {
  constructor(props){
    super(props)
		this.state = {
    	isOpen: this.props.isOpen
    }
    this.close = this.close.bind(this);
  }

  componentDidMount() {
    const self = this;
  	setTimeout(function(){
      self.close();
    }, self.props.timeout * 1000);
  }
  
  close() {
		console.log("before: ",this.state.isOpen);
		this.props.closePopup();
  }
  
  render() {
  	const visible = this.state.isOpen;
    
    if (visible) {
      return (
        <div className="warning">
          <p>This is an error!</p>
          <button aria-label="Close notification" onClick={this.close}>X</button>
        </div>
      )
    }
    return false;
  }
}

class TodoApp extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    	items: [
      	{ text: "Learn JavaScript", done: false },
        { text: "Learn React", done: false },
        { text: "Play around in JSFiddle", done: true },
        { text: "Build something awesome", done: true }
      ],
      showPopup: false
    }
  }
  
  
  render() {
    return (
      <div>
        <h2>Todos:</h2>
        <ol>
        {this.state.items.map((item, a) => (
          <li key={a}>
            <label>
              <input type="checkbox" disabled readOnly checked={item.done} /> 
              <span className={item.done ? "done" : ""}>{item.text}</span>
            </label>
          </li>
        ))}
        </ol>

      </div>
    )
  }
}


class Container extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      showPopup: false
    }
  }
  
  openNotification = () => {
	 	this.setState({ showPopup: !this.state.showPopup }, () => {
    	console.log("state: ", this.state.showPopup);
    });
  }
  
  closeNotification = () => {
    this.setState({ 
      showPopup: !this.state.showPopup
    }, () => {
      console.log("After close: ", this.state.showPopup);
    })
  }
  
  render() {
    return (
      <div>
        <TodoApp className="todolist"></TodoApp>
        { this.state.showPopup ? 
          <Notification isOpen={this.state.showPopup} closePopup={this.closeNotification} timeout="2"></Notification> 
        : null }
          <button className="btn-del" onClick={this.openNotification}>Remove crop</button>
        </div>
      )
    }
  }
  

  export {TodoApp, Notification};
//ReactDOM.render(<Container />, document.querySelector("#main"));
export default Container;
