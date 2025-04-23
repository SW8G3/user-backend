# Backend-user

Backend user

---

## 🔒 Local HTTPS Setup (Frontend + Backend)

To run the project securely over HTTPS (required for camera access, WebSocket, etc.), follow these steps to generate a trusted SSL certificate using [`mkcert`](https://github.com/FiloSottile/mkcert).

> ⚠️ **Do not commit the generated `.pem` files to Git** — they are local development certificates and should remain private.

---

### ✅ Step 1: Install `mkcert`

#### On macOS:
```bash
brew install mkcert
mkcert -install
```

#### On Windows:
1. Download and install from: [mkcert GitHub Installation Guide](https://github.com/FiloSottile/mkcert#installation)
2. Then run:
   ```bash
   mkcert -install
   ```

#### On Linux:
Follow the Linux instructions on the [mkcert GitHub repo](https://github.com/FiloSottile/mkcert).

---

### ✅ Step 2: Generate HTTPS Certificates

Run the following command inside the project root folder:

```bash
mkcert localhost 127.0.0.1 ::1
```

This will generate two files:
- `localhost+2.pem` → the SSL certificate
- `localhost+2-key.pem` → the private key

These files will be used automatically by the backend and frontend servers.

---

### ✅ Step 3: Run the Project

No further configuration is needed. Start your development servers as usual:

```bash
npm run dev
```

> Replace `npm run dev` with your specific command if different.

The app should now be accessible at the following URLs:
- **Frontend (Vite):** [https://localhost:5173](https://localhost:5173)
- **Backend (Express):** [https://localhost:3002](https://localhost:3002)

> 🛑 **Note:** You may need to visit these URLs manually once and accept the certificate warning in your browser.

---

### 🔐 Git Ignore Recommendation

Ensure your `.gitignore` file includes the following entries to prevent certificates from being committed:

```gitignore
localhost+2*.pem
*.pem
```