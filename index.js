const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
let products = [
  { id: 1, name: 'Product 1', price: 10.0, dateAdded: new Date(), isAvailable: true },
  { id: 2, name: 'Product 2', price: 20.0, dateAdded: new Date(), isAvailable: false }
];

// Get all products
app.get('/api', (req, res) => {
  res.json(products);
});

// Create a new product
// Create a new product
app.post('/api/products', (req, res) => {
  const newProduct = {
    id: products.length + 1,
    ...req.body
    // Remove dateAdded: new Date()
  };
  products.push(newProduct);
  res.status(201).json(newProduct);
});


// Update a product
app.put('/api/products/:id', (req, res) => {
  const { id } = req.params;
  const index = products.findIndex(product => product.id === parseInt(id));
  if (index !== -1) {
    products[index] = { ...products[index], ...req.body };
    res.json(products[index]);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});

// Delete a product
app.delete('/api/products/:id', (req, res) => {
  const { id } = req.params;
  const index = products.findIndex(product => product.id === parseInt(id));
  if (index !== -1) {
    products.splice(index, 1);
    res.status(204).end();
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});

app.listen(port, () => {
  console.log(`API listening at http://localhost:${port}`);
});


