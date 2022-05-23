import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import debounce from 'lodash.debounce';
import { fetchCountries } from './fetchCountries';
import countryInfo from './templates/countryInfo.hbs';
import countryList from './templates//countryList.hbs';

const DEBOUNCE_DELAY = 300;
const refs = {
  onInput: document.querySelector('#search-box'),
  countryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
}


refs.onInput.addEventListener('input', debounce(onInput,DEBOUNCE_DELAY));

function onInput(evt) {
  const currentCountry = evt.target.value.trim();

  if (currentCountry.length === 0) { 
    return;
   }
  fetchCountries(currentCountry)
    .then(appendContriesArray) 
    .catch(() => {
        refs.countryList.innerHTML = '';
        Notify.failure("Oops, there is no country with that name")
  } )
}

function appendContriesArray(contriesArray) {
console.log(contriesArray)
  if (contriesArray.length > 10) {
    refs.countryList.innerHTML = '';
    refs.countryInfo.innerHTML = '';
    return Notify.info('Too many matches found. Please enter a more specific name.');
}
  if (contriesArray.length === 1) {
    refs.countryList.innerHTML = '';
    refs.countryInfo.innerHTML = '';
    refs.countryInfo.insertAdjacentHTML('beforeend', countryInfo(contriesArray[0]));
    
  } if (contriesArray.length >= 2 && contriesArray.length <= 10) {
    refs.countryInfo.innerHTML = '';
    refs.countryList.insertAdjacentHTML('beforeend', countryList(contriesArray)); 
  }
    
}
