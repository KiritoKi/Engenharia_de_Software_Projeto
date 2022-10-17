import express, { response } from "express";
import path from 'path';
import { fileURLToPath } from 'url';
import controller from "../controller/controller.js";

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

//login
app.post('/', async function (request, response) {
    const usuario = new user(
        0, "",
        request.body.username,
        request.body.password,
        ""
    );


    let userSelected = await controller.login(usuario);

    if (userSelected == null) {
        return response.status(400).json({
            erro: true,
            mensagem: "Erro: Usuário ou a senha incorreta!"
        });

    } else if (userSelected.password != request.body.password) {
        return response.status(400).json({
            erro: true,
            mensagem: "Erro: Usuario ou senha incorreta!"
        });
    }

    response.redirect(`/home/${userSelected.id}`);
});
//login
app.get('/', function (request, response) {
    response.render("index", { user: {} });
});
//signin
app.get('/signin', function (request, response) {

    response.render("signin", { user: {} });
});
//signin
app.post('/signin', function (request, response) {
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
//home
app.get('/home/:userId', async function (request, response) {
    const { userId } = request.params;
    try {

        let sql = `SELECT * FROM projeto WHERE fk_usuario_id = ${userId}`;

        //const {rows}  = await db.query(sql);
        // data: rows 
        response.render("projects.ejs", { id_user: userId });

    } catch (error) {

        response.send(error);

    }
});
//home
app.post('/home', function (request, response) {

});
//editUser
app.get('/edituser', function (request, response) {
    response.render("edituser", { user: {} });
});
//editUser
app.post('/edituser', function (request, response) {
    response.render("edituser", { user: {} });
});

app.get('/listProject/')


app.listen(port, () => {
    console.log("Server is ON / http://localhost:3333");
});