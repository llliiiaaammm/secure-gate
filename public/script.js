const errorMsg = document.getElementById('error-msg');

async function postData() {
	const id = document.getElementById('userId').value.trim();
	const password = document.getElementById('password').value.trim();
	const passkey = document.getElementById('passkey').value.trim();

	if (!id || !password || !passkey) {
		return "all fields are required.";
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
		return "internal error.";
	}
}

async function handleSubmit() {
	const returned = await postData();
	if (returned == true) {
		localStorage.setItem('user', document.getElementById('userId').value.trim());
		document.location.href = `/user?individual=${encodeURIComponent(document.getElementById('userId').value.trim())}`;
	} else {
		errorMsg.textContent = returned;
	}
}

document.getElementById('submit-btn').addEventListener('click', (e) => {
	e.preventDefault();
	handleSubmit();
});
