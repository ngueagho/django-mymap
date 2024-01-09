// (function () {
//     "use strict";
//     let inputField = document.getElementById('input');
//     let ulField = document.getElementById('suggestions');
//     inputField.addEventListener('input', changeAutoComplete);
//     ulField.addEventListener('click', selectItem);
  
//     function changeAutoComplete({ target }) {
//       let data = target.value;
//       ulField.innerHTML = ``;
//       if (data.length) {
//         let autoCompleteValues = autoComplete(data);
//         autoCompleteValues.forEach(value => { addItem(value); });
//       }
//     }
  
//     function autoComplete(inputValue) {
//       let destination = ["Italy", "Spain", "Portugal", "Brazil","Brazi","Brazil"];
//       return destination.filter(
//         (value) => value.toLowerCase().includes(inputValue.toLowerCase())
//       );
//     }
  
//     function addItem(value) {
//       ulField.innerHTML = ulField.innerHTML + `<li>${value}</li>`;
//     }
  
//     function selectItem({ target }) {
//       if (target.tagName === 'LI') {
//         inputField.value = target.textContent;
//         ulField.innerHTML = ``;
//       }
//     }
//   })();


"use strict";

// function autoCompleteHandler() {
//   let inputField = document.getElementById('input');
//   let ulField = document.getElementById('suggestions');
//   inputField.addEventListener('input', changeAutoComplete);
//   ulField.addEventListener('click', selectItem);

//   function changeAutoComplete({ target }) {
//     let data = target.value;
//     ulField.innerHTML = '';
//     if (data.length) {
//       let autoCompleteValues = autoComplete(data);
//       autoCompleteValues.forEach(value => {
//         addItem(value);
//       });
//     }
//   }

//   function autoComplete(inputValue) {
//     let destination = ["Italy", "Spain", "Portugal", "Brazil", "Brazi", "Brazil"];
//     return destination.filter(
//       (value) => value.toLowerCase().includes(inputValue.toLowerCase())
//     );
//   }

//   function addItem(value) {
//     ulField.innerHTML += `<li>${value}</li>`;
//   }

//   function selectItem({ target }) {
//     if (target.tagName === 'LI') {
//       inputField.value = target.textContent;
//       ulField.innerHTML = '';
//     }
//   }
// }
let destination = ["Italy", "Spain", "Portugal", "Brazil", "Brazi", "Brazil"];

function autoCompleteHandler() {
  let inputField = document.getElementById('search');
  let ulField = document.getElementById('suggestions');
  // inputField.addEventListener('keydown', processKeyPress);
  ulField.addEventListener('click', selectItem);

  // function processKeyPress(event) {
  //   if (event.keyCode === 13) {  // Vérifie si la touche pressée est la touche Entrée
  //     changeAutoComplete();
  //   }
  // }
  changeAutoComplete();

  function changeAutoComplete() {
    let data = inputField.value;
    ulField.innerHTML = '';
    if (data.length) {
      let autoCompleteValues = autoComplete(data);
      autoCompleteValues.forEach(value => {
        addItem(value);
      });
    }
  }

  function autoComplete(inputValue) {
    return destination.filter(
      (value) => value.toLowerCase().includes(inputValue.toLowerCase())
    );
  }

  function addItem(value) {
    ulField.innerHTML += `<li>${value}</li>`;
  }

  function selectItem({ target }) {
    if (target.tagName === 'LI') {
      inputField.value = target.textContent;
      ulField.innerHTML = '';
    }
  }
  destination.push("ooooooo")
  // alert("Autocomplétion configurée avec la touche Entrée");
}




document.getElementById("search").addEventListener("input", function(e) {
  autoCompleteHandler();
})

  
  