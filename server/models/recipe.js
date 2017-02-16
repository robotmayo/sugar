const cheerio = require('cheerio');
const moment = require('moment');
const fetch = require('node-fetch');

function extractIngredients($, recipeEl){
  let ingredientsEl = $('[itemprop="recipeIngredient"]');
  if(ingredientsEl.length === 0){
    ingredientsEl = $('[itemprop="ingredients"]');
  }
  return ingredientsEl.map((idx, e) => $(e).text().replace(/\s+/g, ' ').trim()).get();
}
module.exports.extractIngredients = extractIngredients;

function extractInstructions($, recipeEl){
  return $('[itemprop="recipeInstructions"]')
  .map((idx, e) => $(e).text().replace(/\s+/g, ' ').trim()).get();
}
module.exports.extractInstructions = extractInstructions;

function extractRecipe(page){
  const $ = cheerio.load(page);
  const recipeEl = $('[itemtype="http://schema.org/Recipe"]');
  const author = getAuthor($, recipeEl);
  const datePublished = getDatePublished($);
  const ingredients = extractIngredients($, recipeEl);
  const instructions = extractInstructions($, recipeEl);
  return {
    author,
    datePublished: moment(datePublished),
    ingredients,
    instructions
  };
}
module.exports.extractRecipe = extractRecipe;

function getDatePublished($, recipeEl){
  let datePublished = $(`[itemprop="datePublished"]`, recipeEl).attr('content');
  return datePublished;
}

function getAuthor($, recipeEl){
  let author;
  author = $(`[itemprop="author"]`, recipeEl).attr('content');
  if(!author){
    //if author cant be found in the content attr, grab from the actual text
    author = $(`[itemprop="author"]`, recipeEl).text();
  }
  return author;
}

function getPage(url){
  return fetch(url)
  .then(res => {
    if(!res.ok) return Promise.reject(new Error(res.statusText));
    return res.text();
  });
}
module.exports.getPage = getPage;