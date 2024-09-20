import { useState } from 'react'
import { useProjects } from '../services/queries'

const Projects = () => {
  const [page, setPage] = useState(1)

  const { data, isPending, isError, isPlaceholderData, isFetching } =
    useProjects(page)

  return (
    <div>
      {isPending ? (
        <p>Loading...</p>
      ) : isError ? (
        <p>Error</p>
      ) : (
        <div>
          {data?.map((project) => (
            <p key={project.id}>{project.name}</p>
          ))}
        </div>
      )}
      <span>Current page: {page}</span>
      <button onClick={() => setPage((old) => Math.max(old - 1, 0))}>
        Previous Page
      </button>
      <button
        onClick={() => {
          if (!isPlaceholderData) {
            setPage((old) => old + 1)
          }
        }}
        disabled={isPlaceholderData}
      >
        Next Page
      </button>
      {isFetching ? <span>Loading...</span> : null}{' '}
    </div>
  )
}

export default Projects
