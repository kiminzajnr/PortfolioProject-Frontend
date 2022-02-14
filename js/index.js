function showForm() {
    document.getElementById('my-Form').style.display = 'block';
}
const myForm = document.getElementById("my-Form")
myForm.addEventListener("submit", handleFormSubmit);

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
    alert("Home added successfully");
    myForm.reset()
    document.getElementById('my-Form').style.display = 'none';
    return response.json();
}