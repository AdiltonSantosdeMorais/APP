const express = require('express');
const path = require('path');
const multer = require('multer'); // Biblioteca para lidar com fotos
const app = express();

// Configuração simples para não salvar o arquivo no disco da Vercel (que é bloqueado)
const upload = multer({ storage: multer.memoryStorage() });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Rota atualizada para aceitar o campo 'foto'
app.post('/enviar-relato', upload.single('foto'), (req, res) => {
    const { nombre, unidad } = req.body;
    const temFoto = req.file ? "con foto" : "sin foto";

    console.log(`Relato recibido de ${nombre} ${temFoto}`);
    
    res.status(201).json({ 
        mensagem: `✅ Gracias ${nombre}, reporte de ${unidad} recibido con éxito.` 
    });
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

module.exports = app;