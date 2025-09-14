# Loomé

Timeless Elegance | Premium Clothing Brand

## Overview
Loomé is a premium clothing brand focused on timeless elegance, understated luxury, and quality craftsmanship. This web application showcases our classic collection and provides a seamless shopping experience.

## Features
- Modern, responsive UI built with React and Vite
- Elegant product pages and shop
- Countdown timer for special events
- About, Contact, and FAQ pages
- Accessible UI components
- Tailwind CSS for rapid styling
- Optimized assets and performance

## Getting Started

### Prerequisites
- Node.js (v16 or higher recommended)
- npm or yarn

### Installation
```bash
npm install
```

### Development
```bash
npm run dev
```

### Build
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## Project Structure
```
public/           # Static assets (favicon, images, video)
src/              # Source code
  assets/         # Images and logos
  components/     # Reusable UI components
  hooks/          # Custom React hooks
  lib/            # Utility functions
  pages/          # Main pages (About, Contact, FAQ, Shop, etc.)
App.tsx           # Main app component
main.tsx          # Entry point
index.html        # HTML template
```

## Technologies Used
- React
- Vite
- TypeScript
- Tailwind CSS
- PostCSS
- ESLint

## Backend API (Node.js + Express + MongoDB)

### Authentication
- `POST /api/auth/register` — Register a new user
  - Body: `{ name, email, password }`
- `POST /api/auth/login` — Login and receive JWT token
  - Body: `{ email, password }`
  - Response: `{ token, user }`

### Products
- `GET /api/products` — Get all products
- `GET /api/products/:id` — Get product by ID

### Users
- `GET /api/users` — Get all users
- `GET /api/users/:id` — Get user by ID

### Orders
- `GET /api/orders` — Get all orders
- `GET /api/orders/:id` — Get order by ID

### Contact
- `POST /api/contact` — Submit contact form
  - Body: `{ name, email, message }`

### Notes
- Protected routes (e.g., creating orders) should require JWT in `Authorization` header: `Bearer <token>`
- Environment variables are managed in `.env` (see backend folder)
- Database: MongoDB (see `MONGODB_URI` in `.env`)

## License
This project is licensed under the MIT License.

## Contact
For inquiries, collaborations, or support, please contact us via the Contact page or email: info@loome.com

---

© 2025 Loomé. All rights reserved.
