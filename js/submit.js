// Get a reference to the form element
const contactForm = document.getElementById("contactForm");

const handleSubmit = async (event) => {
	event.preventDefault();

	// Get references to the input elements within the form
	const from_name = document.getElementById("name").value;
	const email_id = document.getElementById("email").value;
	const mobile_no = document.getElementById("mobile").value;
	const employee_id = document.getElementById("employeeId").value;
	const message = document.getElementById("message").value;

	// Gather the form data
	const formData = {
		name: from_name,
		email: email_id,
		mobile: mobile_no,
		employeeId: employee_id,
		message: message,
	};

	const emailAddresses = [
		"viratkashyap903@gmail.com",
		"ivikaskashyap01@gmail.com",
		"id.vikaskashyap@gmail.com",
	];

	const emailTemplateParams = {
		emailAddresses: emailAddresses,
		from_name: from_name,
		to_email: email_id,
		mobile: mobile_no,
		employeeId: employee_id,
		message: message,
	};

	// Send the email using EmailJS
	emailjs
		.send(
			"service_uzdqhvm",
			"template_n7pmt6o",
			emailTemplateParams,
			"yC7gTteHqtdHRHDu0"
		)
		.then((result) => {
			console.log(result.text);
		})
		.catch((error) => {
			console.log(error.text);
		});

	const data = [Object.values(formData)];

	// Save data to Google Sheets using fetch
	await fetch(
		"https://v1.nocodeapi.com/vikaskashyap/google_sheets/hrvlRHIxsEZANjVl?tabId=Sheet1",
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
				// Reset form fields after successful submission
				from_name.value = "";
				email_id.value = "";
				mobile_no.value = "";
				employee_id.value = "";
				message.value = "";
			});
		})
		.catch((error) => {
			console.error("Error saving data to Google Sheets:", error);
		});
};

// Add the event listener to the form
contactForm.addEventListener("submit", handleSubmit);
