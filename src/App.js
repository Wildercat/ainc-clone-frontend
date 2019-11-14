import React from 'react';
import axios from 'axios';
import './App.css';
import Home from './Home';
import Nav from './Nav';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      key: null,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async login() {
    let response;
    try {
      response = await axios.post('http://127.0.0.1:8000/api/login', {
        email: this.state.email,
        password: this.state.password,
      });
    } catch (error) {
      // Error 
      if (error.response) {
        /*
         * The request was made and the server responded with a
         * status code that falls out of the range of 2xx
         */
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        /*
         * The request was made but no response was received, `error.request`
         * is an instance of XMLHttpRequest in the browser and an instance
         * of http.ClientRequest in Node.js
         */
        console.log(error.request);
      } else {
        // Something happened in setting up the request and triggered an Error
        console.log('Error', error.message);
      }
      console.log(error);
    }
    console.log(response);
    localStorage.setItem('key', response.data.token);
    this.setState({ key: response.data.token });
  }

  async logout() {
    let response;
    let params = {
      headers: {
        authorization: 'Bearer ' + this.state.key
      }
    };
    console.log({ params });
    try {
      response = await axios.get('http://127.0.0.1:8000/api/logout', params);
    } catch (error) {
      // Error 
      if (error.response) {
        /*
         * The request was made and the server responded with a
         * status code that falls out of the range of 2xx
         */
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        /*
         * The request was made but no response was received, `error.request`
         * is an instance of XMLHttpRequest in the browser and an instance
         * of http.ClientRequest in Node.js
         */
        console.log(error.request);
      } else {
        // Something happened in setting up the request and triggered an Error
        console.log('Error', error.message);
      }
      console.log(error);
    }
    console.log(response);
    localStorage.setItem('key', null);
    this.setState({key: null});
  }
  beep() {
    console.log('beep');
  }

  handleChange(e) {
    const name = e.target.name;
    this.setState({ [name]: e.target.value });
  }

  handleSubmit(e) {
    this.login();
    e.preventDefault();
  }

  componentDidMount() {
    const localKey = localStorage.getItem('key');
    const sKey = this.state.key;
    if (localKey && !sKey) {
      this.setState({key:localKey});
    }
  }
  render() {
    const sKey = this.state.key;
    return !this.state.key ? (
      <div className="App">
        <form onSubmit={this.handleSubmit}>
          <label>
            Email: <input type='text' value={this.state.email} name='email' onChange={this.handleChange} />
          </label>
          <label>
            Password: <input type='text' value={this.state.password} name='password' onChange={this.handleChange} />
          </label>
          <input type='submit' value='Submit' />
        </form>
      </div>
    ):(
      <>
      <Nav func={this.beep} />
      <Home apiKey={sKey} />
      </>
    );
  }
}

export default App;
