import React, { Component } from "react";
import * as BooksAPI from "../BooksAPI";
import SearchForm from "./SearchForm";
import SearchResults from "./SearchResults";
import _ from 'lodash';
import {Link} from 'react-router-dom'

class BookSearch extends Component {
  state = {
    searchBooks: [],
    query: "",
  };

  searchForBooks = _.debounce((query) => {
    if (query.length > 0) {
      BooksAPI.search(query).then((books) => {
        if (books.error) {
          this.setState({ searchBooks: [] });
        } else {
          this.setState({ searchBooks: books });
        }
      });
    } else {
      this.setState({ searchBooks: [] });
    }
  }, 150);

  refreshBooks = () => {
    this.searchForBooks(this.state.query);
  };

  resetSearch = () => {
    this.setState({ searchBooks: [], query: "" });
  };

  updateQuery = (event) => {
    this.setState(
      {
        query: event.target.value,
      },
      () => this.searchForBooks(this.state.query)
    );
  };

  render() {
    return <div className="search-books">
        <div className="search-books-bar">
          <Link to="/">
            <button className="close-search">Close</button>
          </Link>

          <SearchForm onResetSearch={this.resetSearch} onUpdateQuery={this.updateQuery} query={this.state.query} />
        </div>

        <SearchResults books={this.state.searchBooks} changeShelf={this.props.changeShelf} refreshBooks={this.refreshBooks} />
      </div>;
  }
}

export default BookSearch;
