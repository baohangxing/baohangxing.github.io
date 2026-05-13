import {useQuery} from '@tanstack/react-query'
import {fetchIssue, fetchLabels} from '@/api/github'

export function useIssue(number: number) {
  return useQuery({
    queryKey: ['issue', number],
    queryFn: () => fetchIssue(number),
    staleTime: 1000 * 60 * 5,
  })
}

export function useLabels() {
  return useQuery({
    queryKey: ['labels'],
    queryFn: fetchLabels,
    staleTime: 1000 * 60 * 30,
  })
}
