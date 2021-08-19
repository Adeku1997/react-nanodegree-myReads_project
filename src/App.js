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
    books: [],
  };

  updateSearchPageState = (state) => {
    this.setState({
      showSearchPage: state,
    });
  };

  componentDidMount() {
    BooksAPI.getAll().then((resp) => this.setState({ books: resp }))
  }

  changeTheBookShelf = (book, shelf) => {
    if (book.shelf !== shelf) {
      BooksAPI.update(book, shelf).then(() => {
        BooksAPI.getAll().then((resp) => {
          this.setState({ books: resp })
        })
      })
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
