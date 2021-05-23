const meals = require('./meals');

function processOrder(input) {
  let valid = true;
  let order = input.split(' ');
  let meal = order[0].toLowerCase();
  let items = order[1] || '';
  let invalidRes = 'Unable to process:';
  let invalidRes2 = [];

  items = items.split(',');

  // check if missing main 
  if (items.indexOf('1') === -1) {
    valid = false;
    invalidRes2.push('main is missing');
  }
  // check if missing side
  if (items.indexOf('2') === -1) {
    valid = false
    invalidRes2.push('side is missing');
  }

  // check if more than one main
  if (items.filter(item => item === '1').length > 1) {
    valid = false;
    let main = meals[meal].main;
    invalidRes2.push(`${main} cannot be ordered more than once`);
  }

  // check if more than one side & not lunch
  if (meal !== 'lunch' && (items.filter(item => item === '2').length > 1)) {
    valid = false;
    let side = meals[meal].side;
    invalidRes2.push(`${side} cannot be ordered more than once`);
  }

  // check if more than one drink & not breakfast
  if (meal !== 'breakfast' && (items.filter(item => item === '3').length > 1)) {
    valid = false;
    let drink = meals[meal].drink;
    invalidRes2.push(`${drink} cannot be ordered more than once`);
  }

  // check if dinner and dessert not ordered
  if (meal === 'dinner' && (items.indexOf('4') === -1)) {
    valid = false;
    invalidRes2.push('dessert is missing');
  }

  // return if invalid order
  if (!valid) {
    let joined = invalidRes2.join(', ');
    joined = joined.charAt(0).toUpperCase() + joined.slice(1);
    return [false, (invalidRes + ' ' + joined)];
  }
  return [true, validOrder(meal, items)];
};

function validOrder(meal, items) {
  let res = `${meals[meal].main}, ${meals[meal].side}`;
  let numSides = items.filter(item => item === '2').length;
  let numDrinks = items.filter(item => item === '3').length;  
  if (numSides > 1) {
    res += `(${numSides})`
  }
  if (numDrinks) {
    res += `, ${meals[meal].drink}`
  }
  if (numDrinks > 1) {
    res += `(${numDrinks})`
  }
  if ((numDrinks === 0) || (meal === 'dinner')) {
    res += ', Water'
  }
  if (meal === 'dinner') {
    res += `, ${meals[meal].dessert}`
  }
  return res;
}

module.exports = { processOrder };