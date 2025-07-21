// Import the Express.js library
const express = require('express');
// Import cors to allow cross-origin requests from your React app
const cors = require('cors');

// Create an instance of the Express application
const app = express();
// Define the port the server will listen on
const port = 3001; // Using a different port than React (which typically runs on 3000)

// Mock Product Data (matches the frontend data for consistency)
const products = [
  {
    id: 'rp5-1',
    name: 'Raspberry Pi 5 (8GB RAM)',
    price: 80.00,
    imageUrl: 'https://placehold.co/300x200/FF5733/FFFFFF?text=RPi5+8GB',
    description: 'The latest and most powerful Raspberry Pi, perfect for advanced projects and computing tasks. Features 8GB LPDDR4X RAM.',
    category: 'Raspberry Pi'
  },
  {
    id: 'rp5-2',
    name: 'Raspberry Pi 5 (4GB RAM)',
    price: 60.00,
    imageUrl: 'https://placehold.co/300x200/33FF57/FFFFFF?text=RPi5+4GB',
    description: 'A versatile and powerful single-board computer with 4GB LPDDR4X RAM, suitable for a wide range of applications.',
    category: 'Raspberry Pi'
  },
  {
    id: 'case-1',
    name: 'Official Raspberry Pi 5 Case',
    price: 15.00,
    imageUrl: 'https://placehold.co/300x200/3366FF/FFFFFF?text=RPi5+Case',
    description: 'Durable and stylish official case designed specifically for the Raspberry Pi 5, ensuring optimal protection and cooling.',
    category: 'Accessories'
  },
  {
    id: 'psu-1',
    name: 'Official USB-C Power Supply (27W)',
    price: 12.00,
    imageUrl: 'https://placehold.co/300x200/FF33CC/FFFFFF?text=RPi5+PSU',
    description: 'Recommended 27W USB-C power supply for stable and reliable operation of the Raspberry Pi 5.',
    category: 'Accessories'
  },
  {
    id: 'sd-1',
    name: 'SanDisk Extreme microSD Card (64GB)',
    price: 18.00,
    imageUrl: 'https://placehold.co/300x200/FFFF33/000000?text=64GB+SD',
    description: 'High-speed 64GB microSD card, pre-loaded with Raspberry Pi OS for quick setup.',
    category: 'Storage'
  },
  {
    id: 'fan-1',
    name: 'Active Cooler for Raspberry Pi 5',
    price: 8.00,
    imageUrl: 'https://placehold.co/300x200/33FFFF/000000?text=RPi5+Cooler',
    description: 'An essential active cooler to keep your Raspberry Pi 5 running smoothly under heavy loads.',
    category: 'Cooling'
  },
];


// Middleware:
// Enable CORS for all routes. This is crucial for your React app (running on a different port)
// to be able to make requests to this backend.
app.use(cors());
// Enable parsing of JSON request bodies. This allows you to receive JSON data from the frontend.
app.use(express.json());

// --- Routes ---

// 1. Home/Root Route
// A simple GET request to the root URL
app.get('/', (req, res) => {
  res.send('Welcome to the Raspberry Pi Store Backend API!');
});

// 2. Get All Products
// This route returns the entire list of mock products.
app.get('/api/products', (req, res) => {
  res.status(200).json(products);
});

// 3. Get Product by ID
// This route returns a single product based on its ID.
app.get('/api/products/:id', (req, res) => {
  const { id } = req.params; // Get product ID from URL parameters
  const product = products.find(p => p.id === id); // Find the product in the mock data

  if (product) {
    res.status(200).json(product); // Send the product data as JSON
  } else {
    res.status(404).json({ message: 'Product not found.' });
  }
});

// 4. Simulate Checkout/Order
// This route simulates a checkout process. In a real app, this would handle payment,
// order fulfillment, etc.
app.post('/api/checkout', (req, res) => {
  const { cartItems, totalAmount } = req.body; // Expect cart items and total amount from frontend

  console.log('Checkout request received:');
  console.log('Cart Items:', cartItems);
  console.log('Total Amount:', totalAmount);

  // Simulate processing the order
  if (cartItems && cartItems.length > 0 && totalAmount > 0) {
    res.status(200).json({
      message: 'Order placed successfully!',
      orderId: `ORDER-${Date.now()}`, // Simple unique order ID
      receivedItems: cartItems,
      finalAmount: totalAmount
    });
  } else {
    res.status(400).json({ message: 'Invalid checkout data. Cart is empty or total amount is zero.' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Raspberry Pi Store Backend listening at http://localhost:${port}`);
  console.log('To run this server:');
  console.log('1. Make sure you have Node.js installed.');
  console.log('2. Save this code as a .js file (e.g., backend.js).');
  console.log('3. Open your terminal in the same directory.');
  console.log('4. Run `npm init -y` to create a package.json.');
  console.log('5. Install dependencies: `npm install express cors`');
  console.log('6. Run the server: `node backend.js`');
  console.log('The server will then be accessible at http://localhost:3001');
});
