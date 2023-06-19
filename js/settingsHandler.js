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

let userMenu = [];

userMenu.push(
  {
    href: 'home',
    iconSideBar: 'fas fa-fw fa-home',
    iconTopBar: 'fas fa-home fa-sm fa-fw mr-2 text-gray-400',
    title: 'Home',
  },
  {
    href: 'profile',
    iconSideBar: 'fas fa-fw fa-user',
    iconTopBar: 'fas fa-user fa-sm fa-fw mr-2 text-gray-400',
    title: 'Profile',
  },
  {
    href: 'job-list',
    iconSideBar: 'fas fa-fw fa-list',
    iconTopBar: 'fas fa-list fa-sm fa-fw mr-2 text-gray-400',
    title: 'Job List',
  },
  {
    isActive: true,
    href: 'settings',
    iconSideBar: 'fas fa-fw fa-cogs',
    iconTopBar: 'fas fa-cogs fa-sm fa-fw mr-2 text-gray-400',
    title: 'Settings',
  },
  {
    href: '#logoutModal',
    iconSideBar: 'fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400',
    iconTopBar: 'fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400',
    title: 'Logout',
    dataToggle: 'modal',
  }
);

let userMenuSideBarHTML = '';
let userMenuTopBarHTML = '';

for (let i = 0; i < userMenu.length; i++) {
  let dataToggle = userMenu[i].dataToggle
    ? `data-toggle="${userMenu[i].dataToggle}"`
    : '';
  userMenuSideBarHTML += `
  <li class="nav-item ${userMenu[i].isActive ? 'active' : ''}">
  <a class="nav-link" href="${userMenu[i].href}" ${dataToggle}>
    <i class="${userMenu[i].iconSideBar}"></i>
    <span>${userMenu[i].title}</span></a
  >
  </li>
  `;

  userMenuTopBarHTML += `<a class="dropdown-item" href="${userMenu[i].href}" ${dataToggle}>
  <i class="${userMenu[i].iconTopBar}"></i>
  ${userMenu[i].title}
</a>`;
}

document.getElementById('top-bar-menu-list').innerHTML = userMenuTopBarHTML;
document.getElementById('sidebar-menu-list').innerHTML = userMenuSideBarHTML;

let tabs = [];

if (myData.userData.role_id === 3) {
  var defaultActiveTab = document.getElementById('password');
  defaultActiveTab.classList.add('show', 'active');

  tabs.push(
    {
      id: 'password-tab',
      title: 'Change Password',
      content: 'password',
    },
    {
      id: 'feedback-tab',
      title: 'Feedback',
      content: 'feedback',
    },
    {
      id: 'delete-profile-tab',
      title: 'Delete Account',
      content: 'delete-profile',
    }
  );
} else {
  var defaultActiveTab = document.getElementById('password');
  defaultActiveTab.classList.add('show', 'active');

  tabs.push(
    {
      id: 'password-tab',
      title: 'Change Password',
      content: 'password',
    },
    {
      id: 'feedback-tab',
      title: 'Feedback',
      content: 'feedback',
    },
    {
      id: 'delete-profile-tab',
      title: 'Delete Account',
      content: 'delete-profile',
    }
  );
}

let tabHTML = '';

for (let i = 0; i < tabs.length; i++) {
  let isActive = i === 0 ? 'active' : '';
  let isShow = i === 0 ? 'show' : '';
  tabHTML += `
    <li class="nav-item">
      <a
        class="nav-link ${isActive} ${isShow}"
        id="${tabs[i].id}"
        data-toggle="tab"
        href="#${tabs[i].content}"
        role="tab"
        aria-controls="${tabs[i].content}"
        aria-selected="${isActive}"
        >${tabs[i].title}</a
      >
    </li>
  `;
}

document.getElementById('myTab').innerHTML = tabHTML;

const newPasswordForm = document.getElementById('input-new-password');
const repeatNewPasswordForm = document.getElementById(
  'input-repeat-new-password'
);

const currentEmailForm = document.getElementById('input-current-email');

