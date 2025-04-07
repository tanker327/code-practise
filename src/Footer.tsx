import { useQuery } from '@tanstack/react-query'

function Footer() {
  // Example query (moved from App)
  const { isLoading, error, data } = useQuery({
    queryKey: ['repoData'],
    queryFn: () =>
      fetch('https://api.github.com/repos/TanStack/query').then((res) =>
        res.json()
      ),
  })

  return (
    <footer className="app-footer">
      <div style={{ marginTop: '20px' }}>
        <h2>React Query Example: TanStack Query Repo Info</h2>
        {isLoading && <p>Loading...</p>}
        {error && <p>Error: {error.message}</p>}
        {data && (
          <div>
            <p>Name: {data.name}</p>
            <p>Description: {data.description}</p>
            <p>Stars: {data.stargazers_count}</p>
            <p>Forks: {data.forks_count}</p>
          </div>
        )}
      </div>
    </footer>
  )
}

export default Footer 