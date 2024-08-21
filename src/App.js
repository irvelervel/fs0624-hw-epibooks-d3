import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
// import SingleBook from './components/SingleBook'
import scifiBooks from './data/scifi.json'
import BookList from './components/BookList'
// scifiBooks è un ARRAY di libri

function App() {
  return (
    <div className="App">
      {/* <div className="examples">
        <SingleBook libro={scifiBooks[10]} />
        <SingleBook libro={scifiBooks[0]} />
        <SingleBook libro={scifiBooks[49]} />
      </div> */}
      <BookList booksArray={scifiBooks} />
    </div>
  )
}

export default App
