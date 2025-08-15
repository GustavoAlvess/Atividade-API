// importtar módulo express
import express, { request } from "express"

// defiir constante para porta do servidos
const serverPort = 3000;
//Criar servidor com express
const app = express();
// Configurar servidor para aceitar JSON nas requisições
app.use(express.json());
// Criar rota GET "/" que retorna uma mensagem
app.get("/" , (req, res) => {
    res.send( `<h1>Hello world!</h1>`);
});
// Iniciar servidor escutando na porta definida e mostrar mensagem no console
app.listen(serverPort, () => {
    console.log(`API dos Bruxos está no ar em http://localhost:${serverPort}`);
    })
    