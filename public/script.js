const errorMsg = document.getElementById('error-msg');

async function postData() {
	const id = document.getElementById('userId').value.trim();
	const password = document.getElementById('password').value.trim();
	const passkey = document.getElementById('passkey').value.trim();

	if (!id || !password || !passkey) {
		errorMsg.textContent = "All fields are required.";
		return false;
	}

	try {
		const response = await fetch("/.netlify/functions/userbase", {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ id, password, passkey })
		});

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const responseData = await response.json();
		return responseData || false;
	} catch (error) {
		console.error('Error:', error);
		return false;
	}
}

async function handleSubmit() {
	const success = await postData();
	if (success) {
		localStorage.setItem('user', document.getElementById('userId').value.trim());
		document.location.href = `/user?individual=${encodeURIComponent(document.getElementById('userId').value.trim())}`;
	} else {
		errorMsg.textContent = "Incorrect.";
	}
}

// Call handleSubmit on form submission
document.getElementById('submit-btn').addEventListener('click', (e) => {
	e.preventDefault();
	handleSubmit();
});
