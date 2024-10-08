const express = require("express"); 
const app = express();

const bodyParser = require('body-parser')

const connection = require('./database/database')

const mercadoModel = require('./database/mercados')

const { where } = require("sequelize");
const { raw } = require("mysql2");

connection.
      authenticate().
      then(()=>{
         console.log("Conectado ao banco de dados!")
      })
      .catch((msgErro)=>{
         console.log("msgErro")
})


app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.set('view engine','ejs')

app.use(express.static('public'))

app.get("/cadmercado", function (req, res) { 
    res.render("cadMercado"); 
}); 


app.post("/submitMercado", function (req, res) { 
    var nome = req.body.nome
    var img = req.body.img
   
    mercadoModel.create({
        nome: nome,
        img:img
    }).then(()=>{
        res.redirect('/')
        
    }).catch((error) => {
        console.error(error);
        res.status(500).send("Erro ao criar mercado");
    });

});

app.get("/editarMercado/:id",(req,res)=>{
    var id = req.params.id
    mercadoModel.findAll({raw:true, where:{id: id}}).then(mercado=>{

        res.render("editMercado",{
            mercado : mercado[0]
        })
    })
})

app.post("submitEditar", (req, res)=>{
    var id = req.body.id
    var nome = req.body.nome

    mercadoModel.findAll({raw:true, where:{id: id}}).then(mercado=>{
        mercado[0].nome = nome
        mercadoModel.save()
    })
})


app.get("/excluirMercado/:id",(req,res)=>{
    var id = req.params.id
    mercadoModel.destroy({
       where: {
          id:id
       }
    }).then(()=>{
       res.redirect('back')
    })
})
 
app.get("/",(req,res)=>{
        
    mercadoModel.findAll({raw:true}).then(mercado =>{
       res.render('index',{
          mercado:mercado
       })
    })
    
 })
 
app.listen(8181, function (erro) { 
   if (erro) { 
       console.log("Erro"); 
   } else { 
       console.log("Servidor iniciado..."); 
   } 
}); 
