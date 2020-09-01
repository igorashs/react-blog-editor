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
