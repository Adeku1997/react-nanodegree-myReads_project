import React from 'react'
import * as  BooksAPI from './BooksAPI'
import './App.css'
import BookShelves from './components/BookShelves';
import BookSearch from './components/BookSearch';
import SearchButton from './components/SearchButton';
import Header from './components/Header';
import { Link, Route } from 'react-router-dom';

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
    books: [],
  };

  updateSearchPageState = (state) => {
    this.setState({
      showSearchPage: state,
    });
  };

  componentDidMount() {
    BooksAPI.getAll().then((resp) => this.setState({ books: resp }));
  }

  changeTheBookShelf = (book, shelf) => {
    if (book.shelf !== shelf) {
      BooksAPI.update(book, shelf).then(() => {
        BooksAPI.getAll().then((resp) => {
          this.setState({ books: resp });
        });
      });
    }
  };

 
  render() {
    return (
      <div className="app">
          <Route path='/search' render={() =>(
            <BookSearch
            showSearchPage={this.updateSearchPageState}
            changeShelf={this.changeTheBookShelf}
           />
         )}
         />
          
          <div className="list-books">
            <Route exact  path='/' render={() => (
              <div>
             <Header />
             <BookShelves
              totalBooks={this.state.books}
              changeShelf={this.changeTheBookShelf}
            />
            <Link to='/search'>
            <SearchButton/>
            </Link>

             </div>
        )}
      />
      </div>
      </div>
    );
  }
}

export default BooksApp
