const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");
const resultsDiv = document.getElementById("results");

async function fetchBooks(query) {
  const url = `https://www.googleapis.com/books/v1/volumes?q=${query}`;
  const res = await fetch(url);
  const data = await res.json();
  return data.items || [];
}

function displayBooks(books) {
  resultsDiv.innerHTML = "";
  
  if (books.length === 0) {
    resultsDiv.innerHTML = `<p>No results found. Try another search.</p>`;
    return;
  }

  books.forEach(book => {
    const info = book.volumeInfo;

    const title = info.title || "No Title";
    const authors = info.authors ? info.authors.join(", ") : "Unknown Author";
    const published = info.publishedDate || "N/A";
    const thumbnail = info.imageLinks ? info.imageLinks.thumbnail : "https://via.placeholder.com/200x300?text=No+Cover";
    const preview = info.previewLink || "#";

    const bookCard = document.createElement("div");
    bookCard.classList.add("book-card");

    bookCard.innerHTML = `
      <img src="${thumbnail}" alt="${title}">
      <h3>${title}</h3>
      <p><strong>Author:</strong> ${authors}</p>
      <p><strong>Published:</strong> ${published}</p>
      <a href="${preview}" target="_blank">🔗 Preview</a>
    `;

    resultsDiv.appendChild(bookCard);
  });
}

searchBtn.addEventListener("click", async () => {
  const query = searchInput.value.trim();
  if (query) {
    const books = await fetchBooks(query);
    displayBooks(books);
  }
});

searchInput.addEventListener("keypress", async (e) => {
  if (e.key === "Enter") {
    const query = searchInput.value.trim();
    if (query) {
      const books = await fetchBooks(query);
      displayBooks(books);
    }
  }
});
