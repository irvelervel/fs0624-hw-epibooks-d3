import { ListGroup } from 'react-bootstrap'
import SingleComment from './SingleComment'

const CommentsList = (props) => {
  // l'array di recensione sarà in props.comments
  return (
    <ListGroup>
      {props.comments.map((c) => {
        // qui dentro faremo vedere UNA recensione alla volta,
        // grazie al componente SingleComment
        return <SingleComment commento={c} />
      })}
    </ListGroup>
  )
}

export default CommentsList
