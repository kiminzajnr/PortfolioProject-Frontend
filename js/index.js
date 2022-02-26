$(document).mouseup(function(e) {
    const container = $("#my-Form");
    if (!container.is(e.target) && container.has(e.target).length === 0) {
        container.hide();
    }
});
$(document).mouseup(function(e) {
    const container = $("#planVisit");
    if (!container.is(e.target) && container.has(e.target).length === 0) {
        container.hide();
    }
});


function myFunction() {
    let navbar_ = document.getElementById("myTopnav");
    if (navbar_.className === "topnav") {
        navbar_ += " responsive";
    } else {
        navbar_.className = "topnav";
    }
}

function showForm() {
    document.getElementById('my-Form').style.display = 'block';
    document.getElementById('planVisit').style.display = 'none';
}
function showVisitForm() {
    document.getElementById('planVisit').style.display = 'block';
    document.getElementById('my-Form').style.display = 'none';
}

function openForm() {
    document.getElementById("PayForm").style.display = "block";
}
function closeForm() {
    document.getElementById("PayForm").style.display = "none";
}

fetch('https://kiminza.pythonanywhere.com/homes/')
.then(function (response) {
    return response.json();
})
.then(function (data) {
    appendData(data)
})
.catch (function (error) {
    console.error(error);
});

function appendData (data) {
    // const mainContainer = document.getElementById("myData");
    for (const data_ of data){
        const div = document.createElement("div");
        div.className = "card";
        div.innerHTML += `<h3><b> ${data_.home_name} </b></h3>`;
        div.innerHTML += `<h5><b> Phone: ${data_.contact} </b></h5>`;
        div.innerHTML += `<h5><b> Location: ${data_.location} </b></h5>`;
        div.innerHTML += `<h5><b> We have ${data_.capacity} Childrens</b></h5>`;
        document.body.appendChild(div)
    }
}

// This code activates flatpickr on fields with the 'datetimefield' class when the document has loaded
window.addEventListener("DOMContentLoaded", function () {
    flatpickr("#datetimefield", {
        enableTime: true,
        enableSeconds: true,
        dateFormat: "Y-m-d H:i:S",
    });
});

const myForm = document.getElementById("my-Form");
myForm.addEventListener("submit", handleFormSubmit);
const groupForm = document.getElementById("planVisit");
groupForm.addEventListener("submit", handleFormSubmit);
// const joinForm = document.getElementById("JoinForm")
// joinForm.addEventListener("submit", handleFormSubmit);

async function handleFormSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const url = form.action;
    try {
        const formData = new FormData(form);
        const responseData = await postFormDataAsJson({url, formData});
        console.log({responseData});
    } catch (error) {
        console.error(error);
    }
}

async function postFormDataAsJson({url, formData}) {
    const plainFormData = Object.fromEntries(formData.entries());
    const formDataJsonString = JSON.stringify(plainFormData);

    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: formDataJsonString,
    };
    const response = await fetch(url, fetchOptions);

    if (!response.ok) {
        alert("something went wrong, try again");
        const errorMessage = await response.text();
        throw new Error(errorMessage);
    }
    alert("operation successfully");
    myForm.reset()
    document.getElementById('my-Form').style.display = 'none';
    return response.json();
}
