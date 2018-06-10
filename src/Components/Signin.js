import React from 'react';

class Signin extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			signInEmail: '',
			signInPassword: ''
		}
	}

	// Event email change: get the value and save it in state
	onEmailChange = (event) => {
		this.setState({ signInEmail: event.target.value })
	}

	// Event password change: get the value and save it in state
	onPasswordChange = (event) => {
		this.setState({ signInPassword: event.target.value })
	}

	// Event sign in clicked: fetch to the server getting the profile
	// I have to do a post call passing a json with data (mail and pwd)
	onSubmitSignIn = () => {
		fetch('https://face-recognition-1111.herokuapp.com/signin',{
			method: 'post',
			headers: {'Content-Type':'application/json'},
			body: JSON.stringify({
				email: this.state.signInEmail,
				password: this.state.signInPassword
			})
		})
			.then(response => response.json())
			.then(user => {
				if(user.id){
					this.props.loadUser(user);
					this.props.onRouteChange('home')
				} else {
					alert(user)
					this.resetInputFields()
				}
			})
	}

	// Reset email and password values, both on state and input form
	resetInputFields = () => {
		this.setState({ signInEmail: '', signInPassword: '' })
		var input = document.querySelectorAll('htmlForm fieldset input')
		input[0].value = ''
		input[1].value = ''
	}

	render() {	
		return(
			<article className="br3 ba dark-gray b--black-10 mv4 w-100 mw6 shadow-5 center">
				<main className="pa4 black-80 w-70">
				  <htmlForm className="measure" onSubmit={this.props.onRouteChange}>
				    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
				      <legend className="f2 fw6 ph0 mh0">Sign In</legend>
				      <div className="mt3">
				        <label className="db fw6 lh-copy f5" htmlFor="email-address">Email</label>
				        <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
				        type="email" name="email-address"  id="email-address" 
				        onChange={this.onEmailChange} />
				      </div>
				      <div className="mt4 mb3">
				        <label className="db fw6 lh-copy f5" htmlFor="password">Password</label>
				        <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
				        type="password" name="password"  id="password" 
				        onChange={this.onPasswordChange} />
				      </div>
				    </fieldset>
				    <div className="">
				      <input 
					      className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f5 dib"
					      type="submit" value="Sign in"
					      // If i use this.props.onRouteChange('home'), the function is called on render
					      // I need arrow function to call it only when i click
					      // onClick={() => this.props.onRouteChange('home')}
					      onClick={this.onSubmitSignIn}
				      />
				    </div>
				    <div className="lh-copy mt3">
				      <p onClick={() => this.props.onRouteChange('register')} className="f5 link dim black db pointer">Register</p>
				    </div>
				  </htmlForm>
				</main>
			</article>
		)
	}
}

export default Signin;