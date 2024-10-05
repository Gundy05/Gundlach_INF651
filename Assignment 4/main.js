// Array to store the list of movies
let movieList = [];

// Function to add a movie to the list
function addMovie() {
  const movieInput = document.getElementById('movie-name');
  const movieTitle = movieInput.value.trim();

  if (movieTitle) {
    movieList.push(movieTitle);
    movieInput.value = '';
    displayMovies();
  }
}

// Function to display the list of movies
function displayMovies() {
  const movieListElement = document.getElementById('movie-list');
  movieListElement.innerHTML = '';

  movieList.forEach((movie, index) => {
    const movieItem = document.createElement('li');
    movieItem.className = 'collection-item';
    movieItem.innerHTML = `
      <span class="movie-title">${movie}</span>
      <button class="remove-btn" onclick="removeMovie(${index})">Watched</button>
    `;
    movieListElement.appendChild(movieItem);
  });
}

// Function to remove a movie from the list
function removeMovie(index) {
  movieList.splice(index, 1);
  displayMovies();
}

// Event listener for the "Add Movie" button
document.getElementById('add-movie-btn').addEventListener('click', addMovie);
