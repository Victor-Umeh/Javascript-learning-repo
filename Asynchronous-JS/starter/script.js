'use strict';
const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

/*===========================================================
//---------------- XMLHttpRequest() AJAX call----------------
//Country info render function
function renderCountry(data, className = '') {
  //Create a dynamic HTML element to render returned data to the DOM
  const html = `
  <article class="country ${className}">
  <img class="country__img" src="${data.flags.svg}" />
  <div class="country__data">
    <h3 class="country__name">${data.name.common}</h3>
    <h4 class="country__region">${data.region}</h4>
    <p class="country__row"><span>👫</span>${(
      data.population / 1000000
    ).toFixed(1)}Million</p>
    <p class="country__row"><span>🗣️</span>${data.languages.por}</p>
    <p class="country__row"><span>💰</span>${data.currencies.EUR?.name}</p>
  </div>
</article>
  `;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
}

//Fetch Function
function getCountryAndNeighbour(country) {
  //Making an AJAX call: old method ------(1)
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
  request.send();

  //Event handler renders data to the DOM after data has arrived (promise, async)
  request.addEventListener('load', () => {
    const [data] = JSON.parse(request.responseText);
    console.log(data);
    renderCountry(data);

    //Make a new AJAX call from the bordering countries of the first AJAX call
    const [neighbour] = data.borders;
    if (!neighbour) return;

    //Making an AJAX call: old method ------(2)
    const request2 = new XMLHttpRequest();
    request2.open('GET', `https://restcountries.com/v3.1/alpha/${neighbour}`);
    request2.send();

    request2.addEventListener('load', () => {
      console.log(JSON.parse(request2.responseText));
      const [data2] = JSON.parse(request2.responseText);
      renderCountry(data2, 'neighbour');
    });
  });
}
getCountryAndNeighbour('usa');

=========================================================================*/
//////////////////////////////////////////////////
// Rough Section---------------------------------

//Snippet code: Understanding Async concept😐😐😐

// const flagImg = document.querySelector('.country__img');
// const asyHeadTest = document.querySelector('h1');

// setTimeout(() => (asyHeadTest.style.opacity = 1), 1000);
// alert('Hello World');
// const testPrompt = prompt('Enter a name');
// alert(testPrompt);

// console.log(flagImg);
// console.log(flagImg.src);

//Old method of making API calls
// const request = new XMLHttpRequest();
// request.open('GET', 'https://restcountries.com/v3.1/name/nigeria');
// request.send();

// request.addEventListener('load', () => {
//   const data = JSON.parse(request.responseText);
//   const flag = data[0].flags.png;
//   const pop = data[0].population;
//   flagImg.src = flag;
//   asyHeadTest.innerHTML = pop;
// });

//------------------------------------------------
//////////////////////////////////////////////////
/*
//Country info render function
function renderCountry(data) {
  const html = `
  <article class="country">
  <img class="country__img" src="${data.flags.svg}" />
  <div class="country__data">
    <h3 class="country__name">${data.name.common}</h3>
    <h4 class="country__region">${data.region}</h4>
    <p class="country__row"><span>👫</span>${(
      data.population / 1000000
    ).toFixed(1)}Million</p>
    <p class="country__row"><span>🗣️</span>${data.languages.eng}</p>
    <p class="country__row"><span>💰</span>${data.currencies.name}</p>
  </div>
</article>
  `;
  countriesContainer.insertAdjacentHTML('beforeend', html);
}

//Fetch neighbour country
function getBorderCountry(country) {
  if (country.length > 1 && country.length !== -1) {
    country.forEach(cont => {
      const contRequest = new XMLHttpRequest();
      contRequest.open('GET', `https://restcountries.com/v3.1/alpha/${cont}`);
      contRequest.send();

      contRequest.addEventListener('load', () => {
        const contData = JSON.parse(contRequest.responseText);
        console.log(contData);
        renderCountry(contData);
      });
    });
  }
}
//Fetch Function
function getAnotherCountry(country) {
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
  request.send();

  request.addEventListener('load', () => {
    const [data] = JSON.parse(request.responseText);
    console.log(data);
    renderCountry(data);
    countriesContainer.style.opacity = 1;

    const neighbour = data.borders;
    getBorderCountry(neighbour);
  });
}

getAnotherCountry('nigeria');
*/

// const request = fetch('https://restcountries.com/v3.1/name/$portugal');
// console.log(request);

function renderCountry(data, className = '') {
  //Create a dynamic HTML element to render returned data to the DOM
  const html = `
  <article class="country ${className}">
  <img class="country__img" src="${data.flags?.svg}" />
  <div class="country__data">
    <h3 class="country__name">${data.name.common}</h3>
    <h4 class="country__region">${data.region}</h4>
    <p class="country__row"><span>👫</span>${(
      data.population / 1000000
    ).toFixed(1)}Million</p>
    <p class="country__row"><span>🗣️</span>${data.languages?.por}</p>
    <p class="country__row"><span>💰</span>${data.currencies.EUR?.name}</p>
  </div>
</article>
  `;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
}
function renderError(error) {
  countriesContainer.insertAdjacentText('beforeend', error);
  countriesContainer.style.opacity = 1;
}

/*---------Encapsulate the fetch code block to it's own reusable function,
//---------returns a promise which the then() can be called upon--------*/

function getJSON(url, msg) {
  return fetch(`${url}`).then(res => {
    if (!res.ok) throw new Error(`${msg} (${res.status})`);
    return res.json();
  });
}

function getCountryData(country) {
  fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then(res => {
      if (!res.ok)
        throw new Error(
          `Something went wrong🤦‍♂️country not found  (${res.status})`
        );
      return res.json();
    })
    .then(data => {
      renderCountry(data[0]);

      const neighbour = data[0].borders;

      //Guard Clause
      if (!neighbour) return;

      //country 2
      //Fetch neighbouring country
      return fetch(`https://restcountries.com/v3.1/aplha/${neighbour}`);
    })
    .then(response => response.json())
    .then(data => renderCountry(data, 'neighbour'))
    .catch(err => {
      console.log(err);
      renderError(err.message);
    });
}

btn.addEventListener('click', () => {
  getCountryData('portugal');
});

// getCountryData('jdscjl');
