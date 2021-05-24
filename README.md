# Menu Ordering System 🍽️

This project contains a RESTful API that takes in orders for breakfast, lunch, and dinner and returns a list of items that make up the requested meal.

## Dependencies

* Node
* Express

## Development Dependencies

* Jest
* Supertest

## Getting Starting

* Clone the repo
* Run `npm install` inside the project directory
* Start the local server by running `node app.js`

## Using the API

* Send a POST request to `http://localhost:3000` with JSON in the request body as formatted below:
```
{
  "order": "Lunch 1,2,3"
}
```

## Testing

* Run `npm test` inside the project directory

