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
    res.setHeader('cache-control', 'max-age=0, s-maxage=600')    
    return ok(res, result.map(e => {
      const data = { ...e }
      for (const key of listGetters(e)) {
        data[key] = e[key]
      }
      return data
    }))
  } catch (error) {
    return serverError(res, error.toString())
  }

}

function listGetters (instance) {
  return Object.entries(
    Object.getOwnPropertyDescriptors(
      Reflect.getPrototypeOf(instance)
    )
  )
  .filter(e => typeof e[1].get === 'function' && e[0] !== '__proto__')
  .map(e => e[0]);
}
