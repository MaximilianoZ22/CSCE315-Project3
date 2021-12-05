/*  import fetchJsonp from "fetch-jsonp"; */

import regeneratorRuntime from "regenerator-runtime";
 
const baseAPIURL = 'https://api.thedogapi.com/v1';

const fetchDogBreeds = async() => {
 const response = await fetch('https://api.thedogapi.com/v1/breeds');
 const BreedDogs = await response.json();
 populateDogSelect(BreedDogs);
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

const fillDogImg = (imageUrl) => {
  document.querySelector('#dog-Image').setAttribute('src',imageUrl);
}

const getDogByBreed = async (breedID) => {
  console.log(breedID);
  let [ rawData ] = await fetch(baseAPIURL+'/images/search?include_breed=1&breed_id=' + breedID).then((rawData) => rawData.json());
  const {url:imgURL,breeds} = rawData;
  fillDogImg(imgURL);
  console.log(rawData);
}

document.querySelector("#Dog").addEventListener("change", async (event) =>  {
  console.log(event.target.value);
 console.log(await getDogByBreed(event.target.value));
})


fetchDogBreeds();


