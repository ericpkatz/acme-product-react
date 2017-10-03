const express = require('express');
const app = express();
const path = require('path');

const Sequelize = require('sequelize');
const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/my_db');

const Product = conn.define('product', {
  name: {
    type: conn.Sequelize.STRING,
    unique: true
  }
});

conn.sync({ force: true })
  .then( ()=> {
    return Promise.all([
      Product.create({ name: 'foo' }),
      Product.create({ name: 'bar' }),
      Product.create({ name: 'bazz' }),
    ]);
  });

app.use(require('body-parser').json());


app.use('/dist', express.static(path.join(__dirname, 'dist')));

[
  '/',
  '/products',
  '/products/:id'
].forEach( (url)=> {
  app.get(url, (req, res, next)=> res.sendFile(path.join(__dirname, 'index.html')));
});


app.get('/api/products', (req, res, next)=> {
  Product.findAll()
    .then( products => {
      res.send(products);
    })
    .catch(next);
});

app.post('/api/products', (req, res, next)=> {
  Product.create(req.body)
    .then( product => {
      res.send(product);
    })
    .catch(next);
});

app.put('/api/products/:id', (req, res, next)=> {
  Product.findById(req.params.id)
    .then( product => {
      Object.assign(product, req.body);
      return product.save();
    })
    .then( product => {
      res.send(product);
    })
    .catch(next);
});

app.delete('/api/products/:id', (req, res, next)=> {
  Product.findById(req.params.id)
    .then( product => {
      return product.destroy();
    })
    .then( () => {
      res.sendStatus(200);
    })
    .catch(next);
});


app.listen(process.env.PORT || 3000);
