import "./App.css";

import React, { Component } from "react";
import Navbar from "./Components/Navbar";
import News from "./Components/News";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";

export default class App extends Component {
  perPageArticles = 10;
  apiKey = process.env.REACT_APP_NEWS_API;
  state = {
    progress: 10,
  };

  setProgress = (progress) => {
    this.setState({ progress: progress });
  };

  render() {
    return (
      <div>
        <Router>
          <Navbar />
          <LoadingBar color='#f11946' height={5} progress={this.state.progress} />
          <Routes>
            <Route
              exact
              path='/'
              element={
                <News
                  setProgress={this.setProgress}
                  apiKey={this.apiKey}
                  pageSize={this.perPageArticles}
                  key='general'
                  country='us'
                  category='general'
                />
              }
            ></Route>
            <Route
              exact
              path='business'
              element={
                <News
                  apiKey={this.apiKey}
                  setProgress={this.setProgress}
                  pageSize={this.perPageArticles}
                  key='business'
                  country='us'
                  category='business'
                />
              }
            ></Route>
            <Route
              exact
              path='entertainment'
              element={
                <News
                  setProgress={this.setProgress}
                  apiKey={this.apiKey}
                  pageSize={this.perPageArticles}
                  key='entertainment'
                  country='us'
                  category='entertainment'
                />
              }
            ></Route>
            <Route
              exact
              path='general'
              element={
                <News
                  apiKey={this.apiKey}
                  setProgress={this.setProgress}
                  pageSize={this.perPageArticles}
                  key='general'
                  country='us'
                  category='general'
                />
              }
            ></Route>
            <Route
              exact
              path='health'
              element={
                <News
                  setProgress={this.setProgress}
                  apiKey={this.apiKey}
                  pageSize={this.perPageArticles}
                  key='health'
                  country='us'
                  category='health'
                />
              }
            ></Route>
            <Route
              exact
              path='science'
              element={
                <News
                  apiKey={this.apiKey}
                  setProgress={this.setProgress}
                  pageSize={this.perPageArticles}
                  key='science'
                  country='us'
                  category='science'
                />
              }
            ></Route>
            <Route
              exact
              path='sports'
              element={
                <News
                  setProgress={this.setProgress}
                  apiKey={this.apiKey}
                  pageSize={this.perPageArticles}
                  key='sports'
                  country='us'
                  category='sports'
                />
              }
            ></Route>
            <Route
              path='technology'
              element={
                <News
                  apiKey={this.apiKey}
                  setProgress={this.setProgress}
                  pageSize={this.perPageArticles}
                  key='technology'
                  country='us'
                  category='technology'
                />
              }
            ></Route>
          </Routes>
        </Router>
      </div>
    );
  }
}
