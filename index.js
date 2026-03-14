const express = require('express');
const app = express();
const PORT = 3000;

// Page d'accueil
app.get('/', (req, res) => {
  res.send(`
    <html>
      <head><title>Mon App DevOps</title></head>
      <body style="font-family: Arial; text-align: center; padding: 50px; background: #f0f4f8;">
        <h1>🚀 Mon Application DevOps</h1>
        <p>Déployée avec <strong>Docker</strong> et <strong>GitHub Actions</strong></p>
        <p>Projet M2 - ENI Fianarantsoa</p>
        <p style="color: green;">✅ L'application fonctionne !</p>
      </body>
    </html>
  `);
});

// Route de santé (utile pour le monitoring)
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Application en bonne santé' });
});

app.listen(PORT, () => {
  console.log(`✅ Serveur démarré sur http://localhost:${PORT}`);
});
