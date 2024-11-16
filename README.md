# Basic App Deployment with Helm and Minikube

## Overview
This project involves the creation of a basic Node.js application, containerizing it with Docker, and deploying it to a local Kubernetes cluster using Minikube. It also includes monitoring the application with Prometheus and Grafana.

## Prerequisites
- Minikube
- Helm
- Docker
- Node.js and npm

## Steps to Set Up and Deploy

### Step 1: Set Up Minikube
To set up Minikube and install necessary tools, use the following commands:
```bash
# Start Minikube with the Docker driver
sudo minikube start --driver=docker

Step 2: Install Helm
# Add the stable Helm chart repo
helm repo add stable https://charts.helm.sh/stable
helm repo update

Step 3: Set Up the Node.js Application
mkdir basic-app && cd basic-app
npm init -y
sudo apt update
sudo apt install nodejs npm
node -v
npm -v

npm install express

touch server.js
vim server.js

node server.js

Step 4: Dockerize the Application
Create a Dockerfile
touch Dockerfile
vim Dockerfile


Build and Run the Docker Container

docker build -t basic-app .
docker run -p 8080:8080 basic-app

docker tag basic-app kshreya08/basic-app:latest
docker login
docker push kshreya08/basic-app:latest

Step 5: Helm Chart for Kubernetes Deployment
Create a Helm Chart for Your App

helm create basic-chart
cd basic-chart

onfigure Deployment and Service Update the values.yaml, deployment.yaml, and service.yaml to define your app's deployment and service specifications.

helm install basic-app ./basic-chart

helm upgrade --install basic-app ./basic-chart

kubectl get svc
# Get the NodePort
export NODE_PORT=$(kubectl get --namespace default -o jsonpath="{.spec.ports[0].nodePort}" services basic-app)
export NODE_IP=$(kubectl get nodes --namespace default -o jsonpath="{.items[0].status.addresses[0].address}")
echo http://$NODE_IP:$NODE_PORT

Step 7: Set Up Monitoring with Prometheus and Grafana
Install Prometheus and Grafana Using Helm
helm install prometheus prometheus-community/kube-prometheus-stack
helm install grafana grafana/grafana

Port Forward to Access Grafana
kubectl port-forward service/grafana 3000:80

Access the Grafana UI
kubectl get secret --namespace default grafana -o jsonpath="{.data.admin-password}" | base64 --decode

Configure Dashboards Set up the necessary dashboards to monitor your application.

Step 8: Troubleshooting
View Logs for Prometheus
kubectl logs prometheus-prometheus-kube-prometheus-prometheus-0 -n default

Reinstall Grafana 
kubectl rollout restart deployment/grafana -n default

Delete and Reinstall Pods 
kubectl delete pod <pod-name>
kubectl get pods

Step 9: Clean Up
minikube stop
minikube delete

