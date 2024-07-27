import { getWelcome } from '../apiClient.ts'
import { useQuery } from '@tanstack/react-query'

function App() {
  const {
    data: welcome,
    isPending,
    isError,
  } = useQuery({
    queryKey: ['welcome'],
    queryFn: () => getWelcome(),
  })

  if (isPending) {
    return <p>Loading...</p>
  }

  if (isError) {
    return <p>There was an error</p>
  }

  return <h1>{welcome.statement}</h1>
}

export default App
