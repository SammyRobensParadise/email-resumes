import type { NextApiRequest, NextApiResponse } from 'next';
import database from '../../../../database';

const TABLE_NAME = 'email-resume-users';
export default function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  if (req.method !== 'DELETE') {
    res.status(500).send({ message: 'Bad Request. only DELETE requests are qualified' });
  }
  const { id } = req.query;

  const queryParams = { TableName: TABLE_NAME, Key: { user_id: id } };
  return database.delete(queryParams, (error, result) => {
    if (result && !error) {
      res.status(200).send({ message: 'User Deleted', data: result });
    } else {
      if (error) {
        res.status(500).send({ message: 'Unable to Delete User', error });
      }
    }
  });
}
