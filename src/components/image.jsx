import React from 'react';
import { Link } from 'react-router';

export default class Image extends React.Component {

	render() {
		const { id, url } = this.props;
		return (
			<div className="col-xs-12 col-sm-6 col-md-4 p-y-15">
				<Link to={`/detail/${id}`}>
        	<img className="img-responsive" src={url} />
        </Link>
      </div>
		);
	}
}
