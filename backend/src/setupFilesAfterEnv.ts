import {client, db} from './db';

global.afterAll(async () => {
    await client.close();
});