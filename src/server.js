const express = require('express');
const { PrismaClient } = require('@prisma/client');
const path = require('path');

// MUDANÇA AQUI: Injetamos a URL manualmente para o Prisma 7 não reclamar
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: `file:${path.join(__dirname, '../prisma/dev.db')}`,
    },
  },
});

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// ... restante das rotas (app.post, etc)

// Rota para salvar o relato
app.post('/enviar-relato', async (req, res) => {
    try {
        const novoRelato = await prisma.reporte.create({
            data: {
                data_acidente: req.body.data_acidente,
                hora_acidente: req.body.hora_acidente,
                empresa: req.body.empresa,
                localizacao: req.body.localizacao,
                descricao: req.body.descricao,
                acao_imediata: req.body.acao_imediata,
                supervisor_nome: req.body.supervisor_nome,
                relator_nome: req.body.relator_nome || "Anônimo"
            }
        });
        console.log("✅ Relato salvo no SQLite! ID:", novoRelato.id);
        res.status(201).json({ mensagem: "✅ Reporte registrado con éxito en la base de datos." });
    } catch (error) {
        console.error("❌ Erro ao salvar:", error);
        res.status(500).json({ mensagem: "Error al guardar el reporte." });
    }
});

// Rota para ver os relatos salvos (para conferência)
app.get('/relatos', async (req, res) => {
    const dados = await prisma.reporte.findMany({ orderBy: { criado_em: 'desc' } });
    res.json(dados);
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log('\n=========================================');
    console.log('🚀 SISTEMA HSE ELECNOR - OPERACIONAL');
    console.log(`🔗 Acesso: http://localhost:${PORT}`);
    console.log('=========================================\n');
});