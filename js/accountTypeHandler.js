const myData = getSavedData('masterData');
const token = myData?.authToken;

const topbarNotAuth = document.getElementById('topbar-not-auth');
const topbarWithAuth = document.getElementById('topbar-with-auth');
const topbarUsername = document.getElementById('topbar-username');
const topBarPostJobButton = document.getElementById('topbar-post-job-btn');
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
  topBarPostJobButton.addEventListener('click', function () {
    location.href = 'index?login=true';
  });
  location.href = 'index';
}

document
  .getElementById('topbar-job-list-btn')
  .addEventListener('click', function () {
    location.href = 'job-list';
  });

var input_company_name = document.getElementById('input-company-name');

document
  .getElementById('employer-form')
  .addEventListener('submit', function (e) {
    e.preventDefault();

    let submitEmployerBtn = document.getElementById('submit-employer-btn');
    handlingAccountType(
      'employer',
      input_company_name.value,
      '',
      submitEmployerBtn
    );
  });

var input_full_name = document.getElementById('input-full-name');

document
  .getElementById('job-seeker-form')
  .addEventListener('submit', function (e) {
    e.preventDefault();

    let submitJobSeekerBtn = document.getElementById('submit-job-seeker-btn');
    handlingAccountType(
      'job-seeker',
      '',
      input_full_name.value,
      submitJobSeekerBtn
    );
  });

function handlingAccountType(
  accountTye,
  companyName = '',
  fullName = '',
  useBtn
) {
  let defaultBtnText = useBtn.innerHTML;

  useBtn.disabled = true;
  useBtn.innerHTML = spinnerLoading(useBtn.innerHTML);

  let options = {};

  if (accountTye == 'employer') {
    options = {
      body: JSON.stringify({
        username: myData.userData.username,
        account_type: 2,
        company_name: companyName,
      }),
    };
  } else {
    options = {
      body: JSON.stringify({
        username: myData.userData.username,
        account_type: 3,
        full_name: fullName,
        mask_full_name: maskText(fullName),
        email: myData.userData.email,
        mask_email: maskText(myData.userData.email),
      }),
    };
  }

  fetchAPI(
    `https://x8ki-letl-twmt.n7.xano.io/api:P5dHgbq7/user/account_type`,
    'PUT',
    token,
    options
  )
    .then((data) => {
      if (data) {
        if (data.message) {
          showToast('alert-toast-container', data.message, 'danger');
        } else {
          saveData('masterData', {
            userData: {
              ...myData.userData,
              username: data.username,
              email: data.email,
              role_id: data.role_id,
            },
            authToken: myData.authToken,
          });
          location.href = 'home';
        }
      }
      useBtn.disabled = false;
      useBtn.innerHTML = defaultBtnText;
    })
    .catch((error) => {
      useBtn.disabled = false;
      useBtn.innerHTML = defaultBtnText;
    });
}
