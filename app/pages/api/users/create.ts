import type { NextApiRequest, NextApiResponse } from 'next';
import database from '../../../database';

const TABLE_NAME = 'email-resume-users';
export default function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  if (req.method !== 'PUT') {
    res.status(500).send({ message: 'Bad Request. only PUT requests are qualified' });
  }

  const userInfo = JSON.parse(req.body);

  const queryParams = { TableName: TABLE_NAME, Key: { user_id: userInfo.sub } };

  database.get(queryParams, (error, result) => {
    if (result && !error) {
      res.status(200).send({ message: 'User already replicated in database.' });
    } else {
      if (error) {
        res.status(500).send({ message: 'Unable to retrieve user information.', error });
      } else {
        const params = {
          TableName: TABLE_NAME,
          Item: {
            user_id: userInfo.sub,
            created: true,
            grad_year: null,
            ...userInfo,
          },
        };
        database.put(params, (error, response) => {
          if (error) {
            res.status(500).send({ message: 'Unable to add user to database.', error });
          } else {
            res.status(200).send({ message: 'User sucessfully replicated in database.', response });
          }
        });
      }
    }
  });
}
