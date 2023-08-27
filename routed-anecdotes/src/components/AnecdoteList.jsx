import { Link } from "react-router-dom"

const noStyle = {
  textDecoration: 'none',
  color: 'black'
}

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map(anecdote => <li key={anecdote.id} >
        <Link 
          style={noStyle} 
          to={`/${anecdote.id}`}>{anecdote.content}</Link></li>)}
    </ul>
  </div>
)

export default AnecdoteList