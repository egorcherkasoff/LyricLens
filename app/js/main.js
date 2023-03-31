const accessToken =
  "KreH1RX5fp1BsZWXxAyql8oAMPbGGvQ9srTmAcp2qXcW6sHVjLjEhShUq1QK0nlz";

const api_url = "https://api.genius.com/";

const searchForm = document.querySelector(".header__search-form");

const searchInput = document.querySelector(".header__search-input");

const searchResults = document.querySelector(".results__wrap");

const searchCard = document.querySelector(".results");

const placeholder = document.querySelector(".main__placeholder");

const container = document.querySelector(".main__container");

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (searchInput.value && searchInput.value.trim() !== "") {
    const url = `${api_url}search?q=${searchInput.value}`;
    searchInput.value = "";
    placeholder.classList.add("hidden");
    container.classList.remove("main__container-no-data");
    getSongs(url);
  } else {
    placeholder.classList.remove("hidden");
    container.classList.add("main__container-no-data");
    searchCard.classList.add("hidden");
    while (searchResults.firstChild) {
      searchResults.removeChild(searchResults.firstChild);
    }
  }
});

async function getSongs(url) {
  while (searchResults.firstChild) {
    searchResults.removeChild(searchResults.firstChild);
  }
  const response = await fetch(`${url}&access_token=${accessToken}`);
  const data = await response.json();
  const songs = Array.from(data.response.hits);
  searchCard.classList.remove("hidden");
  songs.forEach((song) => {
    const songElement = document.createElement("article");
    songElement.classList.add("song");

    songElement.innerHTML = `<div class="song__img-wrap">
                <img
                  class="song__img"
                  src="${song.result.header_image_url}"
                  alt="${song.result.title}'s cover"
                />
              </div>
              <div class="song__info-wrap">
                <h3 class="song__title">${song.result.title}</h3>
                <p class="song__artist">${song.result.artist_names}</p>
              </div>
              <div class="link__wrap song__link">
                <a class="link" href="${song.result.url}" data-song-id=${song.result.id} target="_blank">View on Genius</a>
              </div>`;
    searchResults.appendChild(songElement);
  });
}
