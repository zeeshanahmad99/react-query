import { SubmitHandler, useForm } from 'react-hook-form'
import {
  useCreateTodo,
  useDeleteTodo,
  useUpdateTodo,
} from '../services/mutations'
import { useTodoIds, useTodos } from '../services/queries'
import { Todo } from '../types/todo'

const Todos = () => {
  const todosIdsQuery = useTodoIds()
  const todosQueries = useTodos(todosIdsQuery.data)

  const { register, handleSubmit } = useForm<Todo>()

  const createTodoMutation = useCreateTodo()
  const updateTodoMutation = useUpdateTodo()
  const deleteTodoMutation = useDeleteTodo()

  const handleCreateTodoSubmit: SubmitHandler<Todo> = (data) => {
    createTodoMutation.mutate(data)
  }

  const handleMarkAsDoneSubmit = (data: Todo | undefined) => {
    if (data) {
      updateTodoMutation.mutate({ ...data, checked: true })
    }
  }

  const handleDeleteTodoSubmit = async (id: number) => {
    await deleteTodoMutation.mutateAsync(id)
    console.log('successful')
  }

  return (
    <>
      <form onSubmit={handleSubmit(handleCreateTodoSubmit)}>
        <h4>New Todo:</h4>
        <input placeholder="Title" {...register('title')} />
        <br />
        <input placeholder="Description" {...register('description')} />
        <br />
        <input
          type="submit"
          disabled={createTodoMutation.isPending}
          value={createTodoMutation.isPending ? 'Creating...' : 'Create todo'}
        />
      </form>

      <ul>
        {todosQueries.map(({ data }) => (
          <li key={data?.id}>
            <div>Id: {data?.id}</div>
            <span>
              <strong>Title: </strong>
              {data?.title}
              <strong>Description: </strong>
              {data?.description}
            </span>
            <div>
              <button
                onClick={() => handleMarkAsDoneSubmit(data)}
                disabled={data?.checked}
              >
                {data?.checked ? 'Done' : 'Mark as done'}
              </button>
              {data && (
                <button onClick={() => handleDeleteTodoSubmit(data.id!)}>
                  Delete
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </>
  )
}

export default Todos
