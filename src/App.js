import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import Search from './components/Search';
import BookCase from './components/BookCase';
import './App.css';

class BooksApp extends Component {
  state = {
    //this will store books data
    Books: []
  };

  componentWillMount() {
    //this will going to fetch the books
    this.fetch_books_details();
  } 

  fetch_books_details = () => {
    BooksAPI.getAll().then((books) => {
      this.setState({ Books: books })
    })
  }

  update_books_details = (book, shelf) => {
    BooksAPI.update(book, shelf).then(() => {
      this.fetch_books_details()
    })
  }
  
  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (<BookCase books ={this.state.Books} onChange={this.update_books_details} /> )} />
        <Route exact path="/search" render={({ history }) => (<Search my_books={this.state.Books} onChange={this.update_books_details} /> )} />
      </div>
    );
  }
}        

export default BooksApp;