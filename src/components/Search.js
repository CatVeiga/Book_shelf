import React, { Component } from 'react';
import BookList from './BookList';
import * as BooksAPI from '../BooksAPI';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';

class Search extends Component {
   static propTypes = {
       my_books: PropTypes.array.isRequired,
       onChange: PropTypes.func.isRequired
   }

   state = {
       query: '',
       Books: []
   }

   handleChange = (e) => {
       const value = e.target.value;
       this.setState(() => {
           return { query: value }           
       })
       this.search_books(value)
   }

   changeBookShelf = (books) => {
       let booksAll = this.props.my_books;

       for(let book of books) {
        book.shelf = "none";
       }

       for(let book of books) {
           for(let b of booksAll) {
               if(b.id === book.id) {
                   book.shelf = b.shelf;
               }
           }
       }
       return books;
   }

   search_books = (val) => {
       if(val.length !== 0) {
           BooksAPI.search(val, 10).then((books) => {
               if(books.length > 0) {

                   books = books.filter((book) => (book.imageLinks))
                   books = this.changeBookShelf(books)
                   this.setState(() => {
                       return { Books: books }
                   })
               }
           })
       } else {
           this.setState({
               Books: [],
               query: '' })
       }
   }

   add_book = (book, shelf) => {
       this.props.onChange(book, shelf)
   }

    render() {
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to="/" className="close-search">Close</Link>
                    <div className="search-books-input-wrapper">
                        <input type="text" placeholder="Search by title or author" onChange={this.handleChange} value={this.state.query}/>
                    </div>
                </div>
            <div className="search-books-results">
                <ol className="books-grid">
                    {this.state.query.length > 0 && this.state.Books.map((book, index) => (<BookList book={book} key={index} onUpdate={(shelf) => {
                    this.add_book(book, shelf)
                    }} />))}
                </ol>
            </div>
          </div>
        );
    }
}
export default Search;