// Setup do app -------------------------------------------------------

import express, { response } from "express";
import path from "path";
import { fileURLToPath } from "url";
import controller from "../controller/controller.js";

// Econtra o nome do diretório do projeto
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Inicializa o app Express e define a porta 3333
const app = express();
var port = 3333;

// Determina a engine de views como ejs para o app
app.set("view engine", "ejs");

// Determina a pasta de views
app.set("views", "./views");

// O método urlenconded é um parser das informações vindas do body
// a opção {extended: true} indica que os objetos serão aninhados (biblioteca qs)
app.use(express.urlencoded({ extended: true }));

//  Parser de requisições post JSON
app.use(express.json());

// Indica o diretório de arquivos estáticos
app.use(express.static(__dirname + "/public"));


//  Setup das Rotas -------------------------------------------------------

//import controller from "../controller/controller";
import user from "../model/user.js";
import projeto from "../model/projeto.js";
import req_funcional from "../model/req_funcional.js";
import descritivo from "../model/descritivo.js";

// Rotas de Login
app.get("/", function (request, response) {
    response.render("index", { user: {} });
});

// Parâmetros:
//  - username: nome do usuário
//  - password: senha do usuário
// Resposta:
//  - Redireciona para /home:
//      - userSelected.id: id do usuário encontrado no banco
app.post("/login", async function (request, response) {
    const usuario = new user(
        0,
        "",
        request.body.username,
        request.body.password,
        ""
    );
    let userSelected = await controller.login(usuario);

    // Caso o controlador não retorne um usuário retorna mensagem de erro
    // e se encontrar usuário mas a senha estiver errada, também da erro
    if (userSelected == null) {
        return response.status(400).json({
            erro: true,
            mensagem: "Erro: Usuário ou a senha incorreta!",
        });
    } else if (userSelected.password != request.body.password) {
        return response.status(400).json({
            erro: true,
            mensagem: "Erro: Usuario ou senha incorreta!",
        });
    }

    response.redirect(`/home/${userSelected.id}`);
});

// Rotas de SignIn
app.get("/signin", function (request, response) {
    response.render("signin", { user: {} });
});

