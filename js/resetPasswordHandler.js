let token = null;
let submitResetPasswordBtn = document.querySelector(
  '#submit-reset-password-btn'
);

document
  .getElementById('return-to-login-btn')
  .addEventListener('click', function () {
    window.location.href = '/index';
  });

document
  .getElementById('reset-password-form')
  .addEventListener('submit', function (e) {
    e.preventDefault();

    submitResetPasswordBtn.disabled = true;
    submitResetPasswordBtn.innerHTML =
      '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Loading...';

    const newPasswordForm = document.getElementById('input-new-reset-password');
    const repeatNewPasswordForm = document.getElementById(
      'input-repeat-new-reset-password'
    );

    if (token !== null) {
      const newPassword = newPasswordForm.value;
      const repeatPassword = repeatNewPasswordForm.value;

      if (newPassword !== repeatPassword) {
        showToast('alert-toast-container', 'Passwords do not match.', 'danger');
        submitResetPasswordBtn.disabled = false;
        submitResetPasswordBtn.innerHTML = 'Reset Password';
        return;
      } else {
        const options = {
          body: JSON.stringify({
            password: newPassword,
            confirm_password: repeatPassword,
          }),
        };

        fetchAPI(
          `https://x8ki-letl-twmt.n7.xano.io/api:P5dHgbq7:v1/auth/password/update_password`,
          'POST',
          token,
          options
        )
          .then((data) => {
            submitResetPasswordBtn.disabled = false;
            submitResetPasswordBtn.innerHTML = 'Reset Password';

            if (data === undefined) {
              showToast(
                'alert-toast-container',
                'Something went wrong.',
                'danger'
              );
            } else {
              showToast('alert-toast-container', data.message, 'success');
            }
          })
          .catch((error) => {
            submitResetPasswordBtn.disabled = false;
            submitResetPasswordBtn.innerHTML = 'Reset Password';
            console.log('error', error);
          });
      }
    } else {
      showToast('alert-toast-container', 'Token not found.', 'danger');
      submitResetPasswordBtn.disabled = false;
      submitResetPasswordBtn.innerHTML = 'Reset Password';
    }
  });

function verifyMagicToken() {
  const urlParams = new URLSearchParams(window.location.search);
  const magicToken = urlParams.get('token');

  if (magicToken) {
    const options = {
      body: JSON.stringify({
        magic_token: magicToken,
      }),
    };

    fetchAPI(
      'https://x8ki-letl-twmt.n7.xano.io/api:P5dHgbq7:v1/auth/verify_magic_token/auth_token',
      'POST',
      null,
      options
    )
      .then((data) => {
        if (data.authToken) {
          token = data.authToken;
        } else {
          submitResetPasswordBtn.disabled = true;
          showToast('alert-toast-container', data.message, 'danger');
        }
      })
      .catch((error) => {
        console.log('error', error);
      });
  } else {
    showToast('alert-toast-container', 'Token not found.', 'danger');
  }
}

verifyMagicToken();
