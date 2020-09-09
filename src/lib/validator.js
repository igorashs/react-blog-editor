export function validateUsername(username) {
  if (!username) {
    return 'is required';
  }

  if (username.length > 15) {
    return 'should be less than 15 characters';
  }

  return '';
}

export function validatePassword(password) {
  if (!password) {
    return 'is required';
  }

  return '';
}

export function validateTitle(title) {
  if (!title) {
    return 'is required';
  }

  if (title.length > 80) {
    return 'should be less than 80 characters';
  }

  return '';
}

export function validateText(text) {
  if (!text) {
    return 'is required';
  }

  if (text.length > 7300) {
    return 'should be less than 7300 characters';
  }

  return '';
}
