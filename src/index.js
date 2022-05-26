import './css/styles.css';
import fetchCountries from './fetchCountries';
//import Notiflix from 'notiflix';//

const debounce = require('lodash.debounce');
const DEBOUNCE_DELAY = 300;


const input = document.querySelector("#search-box");
const refs = {
    list: document.querySelector('.country-list'),
    block: document.querySelector('.country-info'),
};

const country = input.value.trim();
input.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));
// input.addEventListener('input', onSearch(country));
// input.addEventListener('input', onSearch);

function onSearch() {
    
    const country = input.value.trim();
    if (country !== "") {
        // debounce(fetchCountries(`${country}`), DEBOUNCE_DELAY);
        fetchCountries(`${country}`);
         refs.list.innerHTML = ' ';
        refs.block.innerHTML = ' ';
        markupCountry(`${country}`);
       
    };
};

function markupCountry(country) {
    fetchCountries(country).then(data => {
        if (data.length >= 10) {
            console.log("more then 10")
            Notiflix.Notify.info("Too many matches found. Please enter a more specific name.");
            return;
        };
        if (data.length >= 2 && data.length <= 10) {
            data.map(country => {
                refs.list.insertAdjacentHTML('beforeend', `<li class="country-list__item"><img class = "flag" src ="${country.flags.svg}"><span class="country-list__name">${country.name.official}</span></li>`);
            });
            return
        };
        if (data.length === 1) {
            refs.list.innerHTML = ' ';
            const language =Object.values(data[0].languages);
            refs.block.insertAdjacentHTML('beforeend', `
            <img src="${data[0].flags.svg}" class ="bigflag">
            <h2 class = "country-info__name">${data[0].name.official}</h2>
            <ul class="country">
            <li class="country__item"><b>Capital:</b>&nbsp ${data[0].capital}</span></li>
            <li class="country__item"><b>Population:</b> &nbsp ${data[0].population}</span></li>
            <li class="country__item"><b>Languages:</b> &nbsp ${language}</span></li>
            </ul>`);
            return
        }
        else {
            Notiflix.Notify.failure("Oops, there is no country with that name");
        }

    });
};
