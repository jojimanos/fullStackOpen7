import { useParams } from "react-router-dom"

const Anecdote = ({anecdotes}) => {
    
    const params = useParams().id
    console.log(params)
    const anecdote = anecdotes.filter(a => {return a.id == params ? a : null})
    console.log(anecdote)

    return (
        <div>
            {anecdote[0].content}
        </div>
    )
}

export default Anecdote