import {useQuery} from '@tanstack/react-query'
import {fetchIssues, searchIssues} from '@/api/github'

export function useIssues(page: number, label: string, search: string) {
  return useQuery({
    queryKey: ['issues', page, label, search],
    queryFn: () =>
      search.trim()
        ? searchIssues(search, page)
        : fetchIssues({page, perPage: 10, labels: label}),
    staleTime: 1000 * 60 * 5,
  })
}
