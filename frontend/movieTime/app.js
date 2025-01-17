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
            button.setAttribute("data-bs-target", "carouselExampleIndicators");
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

            const posterImg = document.createElement("img");
            posterImg.src = movie.poster;
            posterImg.alt = `${movie.title} Poster`;
            posterImg.classList.add("movie-poster");

            const textContainer = document.createElement("div");
            textContainer.classList.add("text-start", "text-center");
            
            const title = document.createElement("h4");
            title.textContent = movie.title;
            title.classList.add("carousel-title", "mt-3");

            const trailerButton = document.createElement("button");
            trailerButton.classList.add("btn", "bg-warning", "mt-3");
            trailerButton.textContent = "Watch Trailer";
            trailerButton.addEventListener("click", () => {
                window.open(movie.trailerLink, "_blank")
            });

            const reviewButton = document.createElement("button");
            reviewButton.classList.add("btn", "btn-secondary", "mt-3", "ms-2");
            reviewButton.textContent = "Reviews";
            reviewButton.addEventListener("click", () => {
                window.location.href = `review.html?imdbId=${movie.imdbId}`
            });


            textContainer.appendChild(title);
            textContainer.appendChild(trailerButton);
            textContainer.appendChild(reviewButton);

            contentContainer.appendChild(posterImg);
            contentContainer.appendChild(textContainer);

            carouselItem.appendChild(img);
            carouselItem.appendChild(contentContainer);
            carouselInner.appendChild(carouselItem);
        });
    }
}

movies();