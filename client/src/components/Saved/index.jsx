import React, { Component } from "react";
import API from "../../utils/API";

class Saved extends Component {
  state = {
    savedBooks: []
  };

  componentDidMount() {
    this.getSaved();
  }

  getSaved = () => {
    API.getSavedBooks()
      .then(res => this.setState({ savedBooks: res.data }))
      .catch(err => console.log(err));
  };

 
  delete = bookId => {
    API.deleteBook(bookId)
      .then(this.getSaved)
      .catch(err => console.log(err));
  };

  render() {
    return (
      <>
        
             <div className="container-fluid resultsWrap">
          <div className="row justify-content-center">
            {/* render book section */}
            <div className="col-12">
              {/* If books saved shows them if not jus the title No books */}
              {!this.state.savedBooks.length ? (
                <h2 className="SavedTitle">No books saved yet</h2>
              ) : (
                <>
                  <h2 className="SavedTitle">Saved Books</h2>
                  <div className="row">
                    {this.state.savedBooks.map(book => {
                      return (
                        <div className="col-lg-3  col-md-4 col-sm-6 allCard" key={book._id}>
                          <div className="card">
                            <img src={book.image} alt={book.title} className="card-img-top" />
                            <div className="card-body">
                              <h5 className="card-title">{book.title}</h5>
                              {book.date ? (<p className="card-text">Released:{book.date}</p>) : (<p>No Release Date</p>)}
                              {book.authors.length ? (<p className="card-text">By: {book.authors.join(", ")}</p>) : (<p>No Authors</p>)}
                              <p className="card-text block-with-text">
                                <strong>Description</strong>: {book.description}{" "}
                              </p>
                              <div className="row justify-content-center cardButton">
                              <button onClick={() => this.delete(book._id)} className="cardButton btn btn-danger btn-small">
                                Delete
                              </button>
                              <a
                                href={book.link}
                                rel="noopener noreferrer"
                                target="_blank"
                                className="cardButton btn btn-success btn-small">
                                Buy
                              </a>
                              </div>
                              </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Saved;
