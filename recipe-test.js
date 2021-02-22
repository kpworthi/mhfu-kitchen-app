let currentIngredients = { meat: ["Meat Scraps"], bran: ["Hardtack"], fish: [], fruit: ["Northern Orange"], veggie: ["Mild Herb", "Spotted Onion"], dairy: [], drink: ['Spicepop'] };
let currentChefs = 1;

const meats = ["Meat Scraps", "Rubbery Jerky", "Tough Meat", 
             "Cubesteak", "Spicy Sausage", "Wild Bacon", 
             "Great Mutton", "Juicy Rib Roast", "Meatwagon",
             "Dragon Foot", "Gator Ribmeat", "Princess Pork", 
             "Bigmeat", "Dragon Head", "Dragon Tail", "King Turkey"];

const brans   = [





                ];

const fishies = [





                ];

const fruits  = [





                ];

const veggie  = [





];
const dairy   = [





];
const drink   = [




  
];
             
const recipes = { 
                oneChef: [
                  ["meat", "meat", "+10 Health"],
                  ["meat", "bran", "+10 Health"],
                  ["meat", "veggie", "+25 Stamina"],
                  ["meat", "drink", "Attack Up Small"],
                  ["bran", "bran", "+25 Stamina"],
                  ["bran", "fish", "+10 Health"],
                  ["bran", "fruit", "Ice Res +3"],
                  ["fish", "fish", "Attack Up Small"],
                  ["fish", "veggie", "+25 Stamina"],
                  ["fish", "drink", "+10 Defense"],
                  ["fruit", "veggie", "+20 Health"],
                  ["fruit", "dairy", "+25 Stamina"],
                  ["veggie", "veggie", "+10 Defense"],
                ],
                twoChef: "",
                threeChef: "",
                fourChef: "",
                fiveChef: ""
              };

function findRecipes (ingredients, chefs) {
  let currentRecipes = [];
  switch (chefs) {
    case 1: currentRecipes = recipes.oneChef; break;
    case 2: currentRecipes = recipes.twoChef; break;
    case 3: currentRecipes = recipes.threeChef; break;
    case 4: currentRecipes = recipes.fourChef; break;
    case 5: currentRecipes = recipes.fiveChef; break;
  }

  let validRecipes = currentRecipes.filter( recipe => {
    if ( recipe[0] === recipe[1] ) {
      return ingredients[recipe[0]].length >= 2?true:false;
    } else {
      return (ingredients[recipe[0]].length>=1 && ingredients[recipe[1]].length>=1)?true:false;
    }
  })

  if ( validRecipes.length === 0 ) console.log("No valid recipes!");
  else if ( validRecipes.length > 0 ) {
    validRecipes.map( recipe => {
      if ( recipe[0] === recipe[1] ) {
        recipe[0] = ingredients[recipe[0]][0];
        recipe[1] = ingredients[recipe[1]][1];
      }
      else {
        recipe[0] = ingredients[recipe[0]][0];
        recipe[1] = ingredients[recipe[1]][0];
      }
    })
    console.log(validRecipes.sort( (a,b) => {
      if ( a[2].toUpperCase() > b[2].toUpperCase() )
        return 1;
      if ( a[2].toUpperCase() < b[2].toUpperCase() )
        return -1;
      else return 0;
    }));
  }
}

findRecipes(currentIngredients, currentChefs);