// import { fetchStreamedResponse } from '../apiClient.ts'
// import { useQuery } from '@tanstack/react-query'

function App() {

  // const [question, setQuestion] = useState('')

  
  
  // const {
  //   data: apiResponse,
  //   isPending,
  //   isError,
  // } = useQuery({
  //   queryKey: ['llm'],
  //   queryFn: () => fetchStreamedResponse("What is cheese?"),
  // })
  
  // if (isPending) {
  //   return <p>Loading...</p>
  // }
  
  // if (isError) {
  //   return <p>There was an error</p>
  // }
  
  // function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
  //  //  event.preventDefault()
  //  setQuestion(event.target.value)
  // }

  // async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    
  // }
  return (
    <>
<h1 style={{color: 'red'}}>Header</h1>
  {/* <h2>{apiResponse}</h2> */}
  <form >
    <label>
      What is your question?
      {/* <input onChange={handleChange(question)}type="text" name="question" value={question}/> */}
    </label>
  </form>
    </>
)

}

export default App
