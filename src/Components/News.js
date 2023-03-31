import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export default class News extends Component {
  static defaultProps = {
    country: "us",
    pageSize: 6,
    category: "sports",
  };

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };

  capitalizeTitle = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  constructor(props) {
    super(props);
    console.log("hello, I am a constructor from news component.");
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults: 0,
    };

    document.title = `${this.capitalizeTitle(this.props.category)} - NewsMonkey`;
  }

  updateNews = async () => {
    this.props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    this.props.setProgress(30);
    let parsedData = await data.json();
    this.props.setProgress(70);

    // console.log(parsedData);
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    });
    this.props.setProgress(100);
  };

  async componentDidMount() {
    this.updateNews();
  }

  handlePrevClick = async () => {
    console.log("prev");
    this.setState({ page: this.state.page - 1 });
    this.updateNews();
  };

  handleNextClick = async () => {
    console.log("Next");
    this.setState({ page: this.state.page + 1 });
    this.updateNews();
  };

  fetchMoreData = async () => {
    this.setState({ page: this.state.page + 1 });
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=7fe9c8f61eb84788b3e79dbf6bb79361&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    // console.log(parsedData);
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults,
    });
  };

  render() {
    // console.log("render");
    return (
      <>
        <h1 className='text-center my-5'>
          News Monkey - Top {this.capitalizeTitle(this.props.category)} Headlines
        </h1>
        {this.state.loading && <Spinner />}

        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner />}
          scrollableTarget='scrollableDiv'
        >
          <div className='container'>
            <div className='row'>
              {this.state.articles.map((element) => {
                return (
                  <div className='col-md-4 my-2' key={element.url}>
                    <NewsItem
                      title={element.title ? element.title.slice(0, 20) : ""}
                      description={element.description ? element.description.slice(0, 88) : ""}
                      imgUrl={
                        element.urlToImage
                          ? element.urlToImage
                          : "https://i.ytimg.com/vi/alsrnCc0fUQ/maxresdefault.jpg"
                      }
                      newsUrl={element.url}
                      author={element.author}
                      date={element.publishedAt}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </InfiniteScroll>
        <div className='container d-flex justify-content-between align-items-center my-5'>
          <button
            disabled={this.state.page <= 1}
            type='button'
            className='btn btn-dark'
            onClick={this.handlePrevClick}
          >
            &laquo; Prev
          </button>
          <button
            type='button'
            disabled={
              this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)
            }
            className='btn btn-dark'
            onClick={this.handleNextClick}
          >
            Next &raquo;
          </button>
        </div>
      </>
    );
  }
}
