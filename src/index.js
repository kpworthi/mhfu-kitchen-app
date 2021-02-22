const meats = ["Meat Scraps", "Rubbery Jerky", "Tough Meat", 
             "Cubesteak", "Spicy Sausage", "Wild Bacon", 
             "Great Mutton", "Juicy Rib Roast", "Meatwagon",
             "Dragon Foot", "Gator Ribmeat", "Princess Pork", 
             "Bigmeat", "Dragon Head", "Dragon Tail", "King Turkey"];

const brans   = [ "Chunky Rice", "Furahiya Wheat", "Mixed Beans",
                  "Hardtack", "Snowy Rice",
                  "Kut Beans", "Tasty Rice", "Warwheat",
                  "Ancient Beans", "Kokoto Rice", "Megabagel",
                  "Gold Rice", "Heaven Bread", "Soul Beans"
                ];

const fishies = [ "Bone Taco", "Clamchip", "Scalefish",
                  "Snake Salmon", "Tuna Head",
                  "Curved Shrimp", "Horseshoe Crab", "Spiky Blowfish",
                  "King Squid", "Queen Shrimp", "Pink Caviar",
                  "1,000 Year Crab", "Crimson Seabream", "Hairy Tuna"
                ];

const fruits  = [ "Oily Raisins",
                  "Fruity Jam", "Northern Orange",
                  "Frozen Apples",
                  "Burning Mango", "Lifejam",
                  "Emerald Durian"
                ];

const veggie  = [ "Jungle Onion", "Pumpkin", "Twinshroom",
                  "Mild Herb", "Sliced Cactus", "Spotted Onion", "Young Potato",
                  "Cudgel Onion", "Spicy Carrots", "Western Parsley",
                  "Cannon Lettuce", "Rare Onion", "Scented Celery",
                  "Demonshroom", "Fatty Tomato", "King Truffle" 
];
const dairy   = [ "Powdered Cheese", "Sticky Cream",
                  "Aged Cheese", "Carefree Yogurt",
                  "Buffalo Butter", "Chili Cheese",
                  "Royale Cheese",
                  "Kirin Cheese" 
];
const drink   = [ "Hopi",
                  "Furahiya Cola",
                  "Panish",
                  "Blessed Wine",
                  "Goldenfish Brew" 
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
  twoChef: [
    ["meat", "meat", "+20 Health"],
    ["meat", "bran", "+15 Defense "],
    ["meat", "fruit", "Fire Res +3 "],
    ["meat", "drink", "+10 Health "],
    ["bran", "bran", "+25 Stamina "],
    ["bran", "fish", "+20 Health "],
    ["bran", "veggie", "Attack Up Small "],
    ["bran", "drink", "+10 Health & Thndr Res +3 "],
    ["fish", "fish", "Attack Up Small "],
    ["fish", "drink", "+25 Stamina "],
    ["fruit", "veggie", "+10 Defense & +10 Health "],
    ["fruit", "dairy", "Water Res +3 "],
    ["veggie", "veggie", "+10 Defense "],
    ["veggie", "drink", "+25 Stamina "],
    ["dairy", "dairy", "+25 Stamina & Attack Up Small "],
    ["dairy", "drink", "Ice Res +3 "],
  ],
  threeChef: [
    ["meat", "meat", "+20 Health "],
    ["meat", "fish", "Thunder Res +3 "],
    ["meat", "fruit", "Attack Up Large "],
    ["meat", "veggie", "+10 Health & Attack Up Small "],
    ["bran", "bran", "+25 Stamina "],
    ["bran", "veggie", "+50 Stamina "],
    ["bran", "dairy", "+10 Defense & Stamina +25 "],
    ["bran", "drink", "+15 Defense & Water Res +3 "],
    ["fish", "fish", "Attack Up Small "],
    ["fish", "fruit", "+25 Stamina & Fire Res +3 "],
    ["fish", "dairy", "+30 Health "],
    ["fruit", "drink", "Attack Up Small "],
    ["veggie", "veggie", "+10 Defense "],
    ["veggie", "dairy", "+10 Health & +15 Defense "],
    ["dairy", "dairy", "+20 Health & Ice Res +3 "],
  ],
  fourChef: [
    ["meat", "meat", "+10 Health"],
    ["meat", "fish", "+25 Stamina & Water Res +5 "],
    ["meat", "fruit", "Attack Up Small & Fire Res +5 "],
    ["meat", "dairy", "+40 Health "],
    ["meat", "drink", "+10 Defense & Ice Res +5 "],
    ["bran", "bran", "+50 Stamina "],
    ["bran", "veggie", "Attack Up Small & +25 Stamina "],
    ["bran", "dairy", "+30 Health & Attack Up Small "],
    ["fish", "fish", "Attack Up Large "],
    ["fish", "fruit", "+20 Defense "],
    ["fish", "veggie", "+20 Health & Dragon Res +3 "],
    ["fish", "dairy", "+10 Defense & Thndr Res +3 "],
    ["fruit", "fruit", "Attack Up Large & +10 Health "],
    ["fruit", "veggie", "+50 Stamina "],
    ["fruit", "drink", "+20 Health & +15 Defense "],
    ["veggie", "veggie", "+15 Defense "],
    ["veggie", "drink", "+40 Health "],
    ["dairy", "drink", "+20 Health & +25 Stamina "],
  ],
  fiveChef: [
    ["meat", "meat", "+30 Health "],
    ["meat", "fish", "+20 Health & +50 Stamina "],
    ["meat", "veggie", "+40 Health & Attack Up Large "],
    ["meat", "dairy", "+25 Stamina & +15 Defense "],
    ["meat", "drink", "Attack Up Small & Fire Res +5 "],
    ["bran", "bran", "+50 Stamina "],
    ["bran", "fish", "+40 Health & +20 Defense "],
    ["bran", "fruit", "+30 Health & +25 Stamina "],
    ["bran", "veggie", "Attack Up Small & +25 Stamina "],
    ["bran", "drink", "+20 Health & Water Res +5 "],
    ["fish", "fish", "Attack Up Large "],
    ["fish", "fruit", "+50 Stamina & +10 Defense "],
    ["fish", "veggie", "+10 Defense & Ice Res +5 "],
    ["fruit", "dairy", "+50 Health & Dragon Res +5 "],
    ["fruit", "drink", "Attack Up Small & Thndr Res +5 "],
    ["veggie", "veggie", "+15 Defense "],
    ["veggie", "dairy", "+25 Stamina & +20 Defense "],
    ["dairy", "drink", "+50 Health & +50 Stamina "]
  ]
};

