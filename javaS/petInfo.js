import regeneratorRuntime from "regenerator-runtime";
const baseAPIURL = 'https://api.thecatapi.com/v1';
var request = require('request');
var options = {
  'method': 'GET',
  'url': 'https://api.thecatapi.com/v1/breeds?api_key=71758f7c-16c4-42ca-af9c-ac83d9fb91df',
  'headers': {
  }
};
/* request(options, function (error, response) {
  if (error) throw new Error(error);
  console.log(response.body);
  let infoPet = JSON.parse(response.body);
  loadPetTypes(infoPet);
  console.log(infoPet);
}); */

const fetchCatBreeds = async() => {
  const response = await fetch('https://api.thecatapi.com/v1/breeds?api_key=71758f7c-16c4-42ca-af9c-ac83d9fb91df');
  const BreedCats = await response.json();
  populateCatSelect(BreedCats);
  console.log(BreedCats);
 }

 const populateCatSelect = (petTypes) => {
  /* select = document.getElementById('Cat');

  petTypes.forEach((type) => {
    option = document.createElement( 'option' );
    option.value = option.text = type.name;
    select.add(option);
  }); */
  const select = document.querySelector('.Cat');
  const breedOptions = petTypes.map(petTypes => {
  const option = document.createElement('option');
  option.text = petTypes.name;
  option.value = petTypes.id;
  return option;
 })

 breedOptions.forEach(breedOption => {
   select.appendChild(breedOption);
 })
}


const populateDescription = ({label, value}) =>{
  const desc = document.createElement('dt');
  desc.textContent = label;
  const descVal = document.createElement('dd');
  descVal.id = `Cat-${label}`;
  descVal.textContent = value;
  document.querySelector('#catDescription').appendChild(desc);
  document.querySelector('#catDescription').appendChild(descVal);
}

const populateRating = ({label, value}) =>{
  const desc = document.createElement('dt');
  desc.textContent = label;
  const descVal = document.createElement('dd');
  for(let i = 0;  i < value; i++){
    const icon = document.createElement('i');
    icon.className = "fas fa-star";
    descVal.appendChild(icon);
  }
  for(let i = value;  i < 5; i++){
    const icon = document.createElement('i');
    icon.className = "far fa-star";
    descVal.appendChild(icon);
  }
  document.querySelector('#catDescription').appendChild(desc);
  document.querySelector('#catDescription').appendChild(descVal);
}
const clearCatDescription = () => {
  const descElem = document.querySelector('#catDescription');
  while(descElem.firstChild) {
    descElem.removeChild(descElem.firstChild);
  }
}
const fillCatDescription = ({adaptability, affection_level, child_friendly, description, dog_friendly, energy_level, experimental, grooming, hairless, health_issues, hypoallergenic, indoor, intelligence, lap, life_span, name, origin, rare, shedding_level, short_legs, social_needs, stranger_friendly, suppressed_tail, temperament}) => {
  clearCatDescription();

  populateDescription({
    label: 'Name',
    value: name
  })
  populateDescription({
    label: 'Description',
    value: description
  })
  
  populateDescription({
    label: 'Life Span',
    value: life_span
  })
  populateDescription({
    label: 'Origin',
    value: origin
  })
  populateDescription({
    label: 'Temperament',
    value: temperament
  })

  populateRating({
    label: 'Adaptability',
    value: adaptability
  })
  populateRating({
    label: 'Affection Level',
    value: affection_level
  })
  populateRating({
    label: 'Child Friendly',
    value: child_friendly
  })
  populateRating({
    label: 'Dog Friendly',
    value: dog_friendly
  })
  populateRating({
    label: 'Energy Level',
    value: energy_level
  })
  populateRating({
    label: 'Experimental',
    value: experimental
  })
  populateRating({
    label: 'Grooming',
    value: grooming
  })
  populateRating({
    label: 'Hairless',
    value: hairless
  })
  populateRating({
    label: 'Health Issues',
    value: health_issues
  })
  populateRating({
    label: 'Hypoallergenic',
    value: hypoallergenic
  })
  populateRating({
    label: 'Indoor',
    value: indoor
  })
  populateRating({
    label: 'Intelligence',
    value: intelligence
  })
  populateRating({
    label: 'Lap',
    value: lap
  })
  populateRating({
    label: 'Rare',
    value: rare
  })
  populateRating({
    label: 'Shedding Level',
    value: shedding_level
  })
  populateRating({
    label: 'Short Legs',
    value: short_legs
  })
  populateRating({
    label: 'Social Needs',
    value: social_needs
  })
  populateRating({
    label: 'Stranger Friendly',
    value: stranger_friendly
  })
  populateRating({
    label: 'Suppressed Tail',
    value: suppressed_tail
  })
  
}

const fillCatImg = (imageUrl, name) => {
  document.querySelector('#cat-Image').setAttribute('src',imageUrl);
  document.querySelector('#cat-Image').setAttribute('alt',"Picture of: "+name);
  //Accesibility Feature name: Image Alternative Text
  //accesibility feature incase the image does not load there is a description of the image
}

const getCatByBreed = async (breedID) => {
  console.log(breedID);
  let [ rawData ] = await fetch(baseAPIURL+'/images/search?include_breed=1&breed_id=' + breedID).then((rawData) => rawData.json());
  const {url:imgURL,breeds} = rawData;
  fillCatImg(imgURL,breeds[0].name);
  console.log(rawData);
  fillCatDescription(breeds[0]);
}

document.querySelector("#Cat").addEventListener("change", async (event) =>  {
  document.querySelector(".catInfo").style.display = "block";
  console.log(event.target.value);
 console.log(await getCatByBreed(event.target.value));

})

const speakDesc = () => {
  const descriptionValue = document.querySelector('#Cat-Description').innerText;
  const name = document.querySelector('#Cat-Name').innerText;
  speechSynthesis.speak(new SpeechSynthesisUtterance(`The cat you picked is ${name}. ${descriptionValue}`));

};

document.querySelector('#cat-Image').addEventListener("click", speakDesc);
document.querySelector('.catImage > .fa-volume-up').addEventListener("click", speakDesc);



fetchCatBreeds();






