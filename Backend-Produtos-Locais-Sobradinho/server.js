require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const usuarioRoutes = require('./routes/usuarioRoutes');
const produtorRoutes = require('./routes/produtorRoutes');
const produtosRoutes = require('./routes/produtosRoutes');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

app.use('/usuario', usuarioRoutes);
app.use('/produtor', produtorRoutes);
app.use('/produtos', produtosRoutes);


app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
