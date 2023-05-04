const { Pool } = require('pg');

// Configure new Pool instance w/ connection details
// Replace w/ actual postgres credentials
const pool = new Pool({
    user: 'danikadevaz',
    host: 'localhost',
    database: 'my_database',
    password: 'pgAdminLover825.',
    port: 5432,
});
  
module.exports = pool;