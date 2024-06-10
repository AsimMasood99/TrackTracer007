// function call() {
//   return fetch("/api/username").then((res) => {
//     res.json().then((result) => {
//       accountInfo.textContent = result.usr;
//       console.log(result.usr);
//       return result;
//     });
//   });
// }
// let userName = call().then((res) => {});
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
let artistsList = document.querySelector(".artistList");
let songList = document.querySelector(".songList");
let newPlayBtn = document.querySelector(".newPlay");
let mainContent = document.querySelector(".mainContent");
let playlistForm = document.querySelector(".form");
let playlist = document.querySelector(".playlistData");
let checkbox = document.querySelector(".checkbox");
let userDiv = document.querySelector(".username");
let friendBtn = document.querySelector(".friend");

// let viewBtn = document.querySelector(".viewFriends");
let usrDta = null;
try {
  let res = await fetch("/api/getFollowing");
  usrDta = await res.json();
  console.log(usrDta);
  usrDta.following.forEach((artist) => {
    artistsList.innerHTML += `<li>${artist.artistName}</li>`;
  });
} catch (err) {
  console.log(err);
}
let songData = null;
try {
  let res = await fetch("/api/getLiked");
  songData = await res.json();
  songData.likedSongs.forEach((song) => {
    songList.innerHTML += `<li>${song.title}</li>`;
  });
} catch (err) {
  console.log(err);
}
export default username;

newPlayBtn.addEventListener("click", () => {
  playlistForm.classList.remove("hidden");
  mainContent.style.filter = "blur(5px)";
  checkbox.addEventListener("click", () => {
    userDiv.classList.toggle("hidden");
  });
});

try {
  let res = await fetch("/api/getPlaylist");
  let playList = await res.json();

  playList.forEach((play) => {
    playlist.innerHTML += `<li>${play.playlistName}</li>`;
  });
} catch (err) {
  console.log(err);
}

friendBtn.addEventListener("click", () => {
  window.location.href = "friends.html";
  fetch("/api/friendPage")
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
  // let friendForm = document.querySelector(".friendForm");
  // friendListDiv.classList.remove("hidden", "select");
  // friendListDiv.classList.add("friendlistWrap");
  // fetch("/api/allUsers").then((res) => {
  //   res.json().then((data) => {
  //     console.log(data);
  //     data.forEach((user) => {
  //       console.log(user);
  //       friendForm.innerHTML += `<label>${user.userName}<input type="checkbox" name="${user.userName}"></label>`;
  //     });
  //     friendForm.innerHTML += `<button class="submit">Submit</button>`;
  //     friendForm.innerHTML += `<button class = "close"> Close </button>`;

  //     let closeBtn = document.querySelector(".close");

  //     closeBtn.addEventListener("click", (e) => {
  //       console.log("clicl");
  //       e.preventDefault();
  //       friendListDiv.classList.add("hidden", "select");
  //       friendListDiv.classList.remove("friendlistWrap");
  //       friendForm.innerHTML = "";
  //     });
  //   });
  // });
});

// viewBtn.addEventListener("click", () => {
//   // Update the friendListDiv
//   friendListDiv.classList.remove("hidden", "select");
//   friendListDiv.classList.add("friendlistWrap");
//   friendListDiv.innerHTML = ""; // Clear existing content

//   let list = document.createElement("ul");
//   list.className = "friends";
//   friendListDiv.appendChild(list);

//   fetch("/api/getFriends")
//     .then((res) => res.json())
//     .then((data) => {
//       data.forEach((user) => {
//         // Create list item
//         let listItem = document.createElement("li");
//         listItem.textContent = user.userName;

//         // Create like button
//         let likeButton = document.createElement("button");
//         likeButton.id = `like${user.userName}`;
//         likeButton.className = `${user.userName}`;
//         likeButton.textContent = "Liked Songs";

//         // Create follow button
//         let followButton = document.createElement("button");
//         followButton.id = `follow${user.userName}`;
//         followButton.className = `${user.userName}`;
//         followButton.textContent = "Followings";

//         // Append buttons to list item
//         listItem.appendChild(likeButton);
//         listItem.appendChild(followButton);

//         // Append list item to list
//         list.appendChild(listItem);

//         // Add event listeners directly after creating the elements
//         likeButton.addEventListener("click", (e) => {
//   fetch("/api/getFriendLiked", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ user: e.target.className }),
//   })
//     .then((response) => {
//       if (!response.ok) {
//         throw new Error("Network response was not ok");
//       }
//       return response.json();
//     })
//     .then((data) => {
//       console.log(data);
//       // songs.innerHTML = "";
//       // data.songs.forEach((song) => {
//       //   songs.innerHTML += `<li>${song.title}</li>`;
//       //   songCount++;
//       // });
//       // console.log(songCount);
//       // if (songCount <= 12) {
//       //   songs.style.overflowY = "hidden";
//       //   songCount = 0;
//       // } else {
//       //   songs.style.overflowY = "scroll";
//       //   songCount = 0;
//       // }
//     })
//     .catch((error) => {
//       console.error(
//         "There was a problem with the fetch operation:",
//         error
//       );
//     });
//         });

//         followButton.addEventListener("click", (e) => {
//   fetch("/api/getFriendFollowing", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ user: e.target.className }),
//   })
//     .then((response) => {
//       if (!response.ok) {
//         throw new Error("Network response was not ok");
//       }

//       return response.json();
//     })
//     .then((data) => {
//       console.log(data);
//       // songs.innerHTML = "";
//       // data.songs.forEach((song) => {
//       //   songs.innerHTML += `<li>${song.title}</li>`;
//       //   songCount++;
//       // });
//       // console.log(songCount);
//       // if (songCount <= 12) {
//       //   songs.style.overflowY = "hidden";
//       //   songCount = 0;
//       // } else {
//       //   songs.style.overflowY = "scroll";
//       //   songCount = 0;
//       // }
//     })
//     .catch((error) => {
//       console.error(
//         "There was a problem with the fetch operation:",
//         error
//       );
//     });
//         });
//       });
//       // Create close button
//       let closeBTN = document.createElement("button");
//       closeBTN.classList.add("close");
//       closeBTN.textContent = "Close";

//       list.appendChild(closeBTN);

//       closeBTN.addEventListener("click", (e) => {
//         e.preventDefault();
//         friendListDiv.innerHTML = "";
//         friendListDiv.innerHTML = `<form action="/api/addFriends" method="post" class="friendForm"></form>`;
//         friendListDiv.classList.add("hidden", "select");
//         friendListDiv.classList.remove("friendlistWrap");
//       });
//     })
//     .catch((err) => {
//       console.error("Error fetching users:", err);
//     });
// });