import express, { response } from "express";
import controller from "../controller/controller.js";

const app = express();

var port = 3333;

app.set("view engine", "ejs");
app.set('views', './views');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//import controller from "../controller/controller";
import user from '../model/user.js';

app.post('/signin', function (request, responde) {
    const usuario = new user(
        0,
        request.body.nome,
        request.body.data_nascimento,
        request.body.username,
        request.body.password,
        request.body.email
    );
    controller.register(usuario);
    response.redirect("/");
});

app.post('/login', function (request, response) {
    const usuario = new user(
        0, "", "",
        request.body.username,
        request.body.password,
        ""
    );
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
    console.log("Server is ON / port = 3333");
});