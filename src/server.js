const express = require('express');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve arquivos estáticos (CSS, Imagens) da pasta src/public
app.use(express.static(path.join(__dirname, 'public')));

// Rota principal: Entrega o formulário
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Rota para receber os dados
app.post('/enviar-relato', (req, res) => {
    const { nombre } = req.body;
    console.log("Relato recebido de:", nombre);
    res.status(201).json({ mensagem: `✅ Gracias ${nombre}, reporte enviado!` });
});

// Fallback: Se der erro, manda para o index
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

module.exports = app;