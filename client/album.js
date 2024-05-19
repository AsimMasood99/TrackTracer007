fetch("/api/album").then((res) => {
    res.json().then((albums) => {
      name.innerHTML = albums.title;
      loader.classList.add("remove");
      mainBody.classList.remove("mainDataBefore");
      mainBody.classList.add("mainDataAfter");
    });
  });
  
  let name = document.querySelector(".name");
  let loader = document.querySelector(".loading");
  let mainBody = document.querySelector(".mainDataBefore");