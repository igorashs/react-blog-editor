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
