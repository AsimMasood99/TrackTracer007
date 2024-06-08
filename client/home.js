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

export default username;