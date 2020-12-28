import { pipe } from "lodash/fp";

const input = { tag: "JAVASCRIPT" };

const getTag = obj => tag => obj[tag];
const lower = str => str.toLowerCase();
const wrap = (start, finish) => str => `${start}${str}${finish}`;

const transform = pipe(getTag(input), lower, wrap("(", ")"), wrap('"', '"'));

console.log(transform("tag"));

const recipe = {
  name: "Spaghetti Bolognese",
  ingredients: ["egg", "salt"],
};

const updatedRecipe = {
  ...recipe,
  ingredients: recipe.ingredients.filter(i => i !== "egg"),
};

console.log(updatedRecipe);
