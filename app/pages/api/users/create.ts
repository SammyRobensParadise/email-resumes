import type { NextApiRequest, NextApiResponse } from 'next';
import database from '../../../database';

import _ from 'lodash';

const TABLE_NAME = 'email-resume-users';
export default function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  if (req.method !== 'PUT') {
    res.status(500).send({ message: 'Bad Request. only PUT requests are qualified' });
  }

  const user_info = JSON.parse(req.body);

  const queryParams = { TableName: TABLE_NAME, Key: { user_id: user_info.sub } };

  return database.get(queryParams, (error, result) => {
    if (!_.isEmpty(result) && !error) {
      res.status(200).send({ message: 'Up to date!' });
    } else {
      if (error) {
        res.status(500).send({ message: 'Unable to retrieve user information.', error });
      } else {
        const params = {
          TableName: TABLE_NAME,
          Item: {
            user_id: user_info.sub,
            created: true,
            grad_year: null,
            critique_websites: false,
            critique_resumes: true,
            critique_count_per_term: 3,
            ...user_info,
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
