import allIngredients from "../public/allIngredients.js";
import NavBar from "./navbar.js";

const Ingredients = ({ currentIngredients }) => {
  return (
    <section id="ingredient-list" class="border border-dark col-sm-5">
      <h4>Ingredient List</h4>
      {Object.values(currentIngredients).every((val) => val.length === 0) ? (
        <p>No ingredients yet!</p>
      ) : (
        <div id="ingredient-wrapper" class="row">
          {Object.keys(currentIngredients).map((key) => {
            let title = key.split("");
            title[0] = title[0].toUpperCase();
            title = title.join("");
            return currentIngredients[key].length === 0 ? null : (
              <p class="col-xl-6 note">
                <b>{title}:</b> {currentIngredients[key].join(", ")}
              </p>
            );
          })}
        </div>
      )}
    </section>
  );
};

const Recipes = ({ ingredients, chefs }) => {
  // Set state for the current recipe list, and a variable to track what
  // recipe list is currently loaded ( the "level" ).
  // This solution -is- less optimal as data could be stored with the client
  // so that repeated clicks around the selector don't end up querying for
  // data the client should already have. Future implementation could instead 
  // include dynamically building an object containing each level of recipe 
  // list, only querying when a given level is not yet in the object.
  const [currentRecipes, setCurrentRecipes] = React.useState([]);
  const [currentRecipeLevel, setCurrentRecipeLevel] = React.useState([]);
  
  let validRecipes = [];

  // Fetch the recipes from the db
  const getRecipes = ( chefNumber ) => {
    try {
      let recipeFetchResults = fetch(`/api/recipes?chefs=${chefNumber}`)
        .then( response => response.json() )
        .then( responseJSON => {
          const body = responseJSON;
          let recipeList = [];
          for ( let recipe of body ){
            recipeList.push( recipe );
          }
          if ( recipeList.length === 0 ) {
            console.log('No recipes were returned..?')
          }
          else {
            setCurrentRecipes( recipeList );
          }
        });
    }
    catch {
      console.log('There was an issue during the recipe retrieval request.');
    }
  }

  // If this is the first render, or if the number of chefs has changed,
  // get the correct list of recipes and set the new chef number as the
  // current recipe "level".
  if ( chefs !== currentRecipeLevel ) {
    getRecipes( chefs );
    setCurrentRecipeLevel( chefs );
  }
  else {
    // find recipes that match the currently selected ingredients
    currentRecipes.forEach((recipe) => {
      if (recipe[0] === recipe[1] && ingredients[recipe[0]].length >= 2) {
        validRecipes.push(recipe.slice(0));
      } else if (
        recipe[0] !== recipe[1] &&
        ingredients[recipe[0]].length >= 1 &&
        ingredients[recipe[1]].length >= 1
      ) {
        validRecipes.push(recipe.slice(0));
      }
    });
  }

  if (validRecipes.length === 0)
    validRecipes = <p class="col-xl-4">No valid recipes!</p>;
  else {
    // sort by benefit, add ingredient names, then map jsx to the array
    validRecipes = validRecipes
      .sort((a, b) => {
        if (a[2].toUpperCase() > b[2].toUpperCase()) return 1;
        if (a[2].toUpperCase() < b[2].toUpperCase()) return -1;
        else return 0;
      })
      .map((recipe) => {
        let dblFlag = recipe[0] === recipe[1];
        return (
          <p class="col-xl-4 note">
            <b>{recipe[2]}:</b> {ingredients[recipe[0]][0]} + {ingredients[recipe[1]][dblFlag ? 1 : 0]}
          </p>
        );
      });
  }

  return (
    <section id="recipe-list" class="col-sm-7 border border-dark">
      <h4>Your recipes</h4>
      <div id="recipe-wrapper" class="row">
        {validRecipes}
      </div>
    </section>
  );
}

