import allIngredients from '../public/allIngredients.js';
import recipes from '../public/recipes.js';
import NavBar from './navbar.js';

const Ingredients = ({
  currentIngredients
}) => {
  return /*#__PURE__*/React.createElement("section", {
    id: "ingredient-list",
    class: "border border-dark col-sm-5"
  }, /*#__PURE__*/React.createElement("h4", null, "Ingredient List"), Object.values(currentIngredients).every(val => val.length === 0) ? /*#__PURE__*/React.createElement("p", null, "No ingredients yet!") : /*#__PURE__*/React.createElement("div", {
    id: "ingredient-wrapper",
    class: "row"
  }, Object.keys(currentIngredients).map(key => {
    let title = key.split('');
    title[0] = title[0].toUpperCase();
    title = title.join('');
    return currentIngredients[key].length === 0 ? null : /*#__PURE__*/React.createElement("p", {
      class: "col-xl-6 note"
    }, /*#__PURE__*/React.createElement("b", null, title, ":"), " ", currentIngredients[key].join(', '));
  })));
};

const Recipes = ({
  ingredients,
  chefs
}) => {
  let currentRecipes = [];

  switch (chefs) {
    case 1:
      currentRecipes = recipes.oneChef;
      break;

    case 2:
      currentRecipes = recipes.twoChef;
      break;

    case 3:
      currentRecipes = recipes.threeChef;
      break;

    case 4:
      currentRecipes = recipes.fourChef;
      break;

    case 5:
      currentRecipes = recipes.fiveChef;
      break;
  }

  let validRecipes = [];
  currentRecipes.forEach(recipe => {
    if (recipe[0] === recipe[1] && ingredients[recipe[0]].length >= 2) {
      validRecipes.push(recipe.slice(0));
    } else if (recipe[0] !== recipe[1] && ingredients[recipe[0]].length >= 1 && ingredients[recipe[1]].length >= 1) {
      validRecipes.push(recipe.slice(0));
    }
  });
  if (validRecipes.length === 0) validRecipes = /*#__PURE__*/React.createElement("p", {
    class: "col-xl-4"
  }, "No valid recipes!");else {
    // map ingredient names to each recipe, sort by benefit and then map jsx to the array
    validRecipes = validRecipes.map(recipe => {
      let dblFlag = recipe[0] === recipe[1];
      return [ingredients[recipe[0]][0], ingredients[recipe[1]][dblFlag ? 1 : 0], recipe[2]];
    }).sort((a, b) => {
      if (a[2].toUpperCase() > b[2].toUpperCase()) return 1;
      if (a[2].toUpperCase() < b[2].toUpperCase()) return -1;else return 0;
    }).map(value => {
      return /*#__PURE__*/React.createElement("p", {
        class: "col-xl-4 note"
      }, /*#__PURE__*/React.createElement("b", null, value[2], ":"), " ", value[0], " + ", value[1]);
    });
  }
  return /*#__PURE__*/React.createElement("section", {
    id: "recipe-list",
    class: "col-sm-7 border border-dark"
  }, /*#__PURE__*/React.createElement("h4", null, "Your recipes"), /*#__PURE__*/React.createElement("div", {
    id: "recipe-wrapper",
    class: "row"
  }, validRecipes));
};

class Main extends React.Component {
  constructor() {
    super();
    this.state = {
      appTitle: "kitchen",
      subTitle: "recipes",
      tagLine: "Looks tasty!",
      currentIngredients: {
        meat: [],
        bran: [],
        fish: [],
        fruit: [],
        veggie: [],
        dairy: [],
        drink: []
      },
      currentChefs: 1
    };

    this.changeState = stateObj => {
      this.setState(stateObj);
    };

    this.buttonHandler = this.buttonHandler.bind(this);
    this.checkHandler = this.checkHandler.bind(this);
  }

  fillOptions(type) {
    let list = allIngredients[type][this.state.currentChefs - 1];
    let title = type.split('');
    title[0].toUpperCase();
    title.join('');
    return /*#__PURE__*/React.createElement("fieldset", {
      id: `${type}-list`,
      class: "d-flex flex-column border border-dark mx-auto px-1",
      onInput: this.checkHandler
    }, /*#__PURE__*/React.createElement("legend", {
      class: "text-center"
    }, title), list.map((item, ind) => {
      let itemId = item.split(' ').join('-').toLowerCase();
      return /*#__PURE__*/React.createElement("label", {
        for: itemId
      }, /*#__PURE__*/React.createElement("input", {
        id: itemId,
        name: type,
        type: "checkbox"
      }), item);
    }));
  }

