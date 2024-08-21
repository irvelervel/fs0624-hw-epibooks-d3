import { Component } from 'react'
import { Card } from 'react-bootstrap'

class SingleBook extends Component {
  // so già che riceverò tra le props di questo componente
  // "libro", ovvero un singolo elemento dell'array dei libri scifi
  // props.libro <-- l'oggetto del singolo libro

  state = {
    selected: false,
  }

  render() {
    return (
      <Card
        // className={this.state.selected ? 'diana border border-2 border-danger' : 'diana'}
        style={
          this.state.selected
            ? {
                border: this.state.selected
                  ? '2px solid red'
                  : '1px solid gray',
              }
            : {}
        }
      >
        <Card.Img
          variant="top"
          src={this.props.libro.img}
          onClick={() => {
            this.setState({
              selected: !this.state.selected, // sempre l'inverso
            })
          }}
        />
        <Card.Body>
          <Card.Title>{this.props.libro.title}</Card.Title>
          <Card.Text>
            {this.props.libro.category} - {this.props.libro.price}£
          </Card.Text>
        </Card.Body>
      </Card>
    )
  }
}

export default SingleBook
