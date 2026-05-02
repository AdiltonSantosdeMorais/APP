const express = require('express');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve os arquivos da pasta public (CSS, Imagens, JS do navegador)
app.use(express.static(path.join(__dirname, '../public')));

// Rota para o formulário
app.post('/enviar-relato', (req, res) => {
    console.log("Dados recebidos:", req.body);
    res.status(201).json({ mensagem: "✅ Reporte enviado com sucesso!" });
});

// ESTA ROTA É A QUE FALTA: Ela entrega o index.html quando você abre o link
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Rota de fallback (caso qualquer outra rota falhe)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

module.exports = app;