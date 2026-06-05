const API_URL = "http://localhost:3000/properties";

const adminProperties =
document.getElementById("adminProperties");

async function loadProperties() {

    try {

        const response =
        await fetch(API_URL);

        const properties =
        await response.json();

        adminProperties.innerHTML = "";

        properties.forEach(property => {

            adminProperties.innerHTML += `
            <div class="property-card">

                <img src="${property.image}" alt="${property.title}">

                <div class="property-content">

                    <h3>${property.title}</h3>

                    <p>${property.city}</p>

                    <p>Rs ${property.price}</p>

                    <p>ID: ${property.id}</p>

                    <button onclick="editProperty('${property.id}')">
                        Edit
                    </button>

                    <button onclick="deleteProperty('${property.id}')">
                        Delete
                    </button>

                </div>

            </div>
            `;

        });

    } catch(error) {

        console.error(error);

    }

}

async function deleteProperty(id) {

    const confirmDelete =
    confirm("Delete this property?");

    if(!confirmDelete){
        return;
    }

    try {

        await fetch(
            API_URL + "/" + id,
            {
                method: "DELETE"
            }
        );

        await loadProperties();

    } catch(error) {

        console.error(error);

    }

}

async function editProperty(id){

    const newTitle =
    prompt("Enter New Title");

    const newPrice =
    prompt("Enter New Price");

    const newCity =
    prompt("Enter New City");

    if(
        !newTitle ||
        !newPrice ||
        !newCity
    ){
        return;
    }

    await fetch(
        API_URL + "/" + id,
        {
            method:"PATCH",

            headers:{
                "Content-Type":
                "application/json"
            },

            body:JSON.stringify({

                title:newTitle,

                price:newPrice,

                city:newCity

            })
        }
    );

    loadProperties();

}

loadProperties();