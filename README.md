# POS BRIKIN — Backend (Node.js · Express · Sequelize · Multer)

A REST API for the **POS BRIKIN** (Point of Sale) Next.js front-end found in `../pos-systeme-boissons`.
Implements every entity from `../pos-systeme-boissons/docs/database-model.md`.

---

## 1. Stack

| Layer    | Tech                                       |
| -------- | ------------------------------------------ |
| Runtime  | Node.js ≥ 18                               |
| HTTP     | Express 4                                  |
| ORM      | Sequelize 6 — **MySQL** (PostgreSQL ok)    |
| Uploads  | Multer (disk storage)                      |
| Security | Helmet, CORS, bcryptjs (cashier passwords) |
| Logging  | morgan                                     |

---

## 2. Project structure

```
server/
├── .env.example
├── .env                      # active configuration (gitignored)
├── package.json
├── src/
│   ├── app.js                # Express app composition
│   ├── index.js              # HTTP server entry point
│   ├── config/
│   │   ├── env.js            # .env loader
│   │   └── database.js       # Sequelize instance (MySQL)
│   ├── models/               # 13 Sequelize models + index
│   ├── controllers/          # Business logic
│   ├── routes/               # Express routers
│   ├── middlewares/
│   │   ├── auth.js           # X-Cashier-Id context
│   │   ├── upload.js         # Multer
│   │   ├── errorHandler.js
│   │   └── notFound.js
│   ├── utils/
│   │   ├── apiResponse.js
│   │   ├── httpError.js
│   │   ├── orderNumber.js
│   │   ├── pick.js
│   │   └── pricing.js
│   ├── seeders/run.js
│   └── scripts/sync-db.js
├── uploads/                  # Multer destination (auto-created)
└── README.md
```

---

## 3. Installation

```bash
cd server
cp .env.example .env           # adjust values to your MySQL credentials
npm install
```

Create the database first (the server does **not** create it itself):

```sql
CREATE DATABASE pos_brikin CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

Then run the seeder (creates tables + inserts initial data) and start the server :

```bash
npm run seed      # creates tables + inserts initial data
npm run dev       # http://localhost:4000/api
```

---

## 4. Environment variables (`.env`)

| Var                   | Default      | Notes                    |
| --------------------- | ------------ | ------------------------ |
| `PORT`                | `4000`       |                          |
| `API_PREFIX`          | `/api`       |                          |
| `CORS_ORIGIN`         | `*`          | comma-separated list     |
| `DB_DIALECT`          | `mysql`      | `mysql` or `postgres`    |
| `DB_HOST`             | `localhost`  |                          |
| `DB_PORT`             | `3306`       | `5432` for PostgreSQL    |
| `DB_NAME`             | `pos_brikin` |                          |
| `DB_USER`             | `root`       |                          |
| `DB_PASSWORD`         | _(empty)_    |                          |
| `UPLOAD_DIR`          | `./uploads`  |                          |
| `MAX_UPLOAD_SIZE_MB`  | `5`          |                          |
| `DEFAULT_TAX_RATE`    | `0.05`       | matches `cart-panel.tsx` |
| `DEFAULT_FX_RATE`     | `2289.3077`  | 1 USD = 2289.3077 FC     |
| `LOW_STOCK_THRESHOLD` | `15`         |                          |

---

## 5. API reference

Base URL : `http://localhost:4000/api`

> All responses are JSON with the shape `{ success: true, data, message }` or `{ success: false, message, details }`.
> The `Cashier` context is read from the `X-Cashier-Id: <id>` header.

### Categories

- `GET    /categories` — list (optional `?withCount=true`)
- `GET    /categories/slug/:slug`
- `POST   /categories`
- `PUT    /categories/:id`
- `DELETE /categories/:id`

### Products

- `GET    /products?q=&category=&page=&limit=&includeInactive=`
- `GET    /products/low-stock`
- `GET    /products/:id`
- `POST   /products` (accepts `sizes: [{label, priceExtra}]`)
- `PUT    /products/:id`
- `DELETE /products/:id`
- `GET    /products/:id/stock`
- `POST   /products/:id/stock` `{ type: "in"|"out"|"adjustment", quantity, reason }`
- `GET    /products/:productId/sizes`
- `POST   /products/:productId/sizes`
- `DELETE /products/:productId/sizes/:id`

