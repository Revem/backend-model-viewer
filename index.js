const express = require('express');
const app = express();
const conn = require('./db/conn');
const authRoutes = require('./routes/authRoutes');
const modelRoutes = require('./routes/modelRoutes');
const mainRoutes = require('./routes/mainRoutes');
const cors = require('cors');

// Configurações do Express
const port = 5000;

app.use(express.json());

// Resolver problemas de CORS
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));

// Pasta de arquivos publicos do servidor
app.use(express.static('public'));

// Rotas
app.use("/", mainRoutes);
app.use("/auth", authRoutes);
app.use("/model", modelRoutes);

// Realizar a conexão
conn
  .sync()
  .then(() => {
    app.listen(port);
  })
  .catch((err) => console.log(err));