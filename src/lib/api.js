// This is MY API WRAPPER for MY SERVER API CALLS

const API_URL = 'http://localhost:9000/';

export async function fetchServerStatus() {
  try {
    const data = await fetch(API_URL);
    return await data.json();
  } catch (error) {
    return { error };
  }
}

export async function fetchToken(user) {
  try {
    const data = await fetch(`${API_URL}user/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    });

    const res = await data.json();

    return res;
  } catch (error) {
    return { error };
  }
}
