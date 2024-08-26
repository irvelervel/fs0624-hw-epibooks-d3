import { Component } from 'react'
import { Button, Form } from 'react-bootstrap'

class AddComment extends Component {
  state = {
    review: {
      comment: '',
      rate: '1',
      elementId: this.props.asin, // questo è l'asin del libro selezionato,
      // lo prendiamo direttamente dalle props che ci passa CommentArea e
      // lo assegniamo come valore a elementId nello stato

      // ora this.props.asin inizialmente è stringa vuota!
      // dovremmo mantenerlo aggiornato ogni volta che selezioniamo un nuovo libro
    },
  }

  componentDidUpdate = (prevProps) => {
    if (prevProps.asin !== this.props.asin) {
      // ora manteniamo aggiornato elementId in this.state.rewiew
      this.setState({
        review: {
          ...this.state.review,
          elementId: this.props.asin,
          // ora l'asin nello state è aggiornato con il valore ricevuto nelle props
          // (valore che abbiamo ricevuto quando abbiamo cliccato su un nuovo libro)
        },
      })
    }
  }

  handleSubmit = (e) => {
    e.preventDefault()
    // postiamo il nuovo commento
    fetch('https://striveschool-api.herokuapp.com/api/comments/', {
      method: 'POST',
      headers: {
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmM3NTU5MDQzYTU2ODAwMTU4ZWM0N2QiLCJpYXQiOjE3MjQzMzk2MDAsImV4cCI6MTcyNTU0OTIwMH0.3s4fBf_wAd6_WnhGb2s25J5AGcbrlGuBdE9CbFjQhPQ',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.state.review),
    })
      .then((response) => {
        if (response.ok) {
          alert('Commento salvato!')
          // quando il commento viene salvato con successo,
          // cambio lo stato di CommentArea
          //
          this.props.changeUpdateCommentsList()
          //
          this.setState({
            review: {
              // elementId: this.state.elementId,
              ...this.state.review,
              rate: '1',
              comment: '',
            },
          })
        } else {
          alert('Commento NON salvato!')
          throw new Error('Errore nel salvataggio')
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  render() {
    return (
      <div className="mt-3">
        <Form onSubmit={this.handleSubmit}>
          <Form.Select
            value={this.state.review.rate}
            onChange={(e) => {
              this.setState({
                review: {
                  ...this.state.review,
                  rate: e.target.value,
                },
              })
            }}
          >
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </Form.Select>
          <Form.Group>
            <Form.Control
              placeholder="Scrivi la tua review"
              value={this.state.review.comment}
              onChange={(e) => {
                this.setState({
                  review: {
                    ...this.state.review, // spread operator
                    // un modo in cui trascinare qui dentro tutto il contenuto
                    // di un altro oggetto
                    comment: e.target.value,
                  },
                })
              }}
            />
          </Form.Group>
          <Button variant="success" type="submit">
            INVIA
          </Button>
        </Form>
      </div>
    )
  }
}

export default AddComment

// const arr1 = ['uno', 'due', 'tre']

// const arr2 = [ ...arr1, 'quattro' ]
