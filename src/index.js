#!/usr/bin/env node
/**
 * NixLine Demo - Simple Express Server
 *
 * Demonstrates how NixLine manages dependencies and generates
 * Software Bill of Materials (SBOM) for supply chain security.
 */

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to NixLine Demo',
    description: 'Organization-wide CI governance with Nix',
    features: [
      'Policy materialization',
      'SBOM generation',
      'Flake-based automation',
      'Security scanning'
    ]
  });
});

app.get('/health', (req, res) => {
  res.json({ status: 'healthy' });
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`NixLine Demo server running on port ${PORT}`);
  });
}

module.exports = app;