function RecipesView () {
  const emptyIngredientList = () => { return {
    meat: [],
    bran: [],
    fish: [],
    fruit: [],
    veggie: [],
    dairy: [],
    drink: []
  }};
  const [currentChefs, setCurrentChefs] = React.useState(1);
  const [currentIngredients, setCurrentIngredients] = React.useState( emptyIngredientList() );

  const chefSelectHandler = ( event ) => {
    // When choosing new chef count, change active button and empty ingredients list.
    if (event.target.nodeName === "BUTTON" && Number(event.target.textContent[0]) !== currentChefs ) {
      document.querySelector(".active").classList.remove("active");
      event.target.classList.add("active");
      // next, uncheck all boxes, and empty ingredients list
      document.querySelectorAll(":checked").forEach((checkbox) => {
        checkbox.checked = false;
      });
      setCurrentIngredients( emptyIngredientList() );
      setCurrentChefs( Number(event.target.textContent[0]) )
    }
  };

  const checkHandler = ( event ) => {
    let selectedItems = [];
    let field = event.currentTarget;
    field.querySelectorAll(":checked").forEach((value) => {
      selectedItems.push(value.labels[0].textContent);
    });
    let category = field.id.split("-")[0];
    let tempObj = Object.assign({}, currentIngredients);

    tempObj[category] = selectedItems;
    setCurrentIngredients( tempObj );
  }

  const fillOptions = (type) => {
    let list = allIngredients[type][currentChefs - 1];
    let title = type.split("");
    title[0].toUpperCase();
    title.join("");

    return (
      <fieldset
        id={`${type}-list`}
        class="d-flex flex-column border border-dark mx-auto px-1"
        onInput={checkHandler}
      >
        <legend class="text-center">{title}</legend>
        {list.map( item => {
          let itemId = item.split(" ").join("-").toLowerCase();
          return (
            <label for={itemId}>
              <input id={itemId} name={type} type="checkbox"></input>
              {item}
            </label>
          );
        })}
      </fieldset>
    );
  }

  return (
    <div id="view-wrapper">
      <article id="intro" class="my-3 text-center">
        <p>
          Welcome to the MHFU Kitchen Helper, where getting you the food you
          want ( or at least can tolerate ) fast is our goal!
        </p>
        <p>
          Getting started is easy! Just select your current number of felyne
          chefs, click on the ingredients you have available to you, and we’ll
          show you what does what!
        </p>
      </article>
      <div
        id="chef-select"
        class="mb-3 text-center"
        onClick={chefSelectHandler}
      >
        <h4>Chef Selector</h4>
        <button type="button" id="chef-1-btn" class="btn btn-dark m-1 active">
          1 Chef
        </button>
        <button type="button" id="chef-2-btn" class="btn btn-dark m-1">
          2 Chefs
        </button>
        <button type="button" id="chef-3-btn" class="btn btn-dark m-1">
          3 Chefs
        </button>
        <button type="button" id="chef-4-btn" class="btn btn-dark m-1">
          4 Chefs
        </button>
        <button type="button" id="chef-5-btn" class="btn btn-dark m-1">
          5 Chefs
        </button>
      </div>
      <form id="ingredient-tables" class="d-flex mb-3">
        {
          Object.keys(currentIngredients).map((key) =>
            fillOptions(key)
          ) /*create a table for each ingredient type*/
        }
      </form>
      <div id="bottom-half" class="row justify-content-around mx-1 mt-4">
        <Ingredients currentIngredients={currentIngredients} />
        <Recipes
          chefs={currentChefs}
          ingredients={currentIngredients}
        />
      </div>
    </div>
  );
}

