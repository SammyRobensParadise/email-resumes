import type { NextApiRequest, NextApiResponse } from 'next';
import database from '../../../database';

import _ from 'lodash';
const CRITIQUE_TABLE_TABLE = 'email-resume-critiques';
const USER_TABLE_NAME = 'email-resume-users';
export default function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  if (req.method !== 'POST') {
    res.status(500).send({ message: 'Bad Request. only POST requests are qualified' });
  }

  const critique_info = JSON.parse(req.body);

  const possibleMatcheQuery = {
    TableName: USER_TABLE_NAME,
    /*    ExpressionAttributeNames: {
      '#id': 'user_id',
    }, */

    FilterExpression: 'critique_count_per_term = :x',
    //  ProjectionExpression: '#id',
    ExpressionAttributeValues: {
      ':x': {
        S: '3',
      },
    },
  };

  database.scan(possibleMatcheQuery, (response) => {
    console.log(response);
  });
}
