const express = require('express');
const path = require('path');
const app = express();

// Suporta JSON e formulários simples
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve a pasta public (onde está seu HTML e a Logo)
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Rota de envio (Simulada para funcionar em qualquer lugar)
app.post('/enviar-relato', (req, res) => {
    const { nombre } = req.body;
    console.log("Relato recebido de:", nombre);
    
    res.status(201).json({ 
        mensagem: `✅ ¡Gracias ${nombre || 'Relator'}! El reporte ha sido enviado con éxito.` 
    });
});

// Fallback para rotas inexistentes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor online na porta ${PORT}`);
});

module.exports = app;