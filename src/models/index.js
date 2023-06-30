// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Location, Amigos, User } = initSchema(schema);

export {
  Location,
  Amigos,
  User
};