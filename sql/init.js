/* eslint-disable no-sync */
import fs from 'fs';
import Client from 'pg-native';
import config from 'config';

const execute = (scriptPath) => {
    try {
        const queries = fs.readFileSync(scriptPath);
        client.querySync(queries.toString());
        console.log(`${scriptPath} executed!`);
    } catch (err) {
        console.error(err.stack);
    }
};

const client = new Client();
client.connectSync(config.get('database.uri'));
execute('./sql/tables.sql');
execute('./sql/inserts.sql');
client.end();
