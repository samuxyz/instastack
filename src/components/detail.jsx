import React from 'react';
import { connect } from 'react-redux';
import { getImages } from '../action-creators';
import Spinner from './spinner';

export class Detail extends React.Component {

	imageUrl() {
		if (this.props.imageList.length === 0) {
			this.props.getImages();
			return '';
		} else {
			const { id } = this.props.params;
			return this.props.imageList[id].url;
		}
	}
	render() {
		return(
			<div>
				{this.props.isLoading ?
					<Spinner/> :
					<div className="row m-t-4">
						<div className="col-md-12">
							<img className="img-responsive center-block" src={this.imageUrl()} />
						</div>
					</div>
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

export const DetailContainer = connect(mapStateToProps, mapDispatchToProps)(Detail);
