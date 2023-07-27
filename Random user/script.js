const apiEP = "https://randomuser.me/api/?results=20";
let userList = [];

document.getElementById("search").addEventListener("keyup",(e)=>{
const {value} = e.target;

const filteredUser = userList.filter((item)=>{
    const name = (item.name.first + "" + "item.name.last").toLowerCase()

   return name.includes(value.toLowerCase())
})
display(filteredUser)
})

const fetchUser = async (url) =>{
    try{
    const response= await fetch(url);
    const data = await response.json();
    userList = data.results;
    display(userList)
    }catch(error){
        console.log(error);
    }
};

fetchUser(apiEP);

const display = (users) =>{
 let str = "";
 users.map((usr, i)=>{
    str += ` <div class="card" style="width: 18rem;">
    <img class="card-img-top" src="${usr.picture.large}" alt="Card image cap">
    <div class="card-body">
      <h5 class="card-title">${usr.name.title} ${usr.name.first} ${usr.name.last}</h5>
      <p><i class="fa-solid fa-phone"></i> ${usr.phone}</p>
      <p><i class="fa-solid fa-envelope"></i> ${usr.email}</p>
      <p><i class="fa-solid fa-map"></i> ${usr.location.street.number} ${usr.location.street.name} ${usr.location.postcode} ${usr.location.country}</p>
    </div>
  </div>`;
 });
 
 document.getElementById("list").innerHTML = str;
 document.getElementById("count").innerHTML = users.length;

}


const handleOnGenderSelect = (e) =>{
    const g =e.value;
    console.log(g)
    const url = `${apiEP}&gender=${g}`
    fetchUser(url)

}