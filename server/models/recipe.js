const cheerio = require('cheerio');

function extractRecipe(page){
  const $ = cheerio.load(page);
  const recipeEl = $('[itemtype="http://schema.org/Recipe]');

}

