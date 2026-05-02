const express = require('express');
const path = require('path');
const multer = require('multer');
const app = express();
const upload = multer(); // Para lidar com o formulário de foto

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Rota configurada para receber o formulário com foto (upload.any())
app.post('/enviar-relato', upload.any(), (req, res) => {
    const { nombre } = req.body;
    res.status(201).json({ mensagem: `✅ ¡Gracias ${nombre}! Reporte enviado con éxito.` });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor na porta ${PORT}`));

module.exports = app;