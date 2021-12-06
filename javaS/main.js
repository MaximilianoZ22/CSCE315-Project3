// html elements
const petForm = document.querySelector('#pet-form');

// event listeners
window.addEventListener('load', onPageLoad);
petForm.addEventListener('submit', fetchPets); 

var PetFinder_Token;

function onPageLoad (e) {
  // requesting access token
  var request = require('request');
  var options = {
    'method': 'POST',
    'url': 'https://api.petfinder.com/v2/oauth2/token',
    'headers': {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    form: {
      'grant_type': 'client_credentials',
      'client_id': 'nsubXCNxX0mFyCKZZIqOrUjhfA5j4E9bmSMApKLR0ZpvJFqT8w',
      'client_secret': 'grEL1qscrRnArGtW2hyVLZrPdKghjZPsWwJ3BkBj'
    }
  };
  request(options, function (error, response) {
    if (error) throw new Error(error);

    let res_json = JSON.parse(response.body);
    PetFinder_Token = res_json['access_token'];

    // requesting all pet types
    var request = require('request');
    var options = {
      'method': 'GET',
      'url': 'https://api.petfinder.com/v2/types',
      'headers': {
        'Authorization': 'Bearer ' + PetFinder_Token
      }
    };
    request(options, function (error, response) {
      if (error) throw new Error(error);
      let typeres_json = JSON.parse(response.body);
      loadPetTypes(typeres_json.types);
      console.log(typeres_json);
    });
  });

}

// Load available pet drop down
function loadPetTypes(petTypes) {
  select = document.getElementById('animal');

  petTypes.forEach((type) => {
    option = document.createElement( 'option' );
    option.value = option.text = type.name;
    select.add(option);
  });
}

//fetch pets from the api for adoption
function fetchPets (e){
  e.preventDefault();

  const animal = document.querySelector('#animal').value;
  const zip = document.querySelector('#zip').value;
  const rad = document.querySelector('#rad').value;
  
  const ageBaby = document.querySelector('#baby').checked;
  const ageYoung = document.querySelector('#young').checked;
  const ageAdult = document.querySelector('#adult').checked;
  const ageSenior = document.querySelector('#senior').checked;

  const genderMale = document.querySelector('#male').checked;
  const genderFemale = document.querySelector('#female').checked;

  const sizeSmall = document.querySelector('#small').checked;
  const sizeMedium = document.querySelector('#medium').checked;
  const sizeLarge = document.querySelector('#large').checked;

  var type = 'type=' + animal;
  
  var location = '&location=' + zip;
  var radius = '';
  var age = '';
  var gender = '';
  var size = '';

  if(rad != "any") {
    radius = '&distance=' + rad;
  }

  if(!(ageBaby && ageYoung && ageAdult && ageSenior) && !(!ageBaby && !ageYoung && !ageAdult && !ageSenior)) {
    age += '&age=';

    var numoptions = 0;

    if(ageBaby){
      if(numoptions > 0) {
        age += ',';
      }

      age += 'baby'
      numoptions += 1;
    }

    if(ageYoung){
      if(numoptions > 0) {
        age += ',';
      }

      age += 'young'
      numoptions += 1;
    }

    if(ageAdult){
      if(numoptions > 0) {
        age += ',';
      }

      age += 'adult'
      numoptions += 1;
    }

    if(ageSenior){
      if(numoptions > 0) {
        age += ',';
      }

      age += 'senior'
      numoptions += 1;
    }
  }

  if(genderMale ^ genderFemale) {
    if(genderMale) {
      gender = '&gender=male'
    } else {
      gender = '&gender=female'
    }
  }

  if(!(sizeSmall && sizeMedium && sizeLarge) && !(!sizeSmall && !sizeMedium && !sizeLarge)) {
    size += '&size=';

    var numoptions = 0;

    if(sizeSmall){
      if(numoptions > 0) {
        size += ',';
      }

      size += 'small'
      numoptions += 1;
    }

    if(sizeMedium){
      if(numoptions > 0) {
        size += ',';
      }

      size += 'medium'
      numoptions += 1;
    }

    if(sizeLarge){
      if(numoptions > 0) {
        size += ',';
      }

      size += 'large,xlarge'
      numoptions += 1;
    }
  }

  console.log('https://api.petfinder.com/v2/animals?' + type + location + age + gender + size);

  // requesting pets
  var request = require('request');
  var options = {
    'method': 'GET',
    'url': 'https://api.petfinder.com/v2/animals?' + type + location + radius + age + gender + size,
    'headers': {
      'Authorization': 'Bearer ' + PetFinder_Token
    }
  };
  request(options, function (error, response) {
    if (error) throw new Error(error);
    let petres_json = JSON.parse(response.body);
    console.log(petres_json.animals);
    showAnimals(petres_json.animals);
  });
}

// Show Pets
function showAnimals(animals) {
  const results = document.querySelector('#results');

  results.innerHTML = '';

  animals.forEach((pet) => {

    const div = document.createElement('div');
    div.classList.add('card', 'card-body', 'mb-3');
    div.innerHTML = `
      <div class="row">
        <div class = "col-sm-6">
          <h4>${pet.name} (${pet.age}) (${pet.gender}) (${pet.size})</h4>
          <p>${pet.breeds.primary}</p>
          <p>${pet.contact.address.address1}, ${pet.contact.address.city} ${pet.contact.address.state} ${pet.contact.address.postcode}</p>
          <p>Phone Number ${pet.contact.phone} </p>
          <p>Email Address: ${pet.contact.email}</p>
        </div>
        <div class = "col-sm-6">
          ${pet.photos[0] ? `
          <img class="img-fluid rounded-circle mt-2" src="${pet.photos[0].medium}">
          ` : ``}
        </div>
      </div>
    `;

    results.appendChild(div);
  });
}
