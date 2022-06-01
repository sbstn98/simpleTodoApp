// SELCTORS

const inputField = document.querySelector('#input-field');
const inputButton = document.querySelector('#input-button');

// EVENTLISTENERS

inputButton.addEventListener('click', addTodo);
document.addEventListener('DOMContentLoaded', displayTodo());   
document.addEventListener('DOMContentLoaded', isDone());   
document.addEventListener('DOMContentLoaded', controlSubmit());   



// VARIABLES

let data = [];

// FUNCTIONS

    // Object Constructor Function

    function todo(todo, todoid){
      this.todo = todo;
      this.todoid = todoid;
    };

    // addTodo()

function addTodo() {

    // Take the value of inputField into formValue

    let formValue = inputField.value;

    // add and id to todoid Variable

    let todoid = Date.now();

    // create an new Object with the data from formValue and todoid

    const newTodo = new todo(formValue, todoid);

    // Verhindere die direkte Ausführung

    event.preventDefault();

    // Read the data in localStorage if there ist somenthing, safe it in the Variable data if there is nothing create an empty Array

    data = localStorage.getItem("todos") ? JSON.parse(localStorage.getItem("todos")) : [];

    // Push the new Input into the data array

    data.push(newTodo);

    // safe the Array in localStorage

    localStorage.setItem("todos", JSON.stringify(data));

    // Empty input Field

    inputField.value = "";
    
    // Page reload to display the Todos

    location.reload(); 
    
}

// displayTodo()

function displayTodo() {


  // Read the data in localStorage if there ist somenthing, safe it in the Variable data if there is nothing create an empty Array

  let displayData = localStorage.getItem("todos") ? JSON.parse(localStorage.getItem("todos")) : [];

  /// Loop through the Array

  for (let key in displayData) {

      // get the list item by id

      let panel = document.getElementById('panel-todo'); // ehemals ul

      // creates an li element

      let panelblock = document.createElement('a'); // ehemals li

      // add a class todoItem on the li item

      panelblock.classList.add('todoItem');

      // add the data from displayData.todo to the li tem

      panelblock.textContent = displayData[key].todo;

      // create an todoid variable and safe the todo id value from local storage innit

      let todoid = displayData[key].todoid;

      // ad the todid as a class to the li element

      panelblock.setAttribute('id', todoid);

      // append the li item on the ul list

      panel.append(panelblock);        

      // create an doneButton

      let doneButton = document.createElement('button');

      // add a donebutton class to the doneButton and an bulma io button is-primary class, seperated in 2 
      
      doneButton.classList.add('doneButton');
      doneButton.classList.add('button');
      doneButton.classList.add('is-danger');
      doneButton.classList.add('is-small');
      panelblock.classList.add('panel-block');
      panelblock.classList.add('is-block');
      doneButton.classList.add('is-pulled-right');
      panelblock.classList.add('pb-3');
      panelblock.classList.add('pt-2');


      // set the btn name to X

      doneButton.innerHTML = 'X';

      // append the doneButton to the li element

      panelblock.append(doneButton);

    };
}

// Function isDone()

function isDone(e) {

  // Get all buttons with class .doneButton

  const queryAllButtons = document.querySelectorAll('.doneButton');

  // Loop through all that buttons in the array

  for (let i = 0; i < queryAllButtons.length; i++) {

  // Add an EventListener for every done button

    queryAllButtons[i].addEventListener("click", function() {

        // Safe the id of the parent element in the doneButtonId variable

        let doneButtonId = this.parentElement.id;

        // parse the data from local storage into the deleteData variable

        let deleteData = JSON.parse(localStorage.getItem("todos"));

        // Loop over the Javascript Object

        for (let key in deleteData){

          // validate if a todoid is equal to doneButtonId

          if ( deleteData[key].todoid == doneButtonId ) {

            console.log('Match');

            // If yes delte the Data from Object

            delete deleteData[key]

            // Remove the nul 

            let newData = deleteData.filter(x => x !== null)

            console.log(newData);

            // set the newData back to local storage

            localStorage.setItem("todos", JSON.stringify(newData));

            // reload the page to display the data without the delted item

            document.location.reload();

            // else print 'There is Nothing'

          } else {
            console.log('There is Nothing');
          }

        }
    });
  }
}

// controlSumbit()

function controlSubmit () {

  // inputButton is disabled from the beginning

  inputButton.disabled = true;

  //  add an okeyup event on the inputField

  inputField.onkeyup = () => {

    // if the value in the inputField is longer than 0 

    if (inputField.value.length > 0)  {

      // activates the inputButton

      inputButton.disabled = false;
    } else{

      // disabled the inputButton

      inputButton.disabled = true;

    }
  }
}