// Parâmetros:
//  - name: nome de registro
//  - username: nome de usuário
//  - passowrd: senha de login
//  - email: email do usuário
// Resposta:
//  - Redireciona para página de Login
app.post("/signin", function (request, response) {
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

// Rotas para a home
// Parâmetros:
//  - user_id: id do usuário
app.get("/home/:user_id", async function (request, response) {
    let user_id = request.params.user_id;

    try {
        var rows = await controller.getProjects(user_id);

        response.render("home.ejs", { id_user: user_id, data: rows });
    } catch (err) {
        response.send(err);
    }
});

app.post("/home", function (request, response) {});

// Rotas de edit do usuário
// Parâmetros:
//  - user_id: id do usuário
app.get("/edituser/:user_id", async function (request, response) {
    let user_id = request.params.user_id;

    try {
        var result = await controller.getUser(user_id);

        response.render("edituser", { id_user: user_id, user: result[0] });
    } catch (err) {
        response.send(err);
    }
});

// Parâmetros:
//  - user_id: id do usuário
// Resposta:
//  - Redireciona para /home:
//      - user_id: id do usuário
app.post("/edituser/:user_id", function (request, response) {
    let user_id = request.params.user_id;
    const usuario = new user(
        user_id,
        request.body.nome,
        request.body.username,
        request.body.password,
        request.body.email
    );

    controller.editUser(usuario);

    response.redirect(`/home/${user_id}`);
});

// Rotas de novo projeto
// Parâmetros:
//  - user_id: id do usuário
app.get("/:id_user/newproject", function (request, response) {
    let user_id = request.params.id_user;

    response.render("newproject", { id_user: user_id });
});

// Parâmetros:
//  - user_id: id do usuário
// Resposta:
//  - Redireciona para página de novo requisito:
//      - user_id: id do usuário
//      - id_project: id do projeto
app.post("/:id_user/newproject", async function (request, response) {
    let id_user = request.params.id_user;
    const project = new projeto(0, request.body.project_title, id_user);

    controller.newProject(project);

    var id_project = await controller.selectLastProjectID();

    console.log(id_project);

    const desc = new descritivo(0, request.body.project_desc, id_project);

    console.log(desc);
    controller.newDesc(desc);

    response.redirect(`/${id_user}/newfunc_req/${id_project}`);
});

// Rotas de delete do usuário
// Parâmetros:
//  - user_id: id do usuário
//  - id_project: id do projeto
app.get("/:id_user/delete/project/:id_project", function (request, response) {
    const id = request.params.id_project;
    let id_user = request.params.id_user;

    controller.deleteProject(id);

    response.redirect(`/home/${id_user}`);
});

// DIABO É ISSO??????????????
//EditProject NAO <<<<<
app.get("/:id_user/edit/project/:id_project", function (request, response) {
    const id_project = request.params.id_project;
    const id_user = request.params.id_user;

    response.redirect(`/home/${id_user}`);
});

// Rotas de view do projeto
// Parâmetros:
//  - user_id: id do usuário
//  - id_project: id do projeto
app.get(
    "/:id_user/view/project/:id_project",
    async function (request, response) {
        const project_id = request.params.id_project;
        const user_id = request.params.id_user;
        var rows = await controller.selectRequisitos(project_id);

        console.log(rows);

        response.render("view", {
            id_user: user_id,
            id_project: project_id,
            data: rows,
        });
    }
);

// ??????????????????????
// EditRequisito// NAO <<<<<
app.get(
    "/:id_user/edit/:id_project/req/:id_requisito",
    function (request, response) {
        const id_requisito = request.params.id_requisito;
        const id_project = request.params.id_project;
        const id_user = request.params.id_user;

        response.redirect(`/${id_user}/view/project/${id_project}`);
    }
);

// Rotas de delete dos requisitos
// Parâmetros:
//  - user_id: id do usuário
//  - id_project: id do projeto
//  - id_requisito: id do requisito
// Resposta:
//  - Redireciona para pagina de projeto:
//      - user_id: id do usuário
//      - id_project: id do projeto
app.get(
    "/:id_user/delete/:id_project/req/:id_requisito",
    function (request, response) {
        const id_requisito = request.params.id_requisito;
        const id_project = request.params.id_project;
        const id_user = request.params.id_user;

        controller.deleteRequisito(id_requisito);

        response.redirect(`/${id_user}/view/project/${id_project}`);
    }
);

// Rotas de novo requisito
// Parâmetros:
//  - user_id: id do usuário
//  - id_project: id do projeto
app.get("/:id_user/newfunc_req/:id_project", function (request, response) {
    let user_id = request.params.id_user;
    let project_id = request.params.id_project;

    response.render("newfuncreq", { id_user: user_id, id_project: project_id });
});

// Parâmetros:
//  - user_id: id do usuário
//  - id_project: id do projeto
// Resposta:
//  - Redireciona para pagina de projeto:
//      - user_id: id do usuário
//      - id_project: id do projeto
app.post("/:id_user/newfunc_req/:id_project", function (request, response) {
    let user_id = request.params.id_user;
    let project_id = request.params.id_project;
    // Cria o objeto do requisito e chama a função no controller
    const requisito = new req_funcional(
        0,
        request.body.reqtitle,
        request.body.reqmethod,
        request.body.operacao_crud,
        request.body.tipo_metodo,
        "",
        project_id
    );

    controller.newReqFunc(requisito);

    response.redirect(`/${user_id}/view/project/${project_id}`);
});

// Inicia o servidor na porta definida anteriormente
// escreve no console o endereço
app.listen(port, () => {
    console.log("Server is ON / http://localhost:3333");
});
