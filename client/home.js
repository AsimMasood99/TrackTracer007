<<<<<<< HEAD
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
let userName = null;
let result = null;
try {
  let res = await fetch("/api/username");
  result = await res.json();
} catch (err) {
  console.log(err);
  userName = user_name;
}

userName = result.usr;
let accountInfo = document.querySelector(".account");
accountInfo.innerHTML = userName;

console.log(userName);

export { userName };
=======
let username = null; 
let result = null; 
try {
    let res = await fetch("/api/username");
    result = await res.json();
}   
catch(err) {
    console.log(err);
}

username = result.usr;
let accountInfo = document.querySelector(".account")
accountInfo.innerHTML = username;

console.log(username);
export default username;
>>>>>>> 376593f856782ac33ebd724b63ea01a37d8a4d59