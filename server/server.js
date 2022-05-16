import express from 'express';
import cors from 'cors';
import pool from "./database/index.js"
import jwt from 'jsonwebtoken';
import { throws } from 'assert';
import { error } from 'console';
import md5 from 'md5';
//middlewar
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
    // try {
    //     const {names, passwd}  = req.params; 
    //     const newTodo = await pool.query("SELECT * FROM users WHERE names= $1::text AND passwd=md5($2::text);", [names, passwd]);
    //     console.log (newTodo.rows[0])
    //     const user = {
    //         name : names,
    //         id : newTodo.rows[0]
    //     };
    //     const token = jwt.sign(user,"123");
    //     res.json(token)

    // } catch (err) {
    //     console.log(err);
    // }
    // try {
    //     const { names, passwd } = req.params;
    //     const users = await fetch("http://localhost:3000/users");
    //     await users.json().then(data => {
    //         for (const user of data) {
    //             if (user.names === names && user.passwd === md5(passwd)) {
    //                 const user = {
    //                     id: user.id,
    //                     name: user.name,
    //                     email: user.email
    //                 };
    //                     const token = jwt.sign(user,"123");
    //                     res.json(token)
    //             } 
    //         }
    //     })

    // } catch (error) {
    //     console.log(error);
    // // }
         
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

