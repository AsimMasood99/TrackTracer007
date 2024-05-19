fetch("/api/artist").then((res) => {
    res.json().then((artist) => {
      name.innerHTML = artist[0].artistName;
      artist[0].albums.forEach((album, idx) => {
        albums.innerHTML += `<li>${album.title}</li>`;
      });
      artist[1].songs.forEach((song, idx) => {
        songs.innerHTML += `<li>${song.title}</li>`;
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