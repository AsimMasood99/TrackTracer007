import username from './home.js'
fetch("/api/album").then((res) => {
  res.json().then((albums) => {
    name.innerHTML = albums.title;
    profilePic.setAttribute("src", albums.image);
    albums.songs.forEach((song) => {
      songs.innerHTML += `<li>${song.title}</li>`;
    });
    loader.classList.add("remove");
    mainBody.classList.remove("mainDataBefore");
    mainBody.classList.add("mainDataAfter");
  });
});

let name = document.querySelector(".name");
let loader = document.querySelector(".loading");
let mainBody = document.querySelector(".mainDataBefore");
let profilePic = document.querySelector(".profilePicture");
let songs = document.querySelector(".tracks");

console.log(songs);

let postData = {
  songName: "",
};
songs.addEventListener("click", (e) => {
  postData.songName = e.target.textContent;
  console.log(postData);
  fetch("/api/songs", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(postData),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      // Check if the response indicates a redirect
      if (response.redirected) {
        // If redirected, change the location of the window to the redirect URL
        window.location.href = response.url;
      } else {
        // Otherwise, log the response data or handle it as needed
        return response.json();
      }
    })
    .then((data) => {
      // Handle the response data if needed
      console.log(data);
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
});