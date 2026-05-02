const express = require('express');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve os arquivos da pasta public (HTML, CSS, JS)
// O caminho '../public' sobe um nível pois o server está dentro de /src
app.use(express.static(path.join(__dirname, '../public')));

// Rota para receber o formulário
app.post('/enviar-relato', (req, res) => {
    try {
        console.log("Relato recebido:", req.body);
        res.status(201).json({ 
            mensagem: "✅ Reporte registrado com sucesso (Modo Demonstração)." 
        });
    } catch (error) {
        res.status(500).json({ mensagem: "Erro ao processar relato." });
    }
});

// Porta dinâmica para Vercel
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Servidor Elecnor rodando na porta ${PORT}`);
});

module.exports = app;