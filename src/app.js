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
        var rows = await controller.getProjectsByUser(user_id);

        response.render("home.ejs", { id_user: user_id, data: rows });
    } catch (err) {
        response.send(err);
    }
});

//editUser
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

//newProject //editProject
app.get("/:id_user/project/:id_project?", async function (request, response) {
    let user_id = request.params.id_user;
    let project_id = request.params.id_project;

    //NEW PROJECT
    if (project_id == null)
        response.render("projectPage", {
            id_user: user_id,
            type: "register",
            data_pj: [],
            data_desc: [],
        });
    //EDIT PROJECT
    else {
        var project = await controller.getProject(project_id);
        var desc = await controller.getDescByProject(project_id);
        response.render("projectPage", {
            id_user: user_id,
            type: "edit",
            data_pj: project,
            data_desc: desc,
        });
    }
});
//NewProject //editProject
app.post("/:id_user/project/:id_project?", async function (request, response) {
    let id_user = request.params.id_user;
    let project_id = request.params.id_project;
    const project = new projeto(0, request.body.project_title, id_user);
    const desc = new descritivo(0, request.body.project_desc, 0);

    //NEW PROJECT
    if (project_id == null) {
        controller.newProject(project);
        var id_newproject = await controller.selectLastProjectID();
        desc.setFk_Projeto_id(id_newproject);
        controller.newDesc(desc);
        response.redirect(`/${id_user}/project/${id_newproject}/req`);
    }

    //EDIT PROJECT
    else {
        project.setID(project_id);
        controller.editProject(project);
        desc.setFk_Projeto_id(project_id);
        controller.editDesc(desc);
        response.redirect(`/home/${id_user}`);
    }
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

//ViewRequisitos
app.get(
    "/:id_user/view/project/:id_project",
    async function (request, response) {
        const project_id = request.params.id_project;
        const user_id = request.params.id_user;

        var rows = await controller.selectRequirementByProject(project_id);
        console.log(rows);
        response.render("view", {
            id_user: user_id,
            id_project: project_id,
            data: rows,
        });
    }
);

//DeleteRequisito
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

response.render("view", {
    id_user: user_id,
    id_project: project_id,
    data: rows,
});

//NewRequisito //EditRequisito
app.get(
    "/:id_user/project/:id_project/req/:id_requirement?",
    async function (request, response) {
        let user_id = request.params.id_user;
        let project_id = request.params.id_project;
        let requirement_id = request.params.id_requirement;

        //NEW REQ
        if (requirement_id == null)
            response.render("funcReq", {
                id_user: user_id,
                id_project: project_id,
                type: "register",
                data: [],
            });
        //EDIT REQ
        else {
            var requirement = await controller.getRequirement(requirement_id);
            response.render("funcReq", {
                id_user: user_id,
                id_project: project_id,
                type: "edit",
                data: requirement,
            });
        }
    }
);
//NewRequisito //EditRequisito
app.post(
    "/:id_user/project/:id_project/req/:id_requirement?",
    function (request, response) {
        let user_id = request.params.id_user;
        let project_id = request.params.id_project;
        let requirement_id = request.params.id_requirement;
        const requirement = new req_funcional(
            0,
            request.body.reqtitle,
            request.body.reqmethod,
            request.body.operacao_crud,
            request.body.tipo_metodo,
            "",
            project_id
        );

        //NEW REQ
        if (requirement_id == null) controller.newReqFunc(requirement);
        //EDIT REQ
        else {
            requirement.setID(requirement_id);
            controller.editReqFunc(requirement);
        }

        response.redirect(`/${user_id}/view/project/${project_id}`);
    }
);

// Inicia o servidor na porta definida anteriormente
// escreve no console o endereço
app.listen(port, () => {
    console.log("Server is ON / http://localhost:3333");
});
