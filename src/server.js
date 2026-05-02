const express = require('express');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve arquivos estáticos da pasta public que está dentro de src
app.use(express.static(path.join(__dirname, 'public')));

// Rota principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Rota de envio do formulário
app.post('/enviar-relato', (req, res) => {
    const { nombre, fecha, descripcion } = req.body;
    console.log("Nuevo relato recibido:", { nombre, fecha, descripcion });
    
    res.status(201).json({ 
        mensagem: `✅ Gracias ${nombre}, su reporte ha sido registrado.` 
    });
});

// Fallback para rotas não encontradas
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

module.exports = app;