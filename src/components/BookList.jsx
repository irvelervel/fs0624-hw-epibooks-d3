import { Component } from 'react'
import { Container, Row, Col, Form } from 'react-bootstrap'
import SingleBook from './SingleBook'

class BookList extends Component {
  // BookList nasce per ricevere dalle props un ARRAY di libri!
  // chiameremo questa prop... booksArray

  // le props nei componenti a classe si recuperano dentro "this.props"

  state = {
    searchValue: '',
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
          {this.props.booksArray
            .filter((book) =>
              book.title
                .toLowerCase()
                .includes(this.state.searchValue.toLowerCase())
            )
            .map((scifiBook) => (
              <Col xs={12} md={6} lg={3} key={scifiBook.asin}>
                <SingleBook libro={scifiBook} />
              </Col>
            ))}
        </Row>
      </Container>
    )
  }
}

export default BookList
