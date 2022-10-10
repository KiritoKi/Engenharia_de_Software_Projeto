import express, { response } from "express";
<<<<<<< HEAD
import controller from "../controller/controller.js";
=======
import path from 'path';
import { fileURLToPath } from 'url';
>>>>>>> 92e5cd6a256de02800722eea25fd18166fb9fe3c

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

var port = 3333;

app.set("view engine", "ejs");
app.set('views', './views');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + '/public'));

//import controller from "../controller/controller";
import user from '../model/user.js';

app.post('/signin', function (request, responde) {
    const usuario = new user(
        0,
        request.body.nome,
        request.body.username,
        request.body.password,
        request.body.email
    );
    controller.register(usuario);
    response.redirect("/");
});

app.post('/', function (request, response) {
    console.log(request.body.username);
    console.log(request.body.password);
    const usuario = new user(
        0, "", "",
        request.body.username,
        request.body.password,
        ""
    );
    response.redirect("/");
});

app.get('/', function (request, response) {
    response.render("index", { user: {} });
});

app.get('/signin', function (request, response) {
    response.render("signin", { user: {} });
});

app.get('/home', function (request, response) {

    response.render("home", { user: {} });
});

app.listen(port, () => {
    console.log("Server is ON / port = 3333. http://localhost:3333");
});