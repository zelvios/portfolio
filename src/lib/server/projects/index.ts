import matter from 'gray-matter'

export interface Project {
  slug: string
  title: string
  description: string
  createdAt: string
  tags: string[]
  content: string
}

export function getProjects(): Project[] {
  const modules = import.meta.glob('/src/lib/server/projects/*.md', {
    eager: true,
    query: '?raw',
    import: 'default',
  })

  return Object.entries(modules)
    .map(([path, fileContent]): Project => {
      const { data, content } = matter(fileContent as string)

      const dateObj = new Date(data.createdAt)
      const formattedDate = dateObj.toISOString().split('T')[0]

      return {
        slug: path.split('/').pop()?.replace('.md', '') || '',
        title: data.title as string,
        description: data.description as string,
        createdAt: formattedDate,
        tags: (data.tags as string[]) || [],
        content,
      }
    })
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )
}
