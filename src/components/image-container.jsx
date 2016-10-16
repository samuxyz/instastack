import React from 'react';
import Image from './image';

export default class ImageContainer extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		const {imageList} = this.props;
		return(
			<div className="row">
				{imageList.map(image => <Image id={image.key} {...image}></Image>)}
			</div>
		);

	}
}