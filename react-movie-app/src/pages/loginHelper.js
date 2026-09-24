/**
 * Beginner-friendly validation utility for CineVerse login
 */
export function validateLogin(username, password) {
  if (!username || username.trim().length === 0) {
    return { success: false, message: "Username or Email cannot be empty." };
  }
  if (!password || password.trim().length === 0) {
    return { success: false, message: "Password cannot be empty." };
  }
  if (password.length < 4) {
    return { success: false, message: "Password must be at least 4 characters long." };
  }
  return { success: true };
}
