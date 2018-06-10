import React from 'react';

class Register extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			email: '',
			password: '',
			user: ''
		}
	}

	// Event email change: get the value and save it in state
	onEmailChange = (event) => {
		this.setState({ email: event.target.value })
	}

	// Event password change: get the value and save it in state
	onPasswordChange = (event) => {
		this.setState({ password: event.target.value })
	}

	// Event user change: get the value and save it in state
	onUserChange = (event) => {
		this.setState({ user: event.target.value })
	}	

	// Event register clicked: fetch to the server adding the new profile
	// I have to do a post call passing a json with data (mail, pwd and user)
	onSubmitRegister = () => {
		console.log(this.state);
		fetch('https://face-recognition-1111.herokuapp.com/register',{
			method: 'post',
			headers: {'Content-Type':'application/json'},
			body: JSON.stringify({
				email: this.state.email,
				password: this.state.password,
				user: this.state.user
			})
		})
			.then(response => response.json())
			.then(user => {
				if(user.id){
					this.props.loadUser(user);
					this.props.onRouteChange('home');
				} else {
					alert(user)
				}
			})
	}

	render(){
		return(
			<article className="br3 ba dark-gray b--black-10 mv4 w-100 mw6 shadow-5 center">
				<main className="pa4 black-80 w-70">
				  <htmlForm className="measure" onSubmit={this.props.onRouteChange}>
				    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
				      <legend className="f2 fw6 ph0 mh0">Register</legend>
				      <div className="mt3">
				        <label className="db fw6 lh-copy f5" htmlFor="username">Username</label>
				        <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
				        type="text" name="username"  id="username" 
				        onChange={this.onUserChange} />
				      </div>
				      <div className="mt3">
				        <label className="db fw6 lh-copy f5" htmlFor="email-address">Email</label>
				        <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
				        type="email" name="email-address"  id="email-address"
				        onChange={this.onEmailChange}  />
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
					      type="submit" value="Register"
					      onClick={this.onSubmitRegister} 
				      />
				    </div>
				  </htmlForm>
				</main>
			</article>
		)
	}
}

export default Register;