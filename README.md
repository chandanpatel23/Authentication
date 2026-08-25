# 🔐 Authentication MERN Monorepo

A full-stack authentication web application built with **React + Vite** (frontend) and **Node.js + Express + MongoDB** (backend), featuring a complete monorepo **GitHub Actions CI/CD pipeline**.

---

## 📁 Repository Structure

```text
Authentication/
├── .github/
│   └── workflows/
│       └── ci-cd.yml          # GitHub Actions Monorepo CI/CD Pipeline
├── backend/                    # Express.js REST API & MongoDB
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── index.js
│   ├── package.json
│   └── .env.example
└── frontend/                   # React + Vite + Tailwind CSS
    ├── src/
    ├── package.json
    └── .env.example
```

---

## 🚀 Local Development

### 1. Backend Setup
```bash
cd backend
npm install
# Copy .env.example to .env and configure MONGODB_URI
npm run dev
```
Backend runs on `http://localhost:4000`.

### 2. Frontend Setup
```bash
cd frontend
npm install
# Copy .env.example to .env and configure VITE_SERVER_URL
npm run dev
```
Frontend runs on `http://localhost:5173`.

---

## 🔄 CI/CD Pipeline (GitHub Actions)

The workflow defined in [`.github/workflows/ci-cd.yml`](file:///.github/workflows/ci-cd.yml) automates continuous integration and continuous deployment:

### Features:
1. **Selective Execution (Path Filtering)**: Uses `dorny/paths-filter` so changes in `frontend/` only trigger frontend tests/builds, and changes in `backend/` only trigger backend syntax tests.
2. **Frontend CI**: Performs `npm ci`, runs `ESLint` (`npm run lint`), and builds production bundle (`npm run build`).
3. **Backend CI**: Performs `npm ci` and runs node syntax verification (`npm test`).
4. **Automated Deployments**: On pushes to `main`/`master`, triggers production deployment webhooks after CI passes successfully.

---

## 🔑 Setting Up Deployment Webhooks (GitHub Secrets)

To enable automatic deployments when merging or pushing to `main`:

### 1. Backend (Render Deploy Hook)
1. Go to your **Render Dashboard** -> Your Web Service -> **Settings**.
2. Scroll to **Deploy Hook** and copy the unique URL.
3. Go to your **GitHub Repository** -> **Settings** -> **Secrets and variables** -> **Actions**.
4. Click **New repository secret**:
   - **Name**: `RENDER_DEPLOY_HOOK_URL`
   - **Value**: *Paste the copied Render deploy hook URL*

### 2. Frontend (Vercel Deploy Hook)
1. Go to your **Vercel Project Dashboard** -> **Settings** -> **Git**.
2. Scroll to **Deploy Hooks** and create a hook for the `main` branch.
3. Copy the created deploy hook URL.
4. Go to your **GitHub Repository** -> **Settings** -> **Secrets and variables** -> **Actions**.
5. Click **New repository secret**:
   - **Name**: `VERCEL_DEPLOY_HOOK_URL`
   - **Value**: *Paste the copied Vercel deploy hook URL*
