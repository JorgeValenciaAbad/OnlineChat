//const Pool = require('pg').Pool;
import pg from "pg";
const Pool = pg.Pool;

const pool = new Pool({
    user:"postgres",
    password:"4Ud3f3kD",
    host:"localhost",
    port:5432,
    database:"onlinechat"
});
export default  pool;