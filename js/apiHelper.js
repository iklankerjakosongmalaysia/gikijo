let stopAlert = false;

function stopAlertAPI() {
  stopAlert = true;
  setTimeout(() => {
    stopAlert = false;
  }, 60000); // reset stopAlert after 60 seconds
}

function fetchAPI(
  url,
  method,
  token,
  options = {},
  headers = {
    'Content-Type': 'application/json',
  }
) {
  return (
    fetch(url, {
      method: method,
      headers: {
        ...headers, // Spread the headers object to include any additional headers
        Authorization: `Bearer ${token}`, // Set the authorization header using the token parameter
      },
      ...options, // Spread the options object to include any additional options
    })
      // When the request is complete, convert the response to JSON
      .then((response) => {
        if (response.status === 429) {
          // too many requests
          if (stopAlert === false) {
            stopAlertAPI(); // stop multiple alert at one time
            showToast(
              'alert-toast-container',
              'Too Many Requests, Please try again in a moment.',
              'danger'
            );
          }
        } else {
          return response.json();
        }
      })
      .then((data) => {
        if (data?.code) {
          if (data.code === 'ERROR_CODE_UNAUTHORIZED') {
            showToast(
              'alert-toast-container',
              'Your session has expired. Please log in again to continue.',
              'danger'
            );
            localStorage.clear();
            sessionStorage.clear();
            location.href = '/index';
          } else {
            return data;
          }
        } else {
          return data;
        }
      })
      .catch((error) => {
        throw error;
      })
  );
}
