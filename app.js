const express = require("express"); 
const app = express(); 

app.set('view engine','ejs')
 
app.get("/", function (req, res) { 
   res.render("index"); 
}); 
 
app.listen(8181, function (erro) { 
   if (erro) { 
       console.log("Erro"); 
   } else { 
       console.log("Servidor iniciado..."); 
   } 
}); 
