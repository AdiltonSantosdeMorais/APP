const express = require('express');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// IMPORTANTE: Indica que os arquivos estáticos estão na pasta src/public
app.use(express.static(path.join(__dirname, 'public')));

// Rota principal que entrega o HTML
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

// Rota para o formulário
app.post('/enviar-relato', (req, res) => {
    console.log("Dados recebidos:", req.body);
    res.status(201).json({ mensagem: "✅ Reporte enviado com sucesso!" });
});

// Fallback para qualquer outra rota (garante que o F5 não dê erro)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor Elecnor rodando na porta ${PORT}`);
});

module.exports = app;