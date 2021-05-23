const { it } = require('@jest/globals');
const request = require('supertest');
const createServer = require('./app');

const app = createServer();

const validCases = [
  {
    order: 'Breakfast 1,2,3',
    expectedOutput: 'Eggs, Toast, Coffee',
  },
  {
    order: 'Breakfast 2,3,1',
    expectedOutput: 'Eggs, Toast, Coffee',
  },
  {
    order: 'Breakfast 1,2,3,3,3',
    expectedOutput: 'Eggs, Toast, Coffee(3)',
  },  
  {
    order: 'Lunch 1,2,3',
    expectedOutput: 'Salad, Chips, Soda',
  },  
  {
    order: 'Lunch 1,2',
    expectedOutput: 'Salad, Chips, Water',
  },
  {
    order: 'Lunch 1,2,2',
    expectedOutput: 'Salad, Chips(2), Water',
  },
  {
    order: 'Dinner 1,2,3,4',
    expectedOutput: 'Steak, Potatoes, Wine, Water, Cake'
  },
];

const invalidCases = [
  {
    order: 'Breakfast 1',
    expectedOutput: 'Unable to process: Side is missing'
  },
  {
    order: 'Lunch 1,1,2,3',
    expectedOutput: 'Unable to process: Salad cannot be ordered more than once'
  },
  {
    order: 'Lunch',
    expectedOutput: 'Unable to process: Main is missing, side is missing'
  },
  {
    order: 'Dinner 1,2,3',
    expectedOutput: 'Unable to process: Dessert is missing'
  }
];

describe('POST order', () => {
  it('responds to valid order with a meal description', () => {
    validCases.forEach( async testCase => {
      const res = await request(app)
        .post('/')
        .send({
          order: testCase.order,
        });
      expect(res.statusCode).toEqual(200)
      expect(res.body.meal).toEqual(testCase.expectedOutput)
    });
  });

  it('responds to invalid order with errors', async () => {
    invalidCases.forEach( async testCase => {
      const res = await request(app)
        .post('/')
        .send({
          order: testCase.order,
        });
      expect(res.statusCode).toEqual(422)
      expect(res.body.errors).toEqual(testCase.expectedOutput)
    });
  }); 
   
  it('responds with a 400 when no order is provided', async () => {
    const res = await request(app)
      .post('/')
      .send({
        foo: 'bar',
      })
    expect(res.statusCode).toEqual(400)
    expect(res.body.errors).toEqual('Parameter "order" is required.')
  });
})

