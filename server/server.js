import express from 'express';
import cors from 'cors';
import pool from "./database/index.js"
import jwt from 'jsonwebtoken';
import md5 from 'md5';
//middleware
const app = express();
app.use(cors());
app.use(express.json());


app.post("/users", async (req, res) => {
    try {
        const { names, email, passwd } = req.body;
        const newTodo = await pool.query("INSERT INTO users (names, email, passwd) VALUES( $1, $2, md5($3))",
            [names, email, passwd]
        );
        res.json(newTodo.rows[0]);
    } catch (err) {
        console.log(err.messa);
    }

})
app.get("/users", async (req, res) => {
    try {
        const newTodo = await pool.query("SELECT * FROM users");
        res.json(newTodo.rows);
    } catch (err) {
        console.log(err);
    }

})
app.get("/users/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const newTodo = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
        res.json(newTodo.rows);
    } catch (err) {
        console.log(err);
    }

})

app.post("/api/login", async (req, res) => {
    try {
        const { names, passwd } = req.body;
        const newTodo = await pool.query("SELECT id, names ,email FROM users WHERE names=$1 AND passwd=md5($2);", [names, passwd]);
        if (newTodo.rowCount > 0) {
            const token = jwt.sign(newTodo.rows[0], "123");
            res.json(token)
        }
        res.status(404).json()
    } catch (err) {
        console.log(err);
    }
})

app.post("/api/update", async (req, res) => {
    try {
        const { names, email, passwd, token } = req.body;
        console.log(token)
        const user = jwt.decode(token);
        const id = user.id;
        await pool.query("UPDATE users SET names = $1, email = $2 ,passwd = md5($3) WHERE id = $4;", [names, email, passwd, id]);
        user.names = names;
        user.email = email;
        user.passwd = md5(passwd);
        const newToken = jwt.sign(user,"123");
        res.json(newToken);
    } catch (err) {
        console.log(err)
    }
})
app.post("/api/user", async (req, res) => {
    try {
        const {token } = req.body;
        console.log(token)
        const user = jwt.decode(token);
        res.json(user);
    } catch (err) {
        console.log(err)
    }
})
app.use(express.static(process.cwd() + "/client/build"))

console.log(process.cwd());
app.get('/*', (req, res) => {
    res.sendFile(process.cwd() + "/client/build/index.html");
})
app.get('/', (req, res) => {
    res.render('404.html');
});

app.listen(3000)

