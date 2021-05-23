const express = require('express');
const { processOrder } = require('./processOrder');

const port = 3000;

const createServer = () => {
  const app = express();
  
  app.use(express.json());
  
  app.post('/', function (req, res) {
    const order = req.body.order;
    if (!order) {
      res.status(400).send({ errors: 'Parameter "order" is required.' });
      return;
    }
    let [valid, result] = processOrder(order);
    if (valid) {
      res.status(200).send({ meal: result });
    } else {
      res.status(422).send({ errors: result })
    }
  });

  return app;
}

if (typeof require !== 'undefined' && require.main === module) {
  createServer().listen(port, () => {
    console.log(`App listening at ${port}`)
  });
}

module.exports = createServer;