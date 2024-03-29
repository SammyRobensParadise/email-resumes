import type { NextApiRequest, NextApiResponse } from 'next';
import database from '../../../../../database';

const TABLE_NAME = 'email-resume-users';
export default function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  if (req.method !== 'PUT') {
    res.status(500).send({ message: 'Bad Request. only PUT requests are qualified' });
  }
  const { id, count } = req.query;

  const queryParams = {
    TableName: TABLE_NAME,
    Key: { user_id: id },
    UpdateExpression: 'set critique_count_per_term = :x',
    ExpressionAttributeValues: {
      ':x': count,
    },
  };
  return database.update(queryParams, (error, result) => {
    if (result && !error) {
      res.status(200).send({ message: 'User information retreived', data: result });
    } else {
      if (error) {
        res.status(500).send({ message: 'Unable to retrieve user information.', error });
      }
    }
  });
}
