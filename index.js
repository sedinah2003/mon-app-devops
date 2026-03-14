const express = require('express');
const client = require('prom-client');

const app = express();
const PORT = 3000;

// Activer les métriques par défaut
const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics({ timeout: 5000 });

// Compteur de requêtes
const requestCounter = new client.Counter({
  name: 'http_requests_total',
  help: 'Nombre total de requêtes HTTP',
  labelNames: ['method', 'route', 'status']
});

// Page d'accueil
app.get('/', (req, res) => {
  requestCounter.inc({ method: 'GET', route: '/', status: 200 });
  res.send(`
    <html>
      <head><title>Mon App DevOps</title></head>
      <body style="font-family: Arial; text-align: center; padding: 50px; background: #f0f4f8;">
        <h1>🚀 Mon Application DevOps</h1>
        <p>Déployée avec <strong>Docker</strong> et <strong>GitHub Actions</strong></p>
        <p>Projet M2 - ENI Fianarantsoa</p>
        <p style="color: green;">✅ L'application fonctionne !</p>
        <p><a href="/health">🔍 Health Check</a> | <a href="/metrics">📊 Métriques</a></p>
      </body>
    </html>
  `);
});

// Route de santé
app.get('/health', (req, res) => {
  requestCounter.inc({ method: 'GET', route: '/health', status: 200 });
  res.json({
    status: 'OK',
    message: 'Application en bonne santé',
    timestamp: new Date().toISOString()
  });
});

// Route métriques pour Prometheus
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', client.register.contentType);
  res.end(await client.register.metrics());
});

app.listen(PORT, () => {
  console.log(`✅ Serveur démarré sur http://localhost:${PORT}`);
  console.log(`📊 Métriques disponibles sur http://localhost:${PORT}/metrics`);
});
