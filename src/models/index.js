// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Amigos, User } = initSchema(schema);

export {
  Amigos,
  User
};