// Add a submit event listener to the form
changePasswordForm.addEventListener('submit', function (event) {
  event.preventDefault();

  let submitChangeBtn = document.getElementById('submit-change-password-btn');
  submitChangeBtn.disabled = true;
  submitChangeBtn.innerHTML =
    '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Loading...';

  const newPassword = newPasswordForm.value;
  const repeatPassword = repeatNewPasswordForm.value;

  if (newPassword !== repeatPassword) {
    showToast('alert-toast-container', 'Passwords do not match.', 'danger');
    submitChangeBtn.disabled = false;
    submitChangeBtn.innerHTML = 'Update';
    return;
  } else {
    const options = {
      body: JSON.stringify({
        password: newPassword,
      }),
    };

    fetchAPI(
      `https://x8ki-letl-twmt.n7.xano.io/api:P5dHgbq7/user/change_password`,
      'PUT',
      token,
      options
    )
      .then((data) => {
        if (data?.message) {
          showToast('alert-toast-container', data.message, 'danger');
        } else {
          showToast(
            'alert-toast-container',
            'Your password has been successfully updated.',
            'success'
          );
        }
        submitChangeBtn.disabled = false;
        submitChangeBtn.innerHTML = 'Update';
      })
      .catch((error) => {
        submitChangeBtn.disabled = false;
        submitChangeBtn.innerHTML = 'Update';
      });
  }
});

// Add a submit event listener to the form
feedbackForm.addEventListener('submit', function (event) {
  event.preventDefault();

  let submitFeedbackBtn = document.getElementById('submit-feedback-btn');
  submitFeedbackBtn.disabled = true;
  submitFeedbackBtn.innerHTML =
    '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Loading...';

  const feedbackType = document.getElementById('feedback-type');
  const feedbackTitle = document.getElementById('input-feedback-title');
  const feedbackDescription = document.getElementById(
    'input-feedback-description'
  );

  const options = {
    body: JSON.stringify({
      type: feedbackType.value,
      title: feedbackTitle.value,
      description: feedbackDescription.value,
    }),
  };

  fetchAPI(
    `https://x8ki-letl-twmt.n7.xano.io/api:P5dHgbq7:v1/feedback`,
    'POST',
    token,
    options
  )
    .then((data) => {
      if (data) {
        if (data.message) {
          showToast('alert-toast-container', data.message, 'danger');
        } else {
          showToast(
            'alert-toast-container',
            'Your feedback has been submitted successfully.',
            'success'
          );
          feedbackTitle.value = '';
          feedbackDescription.value = '';
        }
      }
      submitFeedbackBtn.disabled = false;
      submitFeedbackBtn.innerHTML = 'Submit';
    })
    .catch((error) => {
      submitFeedbackBtn.disabled = false;
      submitFeedbackBtn.innerHTML = 'Submit';
    });
});

// Add a submit event listener to the form
deleteProfileForm.addEventListener('submit', function (event) {
  event.preventDefault();

  if (
    confirm(
      'Are you sure you want to delete your account? This action cannot be undone.'
    )
  ) {
  } else {
    return;
  }

  const currentEmail = currentEmailForm.value;

  let useBtn = document.getElementById('submit-delete-profile-btn');
  let defaultBtnText = useBtn.innerHTML;

  useBtn.disabled = true;
  useBtn.innerHTML = spinnerLoading(useBtn.innerHTML);

  const options = {
    body: JSON.stringify({
      email: currentEmail,
    }),
  };

  fetchAPI(
    `https://x8ki-letl-twmt.n7.xano.io/api:P5dHgbq7/user/delete_user`,
    'POST',
    token,
    options
  )
    .then((data) => {
      if (data?.message) {
        showToast('alert-toast-container', data.message, 'danger');
        useBtn.disabled = false;
        useBtn.innerHTML = defaultBtnText;
      } else {
        showToast(
          'alert-toast-container',
          'Your account has been deleted!',
          'success'
        );
        setTimeout(() => {
          clearSession();
          useBtn.disabled = false;
          useBtn.innerHTML = defaultBtnText;
        }, 2000);
      }
    })
    .catch((error) => {
      useBtn.disabled = false;
      useBtn.innerHTML = defaultBtnText;
    });
});

$(document).ready(function () {
  if (myData.userData.role_id) {
  } else {
    location.href = 'account-type';
  }
});
