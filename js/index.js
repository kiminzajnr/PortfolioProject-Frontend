// async function getGroup () {
//     try {
//       const response1 = await fetch('https://kiminza.pythonanywhere.com/Join_Group/')
//       const datas = await response1.json()
//       for (const data of datas) {
//         console.log(data.group_name)
//         const response2 = await fetch(data.group_name)
//         const names = await response2.json()
//         console.log(names.group_name)
//         optionText = names.group_name;
//         optionValue = data.group_name;
//         $('#form-control').append(new Option(optionText, optionValue))
//       }
//     }
//     catch (error) {
//       console.error(error)
//     }
// }
// getGroup()

function showForm() {
    document.getElementById('my-Form').style.display = 'block';
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
        div.style.width = "100px";
        div.style.height = "100px";
        div.style.background = "red";
        div.innerHTML += `<h3><b> ${data_.home_name} </b></h3>`;
        div.innerHTML += `<h5><b> ${data_.contact} </b></h5>`;
        div.innerHTML += `<h5><b> ${data_.location} </b></h5>`;
        div.innerHTML += `<h5><b> ${data_.capacity} </b></h5>`;
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
const groupForm = document.getElementById("GroupForm");
groupForm.addEventListener("submit", handleFormSubmit);
const joinForm = document.getElementById("JoinForm")
joinForm.addEventListener("submit", handleFormSubmit);

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
