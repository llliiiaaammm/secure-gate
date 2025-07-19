exports.handler = async (event) => {
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: JSON.stringify({ error: 'Method Not Allowed' })
        };
    }

    const { id, password, passkey } = JSON.parse(event.body || '{}');

    // Simple validation
    if (!id || !password || !passkey) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: 'Missing fields' })
        };
    }

    const users = {
        "lb": { password: "abc", passkey: "123" },
    };

    const user = users[id];

    if (!user) {
        return {
            statusCode: 401,
            body: JSON.stringify({ error: 'Invalid ID' })
        };
    }

    if (user.password !== password || user.passkey !== passkey) {
        return {
            statusCode: 401,
            body: JSON.stringify({ error: 'Invalid credentials' })
        };
    }

    return {
        statusCode: 200,
        body: JSON.stringify({ success: true })
    };
};
