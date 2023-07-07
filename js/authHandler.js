document
  .getElementById('go-to-login-tab')
  .addEventListener('click', function () {
    document.querySelector('#login-tab').click();
  });

document
  .getElementById('go-to-register-tab')
  .addEventListener('click', function () {
    document.querySelector('#register-tab').click();
  });

document
  .getElementById('go-to-forgot-password-modal')
  .addEventListener('click', function () {
    $('#startNowModal').modal('hide');
    $('#forgotPasswordModal').modal('show');
  });

document
  .getElementById('go-to-login-modal')
  .addEventListener('click', function () {
    $('#forgotPasswordModal').modal('hide');
    $('#startNowModal').modal('show');
  });

document
  .getElementById('reverify-go-to-login-modal')
  .addEventListener('click', function () {
    $('#reverifyModal').modal('hide');
    $('#startNowModal').modal('show');
  });

document.getElementById('login-form').addEventListener('submit', function (e) {
  e.preventDefault();

  let useBtn = document.querySelector('#submit-btn-login');
  let defaultBtnText = useBtn.innerHTML;

  useBtn.disabled = true;
  useBtn.innerHTML = spinnerLoading(useBtn.innerHTML);

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  const options = {
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  };

  fetchAPI(
    'https://x8ki-letl-twmt.n7.xano.io/api:P5dHgbq7/auth/login',
    'POST',
    null,
    options
  )
    .then((data) => {
      const hasKey = Object.keys(data).includes('authToken');
      if (hasKey === false) {
        useBtn.disabled = false;
        useBtn.innerHTML = defaultBtnText;
        if (data.payload === 700) {
          $('#startNowModal').modal('hide');
          $('#reverifyModal').modal('show');
          showToast('alert-toast-container', data.message, 'danger');
        } else {
          showToast('alert-toast-container', data.message, 'danger');
        }
      } else {
        saveData('masterData', {
          userData: data.userData,
          authToken: data.authToken,
        });
        useBtn.disabled = false;
        useBtn.innerHTML = defaultBtnText;

        if (data.userData.role_id) {
          location.href = 'home';
        } else {
          location.href = 'account-type';
        }
      }
    })
    .catch((error) => {
      useBtn.disabled = false;
      useBtn.innerHTML = defaultBtnText;
    });
});

document
  .getElementById('register-form')
  .addEventListener('submit', function (e) {
    e.preventDefault();

    let useBtn = document.querySelector('#submit-btn-register');
    let defaultBtnText = useBtn.innerHTML;

    useBtn.disabled = true;
    useBtn.innerHTML = spinnerLoading(useBtn.innerHTML);

    const username = document.getElementById('input-username-register').value;
    const email = document.getElementById('input-email-register').value;
    const password = document.getElementById('input-password-register').value;
    const repeatPassword = document.getElementById(
      'input-repeat-password-register'
    ).value;

    if (password == repeatPassword) {
      const options = {
        body: JSON.stringify({
          username: username,
          email: email,
          password: password,
        }),
      };
      fetchAPI(
        'https://x8ki-letl-twmt.n7.xano.io/api:P5dHgbq7/auth/verify_email/signup',
        'POST',
        null,
        options
      )
        .then((data) => {
          useBtn.disabled = false;
          useBtn.innerHTML = defaultBtnText;
          if (data.code) {
            showToast('alert-toast-container', data.message, 'danger');
          } else {
            showToast('alert-toast-container', data.message, 'success');
          }
        })
        .catch((error) => {
          useBtn.disabled = false;
          useBtn.innerHTML = defaultBtnText;
          console.log('error', error);
        });
    } else {
      showToast(
        'alert-toast-container',
        'Password and confirm password does not match.',
        'danger'
      );
      useBtn.disabled = false;
      useBtn.innerHTML = defaultBtnText;
    }
  });

