// email-form
const emailForm = document.getElementById("emailForm");

const handleSubmit = async (event) => {
	console.log("handleSubmitEmail called");
	event.preventDefault();

	// Get references to the input elements within the form
	const email = document.getElementById("email").value;

	// Gather the form data
	const formData = {
		email: email,
	};

	const data = [Object.values(formData)];

	// Save data to Google Sheets using fetch
	await fetch(
		"https://v1.nocodeapi.com/vikaskashyap/google_sheets/hrvlRHIxsEZANjVl?tabId=Emails",
		{
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		}
	)
		.then((result) => {
			result.json().then((res) => {
				console.log(res);

				// Clear the input field after successful form submission
				email.value = "";
			});
		})
		.catch((error) => {
			console.error("Error saving data to Google Sheets:", error);
		});
};

// Add the event listener to the form
emailForm.addEventListener("submit", handleSubmit);
