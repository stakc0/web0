import { handleApi } from '../server/index.mjs';
export const config = { api: { bodyParser: false } };
export default async function handler(req, res) { return handleApi(req, res); }
