import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { fetchTodos, addTodo } from '../apis/todo.ts'
import LoadingSnapper from './LoadingSnapper.tsx'
import { useState } from 'react'
import { Todo, TodoData } from '../../models/todo.ts'
import { getCats } from '../apiFunction.ts'

export default function AddCat() {
  const [cat, setCat] = useState('')
  const {
    data: cats,
    isPending,
    isError,
  } = useQuery({
    queryKey: ['cats'],
    queryFn: getCats,
  })

  // 1 - set up query client
  const queryClient = useQueryClient()
  // 2 - set up useMutation inc invalidate query
  const addTodoMutation = useMutation({
    mutationFn: addCat,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['cats']})
    },
    onError: () => {console.log("Yikes")}
  })

  // 4 - set up useMutation inc modify query
  const addTodoMutation2 = useMutation({
    mutationFn: addCat,
    onSuccess: (res) => {
  //get the current query data
      const currentData = queryClient.getQueryData(['cats']) as Todo[]
  //add the new todo
      queryClient.setQueryData(['cats'], [...currentData, res])
    },
    onError: () => {console.log("Yikes")}
  })


  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCat(event.target.value)
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log(cat)
    // 3 - do something with our 'cat' state (send an API request or do a mutation)
    const newTodo: TodoData = {
      userId: 1,
      title: cat,
      completed: false
    }
    addTodoMutation2.mutate(newTodo)
    setCat('')
  }

  if (isError) {
    return <div>An error occurred</div>
  }

  if (isPending) {
    return <LoadingSnapper />
  }

  // 5 - add status indicator for mutation error, pending or success
  return (
    <>
        {addTodoMutation2.isError && <p>Error!</p>}
        {addTodoMutation2.isPending && <p>Adding todo...</p>}
        {addTodoMutation2.isSuccess && <p>Todo added</p>}
        <form onSubmit={handleSubmit}>
        <label htmlFor="todo">{"What's your next task?"} </label>
        <input
          type="cat"
          name="todo"
          id="todo"
          value={cat}
          onChange={handleChange}
        />
        <button type="submit">Add todo</button>
      </form>

}
