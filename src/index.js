import fetchImages  from './js/apiService';
// import { fetchImages, incrementPage, resetPage } from './js/apiService';
import imageMarkup from './templates/imagemarkup.hbs';
import styles from './css/styles.css';
const debounce = require('lodash.debounce');

const refs = {
    input: document.querySelector('#search-form'),
    gallery: document.querySelector('.gallery'),
    loadMoreBtn: document.querySelector('button.load-more')
}

refs.input.addEventListener('input', debounce(onInput, 500));
refs.loadMoreBtn.addEventListener('click', onClickLoadMore);
// console.log(refs.input);

let pageNumber = 1;
let searchQuery = '';

function incrementPage() {
    pageNumber += 1;
}

function resetPage() {
    pageNumber = 1;
}

function onInput(evt) {
    searchQuery = evt.target.value.toLowerCase().trim();
    // console.log(normilizedInput);
    if (searchQuery !== '') {
        fetchImages(searchQuery)
            .then(renderMarkup)
    }
    refs.loadMoreBtn.classList.remove('is-hidden')
}
// console.log(refs.gallery);
function renderMarkup({ hits }) {
    // console.log(imageMarkup(hits));
    refs.gallery.insertAdjacentHTML('beforeend', imageMarkup(hits))
        // innerHTML = imageMarkup(hits)
}

function onClickLoadMore() {
    // console.log(evt.currentTarget);
    incrementPage();
    fetchImages(searchQuery, pageNumber)
        .then((images) => renderMarkup(images));
}