class Main extends React.Component {
  constructor() {
    super();

    this.state = { currentIngredients: {meat: [], bran: [], fish: [], fruit: [], veggie: [], dairy: [], drink: []},
                   currentChefs: 1 
                 };

    this.buttonHandler = this.buttonHandler.bind(this);
    this.selectHandler = this.selectHandler.bind(this);
  }

  findRecipes () {
    let ingredients = this.state.currentIngredients;
    let chefs = this.state.currentChefs;

    let currentRecipes = [];
    switch (chefs) {
      case 1: currentRecipes = recipes.oneChef; break;
      case 2: currentRecipes = recipes.twoChef; break;
      case 3: currentRecipes = recipes.threeChef; break;
      case 4: currentRecipes = recipes.fourChef; break;
      case 5: currentRecipes = recipes.fiveChef; break;
    }
  
    let validRecipes = [];
    
    currentRecipes.forEach( recipe => {
      if ( recipe[0] === recipe[1] && ingredients[recipe[0]].length >= 2) {
        validRecipes.push(recipe.slice(0));
      } else if ( recipe[0] !== recipe[1] && ingredients[recipe[0]].length>=1 && ingredients[recipe[1]].length>=1 ){
        validRecipes.push(recipe.slice(0));
      }
    })
  
    if ( validRecipes.length === 0 ) return "No valid recipes!";
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
      validRecipes = validRecipes.sort( (a,b) => {
        if ( a[2].toUpperCase() > b[2].toUpperCase() )
          return 1;
        if ( a[2].toUpperCase() < b[2].toUpperCase() )
          return -1;
        else return 0;
      });
      return validRecipes.map( value => {
        return <p><b>{value[2]}</b> | {value[0]} | {value[1]}</p>;
      })
    }
  }

  fillOptions ( type ) {
    let list = [];
    let title = type.split('');
    title[0].toUpperCase();
    title.join('');
    switch (type) {
      case 'meat': list = meats; break;
      case 'bran': list = brans; break;
      case 'fish': list = fishies; break;
      case 'fruit': list = fruits; break;
      case 'veggie': list = veggie; break;
      case 'dairy': list = dairy; break;
      case 'drink': list = drink; break;
    }
    return (
      <fieldset id={`${type}-list`} class="d-flex flex-column border border-dark mx-xl-5 mx-sm-3 px-1" onInput={this.selectHandler}>
        <legend class="text-center">{title}</legend>
        {list.map( (item,ind) => {
          let itemId = item.split(' ').join('-').toLowerCase();
          return(
            <label for={itemId}>
              <input id={itemId} name={type} type="checkbox" >
            </input>{item}</label>
          )
          })}
      </fieldset>
    )
  }

  buttonHandler (event) {
    document.querySelector('.active').classList.remove('active');
    event.target.classList.add('active');
    this.setState({
      currentChefs: Number(event.target.textContent[0])
    })
  }

  selectHandler (event) {
    let selectedItems = [];
    let field = event.currentTarget;
    field.querySelectorAll(':checked').forEach( value => {
      selectedItems.push(value.labels[0].textContent);
    });
    let category = field.id.split('-')[0];
    let tempObj = this.state.currentIngredients;

    tempObj[category] = selectedItems;
    this.setState({currentIngredients: tempObj}, () => {
      console.log(this.state.currentIngredients);
    });
    
  }

  render () {
    return(
      <div id="app-wrapper" class="container-fluid">
        <div id="title-bar" class="border border-dark flex-column text-center">
          <h1>MHFU Kitchen Helper</h1>
          <p class="h3">Because why bother, right?</p>
        </div>
        <article id="intro" class="flex-column text-center">
          <p>Welcome to the MHFU Kitchen Helper, where getting you the food you want ( or at least can tolerate ) fast is our goal!</p>
          <p>Getting started is easy! Just click on the ingredients you have available to you below, select your current number of felyne chefs, and we’ll show you what does what!</p>
        </article>
        <form id="ingredient-tables" class="d-flex">
          {this.fillOptions("meat")}
          {this.fillOptions("bran")}
          {this.fillOptions("fish")}
          {this.fillOptions("fruit")}
          {this.fillOptions("veggie")}
          {this.fillOptions("dairy")}
          {this.fillOptions("drink")}
        </form>
        <div id="bottom-half" class="row justify-content-around mx-1 mt-4">
          <div id="ingredient-list" class="border border-dark col-sm-4">
              <h4>Ingredient List</h4>
              <p>Meat: {this.state.currentIngredients['meat'].join(', ')}</p>
              <p>Bran: {this.state.currentIngredients['bran'].join(', ')}</p>
              <p>Fish: {this.state.currentIngredients['fish'].join(', ')}</p>
              <p>Fruit: {this.state.currentIngredients['fruit'].join(', ')}</p>
              <p>Veggie: {this.state.currentIngredients['veggie'].join(', ')}</p>
              <p>Dairy: {this.state.currentIngredients['dairy'].join(', ')}</p>
              <p>Drink: {this.state.currentIngredients['drink'].join(', ')}</p>
          </div>
          <div id="chef-select" class="border border-dark col-sm-4">
              <h4>Chef Selector</h4>
              <button type="button" id="chef-1-btn" class="btn btn-dark m-1 active" onClick={this.buttonHandler}>1 Chef</button>
              <button type="button" id="chef-2-btn" class="btn btn-dark m-1" onClick={this.buttonHandler}>2 Chefs</button>
              <button type="button" id="chef-3-btn" class="btn btn-dark m-1" onClick={this.buttonHandler}>3 Chefs</button>
              <button type="button" id="chef-4-btn" class="btn btn-dark m-1" onClick={this.buttonHandler}>4 Chefs</button>
              <button type="button" id="chef-5-btn" class="btn btn-dark m-1" onClick={this.buttonHandler}>5 Chefs</button>
          </div>
          <div id="recipe-list" class="flex-column col-sm-4 border border-dark">
              <h4>Your recipes ...</h4>
              {this.findRecipes()}
          </div>
        </div>
      </div>
    )
  }
}

ReactDOM.render(<Main />, document.querySelector("body"));
