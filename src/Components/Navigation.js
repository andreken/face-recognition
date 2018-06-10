import React from 'react';

const Navigation = (props) => {
	// Shows the upper right menu
	// Display sign out if logged, otherwise sign in and register 
	if(props.isSignedIn){
		return(
			<nav style={{ display:'flex',justifyContent:'flex-end' }}>
				<p onClick={() => props.onRouteChange('signin')} 
				className='f3 link dim black underline pa3 pointer'>Sign out</p>
			</nav>
		)
	} else {
		return(
			<nav style={{ display:'flex',justifyContent:'flex-end' }}>
				<p onClick={() => props.onRouteChange('signin')} 
				className='f3 link dim black underline pa3 pointer'>Sign In</p>
				<p onClick={() => props.onRouteChange('register')} 
				className='f3 link dim black underline pa3 pointer'>Register</p>
			</nav>
		)
	}
}

export default Navigation;