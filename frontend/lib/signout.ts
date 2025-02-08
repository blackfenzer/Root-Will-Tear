import Cookies from 'js-cookie';

export async function signOut() {
  // Make an API call to the logout endpoint (if applicable)
  const response = await fetch('/api/v1/logout', {
    method: 'POST',
    credentials: 'include', // Ensures cookies are sent with the request
  });

  if (response.ok) {
    // Clear the session token from cookies
    Cookies.remove('session_token');
    console.log('User signed out successfully');
  } else {
    console.error('Failed to sign out');
  }
}
