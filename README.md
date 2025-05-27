# User Backend

# Requirements
- NodeJS

# Environment file
1. Create a `.env` file in the root directory.
2. Add the following values to the file:

```
DATABASE_USER = 'mapTool'
DATABASE_PASSWORD = '1234'
DATABASE_IP = 'localhost'
DATABASE_PORT = '5432'
DATABASE_NAME = 'postgres'
DATABASE_URL = "postgresql://postgres:password@localhost:5432/wayfinder"
```

# Generate Certificates
1. Install `openssl` binaries: https://slproweb.com/products/Win32OpenSSL.html
2. Create an `ssl` directory in the root directory.
3. `cd` into `ssl` and run `openssl req -x509 -newkey rsa:2048 -nodes -keyout ssl/key.pem -out ssl/cert.pem -days 365`
4. Copy `ssl` directory into the `mobile-frontend` root directory.

# Setup
1. `npm i`
2. `npm run docker:up`
3. `npm run prisma:generate`
5. `npm run dev`
