import allIngredients from '../public/allIngredients.js'
import recipes from '../public/recipes.js'

const Ingredients = ({ currentIngredients }) => {
  return (
    <section id="ingredient-list" class="border border-dark col-sm-5">
      <h4>Ingredient List</h4>
      {Object.values(currentIngredients).every(val => val.length === 0)?<p>No ingredients yet!</p>:
      <div id="ingredient-wrapper" class="row">
        {Object.keys(currentIngredients).map( key => {
          let title = key.split(''); title[0] = title[0].toUpperCase(); title = title.join('');
          return currentIngredients[key].length===0?null:(
            <p class="col-xl-6 note"><b>{title}:</b> {currentIngredients[key].join(', ')}</p>
          )
        })}
      </div>}
  </section>
  )
}

const Recipes = ({ ingredients, chefs }) => {
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

  if ( validRecipes.length === 0 ) validRecipes = <p class="col-xl-4">No valid recipes!</p>;
  else {
    // map ingredient names to each recipe, sort by benefit and then map jsx to the array
    validRecipes = validRecipes.map( recipe => {
      let dblFlag = recipe[0] === recipe[1];
      return [ingredients[recipe[0]][0],
                ingredients[recipe[1]][dblFlag?1:0],
                recipe[2]]
      }).sort( (a,b) => {
      if ( a[2].toUpperCase() > b[2].toUpperCase() )
        return 1;
      if ( a[2].toUpperCase() < b[2].toUpperCase() )
        return -1;
      else return 0;
    }).map( value => {
      return <p class="col-xl-4 note"><b>{value[2]}:</b> {value[0]} + {value[1]}</p>;
    });
  }

  return (
    <section id="recipe-list" class="col-sm-7 border border-dark">
      <h4>Your recipes</h4>
      <div id="recipe-wrapper" class="row">{validRecipes}</div>
    </section>
  )
}

class Main extends React.Component {
  constructor() {
    super();

    this.state = { currentIngredients: {meat: [], bran: [], fish: [], fruit: [], veggie: [], dairy: [], drink: []},
                   currentChefs: 1 
                 };

    this.buttonHandler = this.buttonHandler.bind(this);
    this.checkHandler = this.checkHandler.bind(this);
  }

  fillOptions ( type ) {
    let list = allIngredients[type][this.state.currentChefs-1];
    let title = type.split('');
    title[0].toUpperCase();
    title.join('');

    return (
      <fieldset id={`${type}-list`} class="d-flex flex-column border border-dark mx-auto px-1" onInput={this.checkHandler}>
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
    // when choosing chef count, change active button
    document.querySelector('.active').classList.remove('active');
    event.target.classList.add('active');
    // next, uncheck all boxes, and empty ingredients list
    document.querySelectorAll(':checked').forEach( checkbox => {
      checkbox.checked = false;
    })
    this.setState({
      currentChefs: Number(event.target.textContent[0]),
      currentIngredients: {meat: [], bran: [], fish: [], fruit: [], veggie: [], dairy: [], drink: []}
    })
  }

  checkHandler (event) {
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
    let currentIngredients = this.state.currentIngredients;
    return(
      <div id="app-wrapper" class="container-fluid">
        <div id="title-bar" class="border border-dark text-center">
          <h1>MHFU Kitchen Helper</h1>
          <p class="h3">Looks tasty!</p>
        </div>
        <article id="intro" class="my-3 text-center">
          <p>Welcome to the MHFU Kitchen Helper, where getting you the food you want ( or at least can tolerate ) fast is our goal!</p>
          <p>Getting started is easy! Just select your current number of felyne chefs, click on the ingredients you have available to you, and we’ll show you what does what!</p>
        </article>
        <div id="chef-select" class="mb-3 text-center">
            <h4>Chef Selector</h4>
            <button type="button" id="chef-1-btn" class="btn btn-dark m-1 active" onClick={this.buttonHandler}>1 Chef</button>
            <button type="button" id="chef-2-btn" class="btn btn-dark m-1" onClick={this.buttonHandler}>2 Chefs</button>
            <button type="button" id="chef-3-btn" class="btn btn-dark m-1" onClick={this.buttonHandler}>3 Chefs</button>
            <button type="button" id="chef-4-btn" class="btn btn-dark m-1" onClick={this.buttonHandler}>4 Chefs</button>
            <button type="button" id="chef-5-btn" class="btn btn-dark m-1" onClick={this.buttonHandler}>5 Chefs</button>
        </div>
        <form id="ingredient-tables" class="d-flex mb-3">
          {Object.keys(currentIngredients).map( key => this.fillOptions(key)) /*create a table for each ingredient type*/}
        </form>
        <div id="bottom-half" class="row justify-content-around mx-1 mt-4">
          <Ingredients currentIngredients={this.state.currentIngredients} />
          <Recipes chefs={this.state.currentChefs} ingredients={this.state.currentIngredients} />
        </div>
      </div>
    )
  }
}

ReactDOM.render(<Main />, document.querySelector("body"));
