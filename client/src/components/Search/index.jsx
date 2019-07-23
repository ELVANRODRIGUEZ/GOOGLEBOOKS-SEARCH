import React, {Component} from "react";
import API from "../../utils/API";
import "./index.css";

class Search extends Component {
  state = {
    searchTerm: "",
    booksList: []
  };

  search = searchTerm => {
    API.searchBooks(searchTerm)
      .then(res => {
        //console.log(res.data);
        // take res.data.items array and create new array with less information
        const booksList = res.data.items.map(book => {
          return {
            bookId: book.id,
            authors: book.volumeInfo.authors,
            title: book.volumeInfo.title,
            date: book.volumeInfo.publishedDate,
            description: book.volumeInfo.description ? book.volumeInfo.description : "Without Description",
            image: book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : "https://via.placeholder.com/150x200/008000/FFFFFF?text=No+Image",
            link: book.volumeInfo.infoLink
          };
        });
        // set state to have new book list
        this.setState({ booksList, searchTerm: "" });
      })
      .catch(err => {
        console.log(err);
      });
  };

  handleInputChange = event => {
    const { name, value } = event.target;

    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (!this.state.searchTerm) {
      return false;
    }

    this.search(this.state.searchTerm);
  };

  saveBook = bookId => {
    // find book in this.state.booksList based on the bookId value
    const bookSelected = this.state.booksList.find(book => book.bookId === bookId);
    //console.log(bookSelected);
    API.saveBook(bookSelected)
      // .then(res => {
      //   console.log(res.data);
      // })
      .then(()=>{
        console.log("Book Saved");
      })
      .catch(err => {
        console.log(err);
      });
  };
  


  render() {
    return (
      <React.Fragment>
        <div class="jumbotron">
        <div className="searchwrap">
        <div className="row ">
            {/* form section */}
            <div className="col-5 searcForm">
              <h3>Search For A Book</h3>
              <form onSubmit={this.handleFormSubmit}>
                <input
                  name="searchTerm"
                  onChange={this.handleInputChange}
                  placeholder="Enter book name here"
                  value={this.state.searchTerm}
                  type="input"
                  className="form-control mb-3"
                />
                <button className="btn  btn-success" onClick={this.handleFormSubmit}>
                  Search.
                </button>
              </form>
            </div>
            {/* end form section */}
        </div>
        </div>
</div>
        <div className="container-fluid resultsWrap">
        <div className="row ">
            {/* begin book result section */}
            <div className="col-12">
              {!this.state.booksList.length ? (
                <h2 className="resultsTitle">No Results Yet</h2>
              ) : (
                <React.Fragment>
                  <h2>Search Results for: {this.state.searchTerm}</h2>
                  <div className="row">
                    {this.state.booksList.map(book => {
                      return (
                        <div className="col-lg-3  col-md-4 col-sm-6 allCard" key={book.bookId}>
                          <div className="card">
                            <img src={book.image} alt={book.title} className="card-img-top" />
                            <div className="card-body">
                              <h5 className="card-title">{book.title}</h5>
                             
                              {book.date ? (<p className="card-text">Released:{book.date}</p>) : (<p>No Release Date</p>)}
                              {book.authors ? (<p className="card-text">By: {book.authors.join(", ")}</p>) : (<p>No Authors</p>)}
                              <p className="card-text block-with-text">
                                <strong>Description</strong>: {book.description}{" "}
                              </p>
                              <div className="row justify-content-center cardButton">

                              <button onClick={() => this.saveBook(book.bookId)} className="cardButton btn btn btn-primary btn-small">
                                Save
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
                </React.Fragment>
              )}
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Search;