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