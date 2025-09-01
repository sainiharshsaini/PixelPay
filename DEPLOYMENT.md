# 🚀 Simple Deployment Guide for Beginners (with Docker!)

This is a **beginner-friendly** guide to deploy your PixelPay app to AWS using GitHub Actions and Docker. We'll use Docker for better reliability!

## 🎯 What We'll Do (Simple Version)

1. **Deploy Frontend** → AWS Amplify (like Vercel, but AWS)
2. **Deploy Backend** → AWS App Runner with Docker containers
3. **Database** → AWS RDS (managed database)
4. **CI/CD** → GitHub Actions (automatic deployment with Docker)

## 📋 What You Need

- ✅ GitHub account
- ✅ AWS account (free tier available)
- ✅ Your code in a GitHub repository
- ✅ Docker Desktop installed (optional, for local testing)

## 🚀 Step 1: Setup AWS Account

### 1.1 Create AWS Account
1. Go to [aws.amazon.com](https://aws.amazon.com)
2. Click "Create an AWS Account"
3. Follow the steps (you'll need a credit card, but free tier is available)

### 1.2 Get AWS Keys
1. Go to AWS Console → IAM → Users
2. Create a new user called "deployment-user"
3. Attach this policy: `AdministratorAccess-Amplify` (for simplicity)
4. Create Access Key and Secret Key
5. **Save these keys safely!**

## 🚀 Step 2: Setup GitHub Repository

### 2.1 Push Your Code
```bash
# Make sure your code is in GitHub
git add .
git commit -m "Ready for deployment"
git push origin main
```

### 2.2 Add GitHub Secrets
1. Go to your GitHub repo → Settings → Secrets and variables → Actions
2. Click "New repository secret"
3. Add these secrets:

```
AWS_ACCESS_KEY_ID=your_access_key_here
AWS_SECRET_ACCESS_KEY=your_secret_key_here
```

## 🚀 Step 3: Deploy Frontend (Next.js App)

### 3.1 Setup AWS Amplify
1. Go to [AWS Amplify Console](https://console.aws.amazon.com/amplify/)
2. Click "New app" → "Host web app"
3. Choose "GitHub" and connect your repository
4. Select the `main` branch
5. Click "Next"

### 3.2 Configure Build Settings
Use these simple build settings:

```yaml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - npm install -g pnpm
        - pnpm install
    build:
      commands:
        - cd apps/user-app
        - pnpm run build
  artifacts:
    baseDirectory: apps/user-app/.next
    files:
      - '**/*'
```

### 3.3 Deploy
1. Click "Save and deploy"
2. Wait 5-10 minutes for the build to complete
3. Your app will be live at: `https://random-name.amplifyapp.com`

## 🚀 Step 4: Deploy Backend Services with Docker

### 4.1 Setup AWS App Runner
1. Go to [AWS App Runner Console](https://console.aws.amazon.com/apprunner/)
2. Click "Create service"
3. Choose "Container registry" (this is where Docker comes in!)
4. We'll use Amazon ECR (Elastic Container Registry)

### 4.2 Create ECR Repositories
1. Go to [AWS ECR Console](https://console.aws.amazon.com/ecr/)
2. Click "Create repository"
3. Create two repositories:
   - `pixelpay-bank-webhook`
   - `pixelpay-fake-bank-server`

### 4.3 Build and Push Docker Images
The GitHub Actions workflow will automatically:
1. Build Docker images from your Dockerfiles
2. Push them to ECR
3. Deploy to App Runner

### 4.4 Configure App Runner Services
After the Docker images are pushed, create App Runner services:

#### Bank Webhook Service:
- **Service name**: `pixelpay-bank-webhook`
- **Source**: Container registry
- **Container image**: Select from ECR
- **Port**: `3001`

#### Fake Bank Server:
- **Service name**: `pixelpay-fake-bank`
- **Source**: Container registry
- **Container image**: Select from ECR
- **Port**: `3002`

## 🚀 Step 5: Setup Database

### 5.1 Create RDS Database
1. Go to [AWS RDS Console](https://console.aws.amazon.com/rds/)
2. Click "Create database"
3. Choose "PostgreSQL"
4. **Template**: Free tier
5. **DB name**: `pixelpay`
6. **Username**: `admin`
7. **Password**: Create a strong password
8. Click "Create database"

### 5.2 Get Database URL
After creation, you'll get a connection string like:
```
postgresql://admin:password@database-name.region.rds.amazonaws.com:5432/pixelpay
```

## 🚀 Step 6: Setup GitHub Actions with Docker

### 6.1 Create Workflow File
Create `.github/workflows/deploy.yml` in your repo:

```yaml
name: Deploy to AWS with Docker

on:
  push:
    branches: [ main ]

jobs:
  test-and-build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          
      - name: Setup pnpm
        uses: pnpm/action-setup@v2
        with:
          version: 9.0.0
          
      - name: Install dependencies
        run: pnpm install
        
      - name: Run tests
        run: pnpm run lint && pnpm run check-types
        
      - name: Test build
        run: pnpm run build

  build-and-push-docker:
    needs: test-and-build
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    
    steps:
      - uses: actions/checkout@v4
      
      - name: Configure AWS credentials
        uses: aws-actions/configure-aws-credentials@v4
        with:
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: us-east-1
          
      - name: Login to Amazon ECR
        id: login-ecr
        uses: aws-actions/amazon-ecr-login@v2
          
      - name: Build and push bank-webhook image
        env:
          ECR_REGISTRY: ${{ steps.login-ecr.outputs.registry }}
          IMAGE_TAG: ${{ github.sha }}
        run: |
          docker build -t $ECR_REGISTRY/pixelpay-bank-webhook:$IMAGE_TAG -t $ECR_REGISTRY/pixelpay-bank-webhook:latest ./apps/bank-webhook
          docker push $ECR_REGISTRY/pixelpay-bank-webhook:$IMAGE_TAG
          docker push $ECR_REGISTRY/pixelpay-bank-webhook:latest
          
      - name: Build and push fake-bank-server image
        env:
          ECR_REGISTRY: ${{ steps.login-ecr.outputs.registry }}
          IMAGE_TAG: ${{ github.sha }}
        run: |
          docker build -t $ECR_REGISTRY/pixelpay-fake-bank-server:$IMAGE_TAG -t $ECR_REGISTRY/pixelpay-fake-bank-server:latest ./apps/fake-bank-server
          docker push $ECR_REGISTRY/pixelpay-fake-bank-server:$IMAGE_TAG
          docker push $ECR_REGISTRY/pixelpay-fake-bank-server:latest
          
      - name: Success Message
        run: |
          echo "🐳 Docker images built and pushed to ECR!"
          echo "🚀 Your App Runner services will automatically update"
          echo "⏰ Wait 5-10 minutes for changes to be live"
```

### 6.2 Push and Deploy
```bash
git add .github/workflows/deploy.yml
git commit -m "Add Docker CI/CD workflow"
git push origin main
```

## 🎉 What Happens Now?

### ✅ **Automatic Docker Deployment**
- Every time you push code to `main` branch
- GitHub Actions runs tests
- Docker images are built and pushed to ECR
- App Runner automatically pulls new images
- Frontend automatically rebuilds on Amplify

### ✅ **Your App is Live**
- **Frontend**: `https://your-app.amplifyapp.com`
- **Bank Webhook**: `https://your-app-runner-url-1.amazonaws.com`
- **Fake Bank**: `https://your-app-runner-url-2.amazonaws.com`

## 🔧 How to Update Your App

### Simple Update Process:
1. **Make changes** to your code
2. **Test locally**: `pnpm run dev`
3. **Push to GitHub**: `git push origin main`
4. **Wait 5-10 minutes**
5. **Your app is automatically updated with new Docker images!**

## 🐳 Docker Benefits

- **Consistent environments** - same code runs everywhere
- **Easy scaling** - App Runner handles scaling automatically
- **Better reliability** - no "works on my machine" issues
- **Professional deployment** - industry standard approach

## 🚨 Common Issues & Solutions

### Issue 1: Docker Build Fails
- Check the GitHub Actions logs
- Make sure Dockerfiles are correct
- Verify all dependencies are included

### Issue 2: App Runner Won't Start
- Check if Docker images were pushed to ECR
- Verify port numbers in App Runner config
- Check App Runner logs for errors

### Issue 3: Database Connection
- Check if RDS security group allows connections
- Verify database URL is correct
- Make sure database is running

## 💰 Costs (Free Tier)

- **Amplify**: 1000 build minutes/month FREE
- **App Runner**: 750 hours/month FREE
- **ECR**: 500MB storage/month FREE
- **RDS**: 750 hours/month FREE
- **Total**: ~$0/month for small apps

## 🎯 Next Steps (Optional)

1. **Custom Domain**: Add your own domain name
2. **SSL Certificate**: Enable HTTPS (automatic with Amplify)
3. **Monitoring**: Add basic CloudWatch alerts
4. **Backup**: Enable database backups
5. **Multi-stage Docker builds**: Optimize image sizes

## 📞 Need Help?

1. **Check logs first**: Always look at the error messages
2. **Google the error**: Most issues have simple solutions
3. **AWS Support**: Free tier includes basic support
4. **GitHub Issues**: Check if others had similar problems

---

## 🚀 Quick Start Checklist

- [ ] AWS account created
- [ ] AWS keys saved
- [ ] Code pushed to GitHub
- [ ] GitHub secrets added
- [ ] Amplify app created
- [ ] ECR repositories created
- [ ] App Runner services created
- [ ] RDS database created
- [ ] GitHub Actions workflow added
- [ ] First Docker deployment successful

**You're all set! Your app will automatically deploy with Docker every time you push code.** 🎉

---

**Remember**: Docker makes your deployment more professional and reliable!
