import React from 'react';
import { connect } from 'react-redux';
import ProfileHeader from './profile-header';
import ImageContainer from './image-container';
import Spinner from './spinner';
import { getImages } from '../action-creators';

export class Home extends React.Component {

	componentDidMount() {
		this.props.getImages();
	}
	render() {
		return (
			<div>
				<ProfileHeader />
				{this.props.isLoading ?
					<Spinner /> :
			    <ImageContainer imageList={this.props.imageList} />
	      }
	    </div>
		);
	}
}

function mapStateToProps(state) {
  return {
    imageList: state.get('imageList').toJS(),
    isLoading: state.getIn(['view', 'isLoading'])
  };
}

function mapDispatchToProps(dispatch) {
	return {
		getImages: () => dispatch(getImages())
	}
}

export const HomeContainer = connect(mapStateToProps, mapDispatchToProps)(Home);
