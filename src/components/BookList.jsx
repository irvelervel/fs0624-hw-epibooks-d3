import { Component } from 'react'
import { Container, Row, Col, Form } from 'react-bootstrap'
import SingleBook from './SingleBook'
import CommentArea from './CommentArea'

class BookList extends Component {
  // BookList nasce per ricevere dalle props un ARRAY di libri!
  // chiameremo questa prop... booksArray

  // le props nei componenti a classe si recuperano dentro "this.props"

  state = {
    searchValue: '',
    selectedBookAsin: '',
    // salviamo l'asin del libro selezionato qui, dentro BookList, perchè
    // dobbiamo passarlo anche a CommentArea; BookList è il padre più vicino
    // sia di SingleBook che di CommentArea
  }

  changeSelectedBookAsin = (newAsin) => {
    this.setState({
      selectedBookAsin: newAsin,
    })
  }

  render() {
    return (
      <Container>
        <Row className="my-5">
          <Col>
            <Form.Control
              type="text"
              placeholder="Cerca un libro"
              value={this.state.searchValue}
              onChange={(e) => {
                this.setState({
                  searchValue: e.target.value,
                })
              }}
            />
          </Col>
        </Row>
        <Row>
          <Col xs={12} md={8}>
            <Row>
              {this.props.booksArray
                .filter((book) =>
                  book.title
                    .toLowerCase()
                    .includes(this.state.searchValue.toLowerCase())
                )
                .map((scifiBook) => (
                  <Col xs={12} md={6} lg={3} key={scifiBook.asin}>
                    <SingleBook
                      libro={scifiBook} // i dati da mostrare
                      changeSelectedBookAsin={this.changeSelectedBookAsin}
                      // la funzione per cambiare lo stato di BookList
                      selectedBookAsin={this.state.selectedBookAsin}
                    />
                  </Col>
                ))}
            </Row>
          </Col>
          <Col xs={12} md={4} className="border border-2 border-dark">
            <CommentArea asin={this.state.selectedBookAsin} />
          </Col>
        </Row>
      </Container>
    )
  }
}

export default BookList
