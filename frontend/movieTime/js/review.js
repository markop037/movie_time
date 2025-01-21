const urlParams = new URLSearchParams(window.location.search);
const imdbId = urlParams.get("imdbId");

getMovie(imdbId);

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