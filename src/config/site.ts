export const SITE = {
  owner: 'baohangxing',
  repo: 'blog',
  title: 'h1mple 写字的地方',
  description: '思绪会四处游荡，偶尔在这里停留~',
  author: 'baohangxing',
  /** giscus — 从 https://giscus.app 获取后填入 */
  giscusRepoId: 'R_kgDOScNBPQ',
  giscusCategory: 'Announcements',
  giscusCategoryId: 'DIC_kwDOScNBPc4C88su',
} as const

export type SiteConfig = typeof SITE
