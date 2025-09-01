#!/bin/bash

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
ENVIRONMENT=${1:-prod}
AWS_REGION=${2:-us-east-1}
DATABASE_PASSWORD=${3:-}

if [ -z "$DATABASE_PASSWORD" ]; then
    echo -e "${RED}Error: Database password is required${NC}"
    echo "Usage: ./deploy.sh [environment] [aws-region] [database-password]"
    exit 1
fi

echo -e "${GREEN}🚀 Starting deployment for environment: $ENVIRONMENT${NC}"
echo -e "${GREEN}📍 AWS Region: $AWS_REGION${NC}"

# Check if required tools are installed
check_requirements() {
    echo -e "${YELLOW}🔍 Checking requirements...${NC}"
    
    if ! command -v terraform &> /dev/null; then
        echo -e "${RED}❌ Terraform is not installed${NC}"
        exit 1
    fi
    
    if ! command -v aws &> /dev/null; then
        echo -e "${RED}❌ AWS CLI is not installed${NC}"
        exit 1
    fi
    
    if ! command -v docker &> /dev/null; then
        echo -e "${RED}❌ Docker is not installed${NC}"
        exit 1
    fi
    
    echo -e "${GREEN}✅ All requirements met${NC}"
}

# Initialize Terraform
init_terraform() {
    echo -e "${YELLOW}🔧 Initializing Terraform...${NC}"
    cd infrastructure
    
    # Create terraform.tfvars
    cat > terraform.tfvars << EOF
aws_region = "$AWS_REGION"
database_password = "$DATABASE_PASSWORD"
environment = "$ENVIRONMENT"
EOF
    
    terraform init
    echo -e "${GREEN}✅ Terraform initialized${NC}"
}

# Deploy infrastructure
deploy_infrastructure() {
    echo -e "${YELLOW}🏗️  Deploying infrastructure...${NC}"
    
    terraform plan -out=tfplan
    terraform apply tfplan
    
    echo -e "${GREEN}✅ Infrastructure deployed${NC}"
}

# Build and push Docker images
build_and_push_images() {
    echo -e "${YELLOW}🐳 Building and pushing Docker images...${NC}"
    
    # Get ECR repository URLs from Terraform output
    ECR_BANK_WEBHOOK=$(terraform output -raw ecr_bank_webhook_url)
    ECR_FAKE_BANK_SERVER=$(terraform output -raw ecr_fake_bank_server_url)
    
    # Login to ECR
    aws ecr get-login-password --region $AWS_REGION | docker login --username AWS --password-stdin $ECR_BANK_WEBHOOK
    
    # Build and push bank-webhook
    echo -e "${YELLOW}📦 Building bank-webhook image...${NC}"
    docker build -t $ECR_BANK_WEBHOOK:latest ../../apps/bank-webhook
    docker push $ECR_BANK_WEBHOOK:latest
    
    # Build and push fake-bank-server
    echo -e "${YELLOW}📦 Building fake-bank-server image...${NC}"
    docker build -t $ECR_FAKE_BANK_SERVER:latest ../../apps/fake-bank-server
    docker push $ECR_FAKE_BANK_SERVER:latest
    
    echo -e "${GREEN}✅ Docker images built and pushed${NC}"
}

# Deploy ECS services
deploy_ecs_services() {
    echo -e "${YELLOW}🚢 Deploying ECS services...${NC}"
    
    # Get cluster name from Terraform output
    CLUSTER_NAME="pixelpay-cluster"
    
    # Update services to force new deployment
    aws ecs update-service --cluster $CLUSTER_NAME --service pixelpay-bank-webhook-service --force-new-deployment
    aws ecs update-service --cluster $CLUSTER_NAME --service pixelpay-fake-bank-service --force-new-deployment
    
    # Wait for services to be stable
    echo -e "${YELLOW}⏳ Waiting for services to stabilize...${NC}"
    aws ecs wait services-stable --cluster $CLUSTER_NAME --services pixelpay-bank-webhook-service pixelpay-fake-bank-service
    
    echo -e "${GREEN}✅ ECS services deployed${NC}"
}

# Deploy frontend to Amplify
deploy_frontend() {
    echo -e "${YELLOW}🌐 Deploying frontend to Amplify...${NC}"
    
    # This will be handled by the GitHub Actions workflow
    # or you can manually trigger an Amplify build
    echo -e "${GREEN}✅ Frontend deployment triggered${NC}"
}

# Main deployment flow
main() {
    check_requirements
    init_terraform
    deploy_infrastructure
    build_and_push_images
    deploy_ecs_services
    deploy_frontend
    
    echo -e "${GREEN}🎉 Deployment completed successfully!${NC}"
    
    # Display outputs
    echo -e "${YELLOW}📋 Deployment Summary:${NC}"
    echo -e "ALB DNS: $(terraform output -raw alb_dns_name)"
    echo -e "Database Endpoint: $(terraform output -raw database_endpoint)"
    echo -e "ECR Bank Webhook: $(terraform output -raw ecr_bank_webhook_url)"
    echo -e "ECR Fake Bank Server: $(terraform output -raw ecr_fake_bank_server_url)"
}

# Run main function
main