### Cashiers

- `GET    /cashiers?q=&role=&includeInactive=`
- `GET    /cashiers/:id`
- `POST   /cashiers` (optional `password` — bcrypt-hashed)
- `PUT    /cashiers/:id`
- `DELETE /cashiers/:id`
- `POST   /cashiers/login` `{ code, password }`

### Customers

- `GET    /customers?q=&type=`
- `GET    /customers/:id`
- `POST   /customers`
- `PUT    /customers/:id`
- `DELETE /customers/:id`

### Orders

- `GET    /orders?status=&cashierId=&from=&to=&page=&limit=`
- `GET    /orders/:id`
- `POST   /orders` — body : `{ items: [{productId, sizeId?, quantity}], customerId?, currency?, cashierId? }`
- `POST   /orders/:id/pay` — body : `{ method, amount, reference? }` → marks `paid`, decrements stock, creates a `Payment`
- `POST   /orders/:id/refund`
- `POST   /orders/:id/cancel`
- `DELETE /orders/:id`

### Payments

- `GET    /payments`
- `GET    /payments/:id`
- `DELETE /payments/:id`

### Stock

- `GET    /stock/low`
- `GET    /stock-movements?productId=&type=&from=&to=&page=&limit=`

### Branding (singleton, id=1)

- `GET    /branding`
- `PUT    /branding`
- `POST   /branding/reset`

### Preset themes

- `GET    /themes`
- `POST   /themes`
- `DELETE /themes/:id`

### FX rates (USD → FC)

- `GET    /fx-rates?code=USD`
- `GET    /fx-rates/current?code=USD`
- `POST   /fx-rates` `{ code, rateToFc, effectiveAt? }`
- `DELETE /fx-rates/:id`

### Dashboard

- `GET    /dashboard/summary` → `{ todaySales, todayOrders, topSellers, salesByDay, fxRate }`
- `GET    /dashboard/activity?limit=20`

### Uploads (Multer)

- `POST   /uploads/image` (form-data `image=<file>`)
- `POST   /uploads/images` (form-data `images=<file1>`, `images=<file2>`, …)
- Files are served at `/uploads/<filename>`

---

## 6. Sample requests

### Create a product

```bash
curl -X POST http://localhost:4000/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Drink",
    "price": 5000,
    "categoryId": 1,
    "stockQuantity": 50,
    "sizes": [{ "label": "75cl", "priceExtra": 1000 }]
  }'
```

### Place an order

```bash
curl -X POST http://localhost:4000/api/orders \
  -H "Content-Type: application/json" \
  -H "X-Cashier-Id: 1" \
  -d '{
    "items": [
      { "productId": 1, "quantity": 2 },
      { "productId": 2, "sizeId": 3, "quantity": 1 }
    ]
  }'
```

### Pay the order

```bash
curl -X POST http://localhost:4000/api/orders/1/pay \
  -H "Content-Type: application/json" \
  -H "X-Cashier-Id: 1" \
  -d '{ "method": "cash", "amount": 99.5 }'
```

### Upload an image

```bash
curl -X POST http://localhost:4000/api/uploads/image \
  -F "image=@/path/to/photo.jpg"
```

---

## 7. Wiring with the Next.js front-end

Add a `.env.local` in the Next.js project :

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:4000/api
```

…and replace the static `lib/data.ts` with `fetch` calls. Each `Drink` matches the JSON returned by `GET /api/products`.

---

## 8. NPM scripts

| Command           | Description                    |
| ----------------- | ------------------------------ |
| `npm start`       | Run the server (production)    |
| `npm run dev`     | Run with nodemon (auto-reload) |
| `npm run seed`    | Insert/update initial data     |
| `npm run db:sync` | Create / alter tables only     |

---

## 9. Notes

- The `Branding` table is a **singleton** (`id=1`).
- The order number format is `ORD-10001` (auto-incremented from the last `id`).
- The `pay` endpoint **atomically** decrements stock and records a `StockMovement` (type `out`).
- All decimals are returned as strings by Sequelize — convert with `parseFloat` on the client.
- `sequelize.sync({ alter: true })` is used in dev. Switch to proper migrations (`sequelize-cli`) for production.
