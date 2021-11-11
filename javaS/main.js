const petForm = document.querySelector('#pet-form');

petForm.addEventListener('submit', fetchPets); 

//fetch pets from the api for adoption

function fetchPets (e){
  e.preventDefault();


  const animal = document.querySelector('#animal').value;
  const zip = document.querySelector('#zip').value;
  console.log(animal);
  console.log(zip);

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
    let token = res_json['access_token'];
    console.log(token);
    
    // requesting pets
    var request = require('request');
    var options = {
      'method': 'GET',
      'url': 'https://api.petfinder.com/v2/animals?location=' + zip + '&type=' + animal,
      'headers': {
        'Authorization': 'Bearer ' + token
      }
    };
    request(options, function (error, response) {
      if (error) throw new Error(error);
      let petres_json = JSON.parse(response.body);
      console.log(petres_json.animals);
      showAnimals(petres_json.animals);
    });
  });
}

// Show Pets
function showAnimals(animals) {
  const results = document.querySelector('#results');

  results.innerHTML = '';

  animals.forEach((pet) => {
    console.log(pet);

    const div = document.createElement('div');
    div.classList.add('card', 'card-body', 'mb-3');
    div.innerHTML = `
      <div class="row">
        <div class = "col-sm-6">
          <h4>${pet.name} (${pet.age})</h4>
          <p>${pet.breeds.primary}</p>
          <p>${pet.contact.address.address1}, ${pet.contact.address.city} ${pet.contact.address.state} ${pet.contact.address.postcode}</p>
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
