const myData = getSavedData('masterData');
const token = myData?.authToken;

document.getElementById('login-modal-container').innerHTML = shareLoginModal();
document.getElementById('reverify-modal-container').innerHTML =
  shareReverifyModal();
document.getElementById('forgot-password-modal-container').innerHTML =
  shareForgotPasswordModal();
document.getElementById('logout-modal-container').innerHTML =
  shareLogoutModal();

const topbarNotAuth = document.getElementById('topbar-not-auth');
const topbarWithAuth = document.getElementById('topbar-with-auth');
const topbarUsername = document.getElementById('topbar-username');
const topBarLoginButton = document.getElementById('topbar-login-btn');
const logoutBtn = document.getElementById('button-logout-yes');
logoutBtn.addEventListener('click', clearSession);

if (token) {
  topbarWithAuth.removeAttribute('style');
  topbarNotAuth.setAttribute('style', 'display: none');
  topbarUsername.innerHTML = myData.userData.username;
} else {
  topbarNotAuth.removeAttribute('style');
  topbarWithAuth.setAttribute('style', 'display: none');
  topbarUsername.innerHTML = '...';
  topBarLoginButton.addEventListener('click', function () {
    $('#startNowModal').modal('show');
  });
}

document
  .getElementById('topbar-job-list-btn')
  .addEventListener('click', function () {
    location.href = 'job-list';
  });

$(document).ready(function () {
  var urlParams = new URLSearchParams(window.location.search);
  var login = urlParams.get('login');
  if (login === 'true') {
    $('#startNowModal').modal('show');
  }
});

document.getElementById('find-job-btn').addEventListener('click', function () {
  location.href = 'job-list';
});

document.getElementById('post-job-btn').addEventListener('click', function () {
  if (token) {
    location.href = 'home';
  } else {
    $('#startNowModal').modal('show');
  }
});

document
  .getElementById('post-job-btn-2')
  .addEventListener('click', function () {
    if (token) {
      location.href = 'home';
    } else {
      $('#startNowModal').modal('show');
    }
  });

document
  .getElementById('post-job-btn-3')
  .addEventListener('click', function () {
    if (token) {
      location.href = 'home';
    } else {
      $('#startNowModal').modal('show');
    }
  });
