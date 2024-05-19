fetch("/api/album").then((res) => {
  res.json().then((albums) => {
    name.innerHTML = albums.title;
    profilePic.setAttribute("src", albums.image);
    albums.songs.forEach((song) => {
      tracks.innerHTML += <li>${song.title}</li>;
    });
    loader.classList.add("remove");
    mainBody.classList.remove("mainDataBefore");
    mainBody.classList.add("mainDataAfter");
  });
});

let name = document.querySelector(".name");
let loader = document.querySelector(".loading");
let mainBody = document.querySelector(".mainDataBefore");
let tracks = document.querySelector(".tracks");
let profilePic = document.querySelector(".profilePicture");