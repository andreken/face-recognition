import React from 'react';

const Rank = (props) => {
	return(
		// Shows a string with username and his entries
		<div className=''>
			<div className='white f3'>
				{`${props.name}, your current entry count is ...`}
			</div>
			<div className='white f1'>
				{props.entries}
			</div>
		</div>
	)
}

export default Rank;