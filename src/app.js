// Setup do app -------------------------------------------------------

import express, { response } from "express";
import path from "path";
import { fileURLToPath } from "url";
import controller from "../controller/controller.js";

// Encontra o nome do diretório do projeto
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

import user from "../model/user.js";
import projeto from "../model/projeto.js";
import req_funcional from "../model/req_funcional.js";
import descritivo from "../model/descritivo.js";
import entidade from "../model/entidade.js";
import atributo from "../model/atributo.js";
import processoCasoDeUso from "../model/processoCasoDeUso.js";
import casoDeUso from "../model/casoDeUso.js";
import relCasoUso from "../model/relCasoUso.js";
import itemPergunta from "../model/itemPergunta.js";

// -------------------------------------------------
// Login            ## ROUTE
// -------------------------------------------------


app.get("/", function (request, response) {
    response.render("login", { user: {} });
});

app.get("/login", function (request, response) {
    response.render("login", { user: {} });
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


// -------------------------------------------------
// SignIn            ## ROUTE
// -------------------------------------------------


app.get("/signin", function (request, response) {
    response.render("signin", { user: {} });
});

// Parâmetros:
//  - name: nome de registro
//  - username: nome de usuário
//  - password: senha de login
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


// -------------------------------------------------
//  HOME           ## ROUTE
// -------------------------------------------------


// Rotas para a home
// Parâmetros:
//  - user_id: id do usuário
app.get("/home/:user_id", async function (request, response) {
    let user_id = request.params.user_id;
    try {
        response.render("home.ejs", { id_user: user_id });
    } catch (err) {
        response.send(err);
    }
});


// -------------------------------------------------
// MODULO 1               ## ROUTE
// -------------------------------------------------


// Rotas para a home
// Parâmetros:
//  - user_id: id do usuário
app.get("/modulo1/:user_id", async function (request, response) {
    let user_id = request.params.user_id;

    try {
        var rows = await controller.getProjectsByUser(user_id);

        response.render("modulo1.ejs", { id_user: user_id, data: rows });
    } catch (err) {
        response.send(err);
    }
});


// -------------------------------------------------
// EDIT USUARIO       ## ROUTE
// -------------------------------------------------


// Rotas para edit do usuário
// Parâmetros:
//  - user_id: id do usuário
app.get("/edituser/:user_id", async function (request, response) {
    let user_id = request.params.user_id;

    try {
        var result = await controller.getUser(user_id);

        response.render("edituser", { id_user: user_id, user: result });
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


// -------------------------------------------------
// DELETE USUARIO  ## ROUTE
// -------------------------------------------------


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


// -------------------------------------------------
// NOVO/EDITAR PROJETO  ## ROUTE
// -------------------------------------------------


// Rotas para novo projeto ou edit do projeto
// Parâmetros:
//  - id_user: id do usuário
//  - id_project: projeto do usuário (Opcional)
app.get("/:id_user/project/:id_project?", async function (request, response) {
    let user_id = request.params.id_user;
    let project_id = request.params.id_project;

    // Novo projeto
    if (project_id == null)
        response.render("projectPage", {
            id_user: user_id,
            type: "register",
            data_pj: [],
            data_desc: [],
        });
    // Edit do projeto
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

// Parâmetros:
//  - id_user: id do usuário
//  - id_project: projeto do usuário(Opcional)
app.post("/:id_user/project/:id_project?", async function (request, response) {
    let id_user = request.params.id_user;
    let project_id = request.params.id_project;
    const project = new projeto(0, request.body.project_title, id_user);
    const desc = new descritivo(0, request.body.project_desc, 0);

    // Novo projeto
    if (project_id == null) {
        controller.newProject(project);
        var id_newproject = await controller.selectLastProjectID();
        desc.setFk_Projeto_id(id_newproject);
        controller.newDesc(desc);

        response.redirect(`/${id_user}/project/${id_newproject}/req`);
    }

    // Edit do projeto
    else {
        project.setID(project_id);
        controller.editProject(project);
        desc.setFk_Projeto_id(project_id);
        controller.editDesc(desc);

        response.redirect(`/home/${id_user}`);
    }
});

// -------------------------------------------------
// VIEW DE REQUISITOS   ## ROUTE
// -------------------------------------------------


// Rotas para view de requisitos
// Parâmetros:
//  - user_id: id do usuário
//  - id_project: id do projeto
app.get(
    "/:id_user/view/project/:id_project",
    async function (request, response) {
        const project_id = request.params.id_project;
        const user_id = request.params.id_user;
        var rows = await controller.selectRequirementByProject(project_id);
        var descr = await controller.getDescByProject(project_id);
        var casos = await controller.getProcessoCasoUsoByProject(project_id);
        var ent = await controller.getEntidadeByProject(project_id);
        var atr = await controller.getAtributosByProject(project_id);

        response.render("viewRequisitos", {
            id_user: user_id,
            id_project: project_id,
            data: rows,
            descritivo: descr,
            casodeUso: casos,
            entidades: ent,
            atributos: atr
        });
    }
);


// -------------------------------------------------
// DELETE DE REQUISITOS   ## ROUTE
// -------------------------------------------------


// Parâmetros:
//  - user_id: id do usuário
//  - id_project: id do projeto
//  - id_requisito: id do requisito
app.get(
    "/:id_user/delete/:id_project/req/:id_requisito",
    function (request, response) {
        const id_requisito = request.params.id_requisito;
        const id_project = request.params.id_project;
        const id_user = request.params.id_user;

        controller.deleteEntidade(id_requisito);
        controller.deleteRequisito(id_requisito);

        response.redirect(`/${id_user}/view/project/${id_project}`);
    }
);


// -------------------------------------------------
// NOVO/EDIT DE REQUISITOS   ## ROUTE
// -------------------------------------------------


// Parâmetros:
//  - id_user: id do usuário
//  - id_project: projeto do usuário
//  - id_requirement: requisito do projeto(Opcional)
app.get(
    "/:id_user/project/:id_project/req/:id_requirement?",
    async function (request, response) {
        let user_id = request.params.id_user;
        let project_id = request.params.id_project;
        let requirement_id = request.params.id_requirement;

        // Novo requisito
        if (requirement_id == null)
            response.render("funcReq", {
                id_user: user_id,
                id_project: project_id,
                type: "register",
                data: []
            });
        // Edit requisito
        else {
            var requirement = await controller.getRequirement(requirement_id);
            response.render("funcReq", {
                id_user: user_id,
                id_project: project_id,
                type: "edit",
                data: requirement
            });
        }
    }
);

// Parâmetros:
//  - id_user: id do usuário
//  - id_project: projeto do usuário
//  - id_requirement: requisito do projeto(Opcional)
app.post(
    "/:id_user/project/:id_project/req/:id_requirement?",
    async function (request, response) {
        let user_id = request.params.id_user;
        let project_id = request.params.id_project;
        let requirement_id = request.params.id_requirement;
        let create = request.body.create;
        let read = request.body.read;
        let upd = request.body.update;
        let del = request.body.delete;
        let crud = '';
        if (create === 'on') {
            crud += 'C';
        }
        if (read === 'on') {
            crud += 'R';
        }
        if (upd === 'on') {
            crud += 'U';
        }
        if (del === 'on') {
            crud += 'D';
        }
        const requirement = new req_funcional(
            0,
            request.body.reqtitle,
            request.body.reqmethod,
            crud,
            request.body.tipo_metodo,
            request.body.reqsql,
            project_id
        );
        const ent = new entidade(
            0,
            request.body.entidade,
            0
        );

        // Novo requisito
        if (requirement_id == null) {
            controller.newReqFunc(requirement);
            var req_id = await controller.selectLastRequisitoID();
            console.log('aaaaa' + ent.getNome());
            ent.setFk_Req_Func_id(req_id);
            console.log('aaaaa' + ent.getFk_Req_Func_id());
            controller.newEntidade(ent);
        }
        // Edit requisito
        else {
            requirement.setID(requirement_id);
            ent.setFk_Req_Func_id(requirement_id);
            controller.editReqFunc(requirement);
            controller.editEntidade(ent);
        }

        response.redirect(`/${user_id}/view/project/${project_id}`);
    }
);


// -------------------------------------------------
// VIEW DE CASOS DE USO   ## ROUTE
// -------------------------------------------------


app.get("/:id_user/project/:id_project/view/casouso",
    async function (request, response) {
        let user_id = request.params.id_user;
        let project_id = request.params.id_project;

        try {

            var rows = await controller.getProcessoCasoUsoByProject(project_id);
            var requisitos = await controller.selectRequirementByProject(project_id);
            var tabelaCasoUso = await controller.selectRelacionamentoCasoUso();

            response.render("viewProcessos", { id_user: user_id, id_project: project_id, data: rows, data_req: requisitos, tabela: tabelaCasoUso });
        } catch (err) {
            response.send(err);
        }
    }
);


// -------------------------------------------------
// NOVO/EDIT PROCESSO DE CASOS DE USO   ## ROUTE
// -------------------------------------------------


app.get("/:id_user/project/:id_project/casouso/:id_processo?",
    async function (request, response) {
        let user_id = request.params.id_user;
        let project_id = request.params.id_project;
        let processo_id = request.params.id_processo;
        var dataReq = await controller.selectRequirementByProject(project_id);

        // Novo processo
        if (processo_id == null) {

            response.render("procCasoUso", {
                id_user: user_id,
                id_project: project_id,
                type: 'register',
                dataReq: dataReq,
                data: []
            });
        }
        // Edit processo
        else {
            var processo = await controller.getProcesso(processo_id);
            response.render("procCasoUso", {
                id_user: user_id,
                id_project: project_id,
                type: 'edit',
                dataReq: dataReq,
                data: processo
            });
        }
    }
);

app.post("/:id_user/project/:id_project/casouso/:id_processo?",
    async function (request, response) {
        let user_id = request.params.id_user;
        let project_id = request.params.id_project;
        let processo_id = request.params.id_processo;
        let req_name = request.body.requisito_funcional;
        let req_id = await controller.getReqIDbyName(req_name, project_id);

        if (req_id === null)
            return response.status(400).json({
                erro: true,
                mensagem: "Erro: Processo deve estar Ligado a um Requisito!",
            });
        const processoCaso = new processoCasoDeUso(
            0,
            request.body.casotitle,
            request.body.tipo_processo,
            project_id,
            req_id
        );


        // Novo requisito
        if (processo_id == null) controller.newProcessoCaso(processoCaso);
        // Edit requisito
        else {
            processoCaso.setID(processo_id);
            controller.editProcessoCaso(processoCaso);
        }

        response.redirect(`/${user_id}/project/${project_id}/view/casouso`);
    }
);


// -------------------------------------------------
// NOVO/EDIT RELACIONAMENTO CASOS DE USO   ## ROUTE
// -------------------------------------------------


app.get("/:id_user/project/:id_project/createRelCasoUso",
    async function (request, response) {
        let user_id = request.params.id_user;
        let project_id = request.params.id_project;
        var data_Casos = await controller.getProcessoCasoUsoByProject(project_id);
        try {
            response.render("relCasosUso", {
                id_user: user_id,
                id_project: project_id,
                data: [],
                dataCasos: data_Casos,
                type: "register"
            });
        } catch (err) {
            response.send(err);
        }

    }
);

app.post("/:id_user/project/:id_project/createRelCasoUso",
    async function (request, response) {
        let user_id = request.params.id_user;
        let project_id = request.params.id_project;

        var entidade1 = await controller.getProcessoIDbyName(request.body.caso_uso_1, project_id);
        var caso2 = await controller.getProcessoIDbyName(request.body.caso_uso_2, project_id);
        const rel = new relCasoUso(
            0,
            caso1,
            caso2
        );

        controller.newRelCasoUso(rel);

        response.redirect(`/${user_id}/project/${project_id}/view/casouso`);
    }
);


// -------------------------------------------------
// DELETE DE PROCESSO CASOS DE USO   ## ROUTE
// -------------------------------------------------


app.get("/:id_user/delete/:id_project/casouso/:id_processo",
    function (request, response) {
        let project_id = request.params.id_project;
        let user_id = request.params.id_user;
        let processo_id = request.params.id_processo;

        controller.deleteProcessoCaso(processo_id);

        response.redirect(`/${user_id}/project/${project_id}/view/casouso`);
    }
);


// -------------------------------------------------
// NOVO/EDIT ENTIDADE   ## ROUTE
// -------------------------------------------------


app.get("/:id_user/project/:id_project/entidade/:id_requirement/:id_entidade?",
    async function (request, response) {
        let user_id = request.params.id_user;
        let project_id = request.params.id_project;
        let requirement_id = request.params.id_requirement;
        let entidade_id = request.params.id_entidade;

        try {
            //New Entidade
            if (entidade_id == null) {
                response.render("entidades", {
                    id_user: user_id,
                    id_project: project_id,
                    id_req: requirement_id,
                    data: [],
                    dataAtrib: [],
                    type: "register"
                });
                //edit Entidade
            } else {
                var entidade = await controller.getEntidade(entidade_id);
                var atributos = await controller.getAtributoByEnt(entidade_id);
                response.render("entidades", {
                    id_user: user_id,
                    id_project: project_id,
                    id_req: requirement_id,
                    data: entidade,
                    dataAtrib: atributos,
                    type: 'edit'
                });
            }

        } catch (err) {
            response.send(err);
        }

    }
);

app.post("/:id_user/project/:id_project/entidade/:id_requirement/:id_entidade?",
    async function (request, response) {
        let user_id = request.params.id_user;
        let project_id = request.params.id_project;
        let requirement_id = request.params.id_requirement;
        let entidade_id = request.params.id_entidade;

        const ent = new entidade(
            0,
            request.body.entidadetitle,
            requirement_id
        );
        const atr = new atributo(
            0,
            request.body.atributos,
            0,
            0
        );

        // Novo Entidade/Atributo
        if (entidade_id == null) {
            controller.newEntidade(ent);
            var ent_id = await controller.selectLastEntidadeID();
            atr.setFk_entidade_id(ent_id);
            controller.newAtributo(atr);
            //edit Entidade/Atributo
        } else {
            ent.setID(entidade_id);
            atr.setFk_entidade_id(entidade_id);
            controller.editEntidade(ent);
            var atrID = await controller.getAtributoIDbyName(atr.getNome_atributo(), atr.getFk_entidade_id());
            controller.editAtributo(atrID);
        }

        response.redirect(`/${user_id}/view/project/${project_id}`);
    }
);


// -------------------------------------------------
// NOVO/EDIT RELACIONAMENTO ENTIDADES   ## ROUTE
// -------------------------------------------------

//Envia para o corpo: data;dataEntidades;id_user;id_project;type
app.get("/:id_user/project/:id_project/createRelEntidade",
    async function (request, response) {
        let user_id = request.params.id_user;
        let project_id = request.params.id_project;
        var data_Entidades = await controller.getEntidadeByProject(project_id);
        try {
            response.render("relEntidade", {
                id_user: user_id,
                id_project: project_id,
                data: [],
                dataEntidades: data_Entidades,
                type: "register"
            });
        } catch (err) {
            response.send(err);
        }

    }
);
//Parametros esperados: entidade_1;entidade_2;cardinalidade;
app.post("/:id_user/project/:id_project/createRelEntidade",
    async function (request, response) {
        let user_id = request.params.id_user;
        let project_id = request.params.id_project;

        var entidade1 = await controller.getProcessoIDbyName(request.body.entidade_1, project_id);
        var entidade2 = await controller.getProcessoIDbyName(request.body.entidade_2, project_id);
        var cardinalidade = request.body.cardinalidade;
        const rel = new relacionamentoEntidade(
            entidade1,
            entidade2,
            cardinalidade
        );

        controller.newRelacionamentoEntidade(rel);

        response.redirect(`##`);
    }
);


// -------------------------------------------------
// NOVO/EDIT ATRIBUTO   ## ROUTE
// -------------------------------------------------


//Precisa de ':id_user' ':id_project' ':id_atributo?'
app.get("##",
    async function (request, response) {
        let user_id = request.params.id_user;
        let project_id = request.params.id_project;
        let atributo_id = request.params.id_atributo;

        try {
            //New atributo
            if (atributo_id == null) {
                response.render("atributo", {
                    id_user: user_id,
                    id_project: project_id,
                    data: [],
                    type: "register"
                });
                //edit atributo
            } else {
                var atributo = await controller.getAtributo(atributo_id);
                response.render("atributos", {
                    id_user: user_id,
                    id_project: project_id,
                    data: atributo,
                    type: 'edit'
                });
            }

        } catch (err) {
            response.send(err);
        }

    }
);

app.post("##",
    async function (request, response) {
        let user_id = request.params.id_user;
        let project_id = request.params.id_project;
        let atributo_id = request.params.id_atributo;
        //let entidade_id = request.params.entidade_id;

        const atr = new atributo(
            0,
            request.body.nome_atributo,
            request.body.tipo_atributo,
            0//entidade_id
        )

        // Novo Atributo
        if (atributo_id == null) {
            //var ent_id = await controller.selectLastEntidadeID();
            //atr.setFk_entidade_id(ent_id);
            controller.newAtributo(atr);
            //edit Atributo
        } else {
            atr.setID(atributo_id);
            controller.editAtributo(atr);
        }

        response.redirect(`##`);
    }
);


// -------------------------------------------------
// MODULO 2
// -------------------------------------------------


app.get("/modulo2/:user_id", async function (request, response) {
    let user_id = request.params.user_id;

    try {
        var rows = await controller.getProjectsByUser(user_id);

        response.render("modulo2.ejs", { id_user: user_id, data: rows });
    } catch (err) {
        response.send(err);
    }
});


// -------------------------------------------------
// AVALIAÇÃO            ## ROUTE
// -------------------------------------------------


app.get("/modulo2/:user_id/:project_id/avaliacao/", async function (request, response) {
    let user_id = request.params.user_id;
    let project_id = request.params.project_id;

    try {
        var rows = await controller.getPerguntas(project_id);
        let sum = 0;
        let risk = '';
        for (const item of rows) {
            sum += item.result;
        }
        if (sum < 50)
            risk = 'Alto Risco';
        else
            risk = 'Baixo Risco';

        response.render("avaliacao.ejs", { id_user: user_id, id_project: project_id, rows: rows, sum: sum, risk: risk });
    } catch (err) {
        response.send(err);
    }
});

app.post("/modulo2/:user_id/:project_id/avaliacao",
    async function (request, response) {
        let id_user = request.params.user_id;
        let id_project = request.params.project_id;
        let ids_p = request.body.idVariable;
        let yon_p = request.body.YesOrNo;
        let itera = 0;
        for (let value of request.body.resp) {
            //Calcula resultado
            let result = controller.calculaResult(value, yon_p[itera]);
            //Atribui os valores ao Objeto classe itemPergunta
            let item_p = new itemPergunta(
                0,
                value,
                result,
                id_project,
                ids_p[itera]
            );
            //Busca por um ID existente
            let iPergunta_id = await controller.selectItemPerguntaIDbyProjectANDpergunta(id_project, ids_p[itera]);

            //Se não já foi criado no banco gera uma nova entrada de ItemPergunta
            if (iPergunta_id == null)
                controller.newItemPergunta(item_p);
            //Se já foi criado no banco esse item é atualizado
            else {
                item_p.setID(iPergunta_id.id);
                controller.editItemPergunta(item_p);
            }
            //Segue para o proximo item
            itera += 1;
        }

        response.redirect(`/modulo2/${id_user}/${id_project}/avaliacao/`);
    }
);


// -------------------------------------------------
// DIAGRAMA ATRIBUTO   ## ROUTE
// -------------------------------------------------

 
app.get("##",
    async function (request, response) {
        let user_id = request.params.id_user;
        let project_id = request.params.id_project;

        var data_Entidades = await controller.getEntidadeByProject(project_id);
        var relEntidades = await controller.getRelacionamentoEntidade();

        var data_Atributos = await controller.getAtributosByProject();
        var classe;


        try {
            for (const entidade of data_Entidades) {

            }
            for (const rel of relEntidades)
                response.render("diagramaAtributo", {
                    id_user: user_id,
                    id_project: project_id,
                    data: [],
                    type: "register"
                });

        } catch (err) {
            response.send(err);
        }

    }
);


// -------------------------------------------------
// Inicia o servidor na porta definida anteriormente
// -------------------------------------------------
app.listen(port, () => {
    console.log(`Server is ON -> http://localhost:${port}`);
});