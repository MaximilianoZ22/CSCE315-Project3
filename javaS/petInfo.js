var request = require('request');
var options = {
  'method': 'GET',
  'url': 'https://api.thecatapi.com/v1/breeds?api_key=71758f7c-16c4-42ca-af9c-ac83d9fb91df',
  'headers': {
  }
};
request(options, function (error, response) {
  if (error) throw new Error(error);
  console.log(response.body);
  let infoPet = JSON.parse(response.body);
  loadPetTypes(infoPet);
});

function loadPetTypes(petTypes) {
  select = document.getElementById('Cat');

  petTypes.forEach((type) => {
    option = document.createElement( 'option' );
    option.value = option.text = type.name;
    select.add(option);
  });
}