document
  .getElementById('forgot-password-form')
  .addEventListener('submit', function (e) {
    e.preventDefault();

    let useBtn = document.querySelector('#submit-btn-forgot-password');
    let defaultBtnText = useBtn.innerHTML;

    useBtn.disabled = true;
    useBtn.innerHTML = spinnerLoading(useBtn.innerHTML);

    const email = document.getElementById('email-forgot-password').value;

    const options = {
      body: JSON.stringify({
        email: email,
      }),
    };
    fetchAPI(
      'https://x8ki-letl-twmt.n7.xano.io/api:P5dHgbq7:v1/auth/password/request-magic-link',
      'POST',
      null,
      options
    )
      .then((data) => {
        useBtn.disabled = false;
        useBtn.innerHTML = defaultBtnText;
        if (data?.message) {
          showToast('alert-toast-container', data.message, 'danger');
        } else {
          showToast(
            'alert-toast-container',
            'Password reset email sent. Please check your inbox for further instructions.',
            'success'
          );
        }
      })
      .catch((error) => {
        useBtn.disabled = false;
        useBtn.innerHTML = defaultBtnText;
        console.log('error', error);
      });
  });

document
  .getElementById('reverify-form')
  .addEventListener('submit', function (e) {
    e.preventDefault();

    let useBtn = document.querySelector('#submit-btn-reverify');
    let defaultBtnText = useBtn.innerHTML;

    useBtn.disabled = true;
    useBtn.innerHTML = spinnerLoading(useBtn.innerHTML);

    const email = document.getElementById('email-reverify').value;

    const options = {
      body: JSON.stringify({
        email: email,
      }),
    };

    fetchAPI(
      'https://x8ki-letl-twmt.n7.xano.io/api:P5dHgbq7:v1/auth/verify_email/resend',
      'POST',
      null,
      options
    )
      .then((data) => {
        useBtn.disabled = falseś;
        useBtn.innerHTML = defaultBtnText;
        if (data.code) {
          showToast('alert-toast-container', data.message, 'danger');
        } else {
          showToast('alert-toast-container', data.message, 'success');
        }
      })
      .catch((error) => {
        useBtn.disabled = false;
        useBtn.innerHTML = defaultBtnText;
      });
  });

document
  .getElementById('button-continue-login-with-google')
  .addEventListener('click', function () {
    initGoogleCode();
  });

document
  .getElementById('button-continue-signup-with-google')
  .addEventListener('click', function () {
    initGoogleCode();
  });

var redirectUrl = 'https://gikijo.com/';
var successUrl = 'https://gikijo.com/home';
var selectRole = 'https://gikijo.com/account-type';

function initGoogleCode() {
  fetchAPI(
    `https://x8ki-letl-twmt.n7.xano.io/api:OF8QSJWr/oauth/google/init?redirect_uri=${redirectUrl}`,
    'GET',
    null
  )
    .then((data) => {
      if (data?.message) {
        showToast('alert-toast-container', data.message, 'danger');
      } else {
        window.location.href = data.authUrl;
      }
    })
    .catch((error) => {
      console.log('error', error);
    });
}

window.onload = function () {
  var curUrl = new URL(document.location.href);
  var code = curUrl.searchParams.get('code');

  if (code) {
    continueOauth(code);
  }
};

function continueOauth(code) {
  fetchAPI(
    `https://x8ki-letl-twmt.n7.xano.io/api:OF8QSJWr/oauth/google/continue?redirect_uri=${redirectUrl}&code=${code}`,
    'GET',
    null
  )
    .then((data) => {
      if (data?.message) {
        showToast('alert-toast-container', data.message, 'danger');
      } else {
        if (data?.authToken) {
          saveData('masterData', {
            userData: data.userData,
            authToken: data.authToken,
          });

          if (data.userData.role_id) {
            window.location.href = successUrl;
          } else {
            window.location.href = selectRole;
          }
        } else {
          showToast('alert-toast-container', 'Token not found', 'danger');
        }
      }
    })
    .catch((error) => {
      console.log('error', error);
    });
}
