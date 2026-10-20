// All of the site's hand-written content lives here.
// Replace every [placeholder] with your own text.
import type { Episode, Profile, Project } from '../types'

export const profile: Profile = {
  name: '[Your Name]',
  avatar: '/avatar.jpg',
  greeting: 'Yo! Welcome to my page ☆',
  tagline: '[One-line intro — e.g. “Developer who builds web apps, games and tools.”]',
  status: "[What you're up to / open to work?]",
  resumePdf: '/resume.pdf',
  basics: [
    { label: 'Role', value: '[Your role]' },
    { label: 'Based in', value: '[City]' },
    { label: 'Languages', value: '[Languages]' },
    { label: 'Type', value: '[Night owl / INFP / …]' },
  ],
  skills: ['[Skill 1]', '[Skill 2]', '[Skill 3]', '[Skill 4]', '[Skill 5]', '[Skill 6]'],
  favorites:
    '[Anime, games, music you love — a few lines that show your personality. This is what visitors remember.]',
  email: 'hello@example.com',
  socials: [
    { label: 'Instagram', url: 'https://www.instagram.com/' },
    { label: 'GitHub', url: 'https://github.com/' },
    { label: 'Bilibili', url: 'https://space.bilibili.com/' },
  ],
}

// Newest first.
export const episodes: Episode[] = [
  {
    no: 'EP.03',
    period: '[2024 – now]',
    title: '[Job title]',
    kind: 'Work',
    org: '[Company / team]',
    description: '[One or two lines on what you did and the result]',
  },
  {
    no: 'EP.02',
    period: '[2023]',
    title: '[Internship title]',
    kind: 'Internship',
    org: '[Company]',
    description: '[One or two lines on what you did and the result]',
  },
  {
    no: 'EP.01',
    period: '[2019 – 2023]',
    title: '[Degree · major]',
    kind: 'Education',
    org: '[University]',
    description: '[Clubs, competitions, research highlights]',
  },
]

export const projects: Project[] = [
  { title: '[Project A]', category: 'Web', description: '[One line on what problem it solves]', tags: ['[Tech]', '[Tech]'] },
  { title: '[Project B]', category: 'Game', description: '[One line on what problem it solves]', tags: ['[Tech]', '[Tech]'] },
  { title: '[Project C]', category: 'Tool', description: '[One line on what problem it solves]', tags: ['[Tech]'] },
  { title: '[Project D]', category: 'Web', description: '[One line on what problem it solves]', tags: ['[Tech]', '[Tech]', '[Tech]'] },
]
