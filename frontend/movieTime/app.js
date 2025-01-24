async function getMovies(){
    try{
        const response = await fetch("http://localhost:8080/movies");

        if(!response.ok){
            throw new Error(`Error fetching movies: ${response.statusText}`);
        }

        const moviesData = await response.json();

        const movies = moviesData.map(movie =>
            new Movie(
                movie.imdbId,
                movie.title,
                movie.releaseDate,
                movie.trailerLink,
                movie.poster,
                movie.genres,
                movie.backdrops
            )
        );

        return movies;
    } catch(error){
        console.error("Error fetching movies: ", error);
    }
}

async function movies(){
    const movies = await getMovies();

    if(movies){
        const carouselIndicators = document.querySelector(".carousel-indicators");
        const carouselInner = document.querySelector(".carousel-inner");

        carouselIndicators.innerHTML = "";
        carouselInner.innerHTML = "";

        movies.forEach((movie, index) => {
            const button = document.createElement("button");
            button.type = "button";
            button.setAttribute("data-bs-target", "#carouselExampleIndicators");
            button.setAttribute("data-bs-slide-to", index);
            button.setAttribute("aria-label", `Slide ${index + 1}`);
            if(index === 0){
                button.classList.add("active");
                button.setAttribute("aria-current", "true");
            }
            carouselIndicators.appendChild(button);

            const carouselItem = document.createElement("div");
            carouselItem.classList.add("carousel-item");
            if(index === 0){
                carouselItem.classList.add("active");
            }

            const img = document.createElement("img");
            img.src = movie.backdrops[0];
            img.classList.add("d-block", "w-100");
            img.alt = movie.title;

            const contentContainer = document.createElement("div");
            contentContainer.classList.add("carousel-caption", "d-flex", "align-items-center", "justify-content-center", "h-100");

            const container = document.createElement("div");
            container.classList.add("container");
            
            const row = document.createElement("div");
            row.classList.add("row", "w-100");

            const posterCol = document.createElement("div");
            posterCol.classList.add("col-md-6");

            const posterImg = document.createElement("img");
            posterImg.src = movie.poster;
            posterImg.alt = `${movie.title} Poster`;
            posterImg.classList.add("movie-poster");

            const textCol = document.createElement("div");
            textCol.classList.add("col-md-6");

            const textContainer = document.createElement("div");
            textContainer.classList.add("text-center", "d-flex", "flex-column", "align-items-center", "justify-content-center", "h-100");

            const title = document.createElement("h4");
            title.textContent = movie.title;
            title.classList.add("carousel-title", "mt-3");

            const buttonsContainer = document.createElement("div");
            buttonsContainer.classList.add("d-flex", "justify-content-center", "mt-3");

            const trailerButton = document.createElement("button");
            trailerButton.classList.add("btn", "bg-warning", "me-2");
            trailerButton.textContent = "Watch Trailer";
            trailerButton.addEventListener("click", () => {
                window.open(movie.trailerLink, "_blank");
            });

            const reviewButton = document.createElement("button");
            reviewButton.classList.add("btn", "btn-secondary");
            reviewButton.textContent = "Reviews";
            reviewButton.addEventListener("click", () => {
                window.location.href = `review.html?imdbId=${movie.imdbId}`;
            });

            buttonsContainer.appendChild(trailerButton);
            buttonsContainer.appendChild(reviewButton);

            textContainer.appendChild(title);
            textContainer.appendChild(buttonsContainer);

            textCol.appendChild(textContainer);
            posterCol.appendChild(posterImg);

            row.appendChild(posterCol);
            row.appendChild(textCol);
            container.appendChild(row);
            contentContainer.appendChild(container);

            carouselItem.appendChild(img);
            carouselItem.appendChild(contentContainer);
            carouselInner.appendChild(carouselItem);
        });
    }
}

movies();

