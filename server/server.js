import express from 'express';
import cors from 'cors';
import pool from "./database/index.js"


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
        const {id}  = req.params;
        const newTodo = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
        res.json(newTodo.rows[0]);
    } catch (err) {
        console.log(err);
    }

})
/*app.get("/messages", async (req, res) => {
    try {
        const newTodo = await pool.query("SELECT * FROM users");
        res.json(newTodo.rows);
    } catch (err) {
        console.log(err);
    }

})
app.get("/messages/:id", async (req, res) => {
    try {
        const newTodo = await pool.query("SELECT * FROM user");
        res.json();
    } catch (err) {
        console.log(err);
    }

});*/


app.use(express.static(process.cwd() + "/client/build"))

console.log(process.cwd());
app.get('/*', (req, res) => {
    res.sendFile(process.cwd() + "/client/build/index.html");
})
app.get('/', (req, res) => {
    res.render('404.html');
});

app.listen(3000) 