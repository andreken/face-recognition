import React from 'react';
import './FaceRecognition.css'

const FaceRecognition = ({ imageUrl, box }) => {
	return(
		<div className='center ma'>
			<div className='absolute mt2'>
				<img id='inputImage' className='resize' src={imageUrl} />
				<div className='bounding-box'
						style={{'left':box.leftCol,'right':box.rightCol,'top':box.topRow,'bottom':box.bottomRow}}>
				</div>
			</div>
		</div>
	)
}

export default FaceRecognition;