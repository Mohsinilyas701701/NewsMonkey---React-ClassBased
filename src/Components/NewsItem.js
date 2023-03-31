import React, { Component } from "react";

export default class NewsItem extends Component {
  render() {
    let { title, description, imgUrl, newsUrl, author, date } = this.props;
    return (
      <div>
        <div className='card'>
          <img src={imgUrl} className='card-img-top' alt='...' />
          <div className='card-body'>
            <h5 className='card-title'>{title}...</h5>
            <p className='card-text'>{description}...</p>
            <p className='card-text'>
              <small className='text-danger'>
                By {author ? author : "Unknown"} on {new Date(date).toGMTString()}
              </small>
            </p>
            <a rel='noreferrer' href={newsUrl} target='_blank' className='btn btn-sm btn-dark'>
              Read More
            </a>
          </div>
        </div>
      </div>
    );
  }
}
