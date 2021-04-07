import allIngredients from "../public/allIngredients.js";
import recipes from "../public/recipes.js";
import NavBar from "./navbar.js";

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
    let title = key.split("");
    title[0] = title[0].toUpperCase();
    title = title.join("");
    return currentIngredients[key].length === 0 ? null : /*#__PURE__*/React.createElement("p", {
      class: "col-xl-6 note"
    }, /*#__PURE__*/React.createElement("b", null, title, ":"), " ", currentIngredients[key].join(", "));
  })));
};

const Recipes = ({
  ingredients,
  chefs
}) => {
  const currentRecipes = recipes[{
    1: "oneChef",
    2: "twoChef",
    3: "threeChef",
    4: "fourChef",
    5: "fiveChef"
  }[chefs]]; // find recipes that match the currently selected ingredients

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
    // sort by benefit, add ingredient names, then map jsx to the array
    validRecipes = validRecipes.sort((a, b) => {
      if (a[2].toUpperCase() > b[2].toUpperCase()) return 1;
      if (a[2].toUpperCase() < b[2].toUpperCase()) return -1;else return 0;
    }).map(recipe => {
      let dblFlag = recipe[0] === recipe[1];
      return /*#__PURE__*/React.createElement("p", {
        class: "col-xl-4 note"
      }, /*#__PURE__*/React.createElement("b", null, recipe[2], ":"), " ", ingredients[recipe[0]][0], " + ", ingredients[recipe[1]][dblFlag ? 1 : 0]);
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

function RecipesView() {
  const emptyIngredientList = () => {
    return {
      meat: [],
      bran: [],
      fish: [],
      fruit: [],
      veggie: [],
      dairy: [],
      drink: []
    };
  };

  const [currentChefs, setCurrentChefs] = React.useState(1);
  const [currentIngredients, setCurrentIngredients] = React.useState(emptyIngredientList());

  const chefSelectHandler = event => {
    // when choosing new chef count, change active button and empty ingredients list
    if (event.target.nodeName === "BUTTON" && Number(event.target.textContent[0]) !== currentChefs) {
      document.querySelector(".active").classList.remove("active");
      event.target.classList.add("active"); // next, uncheck all boxes, and empty ingredients list

      document.querySelectorAll(":checked").forEach(checkbox => {
        checkbox.checked = false;
      });
      setCurrentChefs(Number(event.target.textContent[0]));
      setCurrentIngredients(emptyIngredientList());
    }
  };

  const checkHandler = event => {
    let selectedItems = [];
    let field = event.currentTarget;
    field.querySelectorAll(":checked").forEach(value => {
      selectedItems.push(value.labels[0].textContent);
    });
    let category = field.id.split("-")[0];
    let tempObj = Object.assign({}, currentIngredients);
    tempObj[category] = selectedItems;
    setCurrentIngredients(tempObj);
  };

  const fillOptions = type => {
    let list = allIngredients[type][currentChefs - 1];
    let title = type.split("");
    title[0].toUpperCase();
    title.join("");
    return /*#__PURE__*/React.createElement("fieldset", {
      id: `${type}-list`,
      class: "d-flex flex-column border border-dark mx-auto px-1",
      onInput: checkHandler
    }, /*#__PURE__*/React.createElement("legend", {
      class: "text-center"
    }, title), list.map(item => {
      let itemId = item.split(" ").join("-").toLowerCase();
      return /*#__PURE__*/React.createElement("label", {
        for: itemId
      }, /*#__PURE__*/React.createElement("input", {
        id: itemId,
        name: type,
        type: "checkbox"
      }), item);
    }));
  };

  return /*#__PURE__*/React.createElement("div", {
    id: "view-wrapper"
  }, /*#__PURE__*/React.createElement("article", {
    id: "intro",
    class: "my-3 text-center"
  }, /*#__PURE__*/React.createElement("p", null, "Welcome to the MHFU Kitchen Helper, where getting you the food you want ( or at least can tolerate ) fast is our goal!"), /*#__PURE__*/React.createElement("p", null, "Getting started is easy! Just select your current number of felyne chefs, click on the ingredients you have available to you, and we\u2019ll show you what does what!")), /*#__PURE__*/React.createElement("div", {
    id: "chef-select",
    class: "mb-3 text-center",
    onClick: chefSelectHandler
  }, /*#__PURE__*/React.createElement("h4", null, "Chef Selector"), /*#__PURE__*/React.createElement("button", {
    type: "button",
    id: "chef-1-btn",
    class: "btn btn-dark m-1 active"
  }, "1 Chef"), /*#__PURE__*/React.createElement("button", {
    type: "button",
    id: "chef-2-btn",
    class: "btn btn-dark m-1"
  }, "2 Chefs"), /*#__PURE__*/React.createElement("button", {
    type: "button",
    id: "chef-3-btn",
    class: "btn btn-dark m-1"
  }, "3 Chefs"), /*#__PURE__*/React.createElement("button", {
    type: "button",
    id: "chef-4-btn",
    class: "btn btn-dark m-1"
  }, "4 Chefs"), /*#__PURE__*/React.createElement("button", {
    type: "button",
    id: "chef-5-btn",
    class: "btn btn-dark m-1"
  }, "5 Chefs")), /*#__PURE__*/React.createElement("form", {
    id: "ingredient-tables",
    class: "d-flex mb-3"
  }, Object.keys(currentIngredients).map(key => fillOptions(key))
  /*create a table for each ingredient type*/
  ), /*#__PURE__*/React.createElement("div", {
    id: "bottom-half",
    class: "row justify-content-around mx-1 mt-4"
  }, /*#__PURE__*/React.createElement(Ingredients, {
    currentIngredients: currentIngredients
  }), /*#__PURE__*/React.createElement(Recipes, {
    chefs: currentChefs,
    ingredients: currentIngredients
  })));
}

function SkillsView({}) {
  const [skillCardList, setSkillCardList] = React.useState([]); // only handles clicking on a card's svg element
  // clicking on a skill's book icon will hide the description, show the article, and fill in the icon
  // clicking on it again will reverse this

  const clickHandler = event => {
    if (event.target.nodeName === "svg") {
      const clickedSkill = event.target.dataset.skill;
      const clickedDesc = document.getElementById(`${clickedSkill}-desc`);
      const clickedArticle = document.getElementById(`${clickedSkill}-article`);
      let clickedFill = event.target.attributes.fill;
      clickedDesc.classList.toggle('show');
      clickedArticle.classList.toggle('show');
      clickedFill.value = clickedFill.value === "none" ? "currentColor" : "none";
    }
  }; // Handle submitting the search / filter parameters
  // Clear the skillCardList, emptying the displayed list and showing the loading message while the
  // fetch is being performed. Also clear the search fields.


  const submitHandler = event => {
    event.preventDefault();
    const searchTypeField = document.getElementById('inlineFormType');
    const searchValueField = document.getElementById('inlineFormValue');
    const searchObj = {
      type: searchTypeField.value,
      value: searchValueField.value
    };
    searchTypeField.value = 'name';
    searchValueField.value = '';
    setSkillCardList([/*#__PURE__*/React.createElement("p", null, "Loading list...")]);
    getSkills(searchObj);
  }; // returns a JSX div containing a bootstrap card with the skill information in it
  // expects: a skillArray in the format ['skill name', 'skill description', 'skill article']


  const skillCard = skillArray => {
    const [skillName, skillDesc, skillArticle] = skillArray;
    return /*#__PURE__*/React.createElement("div", {
      class: "card col-sm-5 col-lg-3 m-1 p-0",
      id: `${skillName}-card`,
      key: `${skillName}-card`
    }, /*#__PURE__*/React.createElement("div", {
      class: "card-header d-flex flex-nowrap justify-content-between align-items-center"
    }, /*#__PURE__*/React.createElement("h5", {
      class: "card-title h4 d-inline"
    }, skillName), skillArticle ? /*#__PURE__*/React.createElement("svg", {
      class: "d-inline",
      xmlns: "http://www.w3.org/2000/svg",
      fill: "none",
      width: "32",
      height: "32",
      stroke: "currentColor",
      "data-skill": skillName
    }, /*#__PURE__*/React.createElement("path", {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      strokeWidth: 2,
      d: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
    })) : undefined), /*#__PURE__*/React.createElement("div", {
      class: "card-body"
    }, /*#__PURE__*/React.createElement("p", {
      id: `${skillName}-desc`,
      class: "card-text show"
    }, skillDesc), /*#__PURE__*/React.createElement("p", {
      id: `${skillName}-article`,
      class: "card-text card-article"
    }, skillArticle)));
  }; // Fetch the skills from the db
  // If the search function was used, format the fields into a query to append to the api path.
  // If no search was specified, the 'query' param will be empty and all listed skills will be retrieved.
  // Once the data is received, update the skillCardList state, which will cause a re-render.


  const getSkills = query => {
    let queryFull = '';

    if (query) {
      queryFull = `?type=${query.type}&value=${query.value}`;
    }

    try {
      let skillFetchResults = fetch(`/api${queryFull}`).then(response => response.json()).then(responseJSON => {
        const body = responseJSON;
        let fullCardList = [];

        for (let skill of body) {
          fullCardList.push(skillCard(skill));
        }

        if (fullCardList.length === 0) {
          setSkillCardList([/*#__PURE__*/React.createElement("p", null, "No skills match your search criteria.")]);
        } else {
          setSkillCardList(fullCardList);
        }
      });
    } catch {
      console.log('There was an issue during skill retrieval.');
    }
  }; // Check to see if the skillCardList is empty, which would be on the initial render.
  // If this is the initial render, get all the skills to display.


  if (skillCardList.length === 0) {
    getSkills();
  }

  return /*#__PURE__*/React.createElement("div", {
    id: "view-wrapper"
  }, /*#__PURE__*/React.createElement("article", {
    id: "intro",
    class: "my-3 text-center"
  }, /*#__PURE__*/React.createElement("p", null, "Welcome to the MHFU Kitchen Helper Skills List! Need to find out what good your felyne's kitchen skills are? Look no further!"), /*#__PURE__*/React.createElement("p", null, "If you're looking for a little more context or some flavor, click on the book icon near the skill listing to see the info magazine's article entry for that skill (if available)!")), /*#__PURE__*/React.createElement("h4", null, "Skill List"), /*#__PURE__*/React.createElement("form", {
    class: "form-inline"
  }, /*#__PURE__*/React.createElement("label", {
    for: "inlineFormType"
  }, "Search skills in their "), /*#__PURE__*/React.createElement("select", {
    class: "form-control my-1 mx-2",
    id: "inlineFormType"
  }, /*#__PURE__*/React.createElement("option", {
    selected: true,
    value: "name"
  }, "name"), /*#__PURE__*/React.createElement("option", {
    value: "description"
  }, "description"), /*#__PURE__*/React.createElement("option", {
    value: "article"
  }, "article")), /*#__PURE__*/React.createElement("label", {
    for: "inlineFormValue"
  }, " for "), /*#__PURE__*/React.createElement("input", {
    type: "text",
    class: "form-control my-1 mx-2",
    id: "inlineFormValue",
    placeholder: "words",
    required: true
  }), /*#__PURE__*/React.createElement("button", {
    type: "submit",
    class: "btn btn-primary my-1 mx-2",
    onClick: submitHandler
  }, "Submit")), /*#__PURE__*/React.createElement("div", {
    id: "skill-list",
    class: "d-flex flex-wrap justify-content-center border border-dark",
    onClick: clickHandler
  }, skillCardList.length >= 1 ? skillCardList : /*#__PURE__*/React.createElement("p", null, "Loading list...")));
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
        drink: []
      },
      currentChefs: 1
    };
    this.tagLine = "Looks tasty!";

    this.changeState = stateObj => {
      this.setState(stateObj);
    };

    this.views = {
      recipes: RecipesView,
      skills: SkillsView
    };
  }

  render() {
    const currentIngredients = this.state.currentIngredients;
    const currentChefs = this.state.currentChefs;
    const View = this.views[this.state.subTitle];
    return /*#__PURE__*/React.createElement("div", {
      id: "app-wrapper",
      class: "container-fluid"
    }, /*#__PURE__*/React.createElement(NavBar, {
      title: this.state.appTitle,
      subTitle: this.state.subTitle,
      tagLine: this.tagLine,
      changeState: this.changeState
    }), /*#__PURE__*/React.createElement(View, {
      changeState: this.changeState,
      currentChefs: currentChefs,
      currentIngredients: currentIngredients
    }));
  }

}

ReactDOM.render( /*#__PURE__*/React.createElement(Main, null), document.querySelector("body"));