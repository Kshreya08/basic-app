# Basic App Deployment with Helm and Minikube

[![Node.js](https://img.shields.io/badge/Node.js-v14+-green.svg)](https://nodejs.org/)
[![Docker](https://img.shields.io/badge/Docker-blue.svg)](https://www.docker.com/)
[![Kubernetes](https://img.shields.io/badge/Kubernetes-v1.24+-blue.svg)](https://kubernetes.io/)

## 📋 Overview

A simple Node.js application containerized with Docker and deployed to Kubernetes using Helm, with monitoring setup using Prometheus and Grafana.

---

## 🚀 Quick Start

### Prerequisites

```markdown
✓ Node.js and npm
✓ Docker
✓ Kubernetes (Minikube)
✓ Helm
✓ kubectl
```

### Local Development

```bash
# Install dependencies
npm install

# Start local server
node server.js
```

---

## 🐳 Docker Setup

```bash
# Build image
docker build -t basic-app .

# Run container
docker run -p 8080:8080 basic-app
```

---

## ☸️ Kubernetes Setup

### Initialize Minikube

```bash
# Start Minikube
minikube start --driver=docker

# Verify cluster
kubectl cluster-info
```

### Deploy with Helm

```bash
# Install application
helm install basic-app ./basic-chart

# Get service URL
export NODE_PORT=$(kubectl get --namespace default -o jsonpath="{.spec.ports[0].nodePort}" services basic-app)
export NODE_IP=$(kubectl get nodes --namespace default -o jsonpath="{.items[0].status.addresses[0].address}")
echo http://$NODE_IP:$NODE_PORT
```

---

## 📊 Monitoring Stack

### Prometheus Setup

```bash
# Add repository
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm repo update

# Install Prometheus
helm install prometheus prometheus-community/kube-prometheus-stack

# Access Prometheus
kubectl port-forward svc/prometheus-kube-prometheus-prometheus 9090:9090
```

### Grafana Setup

```bash
# Add repository
helm repo add grafana https://grafana.github.io/helm-charts
helm repo update

# Install Grafana
helm install grafana grafana/grafana

# Access Grafana
kubectl port-forward service/grafana 3000:80

# Get admin password
kubectl get secret --namespace default grafana -o jsonpath="{.data.admin-password}" | base64 --decode
```

---

## 📁 Project Structure

```
basic-app/
├── 📜 server.js         # Main application file
├── 🐳 Dockerfile        # Docker configuration
├── 📦 package.json      # Node.js dependencies
└── ⎈  basic-chart/     # Helm chart
    ├── Chart.yaml
    ├── values.yaml
    └── templates/
        ├── deployment.yaml
        ├── service.yaml
        └── _helpers.tpl
```

---

## 🛠️ Common Commands

```bash
# Development
npm start                 # Start local server

# Docker
docker build -t basic-app .           # Build image
docker run -p 8080:8080 basic-app     # Run container

# Kubernetes
helm install basic-app ./basic-chart   # Deploy app
kubectl port-forward service/basic-app 8080:80  # Forward port
```

---


---

## 📝 License

This project is licensed under the MIT License.

---

## 🔍 Status

![GitHub last commit](https://img.shields.io/github/last-commit/Kshreya08/basic-app)
![GitHub issues](https://img.shields.io/github/issues/Kshreya08/basic-app)
![GitHub pull requests](https://img.shields.io/github/issues-pr/Kshreya08/basic-app)

Step 9: Clean Up
minikube stop
minikube delete

