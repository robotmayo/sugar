const Path = require('path');

const test = require('ava');
const promisifyAll = require('bluebird').promisifyAll;
const pfs = promisifyAll(require('fs'));

const recipe = require('../server/models/recipe');

test('recipe-extraction', async function(t){
  const file = await pfs.readFileAsync(Path.resolve(__dirname, 'fixtures/', 'recipe.html'), 'utf-8');
  recipe.extractRecipe(file);
  return recipe.getPage('http://www.lecremedelacrumb.com/baked-honey-cilantro-lime-salmon-in-foil/')
  .then(recipe.extractRecipe)
  .then(console.log)
  .then(() => t.pass());
});


