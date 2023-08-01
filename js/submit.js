// Get a reference to the form element
const contactForm = document.getElementById("contactForm");

const handleSubmit = async (event) => {
	event.preventDefault();

	// Get references to the input elements within the form
	const from_name = document.getElementById("name").value;
	const email_id = document.getElementById("email").value;
	const mobile_no = document.getElementById("mobile").value;
	const countryCode = document.getElementById("countryCode").value;
	const employee_id = document.getElementById("employeeId").value;

	// Gather the form data
	const formData = {
		name: from_name,
		email: email_id,
		mobile: mobile_no,
		employeeId: employee_id,
		countryCode: countryCode,
	};

	const emailAddresses = [
		"vikas.kashyap@nuk9.in",
		"aadarsh.kumar@nuk9.in",
		// "deepesh@nuk9.in",
	];

	const emailTemplateParams = {
		emailAddresses: emailAddresses,
		from_name: from_name,
		to_email: email_id,
		mobile: mobile_no,
		employeeId: employee_id,
		countryCode: countryCode,
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
		"https://v1.nocodeapi.com/vikaskashyap/google_sheets/hrvlRHIxsEZANjVl?tabId=UserData",
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
				countryCode.value = "";
			});
		})
		.catch((error) => {
			console.error("Error saving data to Google Sheets:", error);
		});
};

// Add the event listener to the form
contactForm.addEventListener("submit", handleSubmit);

// tnc
const agreeCheckbox = document.getElementById("agreeCheckbox");
const submitButton = document.getElementById("submitButton");

agreeCheckbox.addEventListener("change", function () {
	submitButton.disabled = !this.checked;
});

// number input
const mobileInput = document.getElementById("mobile");

mobileInput.addEventListener("input", function () {
	// Remove any non-numeric characters from the input
	this.value = this.value.replace(/\D/g, "");

	// Limit the input to 10 digits
	if (this.value.length > 10) {
		this.value = this.value.slice(0, 10);
	}
});
