import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import './App.css'
import Products from './components/Products'

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 5 } },
})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      {/* <Todo /> */}
      {/* <Projects /> */}
      <Products />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default App
