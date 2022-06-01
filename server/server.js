import express from 'express';
import cors from 'cors';
import pool from "./database/index.js"
import jwt from 'jsonwebtoken';
import md5 from 'md5'
import { Server } from "socket.io";

//middleware
const app = express();
app.use(cors());
app.use(express.json());



app.post("/api/user", async (req, res) => {
    try {
        const { token } = req.body;
        res.json(jwt.decode(token));
    } catch (err) {
        console.log(err.messa);
    }

});
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

});
app.post("/api/add", async (req, res) => {
    try {
        const { name, passwd, type, id } = req.body;
        console.log(id);
        if (type === "P") {
            const publicRoom = await pool.query("INSERT INTO rooms (name, type_room, users) VALUES( $1, $2, $3)", [name, type, id]);
            res.json(publicRoom.rows[0]);
        } else {
            const privateRoom = await pool.query("INSERT INTO rooms (name, passwd,type_room, users) VALUES( $1, md5($2), $3, $4)", [name, passwd, type, id]);
            res.json(privateRoom.rows[0]);
        }
    } catch (err) {
        console.log(err);
    }
});
app.post("/api/loginroom", async (req, res) => {
    try {
        const { name, passwd } = req.body;
        const loginroom = await pool.query("SELECT * FROM rooms WHERE name = $1 AND passwd = md5($2)", [name, passwd]);
        if (loginroom.rowCount > 0) {
            res.json();
        } else {
            res.status(403).json()
        }

    } catch (err) {
        console.log(err);
    }
})
app.get("/api/rooms/:type", async (req, res) => {
    try {
        const { type } = req.params;
        const getRooms = await pool.query("SELECT name, passwd FROM rooms WHERE type_room = $1", [type]);
        res.json(getRooms.rows);
    } catch (err) {
        console.log(err);
    }
})
app.post("api/delete", async (req, res) => {
    try {
        const { name } = req.body;
        const newTodo = await pool.query("DELETE FROM rooms WHERE name = $1;", [name]);
        res.json(newTodo.rows[0]);
    } catch (err) {
        console.log(err);
    }
});
app.get("/api/room/:id", async (req, res) => {
    try {
        const { id } = req.params;
        if (id !== undefined && id !== null) {
            const erase = await pool.query("SELECT * FROM rooms WHERE users = $1;", [id]);
            res.json(erase.rows);
        }
        res.json()
    } catch (err) {
        console.log(err);
    }
});
app.post("/api/erase", async (req, res) => {
    try {
        const { name } = req.body;
        const erase = await pool.query("DELETE FROM rooms WHERE name = $1;", [name]);
        res.json(erase.rows[0]);
    } catch (err) {
        console.log(err);
    }
});
app.get("/users", async (req, res) => {
    try {
        const newTodo = await pool.query("SELECT * FROM users");
        res.json(newTodo.rows);
    } catch (err) {
        console.log(err);
    }

});
app.get("/users/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const newTodo = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
        res.json(newTodo.rows);
    } catch (err) {
        console.log(err);
    }

});

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
});

app.post("/api/update", async (req, res) => {
    try {
        const { names, email, passwd, token } = req.body;
        const user = jwt.decode(token);
        const id = user.id;
        await pool.query("UPDATE users SET names = $1, email = $2 ,passwd = md5($3) WHERE id = $4;", [names, email, passwd, id]);
        user.names = names;
        user.email = email;
        user.passwd = md5(passwd);
        const newToken = jwt.sign(user, "123");
        res.json(newToken);
    } catch (err) {
        console.log(err)
    }
});
app.post("/api/user", async (req, res) => {
    try {
        const { token } = req.body;
        const user = jwt.decode(token);
        res.json(user);
    } catch (err) {
        console.log(err)
    }
});
app.use(express.static(process.cwd() + "/client/build"))

console.log(process.cwd());
app.get('/*', (req, res) => {
    res.sendFile(process.cwd() + "/client/build/index.html");
})
app.get('/', (req, res) => {
    res.render('404.html');
});

const server = app.listen(3000);
const io = new Server(server);
io.on("connection", socket => {
    console.log(`User Connected: ${socket.id}`);
    socket.on("message", (message) => {
        console.log('message: ' + message)
    });
    socket.on("join_room", (data) => {
        socket.join(data);
        console.log(`User with ID: ${socket.id} joined room: ${data}`);
    });
    socket.on("send_message", (data) => {
        socket.to(data.room).emit("receive_message", data);
    });
    socket.on("disconnect", () => {
        console.log("User Disconnected", socket.id);
    });
});