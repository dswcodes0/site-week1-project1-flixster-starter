const apiKey = 'db0496b5809d92722f712c5ae211c9bf';
const baseUrl = 'https://api.themoviedb.org/3/';
let pageNumber = 1;

async function fetchMovies() {
  const movies = await fetch(
    `${baseUrl}movie/now_playing?language=en-US&page=${pageNumber}&api_key=${apiKey}`
  );
  const jsonData = await movies.json();
  return jsonData;
}

async function displayMovies() {
  const data = await fetchMovies();
  const movieList = document.getElementById('movies-grid');

  data.results.forEach(result => {
    const { original_title: title, poster_path: filePath, vote_average: votes } = result;
    const posterImage = `https://image.tmdb.org/t/p/w342/${filePath}`;

    const movieContainer = document.createElement('div');
    movieContainer.classList.add('movie-card');

    const movieImg = document.createElement('img');
    movieImg.classList.add('movie-poster');
    movieImg.src = posterImage;
    movieContainer.appendChild(movieImg);

    const movieTitle = document.createElement('h1');
    movieTitle.classList.add('movie-title');
    movieTitle.innerHTML = title;
    movieContainer.appendChild(movieTitle);

    const movieRating = document.createElement('h2');
    movieRating.classList.add('movie-votes');
    movieRating.innerHTML = `Rating: ${votes}`;
    movieContainer.appendChild(movieRating);

    movieList.appendChild(movieContainer);
  });
}

const loadMoreButton = document.getElementById('load-more-movies-btn');
loadMoreButton.addEventListener('click', loadMore);

async function loadMore() {
  pageNumber += 1;
  await displayMovies();
}

const searchForm = document.getElementById('searchForm');
searchForm.addEventListener('submit', fetchSearchedMovie);

async function fetchSearchedMovie(event) {
  event.preventDefault();
  const searchTerm = document.getElementById('search-input').value;
  const movies = await fetch(
    `${baseUrl}search/movie?query=${searchTerm}&include_adult=false&language=en-US&page=${pageNumber}&api_key=${apiKey}`
  );
  const jsonData = await movies.json();
  displaySearchedMovies(jsonData);
}

function displaySearchedMovies(data) {
  const movieList = document.getElementById('movies-grid');
  movieList.innerHTML = '';

  data.results.forEach(result => {
    const { original_title: title, poster_path: filePath, vote_average: votes } = result;
    const posterImage = `https://image.tmdb.org/t/p/w342/${filePath}`;

    const movieContainer = document.createElement('div');
    movieContainer.classList.add('movie-card');

    const movieImg = document.createElement('img');
    movieImg.classList.add('movie-poster');
    movieImg.src = posterImage;
    movieContainer.appendChild(movieImg);

    const movieTitle = document.createElement('h1');
    movieTitle.classList.add('movie-title');
    movieTitle.innerHTML = title;
    movieContainer.appendChild(movieTitle);

    const movieRating = document.createElement('h2');
    movieRating.classList.add('movie-votes');
    movieRating.innerHTML = `Rating: ${votes}`;
    movieContainer.appendChild(movieRating);

    movieList.appendChild(movieContainer);
  });
}

const clearSearchButton = document.getElementById('clearSearchButton');
clearSearchButton.addEventListener('click', clearSearch);

function clearSearch() {
  document.getElementById('search-input').value = '';
}

displayMovies();
