import React, { useState, useEffect } from 'react';

// Tailwind CSS is assumed to be available in the environment.
// No explicit import needed for Tailwind classes themselves.

// Mock Product Data
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

// Product Card Component
const ProductCard = ({ product, onAddToCart, onViewDetail }) => (
  <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 flex flex-col">
    <img
      src={product.imageUrl}
      alt={product.name}
      className="w-full h-48 object-cover rounded-t-lg"
      onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/300x200/CCCCCC/000000?text=Image+Not+Found"; }}
    />
    <div className="p-6 flex flex-col flex-grow">
      <h3 className="text-xl font-semibold text-gray-800 mb-2 truncate">{product.name}</h3>
      <p className="text-blue-600 text-2xl font-bold mb-4">${product.price.toFixed(2)}</p>
      <p className="text-gray-600 text-sm mb-4 flex-grow line-clamp-3">{product.description}</p>
      <div className="flex flex-col space-y-2 mt-auto">
        <button
          onClick={() => onAddToCart(product)}
          className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-full shadow-md transition duration-300"
        >
          Add to Cart
        </button>
        <button
          onClick={() => onViewDetail(product)}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full shadow-md transition duration-300"
        >
          View Details
        </button>
      </div>
    </div>
  </div>
);

// Product Detail Component
const ProductDetail = ({ product, onAddToCart, onBackToList }) => (
  <div className="container mx-auto px-4 py-8">
    <button
      onClick={onBackToList}
      className="mb-6 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-full transition duration-300 flex items-center"
    >
      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
      Back to Products
    </button>
    <div className="bg-white rounded-lg shadow-lg p-8 flex flex-col md:flex-row items-center md:items-start gap-8">
      <div className="md:w-1/2">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-auto rounded-lg shadow-md"
          onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/600x400/CCCCCC/000000?text=Image+Not+Found"; }}
        />
      </div>
      <div className="md:w-1/2">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">{product.name}</h1>
        <p className="text-blue-600 text-3xl font-bold mb-6">${product.price.toFixed(2)}</p>
        <p className="text-gray-700 text-lg mb-8 leading-relaxed">{product.description}</p>
        <button
          onClick={() => onAddToCart(product)}
          className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 px-8 rounded-full shadow-lg transform hover:scale-105 transition duration-300"
        >
          Add to Cart
        </button>
      </div>
    </div>
  </div>
);

// Cart Component
const Cart = ({ cartItems, onRemoveFromCart, onCheckout, onBackToProducts }) => {
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Your Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <div className="text-center text-gray-600 text-lg">
          <p className="mb-4">Your cart is empty.</p>
          <button
            onClick={onBackToProducts}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full shadow-md transition duration-300"
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <>
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center justify-between border-b border-gray-200 py-4 last:border-b-0">
                <div className="flex items-center">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-md mr-4"
                    onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/80x80/CCCCCC/000000?text=Img"; }}
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                    <p className="text-gray-600">Quantity: {item.quantity}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <p className="text-blue-600 font-bold">${(item.price * item.quantity).toFixed(2)}</p>
                  <button
                    onClick={() => onRemoveFromCart(item.id)}
                    className="text-red-500 hover:text-red-700 transition duration-300"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 text-right">
            <p className="text-2xl font-bold text-gray-900 mb-4">Total: ${totalPrice.toFixed(2)}</p>
            <button
              onClick={onCheckout}
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transform hover:scale-105 transition duration-300"
            >
              Proceed to Checkout
            </button>
            <button
              onClick={onBackToProducts}
              className="ml-4 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-3 px-8 rounded-full shadow-md transition duration-300"
            >
              Continue Shopping
            </button>
          </div>
        </>
      )}
    </div>
  );
};

// Main App Component
const App = () => {
  const [view, setView] = useState('products'); // 'products', 'detail', 'cart'
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // For mobile menu

  // Function to add item to cart
  const handleAddToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        // If item exists, increase quantity
        return prevItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        // Otherwise, add new item with quantity 1
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
    setView('cart'); // Go to cart after adding
  };

  // Function to remove item from cart
  const handleRemoveFromCart = (productId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId));
  };

  // Function to view product details
  const handleViewDetail = (product) => {
    setSelectedProduct(product);
    setView('detail');
  };

  // Function to handle checkout (placeholder)
  const handleCheckout = () => {
    alert('Proceeding to checkout! (This is a demo. No actual purchase will be made.)');
    setCartItems([]); // Clear cart after checkout
    setView('products'); // Go back to products page
  };

  // Toggle mobile menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Close menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) { // md breakpoint
        setIsMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);


  return (
    <div className="font-sans antialiased bg-gray-100 min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-gray-900 text-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <span
              className="text-2xl font-bold cursor-pointer hover:text-yellow-400 transition duration-300"
              onClick={() => setView('products')}
            >
              RPi Store
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <button
              onClick={() => setView('products')}
              className="hover:text-yellow-400 transition duration-300"
            >
              Products
            </button>
            <button
              onClick={() => setView('cart')}
              className="relative hover:text-yellow-400 transition duration-300 flex items-center"
            >
              <svg className="w-6 h-6 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.182 1.767.707 1.767H19m-4 0a1 1 0 110 2 1 1 0 010-2zm-4 0a1 1 0 110 2 1 1 0 010-2z"></path></svg>
              Cart
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-white focus:outline-none">
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation (Conditional) */}
        {isMenuOpen && (
          <nav className="md:hidden bg-gray-800 pb-4">
            <button
              onClick={() => { setView('products'); toggleMenu(); }}
              className="block px-4 py-2 text-white hover:bg-gray-700 w-full text-left transition duration-300"
            >
              Products
            </button>
            <button
              onClick={() => { setView('cart'); toggleMenu(); }}
              className="block px-4 py-2 text-white hover:bg-gray-700 w-full text-left transition duration-300 relative"
            >
              Cart
              {cartItems.length > 0 && (
                <span className="absolute top-2 right-4 bg-red-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </button>
          </nav>
        )}
      </header>

      {/* Main Content Area - Conditional Rendering based on 'view' state */}
      <main className="flex-grow py-8">
        {view === 'products' && (
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-8 text-center">
              Raspberry Pi 5 & Accessories
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={handleAddToCart}
                  onViewDetail={handleViewDetail}
                />
              ))}
            </div>
          </div>
        )}

        {view === 'detail' && selectedProduct && (
          <ProductDetail
            product={selectedProduct}
            onAddToCart={handleAddToCart}
            onBackToList={() => setView('products')}
          />
        )}

        {view === 'cart' && (
          <Cart
            cartItems={cartItems}
            onRemoveFromCart={handleRemoveFromCart}
            onCheckout={handleCheckout}
            onBackToProducts={() => setView('products')}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-6 mt-auto">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; {new Date().getFullYear()} RPi Store Clone. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
