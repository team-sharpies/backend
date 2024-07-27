import express from 'express'
// import { Welcome } from '../../models/welcome.ts'
import { callAzureAI } from '../../apiClient.ts';

const router = express.Router()
  //  djsfgkjbd
// GET /api/v1/llm/
router.get('/', async (req, res) => {
  try {

    const requestData = {
      // Your request data here
      documents: [
        {
          language: "en",
          id: "1",
          text: "I love programming with TypeScript!"
        },
        {
          language: "en",
          id: "2",
          text: "Express is a great framework for building web applications."
        }
      ]
    };
    const resData = await callAzureAI(requestData)

    res.json(resData)
    // res.json({ statement: 'Welcome to external APIs!' } as Welcome)
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).send((err as Error).message)
    } else {
      res.status(500).send('Something went wrong')
    }
  }
})

export default router
