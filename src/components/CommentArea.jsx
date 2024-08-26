import { Component } from 'react'
import CommentsList from './CommentsList'
import AddComment from './AddComments'

class CommentArea extends Component {
  state = {
    comments: [],
    updateCommentsList: false,
  }

  changeUpdateCommentsList = () => {
    this.setState({
      updateCommentsList: !this.state.updateCommentsList,
    })
  }

  componentDidMount = () => {
    this.fetchComments()
  }

  // la fetch all'avvio va anche bene, ma quello che ci serve sarebbe
  // richiamare la fetch ulteriormente ogni volta che cambia l'asin selezionato

  componentDidUpdate = (prevProps, prevState) => {
    if (prevProps.asin !== this.props.asin) {
      // abbiamo cliccato su un nuovo libro!
      this.fetchComments()
    }

    if (prevState.updateCommentsList !== this.state.updateCommentsList) {
      this.fetchComments()
      // recupero nuovamente i commenti anche quando cambia la variabile di stato
      // (updateCommentsList) che avevo creato per avvisarmi di quanto AddComment
      // posta con successo una recensione
    }
  }

  fetchComments = () => {
    // fetch(`https://striveschool-api.herokuapp.com/api/comments/${this.props.asin}`)
    fetch(
      'https://striveschool-api.herokuapp.com/api/comments/' + this.props.asin,
      {
        headers: {
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmM3NTU5MDQzYTU2ODAwMTU4ZWM0N2QiLCJpYXQiOjE3MjQzMzk2MDAsImV4cCI6MTcyNTU0OTIwMH0.3s4fBf_wAd6_WnhGb2s25J5AGcbrlGuBdE9CbFjQhPQ',
        },
      }
    )
      .then((response) => {
        if (response.ok) {
          return response.json()
        } else {
          throw new Error('errore nel recupero delle recensioni')
        }
      })
      .then((arrayOfComments) => {
        console.log(arrayOfComments)
        this.setState({
          comments: arrayOfComments, // metto le recensioni da API nello stato
        })
      })
      .catch((err) => {
        console.log(err)
      })
  }

  render() {
    return (
      <div>
        <CommentsList comments={this.state.comments} />
        <AddComment
          asin={this.props.asin}
          changeUpdateCommentsList={this.changeUpdateCommentsList}
        />
        {/* prop drilling: prendo una prop da sopra, SingleBook, a sotto, AddComment */}
      </div>
    )
  }
}

export default CommentArea
