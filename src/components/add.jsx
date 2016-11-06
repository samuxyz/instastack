import React from 'react';
import { connect } from 'react-redux';
import Spinner from './spinner';
import {
	uploadImage,
	postImage,
	setFilters
} from '../action-creators';

export class Add extends React.Component {

	createFilterUrl() {
		const filterOptions = document.getElementsByClassName('filter-options');
		let selectedFilters = [];
		for(let i = 0; i < filterOptions.length; i++) {
			if(filterOptions[i].checked) {
				selectedFilters.push(filterOptions[i].value);
			}
		}
		this.props.setFilters(selectedFilters.join('/') + '/');
	}
	getImageUrl() {
		return this.props.image ? `https://process.filestackapi.com/${this.props.filter}${this.props.image}` : ``;
	}
	
	render() {
		return (
			<div>
				{this.props.isLoading ?
					<Spinner /> :
					<div className="row">
						<div className="col-md-offset-2 col-md-8">
							<div className="panel panel-default">
								<div className="panel-heading">
									<h2 className="panel-title text-center">
										<span className="glyphicon glyphicon-upload" /> Upload an Image
									</h2>
								</div>
								<div className="panel-body">
									<form name="product-form" id="product-form" noValidate>
										<div className="form-group">
											<label >Filters</label>
											<div className="checkbox-group" onClick={() => this.createFilterUrl()}>
											  <div className="checkbox"><label><input type="checkbox" className="filter-options" value="sharpen" />Sharpen</label></div>
											  <div className="checkbox"><label><input type="checkbox" className="filter-options" value="blur" />Blur</label></div>
											  <div className="checkbox"><label><input type="checkbox" className="filter-options" value="blackwhite" />Black & White</label></div>
											  <div className="checkbox"><label><input type="checkbox" className="filter-options" value="sepia" />Sepia</label></div>
											  <div className="checkbox"><label><input type="checkbox" className="filter-options" value="pixelate" />Pixelate</label></div>
											  <div className="checkbox"><label><input type="checkbox" className="filter-options" value="oil_paint" />Oil Paint</label></div>
											  <div className="checkbox"><label><input type="checkbox" className="filter-options" value="negative" />Negative</label></div>
											  <div className="checkbox"><label><input type="checkbox" className="filter-options" value="modulate" />Modulate</label></div>
											</div>
										</div>
										<div className="form-group ">
						          <label htmlFor="picture">Picture</label>
						          <div className="text-center dropup">
						            <button id="button-upload" type="button" className="btn btn-default filepicker" onClick={() => this.props.uploadImage()}>
						              Upload <span className="caret" />
						            </button>
						          </div>
						        </div>
						        <div className="form-group text-center">
											<img className="img-responsive" src={this.getImageUrl()}></img>
										</div>
										<button type="button" className="btn btn-filestack btn-block" onClick={() => this.props.postImage()}>Submit</button>
									</form>
								</div>
							</div>
						</div>
					</div>
				}
			</div>
		);
	}
}

function mapStateToProps(state) {
  return {
    image: state.get('upload').get('handle'),
    filter: state.get('upload').get('filters'),
    isLoading: state.getIn(['view', 'isLoading'])
  };
}
function mapDispatchToProps(dispatch) {
	return {
		uploadImage: () => dispatch(uploadImage()),
		setFilters: filters => dispatch(setFilters(filters)),
		postImage: () => dispatch(postImage())
	}
}
export const AddContainer = connect(mapStateToProps, mapDispatchToProps)(Add);
