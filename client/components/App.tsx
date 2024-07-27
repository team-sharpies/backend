import { fetchStreamedResponse } from '../apiClient.ts'
import { useQuery } from '@tanstack/react-query'

function App() {
  const {
    data: apiResponse,
    isPending,
    isError,
  } = useQuery({
    queryKey: ['llm'],
    queryFn: () => fetchStreamedResponse("What is cheese?"),
  })

  if (isPending) {
    return <p>Loading...</p>
  }

  if (isError) {
    return <p>There was an error</p>
  }

  return (
    <>
<h1 style={{color: 'red'}}>Header</h1>
  <h2>{apiResponse}</h2>
    </>
)

}

export default App
