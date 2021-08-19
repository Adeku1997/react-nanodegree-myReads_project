import React, { Component } from 'react'
import Shelf  from './Shelf';

class BookShelves extends Component{
    render() {
        const totalBooks=this.props.totalBooks;
        const currentlyReading = totalBooks.filter(book => book.shelf === "currentlyReading");
        const wantToRead = totalBooks.filter(book => book.shelf === "wantToRead");
        const read = totalBooks.filter(book => book.shelf === "read");

        return <div className="list-books-content">
            <div>
              <Shelf books={currentlyReading} title={"Currently Reading"} changeShelf={this.props.changeShelf} />
              <Shelf books={wantToRead} title={"Want to Read"} changeShelf={this.props.changeShelf} />
              <Shelf books={read} title={"Read"} changeShelf={this.props.changeShelf} />
            </div>
          </div>;
    }
 
}

export default BookShelves; 