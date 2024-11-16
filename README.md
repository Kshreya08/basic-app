# Basic App Deployment with Helm and Minikube

[![Node.js](https://img.shields.io/badge/Node.js-v14+-green.svg)](https://nodejs.org/)
[![Docker](https://img.shields.io/badge/Docker-blue.svg)](https://www.docker.com/)
[![Kubernetes](https://img.shields.io/badge/Kubernetes-v1.24+-blue.svg)](https://kubernetes.io/)

## 📋 Overview

A simple Node.js application containerized with Docker and deployed to Kubernetes using Helm, with monitoring setup using Prometheus and Grafana.

---

## 🚀 Quick Start

# Complete Installation Guide for Basic App Project

## Prerequisites Installation

### 1. Docker and Minikube Setup
```bash
# Install Docker (if not already installed)
sudo apt update
sudo apt install docker.io

# Add current user to docker group
sudo usermod -aG docker $USER
newgrp docker

# Start Minikube with Docker driver
minikube start --driver=docker
```

### 2. Node.js and npm Installation
```bash
# Install Node.js and npm
sudo apt update
sudo apt install nodejs npm

# Verify installations
node -v
npm -v
```

## Project Setup

### 1. Initialize Node.js Project
```bash
# Create project directory and navigate into it
mkdir basic-app && cd basic-app

# Initialize Node.js project
npm init -y

# Install Express.js
npm install express

# Create server file
touch server.js
```

### 2. Docker Configuration
```bash
# Create Dockerfile
touch Dockerfile

# Build Docker image
docker build -t basic-app .

# Run Docker container
docker run -p 8080:8080 basic-app

# Tag Docker image for Docker Hub
docker tag basic-app kshreya08/basic-app:latest

# Push to Docker Hub (requires Docker Hub account)
docker login
docker push kshreya08/basic-app:latest
```

### 3. Helm Chart Setup
```bash
# Add Helm stable repository
helm repo add stable https://charts.helm.sh/stable
helm repo update

# Create Helm chart
helm create basic-chart

# Remove unnecessary template files
cd basic-chart
rm templates/ingress.yaml templates/serviceaccount.yaml templates/hpa.yaml templates/tests

# Install the application using Helm
helm install basic-app ./basic-chart

# Upgrade installation if needed
helm upgrade --install basic-app ./basic-chart
```

### 4. Monitoring Stack Installation

#### Prometheus Setup
```bash
# Add Prometheus repository
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm repo update

# Install Prometheus
helm install prometheus prometheus-community/kube-prometheus-stack

# Forward Prometheus port
kubectl port-forward svc/prometheus-kube-prometheus-prometheus 9090:9090
```

#### Grafana Setup
```bash
# Add Grafana repository
helm repo add grafana https://grafana.github.io/helm-charts
helm repo update

# Install Grafana
helm install grafana grafana/grafana

# Forward Grafana port
kubectl port-forward service/grafana 3000:80

# Get Grafana admin password
kubectl get secret --namespace default grafana -o jsonpath="{.data.admin-password}" | base64 --decode

# Create new Grafana password (optional)
kubectl create secret generic grafana --from-literal=admin-password=helloworld -n default
kubectl rollout restart deployment/grafana -n default
```

## Verification Commands

### Check Kubernetes Resources
```bash
# Check pods
kubectl get pods

# Check services
kubectl get svc

# Get cluster info
kubectl cluster-info

# Get Minikube IP
minikube ip
```

### Port Forwarding
```bash
# Forward application port
kubectl port-forward service/basic-app 8080:80

# Forward Grafana port
kubectl port-forward service/grafana 3000:80

# Forward Prometheus port
kubectl port-forward svc/prometheus-kube-prometheus-prometheus 9090:9090
```

## Troubleshooting Commands

```bash
# Check pod logs
kubectl logs <pod-name>

# Describe pod
kubectl describe pod <pod-name>

# Check port usage
sudo lsof -i :8080
sudo fuser -k 8080/tcp

# Restart Docker
sudo systemctl restart docker

# Step 9: Clean Up
kubectl delete pod <pod-name>
minikube stop
minikube delete
```

## Notes:
- Ensure all ports (8080, 3000, 9090) are available before port forwarding
- Some commands might require sudo privileges
- Docker Hub push requires authentication with your Docker Hub credentials
- Make sure to wait for each component to be ready before proceeding to the next step. 


   

