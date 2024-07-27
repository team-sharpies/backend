import request from 'superagent'
import { Welcome } from '../models/welcome.ts'

const serverURL = '/api/v1'

// *** EXAMPLE ***
export function getApiRes(): Promise<Welcome> {
  return request.get(`${serverURL}/llm`).then((response) => response.body)
}
// ***   ***   ***

