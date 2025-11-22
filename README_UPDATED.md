# Food Order Service 🍕

A complete Angular-based food ordering application with mock backend, featuring authentication, shopping cart, checkout, and admin dashboard.

## Features

- 🛍️ **Product Catalog**: Browse food items with images and descriptions
- 🛒 **Shopping Cart**: Add items, update quantities, and manage cart
- 💳 **Checkout Process**: Complete order with delivery details
- 🔐 **Authentication**: Login system with mock authentication
- 👨‍💼 **Admin Dashboard**: View products and orders (protected route)
- 📱 **Responsive Design**: Built with Angular Material for modern UI
- 🎨 **Material Design**: Clean and professional interface

## Tech Stack

- **Angular 19.2** - Frontend framework
- **Angular Material** - UI components
- **RxJS** - Reactive programming
- **JSON Server** - Mock REST API backend
- **TypeScript** - Type-safe development
- **SCSS** - Styling

## Project Structure

```
src/
├── app/
│   ├── core/                    # Core functionality
│   │   ├── guards/              # Route guards (auth)
│   │   └── interceptors/        # HTTP interceptors
│   ├── features/                # Feature modules
│   │   ├── admin/               # Admin dashboard
│   │   ├── auth/                # Authentication (login)
│   │   ├── cart/                # Shopping cart & checkout
│   │   └── shop/                # Product catalog
│   ├── models/                  # TypeScript interfaces
│   ├── services/                # Business logic services
│   └── shared/                  # Shared components & modules
├── mock/                        # Mock backend data
│   ├── db.json                  # Database
│   └── routes.json              # API routes
└── styles.scss                  # Global styles
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher)

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd food-order-service
```

2. Install dependencies
```bash
npm install
```

### Running the Application

#### Option 1: Run Frontend and Mock Backend Together (Recommended)

```bash
npm run start:all
```

This will start:
- Angular dev server at `http://localhost:4200`
- JSON Server (mock API) at `http://localhost:3333`

#### Option 2: Run Separately

**Start Mock Backend:**
```bash
npm run start:mock
```

**Start Angular App (in another terminal):**
```bash
npm start
```

Then open `http://localhost:4200` in your browser.

## Usage Guide

### Shopping Flow

1. **Browse Products**: Visit the home page to see available food items
2. **Add to Cart**: Click "Add to Cart" on any product
3. **View Cart**: Click the cart icon in the header to view items
4. **Checkout**: Click "Checkout" and fill in delivery details
5. **Place Order**: Submit the order (saved to mock backend)

### Authentication

- Navigate to `/auth/login`
- Enter any username and password (mock authentication)
- Access protected routes like admin dashboard

### Admin Dashboard

- Login first (any credentials work)
- Navigate to `/admin`
- View all products and orders

## API Endpoints (Mock)

The mock server provides these endpoints:

- `GET /api/products` - List all products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (admin)
- `PUT /api/products/:id` - Update product (admin)
- `DELETE /api/products/:id` - Delete product (admin)
- `GET /api/orders` - List all orders
- `POST /api/orders` - Create order
- `PATCH /api/orders/:id` - Update order status

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Start Angular dev server |
| `npm run start:mock` | Start JSON Server (mock backend) |
| `npm run start:all` | Start both frontend and backend |
| `npm run build` | Build for production |
| `npm test` | Run unit tests |
| `npm run watch` | Build in watch mode |

## Features in Detail

### Cart Service
- Persists cart data to localStorage
- Reactive state management with RxJS
- Automatic total calculation

### Auth Service
- Mock JWT token generation
- localStorage persistence
- Observable user state

### Product Service
- RESTful API integration
- CRUD operations support
- Category filtering ready

### Order Service
- Order placement with unique IDs
- Order status tracking
- History management

## Development

### Code Scaffolding

Generate new components:
```bash
ng generate component features/my-feature/my-component
```

Generate a service:
```bash
ng generate service services/my-service
```

### Building for Production

```bash
npm run build
```

Build artifacts will be in the `dist/` directory.

### Running Tests

```bash
npm test
```

## Mock Data

The application includes sample food items with:
- Indian cuisine (Biryani, Paneer, Dosa)
- Continental (Pizza)
- Chinese (Noodles, Spring Rolls)
- Beverages and Desserts

You can modify `mock/db.json` to add/edit products.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Future Enhancements

- [ ] Real backend integration
- [ ] Payment gateway integration
- [ ] Order tracking system
- [ ] User profile management
- [ ] Product search and filtering
- [ ] Reviews and ratings
- [ ] Email notifications
- [ ] Mobile app version

## License

This project is licensed under the MIT License.

## Support

For issues or questions, please create an issue in the repository.

---

Built with ❤️ using Angular and Angular Material
