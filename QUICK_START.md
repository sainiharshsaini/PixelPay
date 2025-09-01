# 🚀 Quick Start Checklist - Deploy with Docker in 30 Minutes!

Follow these simple steps to get your app live on AWS using Docker containers:

## ✅ Step 1: AWS Account (5 minutes)
- [ ] Go to [aws.amazon.com](https://aws.amazon.com)
- [ ] Click "Create an AWS Account"
- [ ] Follow the steps (need credit card for free tier)
- [ ] **Save your login details!**

## ✅ Step 2: Get AWS Keys (5 minutes)
- [ ] Go to AWS Console → IAM → Users
- [ ] Click "Create user"
- [ ] Name: `deployment-user`
- [ ] Attach policy: `AdministratorAccess-Amplify`
- [ ] Create Access Key + Secret Key
- [ ] **Save both keys safely!**

## ✅ Step 3: Push Code to GitHub (2 minutes)
```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

## ✅ Step 4: Add GitHub Secrets (3 minutes)
- [ ] Go to your GitHub repo → Settings → Secrets → Actions
- [ ] Click "New repository secret"
- [ ] Add: `AWS_ACCESS_KEY_ID` = your access key
- [ ] Add: `AWS_SECRET_ACCESS_KEY` = your secret key

## ✅ Step 5: Deploy Frontend (10 minutes)
- [ ] Go to [AWS Amplify Console](https://console.aws.amazon.com/amplify/)
- [ ] Click "New app" → "Host web app"
- [ ] Choose "GitHub" → Connect your repo
- [ ] Select `main` branch
- [ ] Click "Next" → "Save and deploy"
- [ ] Wait for build to complete (5-10 minutes)

## ✅ Step 6: Setup Docker Infrastructure (10 minutes)

### 6.1 Create ECR Repositories
- [ ] Go to [AWS ECR Console](https://console.aws.amazon.com/ecr/)
- [ ] Click "Create repository"
- [ ] Create: `pixelpay-bank-webhook`
- [ ] Create: `pixelpay-fake-bank-server`

### 6.2 Create App Runner Services
- [ ] Go to [AWS App Runner Console](https://console.aws.amazon.com/apprunner/)
- [ ] Click "Create service"
- [ ] Choose "Container registry"

#### Bank Webhook Service:
- [ ] Service name: `pixelpay-bank-webhook`
- [ ] Source: Container registry
- [ ] Container image: Select from ECR (will be available after first push)
- [ ] Port: `3001`
- [ ] Click "Create & deploy"

#### Fake Bank Server:
- [ ] Service name: `pixelpay-fake-bank`
- [ ] Source: Container registry
- [ ] Container image: Select from ECR (will be available after first push)
- [ ] Port: `3002`
- [ ] Click "Create & deploy"

## ✅ Step 7: Create Database (5 minutes)
- [ ] Go to [AWS RDS Console](https://console.aws.amazon.com/rds/)
- [ ] Click "Create database"
- [ ] Choose "PostgreSQL" → "Free tier"
- [ ] DB name: `pixelpay`
- [ ] Username: `admin`
- [ ] Password: Create strong password
- [ ] Click "Create database"

## ✅ Step 8: Test Everything (5 minutes)
- [ ] Frontend: Open your Amplify URL
- [ ] Backend: Check App Runner service URLs
- [ ] Database: Verify connection

## 🎉 You're Done!

### What You Have:
- ✅ **Frontend**: Live at `https://your-app.amplifyapp.com`
- ✅ **Backend**: Two Docker services running on App Runner
- ✅ **Database**: PostgreSQL database on RDS
- ✅ **CI/CD**: Automatic Docker deployment on every push

### How to Update:
1. Make changes to your code
2. `git push origin main`
3. Wait 5-10 minutes
4. Your app is automatically updated with new Docker images! 🚀

## 🐳 Docker Benefits You Get:

- **Consistent environments** - same code runs everywhere
- **Easy scaling** - App Runner handles scaling automatically
- **Better reliability** - no "works on my machine" issues
- **Professional deployment** - industry standard approach

## 🔄 How Docker Deployment Works:

1. **Code Push** → GitHub Actions triggers
2. **Tests Run** → Lint, type-check, build
3. **Docker Build** → Images created from your Dockerfiles
4. **Push to ECR** → Images stored in AWS container registry
5. **App Runner Updates** → Automatically pulls new images
6. **Live Updates** → Your app is updated with new containers

---

## 🚨 If Something Goes Wrong:

1. **Check the logs** in AWS Console
2. **Check GitHub Actions** for Docker build errors
3. **Verify ECR repositories** have images
4. **Google the error message** - most issues are common
5. **Start over** - delete and recreate the service

## 💰 Costs:
- **Free tier**: $0/month for small apps
- **After free tier**: ~$20-50/month for typical usage
- **ECR**: 500MB storage/month FREE

---

**Remember**: Docker makes your deployment more professional and reliable! 🎯
