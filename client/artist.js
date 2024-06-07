let reqAlbum;
let postData = {
  album: {},
  songName: "",
};

fetch("/api/artist").then((res) => {
  res.json().then((artist) => {
    name.innerHTML = artist[0].artistName;
    artist[0].albums.forEach((album, idx) => {
      albums.innerHTML += <li>${album.title}</li>;
    });
    reqAlbum = artist[0];
    postData.album = reqAlbum.albums[0];
    artist[1].songs.forEach((song, idx) => {
      songs.innerHTML += <li>${song.title}</li>;
    });
    profilePic.setAttribute("src", artist[0].profile_pic);
    loader.classList.add("remove");
    mainBody.classList.remove("mainDataBefore");
    mainBody.classList.add("mainDataAfter");
  });
});

let name = document.querySelector(".name");
let loader = document.querySelector(".loading");
let mainBody = document.querySelector(".mainDataBefore");
let songs = document.querySelector(".songs");
let albums = document.querySelector(".albumNames");
let profilePic = document.querySelector(".profilePicture");

albums.addEventListener("click", (e) => {
  reqAlbum.albums.forEach((album, idx) => {
    if (album.title === e.target.textContent) {
      postData.album = album;
      console.log(postData);
    }
  });

  fetch("/api/artist", {
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
      return response.json();
    })
    .then((data) => {
      songs.innerHTML = "";
      data.songs.forEach((song) => {
        songs.innerHTML += <li>${song.title}</li>;
      });
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
});

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