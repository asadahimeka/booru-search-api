import isbot from 'isbot'
import { search } from '@himeka/booru'
import { useCors } from 'lib/middleware'
import { badRequest, ok, serverError } from 'lib/response'

const credentialsMap = {
  'konachan.net': '&api_key=WcNnoaioCBaXqS_Y-jRbjA',
  'konachan.com': '&api_key=WcNnoaioCBaXqS_Y-jRbjA'
}

export default async (req, res) => {
  await useCors(req, res)

  if (isbot(req.headers['user-agent'])) return ok(res)

  const { site, tags, page, limit } = req.query
  if (!site) return badRequest(res)

  try {
    const credentials = credentialsMap[site]
    const result = await search(site, tags, { page, limit, credentials })
    return ok(res, result.map(e => e.data))
  } catch (error) {
    return serverError(res, error.toString())
  }

}
