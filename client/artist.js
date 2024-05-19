fetch("/api/artist").then((res) => {
    res.json().then((artist) => {
      name.innerHTML = artist[0].artistName;
      artist[1].songs.forEach((song, idx) => {
        songs.innerHTML += `<li>${song.title}</li>`;
      });
      // console.log(artist[1]);
      loader.classList.add("remove");
      mainBody.classList.remove("mainDataBefore");
      mainBody.classList.add("mainDataAfter");
    });
  });
  
  let name = document.querySelector(".name");
  let loader = document.querySelector(".loading");
  let mainBody = document.querySelector(".mainDataBefore");
  let songs = document.querySelector(".songs");
  let;