// This is MY API WRAPPER for MY SERVER API CALLS

const API_URL = 'https://aqueous-woodland-72578.herokuapp.com/';

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

    if (res.validationError) {
      if (res.validationError === 'Invalid password')
        return { error: res.validationError, passwordError: true };
      if (res.validationError === 'Invalid username')
        return { error: res.validationError, usernameError: true };
      return { error: res.validationError, unknownError: true };
    }

    return res;
  } catch (error) {
    return { error };
  }
}

export async function fetchPosts(token) {
  try {
    const res = await fetch(`${API_URL}posts/`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const data = await res.json();

    return data;
  } catch (error) {
    return { error };
  }
}

export async function fetchPostCommentsWithId(id) {
  try {
    const data = await fetch(`${API_URL}posts/${id}/comments/`);

    return await data.json();
  } catch (error) {
    return { error };
  }
}

export async function deleteCommentById(postID, commentID, token) {
  try {
    const res = await fetch(`${API_URL}posts/${postID}/comments/${commentID}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    return res;
  } catch (error) {
    return { error };
  }
}

export async function deletePost(postID, token) {
  try {
    const res = await fetch(`${API_URL}posts/${postID}/`, {
      method: 'Delete',
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    return res;
  } catch (error) {
    return { error };
  }
}

export async function createPost(post, token) {
  try {
    const res = await fetch(`${API_URL}posts/new/`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(post)
    });

    return res;
  } catch (error) {
    return { error };
  }
}

export async function updatePost(postID, post, token) {
  try {
    const res = await fetch(`${API_URL}posts/${postID}/`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(post)
    });

    return res;
  } catch (error) {
    return { error };
  }
}
