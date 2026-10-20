export type TabId = 'home' | 'profile' | 'resume' | 'projects' | 'feed'

export interface Profile {
  handle: string
  realName: string
  nickname: string
  avatar: string
  greeting: string
  tagline: string
  status: string
  resumePdf?: string
  basics: { label: string; value: string }[]
  skills: string[]
  favorites: string
  email: string
  socials: { label: string; url: string }[]
}

export interface Episode {
  no: string
  period: string
  title: string
  kind: 'Work' | 'Internship' | 'Education' | 'Other'
  org: string
  description: string
}

export type ProjectCategory = 'Web' | 'Game' | 'Tool'

export interface Project {
  title: string
  category: ProjectCategory
  description: string
  tags: string[]
  cover?: string
  detailsUrl?: string
  repoUrl?: string
}

export type FeedSource = 'Instagram' | 'X' | 'Bilibili'

export interface FeedPost {
  id: string
  source: FeedSource
  date: string // ISO 8601
  text: string
  image?: string
  url: string
}

export interface FeedFile {
  updatedAt: string | null
  posts: FeedPost[]
}
