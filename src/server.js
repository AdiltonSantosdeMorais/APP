const express = require('express');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/enviar-relato', (req, res) => {
    console.log("Relato processado para:", req.body.nombre);
    res.status(201).json({ mensagem: "Sucesso" });
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Online`));
module.exports = app;