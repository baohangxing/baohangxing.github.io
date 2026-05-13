import {SITE} from '@/config/site'
import type {GitHubIssue, GitHubComment} from '@/types/github'

const BASE = 'https://api.github.com'

function headers(): HeadersInit {
  const token = import.meta.env.VITE_GITHUB_TOKEN as string | undefined
  return {
    Accept: 'application/vnd.github+json',
    ...(token ? {Authorization: `Bearer ${token}`} : {}),
  }
}

async function get<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {headers: headers()})
  if (!res.ok) throw new Error(`GitHub API ${res.status}: ${path}`)
  return res.json() as Promise<T>
}

export interface FetchIssuesParams {
  page?: number
  perPage?: number
  labels?: string
  state?: 'open' | 'closed' | 'all'
}

export async function fetchIssues(params: FetchIssuesParams = {}): Promise<GitHubIssue[]> {
  const {page = 1, perPage = 10, labels = '', state = 'open'} = params
  const qs = new URLSearchParams({
    state,
    per_page: String(perPage),
    page: String(page),
    creator: SITE.owner,
    ...(labels ? {labels} : {}),
    sort: 'created',
    direction: 'desc',
  })
  const data = await get<GitHubIssue[]>(
    `/repos/${SITE.owner}/${SITE.repo}/issues?${qs}`
  )
  // 过滤掉 PR（包含 pull_request 字段的条目）
  return data.filter((item: GitHubIssue & {pull_request?: unknown}) => !item.pull_request)
}

export async function searchIssues(query: string, page = 1): Promise<GitHubIssue[]> {
  const q = `repo:${SITE.owner}/${SITE.repo} is:issue is:open author:${SITE.owner} ${query}`
  const qs = new URLSearchParams({q, per_page: '10', page: String(page)})
  const data = await get<{items: GitHubIssue[]}>(`/search/issues?${qs}`)
  return data.items
}

export async function fetchIssue(number: number): Promise<GitHubIssue> {
  return get<GitHubIssue>(`/repos/${SITE.owner}/${SITE.repo}/issues/${number}`)
}

export async function fetchComments(number: number): Promise<GitHubComment[]> {
  return get<GitHubComment[]>(
    `/repos/${SITE.owner}/${SITE.repo}/issues/${number}/comments?per_page=100`
  )
}

export async function fetchLabels(): Promise<{name: string; color: string}[]> {
  return get(`/repos/${SITE.owner}/${SITE.repo}/labels?per_page=100`)
}
