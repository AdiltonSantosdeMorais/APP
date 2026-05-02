const express = require('express');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// IMPORTANTE: Ajuste do caminho para a Vercel encontrar o HTML
app.use(express.static(path.join(__dirname, '../public')));

// Rota para o formulário
app.post('/enviar-relato', (req, res) => {
    console.log("Dados recebidos:", req.body);
    res.status(201).json({ mensagem: "✅ Reporte enviado com sucesso!" });
});

// Rota principal para garantir que o index.html abra
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

module.exports = app;