import fetchImages from './js/apiService';
import imageMarkup from './templates/imagemarkup.hbs';
import styles from './css/styles.css';

const refs = {
    input: document.querySelector('#search-form'),
    gallery: document.querySelector('.gallery'),
    loadMoreBtn: document.querySelector('[data-action="load-more"]'),
    searchBtn: document.querySelector('.search-btn')
}

refs.input.addEventListener('submit', onInput);
refs.loadMoreBtn.addEventListener('click', onClickLoadMore);

let pageNumber = 1;
let searchQuery = '';

function onInput(evt) {
    evt.preventDefault();
    searchQuery = evt.currentTarget.elements.query.value.trim()
    if (searchQuery === '') {
        return
    }
    refs.searchBtn.disabled = true;
    refs.gallery.innerHTML = '';
    fetchImages(searchQuery)
        .then((data) => {
            renderMarkup(data)
            refs.searchBtn.disabled = false
            refs.loadMoreBtn.classList.remove('is-hidden');
        })
}

function renderMarkup({ hits }) {
    refs.gallery.insertAdjacentHTML('beforeend', imageMarkup(hits))
}

function onClickLoadMore() {
    incrementPage();
    fetchImages(searchQuery, pageNumber)
        .then((images) =>  {
            renderMarkup(images)
            smoothScrolling()
        })
}

function smoothScrolling() {
    refs.loadMoreBtn.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
    })
}

function incrementPage() {
    pageNumber += 1;
}