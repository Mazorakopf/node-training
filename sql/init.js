import { promises } from 'fs';
import { Client } from 'pg';
import config from 'config';

const client = new Client({
    host: config.get('database.host'),
    database: config.get('database.server'),
    user: config.get('database.username'),
    password: config.get('database.password')
});

const execute = async (scriptPath) => {
    await promises.readFile(scriptPath)
        .then(async (queries) =>
            await client.query(queries.toString())
                .then(() => console.log(`${scriptPath} executed!`))
        );
};

client.connect()
    .then(() => execute('./sql/tables.sql'))
    .then(() => execute('./sql/inserts.sql'))
    .then(() => client.end())
    .catch(e => console.error(e.stack));

