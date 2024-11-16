const express = require('express');
const app = express();
const port = 8080;

// Basic output to check  the app is running
app.get('/', (req, res) => {
  res.send('Hello, this is a basic app used in Deploying an application on a Kubernetes cluster using Helm charts. We will also implement Monitoring tools like Prometheus and Grafana for tracking the application performance.');
});

// Additional endpoint for monitoring purposes (e.g., readiness or liveness probe)
app.get('/health', (req, res) => {
  res.status(200).send('Application is healthy');
});

// Start the server
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});


