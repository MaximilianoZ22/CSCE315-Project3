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

const getDogByBreed = async (breedID) => {
  let rawData = await fetch(baseAPIURL+`/images/search?include_breed-1&breed + ${breedID}`);
  return rawData.json();
}

document.querySelector("#Dog").addEventListener("change", async (event) =>  {
 console.log(await getDogByBreed(event.target.value));
})


fetchDogBreeds();


