const urlParams = new URLSearchParams(window.location.search);
const imdbId = urlParams.get("imdbId");

async function getMovie() {
    try{
        const response = await fetch(`http://localhost:8080/movies/${imdbId}`);
        if(!response){
            throw new Error (`Error fetching movies: ${response.statusText}`);
        }

        const movieData = await response.json();
        
        const img = document.querySelector(".review-poster");
        img.src = movieData.poster;

        const element = document.querySelector(".reviews");

        element.style.backgroundImage = `url('${movieData.backdrops[1]}')`;
        element.style.backgroundSize = "cover";
        element.style.backgroundRepeat = "no-repeat";
        element.style.backgroundPosition = "center";
        element.style.width = "100vw";
        element.style.height = "100vh";
        element.style.margin = "0";
        element.style.padding = "0";
        element.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
        element.style.backgroundBlendMode = "darken";


        const reviewsContainer = document.querySelector("#reviewsContainer");
        const reviews = movieData.reviewIds;

        reviews.forEach(review => {
            const li = document.createElement("li");
            li.textContent = review.body;
            reviewsContainer.appendChild(li);
        });




    } catch(error){
        console.error("Error fetching movies: ", error);
    }
}

getMovie();

document.querySelector(".review-form button").addEventListener("click", async() => {
    const reviewBody = document.querySelector("#reviewBody").value;

    if(!reviewBody.trim()){
        alert('Review cannot be empty!');
        return;
    }

    try{
        const response = await fetch("http://localhost:8080/reviews", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                body: reviewBody,
                imdbId: imdbId,
            }),
        });

        if(response.ok){
            const review = await response.json();
            const reviewsContainer = document.querySelector("#reviewsContainer");
            const newReview = document.createElement("li");
            newReview.textContent = review.body;
            reviewsContainer.appendChild(newReview);

            document.getElementById('reviewBody').value = '';

            alert('Review submitted successfully!');
        } 
        else{
             alert('Failed to submit review:')
        }

    } catch(error){
        console.error("Error fetching movies: ", error);
    }
});



