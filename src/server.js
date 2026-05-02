const express = require('express');
const path = require('path');
const multer = require('multer');
const app = express();

const upload = multer({ storage: multer.memoryStorage() });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Rota atualizada para aceitar o campo 'foto' e os novos dados
app.post('/enviar-relato', upload.single('foto'), (req, res) => {
    const { nombre, unidad } = req.body;
    
    // Opcional: Aqui você veria o arquivo em req.file
    console.log(`Relato recibido de: ${nombre} para la unidad: ${unidad}`);
    
    res.status(201).json({ 
        mensagem: `✅ Gracias ${nombre}, el reporte de la unidad ${unidad} ha sido enviado con éxito.` 
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