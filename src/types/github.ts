export interface GitHubLabel {
  id: number
  name: string
  color: string
  description: string | null
}

export interface GitHubUser {
  login: string
  avatar_url: string
  html_url: string
}

export interface GitHubIssue {
  id: number
  number: number
  title: string
  body: string | null
  created_at: string
  updated_at: string
  html_url: string
  user: GitHubUser
  labels: GitHubLabel[]
  comments: number
  state: 'open' | 'closed'
}

export interface GitHubComment {
  id: number
  body: string
  created_at: string
  updated_at: string
  user: GitHubUser
  html_url: string
}
