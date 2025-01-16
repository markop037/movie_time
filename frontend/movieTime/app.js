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
            carouselItem.appendChild(img);
            carouselInner.appendChild(carouselItem);
        });
    }
}

movies();