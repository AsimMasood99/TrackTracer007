import username from "./home.js";
let backGround = document.querySelector(".backGround");
let title = document.querySelector(".title");
let artist = document.querySelector(".artist");
//let usr = document.querySelector(".account")

fetch("/api/song").then((res) => {
	res.json().then((song) => {
		title.textContent = "Title: " + song[0].title;
		artist.textContent = "Artist: " + song[1].artistName;
		backGround.style.backgroundImage = `url(${song[0].coverPic})`;
	});
});