function SkillsView ({}) {
  const [skillCardList, setSkillCardList] = React.useState([]);

  // only handles clicking on a card's svg element
  // clicking on a skill's book icon will hide the description, show the article, and fill in the icon
  // clicking on it again will reverse this
  const clickHandler = ( event ) => {
    if ( event.target.nodeName === "svg" ){
      const clickedSkill   = event.target.dataset.skill;
      const clickedDesc    = document.getElementById(`${clickedSkill}-desc`);
      const clickedArticle = document.getElementById(`${clickedSkill}-article`); 
      let clickedFill      = event.target.attributes.fill;

      clickedDesc.classList.toggle('show');
      clickedArticle.classList.toggle('show');
      clickedFill.value = clickedFill.value==="none"?"currentColor":"none";
    }
  }

  // Handle submitting the search / filter parameters
  // Clear the skillCardList, emptying the displayed list and showing the loading message while the
  // fetch is being performed. Also clear the search fields.
  const submitHandler = ( event ) => {
    event.preventDefault();
    const searchTypeField  = document.getElementById('inlineFormType');
    const searchValueField = document.getElementById('inlineFormValue');
    const searchObj = { type: searchTypeField.value, value: searchValueField.value};

    searchTypeField.value  = 'name';
    searchValueField.value = '';
    setSkillCardList([<p>Loading list...</p>]);
    getSkills( searchObj );  
  }

  // returns a JSX div containing a bootstrap card with the skill information in it
  // expects: a skillArray in the format ['skill name', 'skill description', 'skill article']
  const skillCard = ( skillArray ) => {
    const [skillName, skillDesc, skillArticle] = skillArray; 

    return (
      <div class="card col-sm-5 col-lg-3 m-1 p-0" id={`${skillName}-card`} key={`${skillName}-card`}>
        <div class="card-header d-flex flex-nowrap justify-content-between align-items-center">
          <h5 class="card-title h4 d-inline">{skillName}</h5>
          {skillArticle?
          <svg 
            class="d-inline" xmlns="http://www.w3.org/2000/svg" 
            fill="none" width="32" height="32"
            stroke="currentColor"
            data-skill={skillName}
          >
            <path
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
            />
          </svg>:
          undefined
          }
        </div>
        <div class="card-body">
          <p id={`${skillName}-desc`} class="card-text show">{skillDesc}</p>
          <p id={`${skillName}-article`} class="card-text card-article">{skillArticle}</p>
        </div>
      </div>
    )

  }

  // Fetch the skills from the db
  // If the search function was used, format the fields into a query to append to the api path.
  // If no search was specified, the 'query' param will be empty and all listed skills will be retrieved.
  // Once the data is received, update the skillCardList state, which will cause a re-render.
  const getSkills = ( query ) => {
    let queryFull = '';
    if ( query ) {
      queryFull = `?type=${query.type}&value=${query.value}`
    }
    try {
      let skillFetchResults = fetch(`/api/skills${queryFull}`)
        .then( response => response.json() )
        .then( responseJSON => {
          const body = responseJSON;
          let fullCardList = [];
          for ( let skill of body ){
            fullCardList.push( skillCard( skill ) );
          }
          if ( fullCardList.length === 0 ) {
            setSkillCardList([<p>No skills match your search criteria.</p>]);
          }
          else {
            setSkillCardList(fullCardList);
          }
        });
    }
    catch {
      console.log('There was an issue during skill retrieval.');
    }
  }
  
  // Check to see if the skillCardList is empty, which would be on the initial render.
  // If this is the initial render, get all the skills to display.
  if (skillCardList.length === 0) {
    getSkills();
  }

  return (
    <div id="view-wrapper">
      <article id="intro" class="my-3 text-center">
        <p>
          Welcome to the MHFU Kitchen Helper Skills List! Need to find out what
          good your felyne's kitchen skills are? Look no further!
        </p>
        <p>
          If you're looking for a little more context or some flavor, click on
          the book icon near the skill listing to see the info magazine's
          article entry for that skill (if available)!
        </p>
      </article>
      <h4>Skill List</h4>
      <form class="form-inline">

        <label for="inlineFormType">Search skills in their </label>
        <select class="form-control my-1 mx-2" id="inlineFormType">
          <option selected value="name">name</option>
          <option value="description">description</option>
          <option value="article">article</option>
        </select>
              
        <label for="inlineFormValue"> for </label>
        <input type="text" class="form-control my-1 mx-2" id="inlineFormValue" placeholder="words" required/>

        <button type="submit" class="btn btn-primary my-1 mx-2" onClick={submitHandler}>Submit</button>
      </form>
      <div
        id="skill-list"
        class="d-flex flex-wrap justify-content-center border border-dark"
        onClick={clickHandler}
      >
        {skillCardList.length >= 1?
          skillCardList:
          <p>Loading list...</p>
        }
      </div>
    </div>
  );
}

class Main extends React.Component {
  constructor() {
    super();

    this.state = {
      appTitle: "kitchen",
      subTitle: "recipes",
      currentIngredients: {
        meat: [],
        bran: [],
        fish: [],
        fruit: [],
        veggie: [],
        dairy: [],
        drink: [],
      },
      currentChefs: 1,
    };

    this.tagLine = "Looks tasty!";
    this.changeState = (stateObj) => {
      this.setState(stateObj);
    };
    this.views = { recipes: RecipesView, skills: SkillsView };
  }

  render() {
    const currentIngredients = this.state.currentIngredients;
    const currentChefs = this.state.currentChefs
    const View = this.views[this.state.subTitle];
    return (
      <div id="app-wrapper" class="container-fluid">
        <NavBar
          title={this.state.appTitle}
          subTitle={this.state.subTitle}
          tagLine={this.tagLine}
          changeState={this.changeState}
        />
        <View 
          changeState={this.changeState} 
          currentChefs={currentChefs} 
          currentIngredients={currentIngredients} 
        />
      </div>
    );
  }
}

ReactDOM.render(<Main />, document.querySelector("body"));
