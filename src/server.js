const express = require('express');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/enviar-relato', (req, res) => {
    // Recebe todos os campos da imagem
    const { fecha, hora, unidad, empresa, descripcion, accion, supervisor, nombre } = req.body;
    
    console.log("Relato recibido:", req.body);
    
    res.status(201).json({ 
        mensagem: `✅ Gracias ${nombre}, el reporte de la unidad ${unidad} fue enviado con éxito.` 
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