/* eslint-disable no-sync */
import fs from 'fs';
import Client from 'pg-native';
import config from 'config';

const execute = (client, scriptPath) => {
    try {
        const queries = fs.readFileSync(scriptPath);
        client.querySync(queries.toString());
        console.log(`${scriptPath} executed!`);
    } catch (err) {
        console.error(err.stack);
    }
};

const pgClient = new Client();
pgClient.connectSync(config.get('database.uri'));
execute(pgClient, './sql/tables.sql');
execute(pgClient, './sql/inserts.sql');
pgClient.end();
