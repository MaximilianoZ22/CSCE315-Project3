/*  import fetchJsonp from "fetch-jsonp"; */

import regeneratorRuntime from "regenerator-runtime";
 
const baseAPIURL = 'https://api.thedogapi.com/v1';

const fetchDogBreeds = async() => {
 const response = await fetch('https://api.thedogapi.com/v1/breeds');
 const BreedDogs = await response.json();
 populateDogSelect(BreedDogs);
 console.log(BreedDogs);
}

const populateDogSelect = (breeds) => {
 const select = document.querySelector('.breed-select');
 const breedOptions = breeds.map(breed => {
   const option = document.createElement('option');
   option.text = breed.name;
   option.value = breed.id;
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
  descVal.textContent = value;
  descVal.id = label;
  document.querySelector('#dogDescription').appendChild(desc);
  document.querySelector('#dogDescription').appendChild(descVal);
}
const clearDogDescription = () => {
  const descElem = document.querySelector('#dogDescription');
  while(descElem.firstChild) {
    descElem.removeChild(descElem.firstChild);
  }
}
const fillDogDescription = ({bred_for: bredFor, breed_group: breedGroup, life_span: lifeSpan, name, height, temperament, weight}) => {
  clearDogDescription();

  populateDescription({
    label: 'Name',
    value: name
  })

  populateDescription({
    label: 'Breed Group',
    value: breedGroup
  })

  populateDescription({
    label: 'Bred For',
    value: bredFor
  })

  populateDescription({
    label: 'Breed Group',
    value: breedGroup
  })

  populateDescription({
    label: 'Life Span',
    value: lifeSpan
  })

  populateDescription({
    label: 'Height [cm]',
    value: height.metric
  })

  populateDescription({
    label: 'Weight [kg]',
    value: weight.metric
  })

  populateDescription({
    label: 'Temperament',
    value: temperament
  })
}


const fillDogImg = (imageUrl,name) => {
  document.querySelector('#dog-Image').setAttribute('src',imageUrl);
  document.querySelector('#dog-Image').setAttribute('alt',"Picture of: "+name);
  //Accesibility Feature name: Image Alternative Text
  //accesibility feature incase the image does not load there is a description of the image
}

const getDogByBreed = async (breedID) => {
  console.log(breedID);
  let [ rawData ] = await fetch(baseAPIURL+'/images/search?include_breed=1&breed_id=' + breedID).then((rawData) => rawData.json());
  const {url:imgURL,breeds} = rawData;
  fillDogImg(imgURL,breeds[0].name);
  console.log(rawData);
  fillDogDescription(breeds[0]);
}

document.querySelector("#Dog").addEventListener("change", async (event) =>  {
  document.querySelector(".dogInfo").style.display = "block";
  console.log(event.target.value);
 console.log(await getDogByBreed(event.target.value));
})

const speakDesc = () => {
  const name = document.querySelector('#Name').innerText;
  const behavior = document.querySelector('#Temperament').innerText;
  speechSynthesis.speak(new SpeechSynthesisUtterance(`The name of the Dog you picked is ${name} and it has a ${behavior} temperament`));

}

document.querySelector('#dog-Image').addEventListener("click", speakDesc);
document.querySelector('.dogImage > .fa-volume-up').addEventListener("click", speakDesc);


fetchDogBreeds();


