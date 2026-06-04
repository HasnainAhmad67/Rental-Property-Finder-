const cards =
document.querySelectorAll(".service-card");

cards.forEach(function(card){

    card.addEventListener("click", function(){

        alert("Service Opened!");

    });

});

const API_URL =
"http://localhost:3000/properties";

const propertyContainer =
document.getElementById("propertyContainer");

const loading =
document.getElementById("loading");

async function fetchProperties(){

    try{

        loading.style.display = "block";

        const response =
        await fetch(API_URL);

        if(!response.ok){
            throw new Error("Failed To Fetch");
        }

        const properties =
        await response.json();

        renderProperties(properties);

    }

    catch(error){

        propertyContainer.innerHTML =
        "<h2>Failed To Load Properties</h2>";

    }

    finally{

        loading.style.display = "none";

    }

}

function renderProperties(properties){

    propertyContainer.innerHTML = "";

    properties.forEach(property=>{

        propertyContainer.innerHTML += `

        <div class="property-card">

            <img src="${property.image}" alt="${property.title}">

            <div class="property-content">

                <h3>${property.title}</h3>

                <p><strong>City:</strong> ${property.city}</p>

                <p><strong>Type:</strong> ${property.type}</p>

                <p><strong>BHK:</strong> ${property.bhk}</p>

                <p><strong>Price:</strong> Rs ${property.price}</p>

                <p><strong>Owner:</strong> ${property.owner}</p>

            </div>

        </div>

        `;

    });

}

fetchProperties();
const propertyForm =
document.getElementById("propertyForm");

const formError =
document.getElementById("formError");

propertyForm.addEventListener(
"submit",
async function(event){

    event.preventDefault();

    const title =
    document.getElementById("title").value;

    const city =
    document.getElementById("city").value;

    const type =
    document.getElementById("type").value;

    const bhk =
    document.getElementById("bhk").value;

    const price =
    document.getElementById("price").value;

    const owner =
    document.getElementById("owner").value;

    const phone =
    document.getElementById("phone").value;

    if(
        !title ||
        !city ||
        !type ||
        !bhk ||
        !price ||
        !owner ||
        !phone
    ){

        formError.textContent =
        "All fields are required";

        return;
    }

    formError.textContent = "";

    const newProperty = {

        title,
        city,
        type,
        bhk,
        price,
        owner,
        phone,
        image:
        "https://picsum.photos/300/200?random=" +
        Math.random()

    };

    try{

        const response =
        await fetch(API_URL,{

            method:"POST",

            headers:{
                "Content-Type":
                "application/json"
            },

            body:
            JSON.stringify(newProperty)

        });

        if(!response.ok){
            throw new Error();
        }

        propertyForm.reset();

        fetchProperties();

    }

    catch(error){

        formError.textContent =
        "Failed To Save Property";

    }

});