  buttonHandler(event) {
    // when choosing chef count, change active button
    document.querySelector('.active').classList.remove('active');
    event.target.classList.add('active'); // next, uncheck all boxes, and empty ingredients list

    document.querySelectorAll(':checked').forEach(checkbox => {
      checkbox.checked = false;
    });
    this.setState({
      currentChefs: Number(event.target.textContent[0]),
      currentIngredients: {
        meat: [],
        bran: [],
        fish: [],
        fruit: [],
        veggie: [],
        dairy: [],
        drink: []
      }
    });
  }

  checkHandler(event) {
    let selectedItems = [];
    let field = event.currentTarget;
    field.querySelectorAll(':checked').forEach(value => {
      selectedItems.push(value.labels[0].textContent);
    });
    let category = field.id.split('-')[0];
    let tempObj = this.state.currentIngredients;
    tempObj[category] = selectedItems;
    this.setState({
      currentIngredients: tempObj
    }, () => {
      console.log(this.state.currentIngredients);
    });
  }

  render() {
    let currentIngredients = this.state.currentIngredients;
    return /*#__PURE__*/React.createElement("div", {
      id: "app-wrapper",
      class: "container-fluid"
    }, /*#__PURE__*/React.createElement(NavBar, {
      title: this.state.appTitle,
      subTitle: this.state.subTitle,
      tagLine: this.state.tagLine,
      changeState: this.changeState
    }), /*#__PURE__*/React.createElement("article", {
      id: "intro",
      class: "my-3 text-center"
    }, /*#__PURE__*/React.createElement("p", null, "Welcome to the MHFU Kitchen Helper, where getting you the food you want ( or at least can tolerate ) fast is our goal!"), /*#__PURE__*/React.createElement("p", null, "Getting started is easy! Just select your current number of felyne chefs, click on the ingredients you have available to you, and we\u2019ll show you what does what!")), /*#__PURE__*/React.createElement("div", {
      id: "chef-select",
      class: "mb-3 text-center"
    }, /*#__PURE__*/React.createElement("h4", null, "Chef Selector"), /*#__PURE__*/React.createElement("button", {
      type: "button",
      id: "chef-1-btn",
      class: "btn btn-dark m-1 active",
      onClick: this.buttonHandler
    }, "1 Chef"), /*#__PURE__*/React.createElement("button", {
      type: "button",
      id: "chef-2-btn",
      class: "btn btn-dark m-1",
      onClick: this.buttonHandler
    }, "2 Chefs"), /*#__PURE__*/React.createElement("button", {
      type: "button",
      id: "chef-3-btn",
      class: "btn btn-dark m-1",
      onClick: this.buttonHandler
    }, "3 Chefs"), /*#__PURE__*/React.createElement("button", {
      type: "button",
      id: "chef-4-btn",
      class: "btn btn-dark m-1",
      onClick: this.buttonHandler
    }, "4 Chefs"), /*#__PURE__*/React.createElement("button", {
      type: "button",
      id: "chef-5-btn",
      class: "btn btn-dark m-1",
      onClick: this.buttonHandler
    }, "5 Chefs")), /*#__PURE__*/React.createElement("form", {
      id: "ingredient-tables",
      class: "d-flex mb-3"
    }, Object.keys(currentIngredients).map(key => this.fillOptions(key))
    /*create a table for each ingredient type*/
    ), /*#__PURE__*/React.createElement("div", {
      id: "bottom-half",
      class: "row justify-content-around mx-1 mt-4"
    }, /*#__PURE__*/React.createElement(Ingredients, {
      currentIngredients: this.state.currentIngredients
    }), /*#__PURE__*/React.createElement(Recipes, {
      chefs: this.state.currentChefs,
      ingredients: this.state.currentIngredients
    })));
  }

}

ReactDOM.render( /*#__PURE__*/React.createElement(Main, null), document.querySelector("body"));