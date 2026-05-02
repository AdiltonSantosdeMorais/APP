const express = require('express');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// IMPORTANTE: Como o server.js e a pasta public estão na mesma pasta (src)
app.use(express.static(path.join(__dirname, 'public')));

// Rota principal que entrega o HTML da Elecnor
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Rota para o formulário funcionar
app.post('/enviar-relato', (req, res) => {
    console.log("Dados recebidos:", req.body);
    res.status(201).json({ mensagem: "✅ Reporte enviado com sucesso!" });
});

// Garante que qualquer outra rota também abra o formulário
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor Elecnor rodando na porta ${PORT}`);
});

module.exports = app;