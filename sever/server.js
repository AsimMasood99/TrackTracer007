const express = require("express");
const mongoose = require("mongoose");
const axios = require("axios");
const path = require("path");
const artist = require("./models/artist");
const album = require("./models/album");
const song = require("./models/song");
const user = require("./models/user");
const app = express();
app.use(express.static(path.join(__dirname, "..", "client")));

app.use(express.urlencoded({ extended: true }));
const connectString =
	"mongodb+srv://tracktracer9971:gravitySwallowsLight@tracktracer.qvyluxx.mongodb.net/?retryWrites=true&w=majority&appName=TrackTracer";

const client_id = "953a81833a4a4ca7a943b8fa0438531c";
const client_secret = "ac2c3847cebb4e529d4e4936175626c6";
let accessToken = null;
let logged_in = false;
const artist_list = [
	"Ben Howard",
	"Linkin Park",
	"Tamino",
	"Radiohead",
	"Arctic Monkeys",
	"Ed Sheeran",
	"Coldplay",
	"Linda Ronstadt",
	"Daughter",
	"Michael Jackson",
	"The Beatles",
	"Tom Odell",
	"The Weeknd",
	"Dr Dre",
	"Eminem",
	"xxxtentacion",
	"bee gees",
	"Post Malone",
	"Ice Cube",
	"Snoop Dogg",
];

mongoose
	.connect(connectString)
	.then((req, res) => {
		console.log("Connected");
		app.listen(3000);
	})
	.catch((err) => {
		console.log(err);
	});

const getAccessToken = async () => {
	try {
		const response = await axios.post(
			"https://accounts.spotify.com/api/token",
			null,
			{
				params: {
					grant_type: "client_credentials",
				},
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
					Authorization:
						"Basic " +
						Buffer.from(client_id + ":" + client_secret).toString(
							"base64"
						),
				},
			}
		);
		accessToken = response.data.access_token;
		console.log("Access Token:", accessToken);
	} catch (error) {
		console.error("Failed to get access token:", error.response.data);
		accessToken = null;
	}
};

// app.get("/loadData", async (req, res) => {
// 	//let album_name = [];
// 	try {
// 		if (!accessToken) {
// 			await getAccessToken();
// 			if (!accessToken) {
// 				res.status(500).json({ error: "Failed to get access token" });
// 				return;
// 			}
// 		}
// 		for (let i = 0; i < artist_list.length; i++) {
// 			const response1 = await axios.get(
// 				"https://api.spotify.com/v1/search",
// 				{
// 					params: {
// 						q: artist_list[i],
// 						type: "artist",
// 					},
// 					headers: {
// 						Authorization: "Bearer " + accessToken,
// 					},
// 				}
// 			);

// 			let artist_data = response1.data.artists.items[0];
// 			let artist_ = new artist({
// 				artistName: artist_data.name,
// 				genre: artist_data.genres,
// 				profile_pic: artist_data.images[1].url,
// 				albums: [],
// 			});
// 			const response2 = await axios.get(
// 				"https://api.spotify.com/v1/artists/" +
// 					artist_data.id +
// 					"/albums",
// 				{
// 					headers: {
// 						Authorization: "Bearer " + accessToken,
// 					},
// 				}
// 			);
// 			let album_data = response2.data.items;
// 			for (let j = 0; j < album_data.length; j++) {
// 				let album_ = new album({
// 					title: album_data[j].name,
// 					release_date: album_data[j].release_date,
// 					no_of_songs: album_data[j].total_tracks,
// 					image: album_data[j].images[0].url,
// 					songs: [],
// 				});

// 				const response3 = await axios.get(
// 					"https://api.spotify.com/v1/albums/" +
// 						album_data[j].id +
// 						"/tracks",
// 					{
// 						headers: {
// 							Authorization: "Bearer " + accessToken,
// 						},
// 					}
// 				);
// 				let song_data = response3.data.items;

