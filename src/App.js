import React, { Component } from 'react';
import Navigation from './Components/Navigation'
import Logo from './Components/Logo'
import Rank from './Components/Rank'
import ImageLinkForm from './Components/ImageLinkForm'
import FaceRecognition from './Components/FaceRecognition'
import Signin from './Components/Signin'
import Register from './Components/Register'
import './App.css';
import Particles from 'react-particles-js';

// Passed to particles params to create the background
const particlesOptions = {
	particles: {
		number: {
			value: 100,
			density: {
				enable: true,
				value_area: 800
			}
		}
	}
}

// Used to reset state variable into their initial value
const initialState = {
	input: '',
	imageUrl: '',
	box: {},
	route: 'signin',
	isSignedIn: false,
	user: {
		id: 0,
		user: '',
		email: '',
		entries: 0,
		joined: ''
	}
}

class App extends Component {

	constructor(){
		super();
		this.state = initialState;
	}

	// Used in Register and Signin on successful call
	// Executed by Register and Signin
	loadUser = (userLogged) => {
		this.setState({
			user: {
				id: userLogged.id,
				user: userLogged.name,
				email: userLogged.email,
				entries: userLogged.entries,
				joined: userLogged.joined
			}
		});
	}

	// Calculate positions of the box from API response
	calculateFaceLocation = (data) => {
		const ClarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box
		const image = document.getElementById('inputImage');
		const width = Number(image.width);
		const height = Number(image.height);
		return {
			leftCol: ClarifaiFace.left_col * width,
			topRow: ClarifaiFace.top_row * height,
			rightCol: width - ClarifaiFace.right_col * width,
			bottomRow: height - ClarifaiFace.bottom_row * height
		}
	}

	// Create the box around the face
	displayFaceBox = (box) => {
		this.setState({
			box: box
		});
	}

	// Event onChange: update state input value
	// Executed by ImageLinkForm
	onInputChange = (event) => {
		this.setState({
			input: event.target.value
		})
	}

	// Call the API for the image selected
	// Executed by ImageLinkForm
	onButtonSubmit = () => {
		this.setState({
			imageUrl: this.state.input
		})
		fetch('https://face-recognition-1111.herokuapp.com/imageurl',{
			method: 'post',
			headers: {'Content-Type':'application/json'},
			body: JSON.stringify({
				input: this.state.input
			})
		})
			.then(response => response.json())
			.then(response => {
				if(response){
					fetch('https://face-recognition-1111.herokuapp.com/image',{
						method: 'put',
						headers: {'Content-Type':'application/json'},
						body: JSON.stringify({
							id: this.state.user.id
						})
					})
						.then(response => response.json())
						.then(entry => {
							// I want to update only entries in the object
							// Other values will have to stay the same
							this.setState(
								{	
									user: {
										id: this.state.user.id,
										user: this.state.user.user,
										email: this.state.user.email,
										entries: entry,
										joined: this.state.user.joined
									}
								}
							)
						})
						.catch(console.log)
				}
				this.displayFaceBox(this.calculateFaceLocation(response))
			})
			.catch(err => console.log(err))
	}

	// Called when the page changes.
	// Route is "home" when i'm logged in
	// Route is "signin" or "register" when no user is logged
	onRouteChange = (route) => {
		if(route === 'home')
			this.setState({ isSignedIn: true })
		else
			this.setState(initialState)
		this.setState({
			route: route
		})
	}

  render() {
  	const { imageUrl, box, route, isSignedIn } = this.state;
    return (
      <div className="App">
      	<Particles
      		className='particles' 
      		params={particlesOptions} 
      	/>
      	<Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
        {
        	route === 'home'
        	?
        	<div>
		        <Logo />
		        <Rank entries={this.state.user.entries} name={this.state.user.user}/>
		        <ImageLinkForm 
		        	onInputChange={this.onInputChange} 
		        	onButtonSubmit={this.onButtonSubmit}
		        />
		        <FaceRecognition 
		        	imageUrl={imageUrl}
		        	box={box}
		        />
		      </div>
		      :
		      (	route === 'signin'
		      	?	<Signin onRouteChange={this.onRouteChange} loadUser={this.loadUser} />
		      	: <Register onRouteChange={this.onRouteChange} loadUser={this.loadUser} />
		      )
	      }
      </div>
    );
  }
}

export default App;
