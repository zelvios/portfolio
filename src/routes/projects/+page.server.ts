import type { PageServerLoad } from './$types'
import { getProjects } from '$lib/server/projects'

export const load: PageServerLoad = () => {
  return {
    projects: getProjects(),
  }
}
