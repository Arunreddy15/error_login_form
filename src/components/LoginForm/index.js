// Write your JS code here
import {Component} from 'react'
import Cookies from 'js-cookies'

import './index.css'

class LoginForm extends Component {
  state = {username: '', password: '', showSubmitError: false, errorMsg: ''}

  onChangeInputUser = event => {
    // console.log(event.target.value)
    this.setState({username: event.target.value})
  }

  onChangeInputPassword = event => {
    // console.log(event.target.value)
    this.setState({password: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showSubmitError: true, errorMsg})
  }

  submitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  renderUsernameField = () => {
    const {username} = this.state
    return (
      <>
        <label htmlFor="username" className="username-label">
          USERNAME
        </label>
        <br />
        <input
          type="text"
          onChange={this.onChangeInputUser}
          value={username}
          id="username"
          className="input-field"
          placeholder="Enter Username"
        />
      </>
    )
  }

  renderPasswordField = () => {
    const {password} = this.state
    return (
      <>
        <label htmlFor="password" className="password-label">
          PASSWORD
        </label>
        <br />
        <input
          type="password"
          id="password"
          value={password}
          onChange={this.onChangeInputPassword}
          placeholder="Enter Password"
          className="input-field"
        />
      </>
    )
  }

  render() {
    const {showSubmitError, errorMsg} = this.state
    return (
      <div className="login-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
          alt="website logo"
          className="website-logo"
        />
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-login-img.png"
          alt="website login"
          className="website-login"
        />
        <form className="form-container" onClick={this.submitForm}>
          <div className="container-username">{this.renderUsernameField()}</div>
          <div className="container-password">{this.renderPasswordField()}</div>
          <button className="btn-login" type="submit">
            Login
          </button>
          {showSubmitError && <p className="errorMsg">*{errorMsg}</p>}
        </form>
      </div>
    )
  }
}
export default LoginForm
