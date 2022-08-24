import isbot from 'isbot';
import { search } from '@himeka/booru';
import { useCors } from 'lib/middleware';
import { badRequest, ok, serverError } from 'lib/response';

export default async (req, res) => {
  await useCors(req, res);

  if (isbot(req.headers['user-agent'])) return ok(res);

  const { site, tags, page, limit } = req.query;
  if (!site) return badRequest(res);

  try {
    const result = await search(site, tags, { page, limit });
    return ok(res, result);
  } catch (error) {
    return serverError(res, error.toString());
  }

};