// 				for (let k = 0; k < song_data.length; k++) {
// 					let song_ = new song({
// 						title: song_data[k].name,
// 						artist: artist_,
// 						coverPic: album_data[j].images[0].url
// 					});
// 					song_.save();
// 					album_.songs.push(song_);
// 				}
// 				album_.save();
// 				artist_.albums.push(album_);
// 			}
// 			artist_.save();
// 		}
// 		res.send("Success");
// 	} catch (error) {
// 		console.log(error);
// 	}
// });

app.get("/", async (req, res) => {
	if (!logged_in) {
		res.redirect("/login");
	} else {
		res.sendFile(path.join(__dirname, "..", "client", "home.html"));
	}
});

app.get("/search", async (req, res) => {
	res.sendFile(path.join(__dirname, "..", "client", "search.html"));
});

let artist_res, album_res, song_res;
app.post("/api/search", async (req, res) => {
	console.log(req.body);
	let to_search = req.body.query;
	const find_artist = artist.findOne({ artistName: to_search });
	const find_album = album.findOne({ title: to_search });
	const find_song = song.findOne({ title: to_search });

	Promise.all([find_artist, find_album, find_song]).then(
		([res1, res2, res3]) => {
			artist_res = res1;
			album_res = res2;
			song_res = res3;

			if (artist_res) {
				res.redirect("/artist");
			} else if (album_res) res.redirect("/album");
			else res.redirect("/song");
		}
	);
});

app.get("/api/artist", async (req, res) => {
	try {
		const artistRes = await artist
			.findById(artist_res._id)
			.populate("albums");
		const songsResult = await album
			.findById(artistRes.albums[0])
			.populate("songs");

		if (!artistRes) {
			return res.status(404).json({ error: "Artist not found" });
		}

		res.json([artistRes, songsResult]);
	} catch (err) {
		console.error("Error fetching artist data:", err);
		res.status(500).send("Internal Server Error");
	}
})

app.get("/api/album", async (req, res) => {
	try {
	
		const albumRes = await album.findById(album_res._id).populate("songs");

		if (!albumRes) {
			console.log("Album not found");
			return;
		}
		res.json(albumRes);
	} catch (error) {
		console.error("Error:", error.message);
	}
});

app.get("/album", (req, res) => {
	res.sendFile(path.join(__dirname, "..", "client", "album.html"));
});

app.get("/signup", async (req, res) => {
	res.sendFile(path.join(__dirname, "..", "client", "signup.html"));
});

app.get("/artist", async (req, res) => {
	res.sendFile(path.join(__dirname, "..", "client", "artist.html"));
});

// app.post("/", async (req, res) => {
// 	console.log(req.body);
// 	let newUser = new user({
// 		displayName: req.body.displayname,
// 		userName: req.body.username,
// 		password: req.body.password
// 	});
// 	newUser.save()
// 		.then((result)=> {
// 			logged_in = true;
// 			res.redirect('/');
// 		});
// });
// app.post("/", async (req, res) => {
// 	console.log(req.body);
// 	let newUser = new user({
// 		displayName: req.body.displayname,
// 		userName: req.body.username,
// 		password: req.body.password
// 	});
// 	newUser.save()
// 		.then((result)=> {
// 			logged_in = true;
// 			res.redirect('/');
// 		});
// });

app.get("/login", async (req, res) => {
	res.sendFile(path.join(__dirname, "..", "client", "login.html"));
});
let verification_res = null;

app.post("/login", async (req, res) => {
	user.findOne({ userName: req.body.username }).then((result) => {
		verification_res = result;
		//console.log(verification_res);
		if (!verification_res) {
			//console.log("user not found");
			verification_res = "error";
			res.redirect('/login')
		} else if (verification_res.password == req.body.password) {

			//console.log("successfull");
			logged_in = true;
			res.redirect('/');
		} else {
			res.redirect('/login');
			verification_res = "error";
			//console.log("incorrect UserNmae or password");
		}
	});
});

app.get("/api/login", async(req,res)=>{
	res.json(verification_res);
})