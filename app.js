const cards = document.querySelectorAll(".service-card");

cards.forEach(function(card) {
    card.addEventListener("click", function() {
        alert("Service Opened!");
    });
});

let allProperties = [];

const API_URL = "http://localhost:3000/properties";

const propertyContainer = document.getElementById("propertyContainer");
const loading = document.getElementById("loading");

async function fetchProperties() {
    try {
        loading.style.display = "block";

        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error("Failed To Fetch");
        }

        const properties = await response.json();

        allProperties = properties;

        renderProperties(properties);

    } catch (error) {

        propertyContainer.innerHTML =
            "<h2>Failed To Load Properties</h2>";

        console.error(error);

    } finally {

        loading.style.display = "none";

    }
}

function renderProperties(properties) {

    propertyContainer.innerHTML = "";

    properties.forEach(function(property) {

        propertyContainer.innerHTML += `

        <div class="property-card">

            <img src="${property.image}" alt="${property.title}">

            <div class="property-content">

                <h3>${property.title}</h3>

                <span class="city-badge">
                    📍 ${property.city}
                </span>

                <p>🏠 ${property.type}</p>

                <p>🛏 ${property.bhk}</p>

                <h4 class="price-tag">
                    Rs ${property.price}
                </h4>

                <p>
                    👤 ${property.owner}
                </p>

                <p>
                    📞 ${property.phone}
                </p>

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
    async function(event) {

        event.preventDefault();

        const title =
        document.getElementById("title").value.trim();

        const city =
        document.getElementById("city").value.trim();

        const type =
        document.getElementById("type").value.trim();

        const bhk =
        document.getElementById("bhk").value.trim();

        const price =
        document.getElementById("price").value.trim();

        const owner =
        document.getElementById("owner").value.trim();

        const phone =
        document.getElementById("phone").value.trim();

        if (
            !title ||
            !city ||
            !type ||
            !bhk ||
            !price ||
            !owner ||
            !phone
        ) {

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
            Date.now()

        };

        try {

            const response =
            await fetch(API_URL, {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(newProperty)

            });

            if (!response.ok) {
                throw new Error();
            }

            propertyForm.reset();

            fetchProperties();

        } catch (error) {

            formError.textContent =
            "Failed To Save Property";

        }

    }
);
const heroSearch =
document.getElementById("heroSearch");

const heroSearchBtn =
document.getElementById("heroSearchBtn");

heroSearchBtn.addEventListener(
"click",
function(){

    const city =
    heroSearch.value.toLowerCase();

    const filtered =
    allProperties.filter(property =>

        property.city
        .toLowerCase()
        .includes(city)

    );

    renderProperties(filtered);

    document
    .querySelector(".property-section")
    .scrollIntoView({
        behavior:"smooth"
    });

});