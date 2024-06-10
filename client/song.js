let username = null;
let result = null;
try {
  let res = await fetch("/api/username");
  result = await res.json();
} catch (err) {
  console.log(err);
}

username = result.usr;
let accountInfo = document.querySelector(".account");
accountInfo.innerHTML = username;

let backGround = document.querySelector(".backGround");
let title = document.querySelector(".title");
let artist = document.querySelector(".artist");
let likeBtn = document.querySelector(".like");

fetch("/api/song").then((res) => {
  res.json().then((song) => {
    title.textContent = "Title: " + song[0].title;
    artist.textContent = "Artist: " + song[1].artistName;
    backGround.style.backgroundImage = `url(${song[0].coverPic})`;
  });
});

likeBtn.addEventListener("click", () => {
  fetch("/api/likedSong", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      if (!res) {
        throw new Error("Network response was not ok!");
      } else return res.json();
    })
    .then((data) => {
      console.log(data);
    });
});