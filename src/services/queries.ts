import {
  keepPreviousData,
  useInfiniteQuery,
  useQueries,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'
import { Product } from '../types/product'
import {
  getProduct,
  getProducts,
  getProjects,
  getTodo,
  getTodosIds,
} from './api'

export const useTodoIds = () => {
  return useQuery({
    queryKey: ['todos'],
    queryFn: getTodosIds,
  })
}

export const useTodos = (ids: (number | undefined)[] | undefined) => {
  return useQueries({
    queries: (ids ?? []).map((id) => {
      return {
        queryKey: ['todo', { id }],
        queryFn: () => getTodo(id!),
      }
    }),
  })
}

export const useProjects = (page: number) => {
  return useQuery({
    queryKey: ['projects', { page }],
    queryFn: () => getProjects(page),
    placeholderData: keepPreviousData,
  })
}

export const useProducts = () => {
  return useInfiniteQuery({
    queryKey: ['products'],
    queryFn: getProducts,
    initialPageParam: 0,
    getNextPageParam: (lastPage, _allPages, lastPageParam) => {
      if (lastPage.length === 0) {
        return
      }
      return lastPageParam + 1
    },
    getPreviousPageParam: (_firstPage, _allPages, firstPageParam) => {
      if (firstPageParam === 0) {
        return
      }
      return firstPageParam - 1
    },
  })
}

export const useProduct = (id: number | null) => {
  const queryClient = useQueryClient()

  return useQuery({
    queryKey: ['product', { id }],
    queryFn: () => getProduct(id!),
    enabled: !!id,
    placeholderData: () => {
      const cachedProducts = (
        queryClient.getQueryData(['products']) as {
          pages: Product[] | undefined
        }
      )?.pages?.flat(2)

      if (cachedProducts) {
        return cachedProducts.find((item) => item.id === id)
      }
    },
  })
}
