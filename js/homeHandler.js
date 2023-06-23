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

$(function () {
  $('[data-toggle="tooltip"]').tooltip();
});

const typeName = {
  type_1: {
    id: 'type_1',
    name: 'ViewUnlock',
  },
  type_2: {
    id: 'type_2',
    name: 'DirectView',
  },
};

document.getElementById('post-type-name-1').innerHTML = typeName.type_1.name;
document.getElementById('post-type-name-2').innerHTML = typeName.type_2.name;

const refreshChannelBtn = document.getElementById('refresh-channel-list');
refreshChannelBtn.addEventListener('click', firstCall);

function openMyJobTab() {
  document.querySelector('#my-job-tab').click();
}

const username = document.getElementById('username-text');
username.innerHTML = `Welcome back! ${myData.userData.username}`;

let userMenu = [];

if (myData.userData.role_id === 3) {
  userMenu.push(
    {
      isActive: true,
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
} else {
  userMenu.push(
    {
      isActive: true,
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
}

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
  var defaultActiveTab = document.getElementById('dashboard-job-seeker');
  defaultActiveTab.classList.add('show', 'active');

  tabs.push(
    {
      id: 'dashboard-job-seeker-tab',
      title: 'Dashboard',
      content: 'dashboard-job-seeker',
    },
    {
      id: 'my-application-job-seeker-tab',
      title: 'Applications',
      content: 'my-application-job-seeker',
    },
    {
      id: 'my-invitation-job-seeker-tab',
      title: 'Invitations',
      content: 'my-invitation-job-seeker',
    }
  );
}

if (myData.userData.role_id === 2) {
  var defaultActiveTab = document.getElementById('dashboard-employer');
  defaultActiveTab.classList.add('show', 'active');

  tabs.push(
    {
      id: 'dashboard-employer-tab',
      title: 'Dashboard',
      content: 'dashboard-employer',
    },
    {
      id: 'my-job-tab',
      title: 'Job Posts',
      content: 'my-job',
    }
  );
}

if (myData.userData.role_id === 1) {
  var defaultActiveTab = document.getElementById('dashboard-employer');
  defaultActiveTab.classList.add('show', 'active');

  tabs.push(
    {
      id: 'dashboard-employer-tab',
      title: 'Dashboard',
      content: 'dashboard-employer',
    },
    {
      id: 'my-job-tab',
      title: 'Job Post',
      content: 'my-job',
    },
    {
      id: 'admin-tab',
      title: 'Jobs (admin)',
      content: 'admin',
    },
    {
      id: 'admin-user-tab',
      title: 'Users (admin)',
      content: 'admin-user',
    },
    {
      id: 'admin-feedback-tab',
      title: 'Feedbacks (admin)',
      content: 'admin-feedback',
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

// const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
document.getElementById('myTab').innerHTML = tabHTML;

document
  .getElementById('jump-to-create-job-slot-tab-button')
  .addEventListener('click', () => {
    document.querySelector('#my-job-slot-tab').click();
  });

document
  .getElementById('create-go-to-update-company-name')
  .addEventListener('click', () => {
    location.href = 'profile?code=company_profile';
  });

document
  .getElementById('create-go-to-post-type-tab')
  .addEventListener('click', () => {
    document.querySelector('#my-paid-vs-free-slot-tab').click();
  });

document
  .getElementById('edit-go-to-update-company-name')
  .addEventListener('click', () => {
    location.href = 'profile?code=company_profile';
  });

const successUrl = 'https://gikijo.com/success';
const cancelUrl = 'https://gikijo.com/cancel';

const profileUnlockBalanceContainer = document.getElementById(
  'profile-unlock-balance-container'
);

if (myData.userData.role_id === 2 || myData.userData.role_id === 1) {
  profileUnlockBalanceContainer.removeAttribute('style');
} else {
  profileUnlockBalanceContainer.removeAttribute('style');
  profileUnlockBalanceContainer.setAttribute('style', 'display: none');
}

let selectedJob = null;

const format = {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  hour12: true,
};

let selectedTopupItem = null;
var coinListData = [];

const retryTopup = document.getElementById('retry-topup-btn');
retryTopup.addEventListener('click', fetchCoinList);

const addTopupBtn = document.getElementById('add-topup-btn');
addTopupBtn.addEventListener('click', fetchCoinList);

function populateCoin(allData = []) {
  const listLoader = document.getElementById('topup-list-loader');
  const listEmpty = document.getElementById('topup-list-empty');
  const listContainer = document.getElementById('topup-list-container');
  const listBody = document.getElementById('topup-list-body');

  var totalRecord = [];

  allData.forEach((item) => {
    if (item.metadata.type === 'coin' && item.active == true) {
      const card = listBody.cloneNode(true);
      const divs = card.getElementsByTagName('div');

      const title = divs[0].getElementsByTagName('h7');

      title[0].innerHTML = `${item.name} - RM ${item.metadata.price}`;

      if (selectedTopupItem?.id == item.id) {
        divs[0].style.backgroundColor = '#f8f9fc';
        divs[0].style.border = '1px solid #4d72de';
        divs[0].style.borderRadius = '5px';
      } else {
        divs[0].style.backgroundColor = null;
        divs[0].style.border = null;
        divs[0].style.borderRadius = null;
      }

      divs[0].addEventListener('click', function () {
        // var totalPriceElement = document.getElementById(
        //   'topup-total-price-element'
        // );
        // coinPrice = parseInt(item.metadata.price, 10);
        // totalPriceElement.innerHTML = `RM ${coinPrice}`;
        selectedTopupItem = item;
        populateCoin(coinListData); // update background color
      });

      totalRecord.push(card);
    }
  });

  listLoader.classList.add('hidden');

  if (totalRecord.length === 0) {
    listEmpty.classList.remove('hidden');
    listContainer.classList.add('hidden');
  } else {
    listEmpty.classList.add('hidden');
    listContainer.classList.remove('hidden');

    while (listContainer.firstChild) {
      listContainer.removeChild(listContainer.firstChild);
    }
    totalRecord.forEach((item) => {
      listContainer.appendChild(item);
    });
  }
}

function fetchCoinList() {
  fetchAPI(
    'https://x8ki-letl-twmt.n7.xano.io/api:D1epqX-m:v1/products',
    'GET',
    token
  )
    .then((data) => {
      if (data?.message) {
        showToast('alert-toast-container', data.message, 'danger');
      } else {
        coinListData = data.data;
        populateCoin(data.data);
      }
    })
    .catch((error) => {
      console.error(error);
      populateCoin(coinListData);
    });
}

// Add a submit event listener to the form
buyTopupForm.addEventListener('submit', function (event) {
  event.preventDefault();

  let useBtn = document.getElementById('submit-topup-btn');
  let defaultBtnText = useBtn.innerHTML;

  useBtn.disabled = true;
  useBtn.innerHTML = spinnerLoading(useBtn.innerHTML);

  if (selectedTopupItem == null) {
    showToast(
      'alert-toast-container',
      'In order to continue, please pick one of the product items',
      'danger'
    );
    useBtn.disabled = false;
    useBtn.innerHTML = defaultBtnText;
    return;
  }

  const options = {
    body: JSON.stringify({
      success_url: successUrl,
      cancel_url: cancelUrl,
      line_items: [
        {
          price: selectedTopupItem.default_price,
          quantity: 1,
        },
      ],
      metadata: {
        user_id: myData.userData.id,
        coin_amount: selectedTopupItem.metadata.coin_amount,
        type: selectedTopupItem.metadata.type,
      },
    }),
  };

  fetchAPI(
    'https://x8ki-letl-twmt.n7.xano.io/api:9HYpvh_0:v1/sessions',
    'POST',
    token,
    options
  )
    .then((data) => {
      if (data?.message) {
        showToast('alert-toast-container', data.message, 'danger');
      } else {
        if (data.hasOwnProperty('url') && data.url !== null) {
          var checkoutUrl = data.url;
          window.location.href = checkoutUrl;
        } else {
          showToast(
            'alert-toast-container',
            'Url not found in the response data',
            'danger'
          );
        }
      }
      useBtn.disabled = false;
      useBtn.innerHTML = defaultBtnText;
    })
    .catch((error) => {
      useBtn.disabled = false;
      useBtn.innerHTML = defaultBtnText;
    });
});

let selectedVisibilityItem = null;
var visibilityListData = [];

const retryVisibility = document.getElementById('retry-visibility-btn');
retryVisibility.addEventListener('click', firstCall);

function populateVisibility(allData = []) {
  const listLoader = document.getElementById('visibility-list-loader');
  const listEmpty = document.getElementById('visibility-list-empty');
  const listContainer = document.getElementById('visibility-list-container');
  const listBody = document.getElementById('visibility-list-body');

  var totalRecord = [];

  allData.forEach((item) => {
    const card = listBody.cloneNode(true);
    const divs = card.getElementsByTagName('div');

    const title = divs[0].getElementsByTagName('h7');
    const cointAmount = divs[0].getElementsByTagName('h6');
    title[0].innerHTML = item.title;
    cointAmount[0].innerHTML = `${item.coin_amount} <i class="fas fa-coins"></i>`;

    if (selectedVisibilityItem?.id == item.id) {
      divs[0].style.backgroundColor = '#f8f9fc';
      divs[0].style.border = '1px solid #4d72de';
      divs[0].style.borderRadius = '5px';
    } else {
      divs[0].style.backgroundColor = null;
      divs[0].style.border = null;
      divs[0].style.borderRadius = null;
    }

    divs[0].addEventListener('click', function () {
      selectedVisibilityItem = item;
      populateVisibility(visibilityListData); // update background color
    });

    totalRecord.push(card);
  });

  listLoader.classList.add('hidden');

  if (totalRecord.length === 0) {
    listEmpty.classList.remove('hidden');
    listContainer.classList.add('hidden');
  } else {
    listEmpty.classList.add('hidden');
    listContainer.classList.remove('hidden');

    while (listContainer.firstChild) {
      listContainer.removeChild(listContainer.firstChild);
    }
    totalRecord.forEach((item) => {
      listContainer.appendChild(item);
    });
  }
}

var submitChannelBtn = document.getElementById('submit-channel-btn');
let selectedChannelItem = null;
var channelListData = [];

function populateChannel() {
  const listLoader = document.getElementById('channel-list-loader');
  const listEmpty = document.getElementById('channel-list-empty');
  const listContainer = document.getElementById('channel-list-container');
  const listBody = document.getElementById('channel-list-body');

  var totalRecord = [];

  channelListData.forEach((item) => {
    const card = listBody.cloneNode(true);
    const divs = card.getElementsByTagName('div');

    let viewURL = '';
    let exists = false;

    for (let i = 0; i < selectedJob.telegram_data.length; i++) {
      if (selectedJob.telegram_data[i].channel_id === item.id) {
        exists = true;
        viewURL = `${item.url}/${selectedJob.telegram_data[i].message_id}`;
        break;
      }
    }

    const channelContainer = divs[0];
    channelContainer.innerHTML = ''; // Clear existing posts

    const mainContainer = document.createElement('div');
    mainContainer.className = 'card-body d-flex justify-content-between';

    const firstRow = document.createElement('div');

    const telegramImage = document.createElement('img');
    telegramImage.src = 'https://telegram.org/img/t_logo.png';
    telegramImage.className = 'mr-2';
    telegramImage.width = 25;
    telegramImage.height = 25;

    firstRow.appendChild(telegramImage);

    const elementH7 = document.createElement('h7');
    elementH7.className = 'align-middle';
    elementH7.innerHTML = `${item.name}`;
    firstRow.appendChild(elementH7);

    const secondRow = document.createElement('div');

    if (exists) {
      const channelViewButton = document.createElement('button');
      channelViewButton.className = 'btn btn-outline-primary ml-1';
      channelViewButton.type = 'button';
      channelViewButton.style.border = 'none';
      const channelViewIcon = document.createElement('i');
      channelViewIcon.className = 'fa fa-paper-plane';
      channelViewButton.appendChild(channelViewIcon);
      channelViewButton.addEventListener('click', function () {
        window.open(viewURL, '_blank');
      });

      secondRow.appendChild(channelViewButton);
    }

    const channelShareButton = document.createElement('button');
    channelShareButton.className = 'btn btn-outline-secondary ml-1';
    channelShareButton.type = 'button';
    channelShareButton.style.border = 'none';
    const channelShareIcon = document.createElement('i');
    channelShareIcon.className = 'fa fa-eye';
    channelShareIcon.addEventListener('click', () => {});
    channelShareButton.appendChild(channelShareIcon);
    channelShareButton.addEventListener('click', function () {
      window.open(item.url, '_blank');
    });
    secondRow.appendChild(channelShareButton);

    mainContainer.appendChild(firstRow);
    mainContainer.appendChild(secondRow);

    channelContainer.appendChild(mainContainer);

    if (selectedChannelItem?.id == item.id) {
      channelContainer.style.backgroundColor = '#f8f9fc';
      channelContainer.style.border = '1px solid #4d72de';
      channelContainer.style.borderRadius = '5px';

      if (exists) {
        submitChannelBtn.innerHTML = 'Unshare';
        submitChannelBtn.classList.remove('btn-primary');
        submitChannelBtn.classList.add('btn-danger');
      } else {
        submitChannelBtn.innerHTML = 'Share Now';
        submitChannelBtn.classList.remove('btn-danger');
        submitChannelBtn.classList.add('btn-primary');
      }
    } else {
      channelContainer.style.backgroundColor = null;
      channelContainer.style.border = null;
      channelContainer.style.borderRadius = null;
    }

    channelContainer.addEventListener('click', function () {
      selectedChannelItem = item;
      populateChannel(); // update background color
    });

    totalRecord.push(card);
  });

  listLoader.classList.add('hidden');

  if (totalRecord.length === 0) {
    listEmpty.classList.remove('hidden');
    listContainer.classList.add('hidden');
  } else {
    listEmpty.classList.add('hidden');
    listContainer.classList.remove('hidden');

    while (listContainer.firstChild) {
      listContainer.removeChild(listContainer.firstChild);
    }
    totalRecord.forEach((item) => {
      listContainer.appendChild(item);
    });
  }
}

// Add a submit event listener to the form
channelForm.addEventListener('submit', function (event) {
  event.preventDefault();

  let defaultBtnText = submitChannelBtn.innerHTML;
  let useBtn = submitChannelBtn;

  useBtn.disabled = true;
  useBtn.innerHTML = spinnerLoading(useBtn.innerHTML);

  if (selectedChannelItem?.id == null) {
    showToast(
      'alert-toast-container',
      'Please select a channel in order to proceed.',
      'danger'
    );
    useBtn.disabled = false;
    useBtn.innerHTML = defaultBtnText;
    return;
  }

  const options = {
    body: JSON.stringify({
      custom_id: selectedJob.custom_id,
      channel_id: selectedChannelItem.id,
    }),
  };

  fetchAPI(
    'https://x8ki-letl-twmt.n7.xano.io/api:P5dHgbq7/post/share',
    'POST',
    token,
    options
  )
    .then((data) => {
      if (data?.message) {
        // delay of 2 seconds before calling fetchMyEmployer
        setTimeout(() => {
          useBtn.disabled = false;
          useBtn.innerHTML = defaultBtnText;
          showToast('alert-toast-container', data.message, 'danger');
        }, 2000);
      } else {
        // delay of 2 seconds before calling fetchMyEmployer
        setTimeout(() => {
          fetchMyEmployer();
          setTimeout(() => {
            showToast('alert-toast-container', data.status_message, 'success');
            useBtn.disabled = false;
            useBtn.innerHTML = defaultBtnText;
          }, 2000);
        }, 2000);
      }
    })
    .catch((error) => {
      useBtn.disabled = false;
      useBtn.innerHTML = defaultBtnText;
    });
});

var selectedApplicants = [];

function populateApplicantModalList() {
  const listLoader = document.getElementById('applicant-list-loader');
  const listEmpty = document.getElementById('applicant-list-empty');
  const listContainer = document.getElementById('applicant-list-container');
  const listBody = document.getElementById('applicant-list-body');

  var totalRecord = [];

  selectedApplicants.forEach((item) => {
    const card = listBody.cloneNode(true);
    const divs = card.getElementsByTagName('div');

    const channelContainer = divs[0];
    channelContainer.innerHTML = ''; // Clear existing posts

    const mainContainer = document.createElement('div');
    mainContainer.className = 'card-body d-flex justify-content-between';

    const firstRow = document.createElement('div');
    const elementH7 = document.createElement('h7');
    const elementDetail_1 = document.createElement('h6');
    const elementDetail_2 = document.createElement('h6');

    elementH7.className = 'align-middle text-gray-800';

    if (item.profile_data) {
      const fullName = item.profile_data.is_unlocked
        ? item.profile_data.full_name
        : item.profile_data.mask_full_name;
      const truncatedName =
        fullName.length > 3 ? fullName.slice(0, 15) + '...' : fullName;

      elementH7.innerHTML = `<b>${truncatedName}</b>`;

      elementH7.addEventListener('click', function () {
        if (item.profile_data) {
          window.open(
            `user-profile.html?custom_id=${item.profile_data.custom_id}`,
            '_blank'
          );
        } else {
          showToast(
            'alert-toast-container',
            'Profile has been deleted.',
            'danger'
          );
        }
      });

      var created_at = new Date(item.created_at);
      var timeAgo = moment(created_at).fromNow(true);
      elementDetail_1.className = 'mb-0';
      elementDetail_1.innerHTML = `Applied: ${timeAgo} ago`;

      elementDetail_2.innerHTML = `Status: <span class="badge badge-pill badge-${
        status_list_options[item.application_status_code].theme
      }">${status_list_options[item.application_status_code].name}</span>`;
    } else {
      elementH7.innerHTML = `Deleted Profile`;
    }

    const secondRow = document.createElement('div');

    //  create button element
    const buttonParent = document.createElement('button');
    buttonParent.classList.add('btn', 'btn-primary', 'dropdown-toggle');
    buttonParent.setAttribute('type', 'button');
    buttonParent.setAttribute('id', 'dropdownMenu2');
    buttonParent.setAttribute('data-toggle', 'dropdown');
    buttonParent.setAttribute('aria-haspopup', 'true');
    buttonParent.setAttribute('aria-expanded', 'false');
    buttonParent.textContent = 'Update';

    // create dropdown menu element
    const dropdownMenu = document.createElement('div');
    dropdownMenu.classList.add('dropdown-menu');
    dropdownMenu.setAttribute('aria-labelledby', 'dropdownMenu2');

    // Convert the object into an array of key-value pairs
    const optionsArray = Object.entries(status_list_options);

    optionsArray.forEach(([key, option]) => {
      if (option.is_job_seeker == false) {
        const buttonChild = document.createElement('button');
        buttonChild.classList.add('dropdown-item');
        buttonChild.setAttribute('type', 'button');
        buttonChild.textContent = option.name;
        buttonChild.setAttribute('value', option.code);
        buttonChild.addEventListener('click', () => {
          changeApplicantStatus(item.id, option.code, buttonParent);
        });

        const currentStatus = item.application_status_code;
        const loopStatus = option.code;

        const statusesToHide = {
          pending: ['pending'],
          withdraw: [
            'pending',
            'withdraw',
            'selected_for_interview',
            'offered',
            'not_selected',
          ],
          selected_for_interview: ['selected_for_interview'],
          offered: ['offered'],
          not_selected: ['not_selected'],
        };

        const isLoopStatusInStatusesToHide = statusesToHide[currentStatus]
          ? statusesToHide[currentStatus].includes(loopStatus)
          : statusesToHide.default.includes(loopStatus);

        buttonChild.disabled = isLoopStatusInStatusesToHide;

        dropdownMenu.appendChild(buttonChild);
      }
    });

    const viewBtn = document.createElement('button');
    viewBtn.className = 'btn btn-outline-primary  mr-1';
    viewBtn.type = 'button';
    viewBtn.style.border = 'none';
    const viewIcon = document.createElement('i');
    viewIcon.className = 'fa fa-external-link-alt';
    viewBtn.appendChild(viewIcon);
    viewBtn.addEventListener('click', () => {
      if (item.profile_data) {
        window.open(
          `user-profile.html?custom_id=${item.profile_data.custom_id}`,
          '_blank'
        );
      } else {
        showToast(
          'alert-toast-container',
          'Profile has been deleted.',
          'danger'
        );
      }
    });

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'btn btn-outline-danger  mr-1';
    deleteBtn.type = 'button';
    deleteBtn.style.border = 'none';
    const deleteIcon = document.createElement('i');
    deleteIcon.className = 'fa fa-trash';
    deleteBtn.appendChild(deleteIcon);
    deleteBtn.addEventListener('click', () => {
      var confirmDelete = confirm(
        'Are you sure you want to delete this application? This action cannot be undone.'
      );
      if (confirmDelete) {
        deleteApplicant(item, deleteBtn, deleteBtn.innerHTML);
      }
    });

    buttonParent.appendChild(dropdownMenu);

    firstRow.appendChild(elementH7);
    firstRow.appendChild(elementDetail_1);
    firstRow.appendChild(elementDetail_2);

    secondRow.appendChild(viewBtn);
    secondRow.appendChild(deleteBtn);
    secondRow.appendChild(buttonParent);
    mainContainer.appendChild(firstRow);
    mainContainer.appendChild(secondRow);

    channelContainer.appendChild(mainContainer);
    channelContainer.addEventListener('click', function () {});

    totalRecord.push(card);
  });

  listLoader.classList.add('hidden');

  if (totalRecord.length === 0) {
    listEmpty.classList.remove('hidden');
    listContainer.classList.add('hidden');
  } else {
    listEmpty.classList.add('hidden');
    listContainer.classList.remove('hidden');

    while (listContainer.firstChild) {
      listContainer.removeChild(listContainer.firstChild);
    }
    totalRecord.forEach((item) => {
      listContainer.appendChild(item);
    });
  }
}

function handleRedeem(item, useBtn) {
  let defaultBtnText = useBtn.innerHTML;

  useBtn.disabled = true;
  useBtn.innerHTML = spinnerLoading(useBtn.innerHTML);

  const options = {
    body: JSON.stringify({
      coupon_id: item.id,
      coupon_custom_id: item.custom_id,
    }),
  };

  fetchAPI(
    `https://x8ki-letl-twmt.n7.xano.io/api:P5dHgbq7/coupon_usage`,
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
        setTimeout(() => {
          firstCall();
          scrollToTop();
          showToast(
            'alert-toast-container',
            'Coupon applied successfully!',
            'success'
          );
          useBtn.disabled = false;
          useBtn.innerHTML = defaultBtnText;
        }, 2000);
      }
    })
    .catch((error) => {
      useBtn.disabled = false;
      useBtn.innerHTML = defaultBtnText;
      console.log('error', error);
    });
}

document
  .getElementById('refresh-coupon-list')
  .addEventListener('click', firstCall);

function populateCouponDashboard(coupon_list, coupon_usage) {
  for (let i = 0; i < coupon_list.length; i++) {
    coupon_list[i].used = false;
    for (let x = 0; x < coupon_usage.length; x++) {
      if (coupon_list[i].id == coupon_usage[x].coupon_id) {
        coupon_list[i].used = true;
        break; // No need to check further, exit the loop
      }
    }
  }

  const loadingChannelCard = document.getElementById(
    'home-coupon-list-loading'
  );
  const emptyCard = document.getElementById('home-coupon-list-empty');
  const parentTable = document.getElementById('home-coupon-list-parent');
  const style = document.getElementById('home-coupon-list-child');
  const emptyDiv = [];

  coupon_list.forEach(function (item) {
    const card = style.cloneNode(true);
    const divs = card.getElementsByTagName('div');

    const title = divs[0].getElementsByTagName('h5');
    const description = divs[0].getElementsByTagName('h6');

    // Clear existing child elements
    divs[2].innerHTML = '';

    // create button element
    const useBtn = document.createElement('button');
    useBtn.setAttribute('type', 'button');

    if (item.type == 'coin') {
      title[0].innerHTML = `Free ${item.amount} tokens`;
      description[0].innerHTML = `${item.name}`;

      if (item.used == true) {
        useBtn.classList.add('btn', 'btn-outline-secondary');
        useBtn.innerHTML = 'Claimed';
        useBtn.addEventListener('click', function () {
          handleRedeem(item, useBtn);
        });
      } else {
        useBtn.classList.add('btn', 'btn-outline-primary');
        useBtn.innerHTML = 'Claim Now';
        useBtn.addEventListener('click', function () {
          handleRedeem(item, useBtn);
        });
      }
    } else {
      title[0].innerHTML = `${item.amount}% 0ff`;
      description[0].innerHTML = `${item.name}`;
      useBtn.classList.add('btn', 'btn-outline-primary');
      useBtn.innerHTML = '<i class="fa fa-copy mr-1"></i> Copy Code';
      useBtn.addEventListener('click', function () {
        navigator.clipboard
          .writeText(item.code)
          .then(() => {
            useBtn.innerHTML = '<i class="fa fa-check mr-1"></i> Copied!';
          })
          .catch((error) => {
            console.error('Failed to copy link: ', error);
          });
      });
    }

    divs[2].appendChild(useBtn);

    emptyDiv.push(card);
  });

  loadingChannelCard.classList.add('hidden');

  if (emptyDiv.length === 0) {
    emptyCard.classList.remove('hidden');
    parentTable.classList.add('hidden');
  } else {
    emptyCard.classList.add('hidden');
    parentTable.classList.remove('hidden');

    while (parentTable.firstChild) {
      parentTable.removeChild(parentTable.firstChild);
    }
    emptyDiv.forEach((item) => {
      parentTable.appendChild(item);
    });
  }
}

function populateChannelDashboard(data) {
  const loadingChannelCard = document.getElementById(
    'home-channel-list-loading'
  );
  const emptyCard = document.getElementById('home-channel-list-empty');
  const parentTable = document.getElementById('home-channel-list-parent');
  const style = document.getElementById('home-channel-list-child');
  const emptyDiv = [];

  data.forEach(function (item) {
    const card = style.cloneNode(true);
    const divs = card.getElementsByTagName('div');

    const title = divs[0].getElementsByTagName('a');
    const subscribers = divs[0].getElementsByTagName('h7');
    const description = divs[0].getElementsByTagName('p');

    // const telegramImage = document.createElement('img');
    // telegramImage.src = 'https://telegram.org/img/t_logo.png';
    // telegramImage.className = 'mr-2';
    // telegramImage.width = 25;
    // telegramImage.height = 25;

    if (item.is_new) {
      title[0].innerHTML = `${item.name} <span class="badge badge-danger">New</span>`;
    } else {
      title[0].innerHTML = `${item.name}`;
    }

    title[0].setAttribute('href', item.url);
    title[1].innerHTML = 'Visit Channel';

    if (item.source_code === 'job_list') {
      subscribers[0].innerHTML = `${item.source_name}`;
    } else {
      subscribers[0].innerHTML = `${item.source_name} ∙ ${item.total_subscribers} subscribers`;
    }
    description[0].innerHTML = item.description;
    title[1].setAttribute('href', item.url);

    emptyDiv.push(card);
  });

  loadingChannelCard.classList.add('hidden');

  if (emptyDiv.length === 0) {
    emptyCard.classList.remove('hidden');
    parentTable.classList.add('hidden');
  } else {
    emptyCard.classList.add('hidden');
    parentTable.classList.remove('hidden');

    while (parentTable.firstChild) {
      parentTable.removeChild(parentTable.firstChild);
    }
    emptyDiv.forEach((item) => {
      parentTable.appendChild(item);
    });
  }
}

// Add a submit event listener to the form
visibilityForm.addEventListener('submit', function (event) {
  event.preventDefault();

  let useBtn = document.getElementById('submit-visibility-btn');
  let defaultBtnText = useBtn.innerHTML;

  useBtn.disabled = true;
  useBtn.innerHTML = spinnerLoading(useBtn.innerHTML);

  if (selectedVisibilityItem == null) {
    showToast(
      'alert-toast-container',
      'In order to continue, please pick one of the visibility items',
      'danger'
    );
    useBtn.disabled = false;
    useBtn.innerHTML = defaultBtnText;
    return;
  }

  const options = {
    body: JSON.stringify({
      custom_id: selectedJob.custom_id,
      visibility_id: selectedVisibilityItem.id,
    }),
  };

  fetchAPI(
    'https://x8ki-letl-twmt.n7.xano.io/api:P5dHgbq7/post/visibility',
    'PUT',
    token,
    options
  )
    .then((data) => {
      if (data?.message) {
        showToast('alert-toast-container', data.message, 'danger');
        useBtn.disabled = false;
        useBtn.innerHTML = defaultBtnText;
      } else {
        firstCall();
        setTimeout(() => {
          useBtn.disabled = false;
          useBtn.innerHTML = defaultBtnText;
          showToast(
            'alert-toast-container',
            'Visibility added successfully',
            'success'
          );
          $('#visibilityModal').modal('hide');
        }, 2000);
      }
    })
    .catch((error) => {
      useBtn.disabled = false;
      useBtn.innerHTML = defaultBtnText;
    });
});

const loadingIcon =
  '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>';
const loadingText =
  '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Loading...';

var adminJobListState = [];
var adminOpenJobId = null;

function adminFilterJob() {
  if (adminOpenJobId !== null) {
    var currentJob = {};

    adminJobListState.map((item) => {
      if (item.id === adminOpenJobId) {
        currentJob = item;
      }
    });
  }
}

var slot_type_edit = document.getElementById('input-edit-slot-type');
var company_name_edit = document.getElementById('input-edit-company-name');
var title_edit = document.getElementById('input-edit-job-title');
var job_type_edit = document.getElementById('input-edit-job-type');
var min_salary_edit = document.getElementById('input-edit-job-min-salary');
var max_salary_edit = document.getElementById('input-edit-job-max-salary');
var salary_type_edit = document.getElementById('input-edit-job-salary-type');
var requirement_edit = document.getElementById('input-edit-job-requirement');
var benefit_edit = document.getElementById('input-edit-job-benefit');
var additional_info_edit = document.getElementById(
  'input-edit-job-additional-info'
);
var location_edit = document.getElementById('input-edit-job-location');
var apply_type_edit = document.getElementById('input-edit-apply-type');
var external_apply_link_edit = document.getElementById('input-edit-job-url');
var containerEditJobUrl = document.getElementById('container-edit-job-url');

Object.entries(typeName).forEach(([key, option]) => {
  const optionElement = document.createElement('option');
  optionElement.value = option.id;
  optionElement.text = option.name;
  slot_type_edit.appendChild(optionElement);
});

apply_type_edit.addEventListener('change', function () {
  const selectedValue = this.value;
  if (selectedValue === 'external') {
    containerEditJobUrl.style.display = 'block';
    external_apply_link_edit.disabled = false;
  } else {
    containerEditJobUrl.style.display = 'none';
    external_apply_link_edit.disabled = true;
  }
});

document
  .getElementById('edit-job-form')
  .addEventListener('submit', function (e) {
    e.preventDefault();

    let useBtn = document.getElementById('submit-edit-job-btn');
    let defaultBtnText = useBtn.innerHTML;

    useBtn.disabled = true;
    useBtn.innerHTML = spinnerLoading(useBtn.innerHTML);

    if (token) {
      if (min_salary_edit.value) {
        if (min_salary_edit.value <= max_salary_edit.value) {
          // proceed
        } else {
          showToast(
            'alert-toast-container',
            'Maximum salary should be greater or equal to minimum salary',
            'danger'
          );
          useBtn.disabled = false;
          useBtn.innerHTML = defaultBtnText;
          return;
        }
      }

      const options = {
        body: JSON.stringify({
          custom_id: selectedJob.custom_id,
          title: title_edit.value,
          type: job_type_edit.value,
          min_salary: min_salary_edit.value,
          max_salary: max_salary_edit.value,
          salary_type: salary_type_edit.value,
          location: location_edit.value,
          requirement: requirement_edit.value,
          benefit: benefit_edit.value,
          additional_info: additional_info_edit.value,
          external_apply_link: external_apply_link_edit.value,
          is_external_apply: apply_type_edit.value == 'external' ? true : false,
        }),
      };

      fetchAPI(
        'https://x8ki-letl-twmt.n7.xano.io/api:P5dHgbq7/post/edit',
        'PUT',
        token,
        options
      )
        .then((data) => {
          if (data?.message) {
            showToast('alert-toast-container', data.message, 'danger');
            useBtn.disabled = false;
            useBtn.innerHTML = defaultBtnText;
          } else {
            // delay of 2 seconds before calling fetchMyEmployer
            setTimeout(() => {
              fetchMyEmployer();
              $('#editJobModal').modal('hide');
              useBtn.disabled = false;
              useBtn.innerHTML = defaultBtnText;
            }, 2000);
          }
        })
        .catch((error) => {
          $('#addJobModal').modal('hide');
          useBtn.disabled = false;
          useBtn.innerHTML = defaultBtnText;
        });
    }
  });

var changeApplicantStatusloading = false;

function changeApplicantStatus(applicationId, applicationStatusCode, passBtn) {
  if (changeApplicantStatusloading) {
    showToast(
      'alert-toast-container',
      'Status update is still in progress. Please wait...',
      'danger'
    );
  } else {
    const options = {
      body: JSON.stringify({
        application_id: applicationId,
        application_status_code: applicationStatusCode,
      }),
    };
    changeApplicantStatusloading = true;
    passBtn.innerHTML = loadingText;
    fetchAPI(
      `https://x8ki-letl-twmt.n7.xano.io/api:P5dHgbq7/application/update_status`,
      'PUT',
      token,
      options
    )
      .then((data) => {
        if (data?.message) {
          showToast('alert-toast-container', data.message, 'danger');
          changeApplicantStatusloading = false;
          passBtn.innerHTML = 'Status';
        } else {
          setTimeout(() => {
            firstCall();
            changeApplicantStatusloading = false;
            passBtn.innerHTML = 'Status';
          }, 2000);
        }
      })
      .catch((error) => {
        changeApplicantStatusloading = false;
        passBtn.innerHTML = 'Status';
      });
  }
}

function deleteApplicant(passData, passBtn, passBtnDefaultText) {
  if (loading) {
    showToast(
      'alert-toast-container',
      'Deletion is still in progress. Please wait...',
      'danger'
    );
  } else {
    loading = true;
    passBtn.disabled = true;
    passBtn.innerHTML = loadingIcon;

    fetchAPI(
      `https://x8ki-letl-twmt.n7.xano.io/api:P5dHgbq7/application/${passData.id}`,
      'DELETE',
      token
    )
      .then((data) => {
        if (data?.message) {
          showToast('alert-toast-container', data.message, 'danger');
          passBtn.disabled = false;
          passBtn.innerHTML = passBtnDefaultText;
          loading = false;
        } else {
          setTimeout(() => {
            firstCall();
            setTimeout(() => {
              passBtn.disabled = false;
              passBtn.innerHTML = passBtnDefaultText;
              loading = false;
            }, 1000);
          }, 2000);
        }
      })
      .catch((error) => {
        passBtn.disabled = false;
        passBtn.innerHTML = passBtnDefaultText;
        loading = false;
      });
  }
}

var unlockProfileLoading = false;

function unlockProfile(profileId, passBtn, passBtnDefaultText) {
  if (
    confirm(
      'Are you sure you want to unlock this profile? This action cannot be undone.'
    )
  ) {
  } else {
    return;
  }

  if (unlockProfileLoading) {
    showToast(
      'alert-toast-container',
      'Unlock profile is still in progress. Please wait...',
      'danger'
    );
  } else {
    const options = {
      body: JSON.stringify({
        profile_id: profileId,
      }),
    };
    unlockProfileLoading = true;
    passBtn.innerHTML = loadingText;
    fetchAPI(
      `https://x8ki-letl-twmt.n7.xano.io/api:P5dHgbq7/user/unlock/profile`,
      'POST',
      token,
      options
    )
      .then((data) => {
        if (data?.message) {
          showToast('alert-toast-container', data.message, 'danger');
          unlockProfileLoading = false;
          passBtn.innerHTML = passBtnDefaultText;
        } else {
          setTimeout(() => {
            firstCall();
            unlockProfileLoading = false;
            passBtn.innerHTML = passBtnDefaultText;
          }, 2000);
        }
      })
      .catch((error) => {
        unlockProfileLoading = false;
        passBtn.innerHTML = passBtnDefaultText;
      });
  }
}

function editForm(item) {
  selectedJob = item;
  if (item.is_free) {
    containerEditJobUrl.style.display = 'none';
    slot_type_edit.value = typeName.type_1.id;
    apply_type_edit.value = 'internal';
    apply_type_edit.disabled = true;
    external_apply_link_edit.disabled = true;
  } else {
    containerEditJobUrl.style.display = 'block';
    slot_type_edit.value = typeName.type_2.id;
    apply_type_edit.value =
      item.is_external_apply == true ? 'external' : 'internal';
    apply_type_edit.disabled = false;

    if (item.is_external_apply == true) {
      containerEditJobUrl.style.display = 'block';
      external_apply_link_edit.disabled = false;
    } else {
      containerEditJobUrl.style.display = 'none';
      external_apply_link_edit.disabled = true;
    }
  }

  document.getElementById('input-edit-company-name').value =
    item.company_data.name;
  document.getElementById('input-edit-job-title').value = item.title;
  document.getElementById('input-edit-job-type').value = item.type;
  document.getElementById('input-edit-job-min-salary').value = item.min_salary;
  document.getElementById('input-edit-job-max-salary').value = item.max_salary;
  document.getElementById('input-edit-job-salary-type').value =
    item.salary_type;
  document.getElementById('input-edit-job-requirement').value =
    item.requirement;
  document.getElementById('input-edit-job-benefit').value = item.benefit;
  document.getElementById('input-edit-job-additional-info').value =
    item.additional_info;
  document.getElementById('input-edit-job-location').value = item.location;
  document.getElementById('input-edit-job-url').value =
    item.external_apply_link;
}

var loading = false;

function publishPost(passData, useBtn) {
  let defaultBtnText = useBtn.innerHTML;
  useBtn.disabled = true;
  useBtn.innerHTML = spinnerLoading(useBtn.innerHTML);

  const options = {
    body: JSON.stringify({
      custom_id: passData.custom_id,
    }),
  };

  fetchAPI(
    `https://x8ki-letl-twmt.n7.xano.io/api:P5dHgbq7/post/publish`,
    'PUT',
    token,
    options
  )
    .then((data) => {
      if (data?.message) {
        showToast('alert-toast-container', data.message, 'danger');
        useBtn.disabled = false;
        useBtn.innerHTML = defaultBtnText;
      } else {
        setTimeout(() => {
          firstCall();
          useBtn.disabled = false;
          useBtn.innerHTML = defaultBtnText;
          showToast('alert-toast-container', data.custom_message, 'success');
        }, 2000);
      }
    })
    .catch((error) => {
      useBtn.disabled = false;
      useBtn.innerHTML = passBtnDefaultText;
    });
}

function renewPost(item, useBtn) {
  let defaultBtnText = useBtn.innerHTML;

  useBtn.disabled = true;
  useBtn.innerHTML = spinnerLoading(useBtn.innerHTML);

  fetchAPI(
    `https://x8ki-letl-twmt.n7.xano.io/api:P5dHgbq7/post/renew/${item.id}`,
    'PUT',
    token
  )
    .then((data) => {
      if (data?.message) {
        showToast('alert-toast-container', data.message, 'danger');
        useBtn.disabled = false;
        useBtn.innerHTML = defaultBtnText;
      } else {
        setTimeout(() => {
          firstCall();
          showToast(
            'alert-toast-container',
            'Post renewed successfully!',
            'success'
          );
          useBtn.disabled = false;
          useBtn.innerHTML = defaultBtnText;
        }, 2000);
      }
    })
    .catch((error) => {
      useBtn.disabled = false;
      useBtn.innerHTML = defaultBtnText;
      console.log('error', error);
    });
}

function deletePost(item, useBtn) {
  var confirmDelete = confirm(
    `Are you sure you want to delete this post? deleting it will remove all associated applicants and this action cannot be undone. To proceed, click "OK" button`
  );

  if (confirmDelete) {
    let defaultBtnText = useBtn.innerHTML;

    useBtn.disabled = true;
    useBtn.innerHTML = spinnerLoading(useBtn.innerHTML);

    fetchAPI(
      `https://x8ki-letl-twmt.n7.xano.io/api:P5dHgbq7/post/delete/${item.id}`,
      'DELETE',
      token
    )
      .then((data) => {
        if (data?.message) {
          showToast('alert-toast-container', data.message, 'danger');
          useBtn.disabled = false;
          useBtn.innerHTML = defaultBtnText;
        } else {
          setTimeout(() => {
            firstCall();
            showToast(
              'alert-toast-container',
              'Post deleted successfully!',
              'success'
            );
            useBtn.disabled = false;
            useBtn.innerHTML = defaultBtnText;
          }, 2000);
        }
      })
      .catch((error) => {
        useBtn.disabled = false;
        useBtn.innerHTML = defaultBtnText;
        console.log('error', error);
      });
  }
}

function populateEmployerNotification(data) {
  const loadingCard = document.getElementById(
    'home-employer-notification-loading'
  );
  const emptyCard = document.getElementById('home-employer-notification-empty');
  const parentTable = document.getElementById(
    'home-employer-notification-parent'
  );
  const style = document.getElementById('home-employer-notification-child');
  const emptyDiv = [];

  data.reverse().forEach(function (item) {
    const card = style.cloneNode(true);

    const spanText = card.getElementsByTagName('span');

    spanText[0].innerHTML = `<b>${
      item?.post_data
        ? item.post_data.title.length > 20
          ? item.post_data.title.slice(0, 20) + '...'
          : item.post_data.title
        : 'Post no longer exists'
    }</b>`;

    spanText[0].addEventListener('click', function () {
      document.querySelector('#my-job-tab').click();
    });
    spanText[1].innerHTML = `${item.message}`;

    const smallText = card.getElementsByTagName('small');
    var created_at = new Date(item.created_at);
    var timeAgo = moment(created_at).fromNow(true);
    smallText[0].innerHTML = `${timeAgo} ago`;

    emptyDiv.push(card);
  });

  loadingCard.classList.add('hidden');

  if (emptyDiv.length === 0) {
    emptyCard.classList.remove('hidden');
    parentTable.classList.add('hidden');
  } else {
    emptyCard.classList.add('hidden');
    parentTable.classList.remove('hidden');

    while (parentTable.firstChild) {
      parentTable.removeChild(parentTable.firstChild);
    }
    emptyDiv.forEach((item) => {
      parentTable.appendChild(item);
    });
  }
}

function fetchMyEmployer() {
  fetchAPI(
    'https://x8ki-letl-twmt.n7.xano.io/api:P5dHgbq7/post/master/employer',
    'GET',
    token
  )
    .then((data) => {
      if (data?.message) {
        showToast('alert-toast-container', data.message, 'danger');
      } else {
        fetchCoinList();

        const progressContainer = document.getElementById(
          'employer-profile-progress-bar'
        );
        const progressContainerTitle = document.getElementById(
          'employer-profile-progress-title'
        );
        const profileVisibilitySummary = document.getElementById(
          'profile-visibility-summary'
        );

        let percentageProgress = '0%';

        if (data.company_data) {
          percentageProgress = data.company_data.progress_percentage;
          profileVisibility = data.company_data.profile_visibility;

          profileVisibilitySummary.innerHTML = data.company_data
            .profile_visibility
            ? 'Public'
            : 'Private';
        }

        progressContainer.style.width = `${percentageProgress}%`;
        progressContainer.innerHTML = `${percentageProgress}%`;
        progressContainerTitle.innerHTML = `Your company profile is ${percentageProgress}% done`;
        document
          .getElementById('update-employer-profile-btn')
          .addEventListener('click', () => {
            location.href = 'profile?code=company_profile';
          });

        if (data.company_data !== null) {
          company_data = data.company_data;
          company_name_create.value = data.company_data.name;
        } else {
          company_data = null;
        }

        const emptyCard = document.getElementById('my-job-card-empty');
        const parentTable = document.getElementById('my-job-card-list-parent');
        const style = document.getElementById('my-job-card-list-child');
        const emptyDiv = [];

        populateEmployerNotification(data.notification_list);

        if (data?.channel_list) {
          channelListData = data.channel_list;
          populateChannelDashboard(data.channel_list);
        }

        if (data?.coupon_list) {
          populateCouponDashboard(
            data.coupon_list,
            data.user_data.coupon_usage_data
          );
        }

        const profileUnlockBalance = document.getElementById(
          'profile-unlock-balance'
        );
        const topupModalBalance = document.getElementById(
          'topup-modal-balance'
        );

        if (data.coin_balance > 1) {
          profileUnlockBalance.innerHTML = `<b>${data.coin_balance}</b> <small>Tokens</small>`;
        } else {
          profileUnlockBalance.innerHTML = `<b>${data.coin_balance}</b> <small>Token</small>`;
        }

        topupModalBalance.innerHTML = `Balance: <i class="fas fa-coins"></i>  ${data.coin_balance}`;

        populateVisibility(data?.visibility_list);
        visibilityListData = data?.visibility_list;

        let totalApplications = 0;
        let totalPublishPost = 0;

        data.post_list.map((item) => {
          const applicant_list = data.application_list.filter(
            (app) => app.post_id === item.id
          );

          applicant_list.forEach((applicant) => {
            const isUnlocked = data.user_data.unlocked_profile.some(
              (unlockedProf) => unlockedProf.profile_id === applicant.profile_id
            );
            if (applicant.profile_data) {
              applicant.profile_data.is_unlocked = isUnlocked ? true : false;
            }
          });

          // use after status update (inside modal)
          if (selectedJob) {
            if (selectedJob.custom_id == item.custom_id) {
              selectedApplicants = applicant_list;
              populateApplicantModalList();
            }
          }

          const card = style.cloneNode(true);
          const divs = card.getElementsByTagName('div');

          const jobTimeline = divs[0].getElementsByTagName('h7');
          const listItem = divs[0].getElementsByTagName('li');

          const postBtn = divs[0].getElementsByTagName('button')[0];
          const viewBtn = divs[0].getElementsByTagName('button')[1];
          const editBtn = divs[0].getElementsByTagName('button')[2];
          const shareBtn = divs[0].getElementsByTagName('button')[3];
          const totalShareText = shareBtn.getElementsByTagName('span')[0];
          const applicantBtn = divs[0].getElementsByTagName('button')[4];
          const totalApplicantText =
            applicantBtn.getElementsByTagName('span')[0];
          const deleteBtn = divs[0].getElementsByTagName('button')[5];

          totalShareText.innerHTML = item.telegram_data.length;
          totalApplicantText.innerHTML = applicant_list.length;

          totalApplications = totalApplications + applicant_list.length;
          if (item.is_published) {
            totalPublishPost = totalPublishPost + 1;
          }

          let slotTypeIcon = '';
          let activeDateString = null;
          let expiredDateString = null;
          let badge = '';

          if (item.is_free == true) {
            is_coin_based = true;
            slotTypeIcon = `${typeName.type_1.name}`;
            activeDateString =
              item.timestamp_active &&
              new Date(item.timestamp_active).toLocaleString('en-US', format);
            expiredDateString =
              item.timestamp_expired &&
              new Date(item.timestamp_expired).toLocaleString('en-US', format);
          } else {
            slotTypeIcon = `${typeName.type_2.name}`;
            activeDateString =
              item.timestamp_active &&
              new Date(item.timestamp_active).toLocaleString('en-US', format);
            expiredDateString =
              item.timestamp_expired &&
              new Date(item.timestamp_expired).toLocaleString('en-US', format);
          }

          if (item.status_id === 3) {
            jobTimeline[0].innerHTML = `This post has expired at ${expiredDateString}`;
          } else {
            if (activeDateString && expiredDateString) {
              jobTimeline[0].innerHTML = `${slotTypeIcon} ∙ Active for ${item.day_visibility} day ∙ Expires on ${expiredDateString}`;
            } else {
              jobTimeline[0].innerHTML = slotTypeIcon;
            }
          }

          listItem[0].innerHTML = `<b>Title of the job opening:</b> ${item.title}`;
          listItem[1].innerHTML = `<b>Company name:</b> <a href="company-profile?custom_id=${item.company_data.custom_id}" target="_blank" rel="noopener noreferrer">${item.company_data.name}</a>`;
          listItem[2].innerHTML = `<b>Type:</b> ${item.type}`;
          if (item.min_salary > 0) {
            listItem[3].innerHTML = `<b>Salary:</b> MYR ${item.min_salary} - ${item.max_salary} ${item.salary_type}`;
          } else {
            listItem[3].innerHTML = `<b>Salary:</b> Not Stated`;
          }
          listItem[4].innerHTML = `<b>Location:</b> ${item.location}`;
          listItem[5].innerHTML = `<b>Requirements:</b><br>${item.requirement.replace(
            /\n/g,
            '<br>'
          )}`;
          listItem[6].innerHTML = `<b>Benefits:</b><br>${item.benefit.replace(
            /\n/g,
            '<br>'
          )}`;
          listItem[7].innerHTML = `<b>Additional Information:</b><br>${item.additional_info.replace(
            /\n/g,
            '<br>'
          )}`;

          if (item.is_free == true) {
            listItem[8].innerHTML = ``;
          } else {
            if (item.is_external_apply) {
              listItem[8].innerHTML = `<b>External Job application URL:</b> <a href="${item.external_apply_link}" target="_blank"> ${item.external_apply_link}</a>`;
            } else {
              listItem[8].innerHTML = ``;
            }
          }

          // update new data from last selected share item if exist
          if (selectedJob) {
            if (selectedJob.id == item.id) {
              if (selectedChannelItem) {
                selectedJob = item;
                populateChannel();
              }
            }
          }

          const handler = {
            not_active: {
              badge: `<span class="badge badge-pill badge-secondary"><i class="fa fa-exclamation-triangle mr-1"></i>Not Active</span> ${
                item.is_published
                  ? `<span class="badge badge-pill badge-success"><i class="fa fa-check mr-1"></i>Published</span>`
                  : `<span class="badge badge-pill badge-secondary"><i class="fa fa-exclamation-triangle mr-1"></i>Not Published</span>`
              }`,
              post_btn: {
                title: 'Ready to publish? Activate now',
                class: 'btn btn-success',
                onClick: function (item) {
                  $('#visibilityModal').modal('show');
                  $('#visibilityModal').on('shown.bs.modal', function () {
                    selectedJob = item;
                  });
                },
              },
              edit_btn: {
                onClick: function (item) {
                  $('#editJobModal').modal('show');
                  $('#editJobModal').on('shown.bs.modal', function () {
                    editForm(item);
                  });
                },
              },
              share_btn: {
                onClick: function (item) {
                  showToast(
                    'alert-toast-container',
                    'Please activate your post to enable sharing.',
                    'danger'
                  );
                },
              },
              applicant_btn: {
                onClick: function (item) {
                  showToast(
                    'alert-toast-container',
                    'To begin receiving applicants, please ensure your post is active and published.',
                    'danger'
                  );
                },
              },
              view_btn: {
                onClick: function (item) {
                  showToast(
                    'alert-toast-container',
                    'To view your post on the Job List page, please activate and publish it.',
                    'danger'
                  );
                },
                display: 'none',
              },
              delete_btn: {
                onClick: function (item) {
                  deletePost(item, deleteBtn);
                },
              },
            },
            active: {
              badge: `<span class="badge badge-pill badge-success"><i class="fa fa-check mr-1"></i>Active</span> ${
                item.is_published
                  ? `<span class="badge badge-pill badge-success"><i class="fa fa-check mr-1"></i>Published</span>`
                  : `<span class="badge badge-pill badge-secondary"><i class="fa fa-exclamation-triangle mr-1"></i>Not Published</span>`
              }`,
              post_btn: {
                title: item.is_published ? `Unpublish` : `Publish Now`,
                class: item.is_published
                  ? 'btn btn-outline-secondary'
                  : 'btn btn-primary',
                onClick: function (item) {
                  publishPost(item, postBtn);
                },
              },
              edit_btn: {
                onClick: function (item) {
                  $('#editJobModal').modal('show');
                  $('#editJobModal').on('shown.bs.modal', function () {
                    editForm(item);
                  });
                },
              },
              share_btn: {
                onClick: function (item) {
                  $('#channelJobModal').modal('show');
                  $('#channelJobModal').on('shown.bs.modal', () => {
                    selectedJob = item;
                    populateChannel();
                  });
                },
              },
              applicant_btn: {
                onClick: function (item) {
                  $('#applicantModal').modal('show');
                  $('#applicantModal').on('shown.bs.modal', () => {
                    selectedJob = item;
                    selectedApplicants = applicant_list;
                    populateApplicantModalList();
                  });
                },
              },
              view_btn: {
                onClick: function (item) {
                  if (item.is_published) {
                    window.open(item.internal_apply_link, '_blank');
                  } else {
                    showToast(
                      'alert-toast-container',
                      'The post is currently not published. To view it, kindly proceed with the publishing process.',
                      'danger'
                    );
                  }
                },
                display: item.is_published ? 'block' : 'none',
              },
              delete_btn: {
                onClick: function (item) {
                  deletePost(item, deleteBtn);
                },
              },
            },
            expired: {
              badge: `<span class="badge badge-pill badge-secondary">Expired</span>`,
              post_btn: {
                title: item.is_free ? `Renew` : `Expired`,
                class: item.is_free ? 'btn btn-warning' : 'btn btn-secondary',
                onClick: function (item) {
                  if (item.is_free) {
                    renewPost(item, postBtn);
                  } else {
                    showToast(
                      'alert-toast-container',
                      "We're sorry, but the post you're trying to publish has expired, and all job postings associated with this post will no longer be available on our channels. To post a new job opportunity, please create a new post.",
                      'danger'
                    );
                  }
                },
              },
              edit_btn: {
                onClick: function (item) {
                  $('#editJobModal').modal('show');
                  $('#editJobModal').on('shown.bs.modal', function () {
                    editForm(item);
                  });
                },
              },
              share_btn: {
                onClick: function (item) {
                  $('#channelJobModal').modal('show');
                  $('#channelJobModal').on('shown.bs.modal', () => {
                    selectedJob = item;
                    populateChannel();
                  });
                },
              },
              applicant_btn: {
                onClick: function (item) {
                  $('#applicantModal').modal('show');
                  $('#applicantModal').on('shown.bs.modal', () => {
                    selectedJob = item;
                    selectedApplicants = applicant_list;
                    populateApplicantModalList();
                  });
                },
              },
              view_btn: {
                onClick: function (item) {
                  if (item.is_published) {
                    window.open(item.internal_apply_link, '_blank');
                  } else {
                    showToast(
                      'alert-toast-container',
                      'The post is currently not published. To view it, kindly proceed with the publishing process.',
                      'danger'
                    );
                  }
                },
                display: 'none',
              },
              delete_btn: {
                onClick: function (item) {
                  deletePost(item, deleteBtn);
                },
              },
            },
            blocked: {
              badge: `<span class="badge badge-pill badge-danger">Blocked</span>`,
              post_btn: {
                title: item.is_published ? `Unpublish` : `Publish Now`,
                class: item.is_published
                  ? 'btn btn-outline-danger'
                  : 'btn btn-success',
                onClick: function (item) {
                  showToast(
                    'alert-toast-container',
                    "Your post has been blocked due to policy violation. To appeal this decision, please submit a request through the 'Feedback' section in your account settings and include the Post ID for reference.",
                    'danger'
                  );
                },
              },
              edit_btn: {
                onClick: function (item) {
                  $('#editJobModal').modal('show');
                  $('#editJobModal').on('shown.bs.modal', function () {
                    editForm(item);
                  });
                },
              },
              applicant_btn: {
                onClick: function (item) {
                  $('#applicantModal').modal('show');
                  $('#applicantModal').on('shown.bs.modal', () => {
                    selectedJob = item;
                    selectedApplicants = applicant_list;
                    populateApplicantModalList();
                  });
                },
              },
              share_btn: {
                onClick: function (item) {
                  $('#channelJobModal').modal('show');
                  $('#channelJobModal').on('shown.bs.modal', () => {
                    selectedJob = item;
                    populateChannel();
                  });
                },
              },
              view_btn: {
                onClick: function (item) {
                  if (item.is_published) {
                    window.open(item.internal_apply_link, '_blank');
                  } else {
                    showToast(
                      'alert-toast-container',
                      'The post is currently not published. To view it, kindly proceed with the publishing process.',
                      'danger'
                    );
                  }
                },
                display: 'none',
              },
              delete_btn: {
                onClick: function (item) {
                  deletePost(item, deleteBtn);
                },
              },
            },
          };

          var current_state = '';

          if (item.is_active == false) {
            current_state = 'not_active';
          } else {
            if (item.status_id === 3) {
              current_state = 'expired';
            } else if (item.status_id === 4) {
              current_state = 'blocked';
            } else {
              current_state = 'active';
            }
          }

          badge = handler[current_state].badge;
          postBtn.innerHTML = handler[current_state].post_btn.title;
          postBtn.classList.value = handler[current_state].post_btn.class;
          postBtn.addEventListener('click', function () {
            handler[current_state].post_btn.onClick(item);
          });
          editBtn.addEventListener('click', function () {
            handler[current_state].edit_btn.onClick(item);
          });
          shareBtn.addEventListener('click', function () {
            handler[current_state].share_btn.onClick(item);
          });
          applicantBtn.addEventListener('click', function () {
            if (item.is_external_apply) {
              showToast(
                'alert-toast-container',
                'This post is currently set for external applications. If you would like to change the application setting to apply through the Gikijo website, please edit your post.',
                'danger'
              );
            } else {
              handler[current_state].applicant_btn.onClick(item);
            }
          });
          viewBtn.addEventListener('click', function () {
            handler[current_state].view_btn.onClick(item);
          });
          viewBtn.style.display = handler[current_state].view_btn.display;

          deleteBtn.addEventListener('click', function () {
            handler[current_state].delete_btn.onClick(item);
          });

          const customId = divs[0].getElementsByTagName('h6');
          customId[0].innerHTML = `Post ID: ${item.custom_id} ${badge}`;

          emptyDiv.push(card);
        });

        document.getElementById('total-apply').innerHTML = totalApplications;
        document.getElementById('total-publish-post').innerHTML =
          totalPublishPost;

        if (emptyDiv.length === 0) {
          emptyCard.classList.remove('hidden');
          parentTable.classList.add('hidden');
          // $('#onboardingModal').modal('show');
        } else {
          emptyCard.classList.add('hidden');
          parentTable.classList.remove('hidden');
          while (parentTable.firstChild) {
            parentTable.removeChild(parentTable.firstChild);
          }
          emptyDiv.forEach((item) => {
            parentTable.appendChild(item);
          });
        }
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

var company_data = null;
var slot_type_create = document.getElementById('input-create-slot-type');
var company_name_create = document.getElementById('input-create-company-name');
var title_create = document.getElementById('input-create-job-title');
var job_type_create = document.getElementById('input-create-job-type');
var min_salary_create = document.getElementById('input-create-job-min-salary');
var max_salary_create = document.getElementById('input-create-job-max-salary');
var salary_type_create = document.getElementById(
  'input-create-job-salary-type'
);
var requirement_create = document.getElementById(
  'input-create-job-requirement'
);
var benefit_create = document.getElementById('input-create-job-benefit');
var additional_info_create = document.getElementById(
  'input-create-job-additional-info'
);
var location_create = document.getElementById('input-create-job-location');
var apply_type_create = document.getElementById('input-create-apply-type');
var external_apply_link_create = document.getElementById(
  'input-create-job-url'
);
var containerCreateJobUrl = document.getElementById('container-create-job-url');

Object.entries(typeName).forEach(([key, option]) => {
  const optionElement = document.createElement('option');
  optionElement.value = option.id;
  optionElement.text = option.name;
  slot_type_create.appendChild(optionElement);
});

slot_type_create.addEventListener('change', function () {
  const selectedValue = this.value;
  if (selectedValue === typeName.type_1.id) {
    apply_type_create.value = 'internal';
    apply_type_create.disabled = true;
    external_apply_link_create.disabled = true;
    containerCreateJobUrl.style.display = 'none';
  } else {
    apply_type_create.value = 'internal';
    apply_type_create.disabled = false;
    external_apply_link_create.disabled = true;
    containerCreateJobUrl.style.display = 'none';
  }
});

apply_type_create.addEventListener('change', function () {
  const selectedValue = this.value;
  if (selectedValue === 'external') {
    external_apply_link_create.disabled = false;
    containerCreateJobUrl.style.display = 'block';
  } else {
    external_apply_link_create.disabled = true;
    containerCreateJobUrl.style.display = 'none';
  }
});

function defaultHide() {
  slot_type_create.value = typeName.type_1.id;
  apply_type_create.value = 'internal';
  apply_type_create.disabled = true;
  external_apply_link_create.disabled = true;
  containerCreateJobUrl.style.display = 'none';
}

defaultHide();
let company_profile_id = null;

document
  .getElementById('create-job-form')
  .addEventListener('submit', function (e) {
    e.preventDefault();

    if (company_data) {
      let useBtn = document.getElementById('submit-create-job-btn');
      let defaultBtnText = useBtn.innerHTML;

      useBtn.disabled = true;
      useBtn.innerHTML = spinnerLoading(useBtn.innerHTML);

      if (token) {
        if (min_salary_create.value) {
          if (min_salary_create.value <= max_salary_create.value) {
            // proceed
          } else {
            showToast(
              'alert-toast-container',
              'Maximum salary should be greater or equal to minimum salary',
              'danger'
            );
            useBtn.disabled = false;
            useBtn.innerHTML = defaultBtnText;
            return;
          }
        }

        const options = {
          body: JSON.stringify({
            company_id: company_data.id,
            title: title_create.value,
            type: job_type_create.value,
            min_salary: min_salary_create.value,
            max_salary: max_salary_create.value,
            salary_type: salary_type_create.value,
            location: location_create.value,
            requirement: requirement_create.value,
            benefit: benefit_create.value,
            additional_info: additional_info_create.value,
            external_apply_link: external_apply_link_create.value,
            is_free:
              slot_type_create.value == typeName.type_1.id ? true : false,
            is_external_apply:
              apply_type_create.value == 'external' ? true : false,
          }),
        };

        fetchAPI(
          'https://x8ki-letl-twmt.n7.xano.io/api:P5dHgbq7/post/add',
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
              // delay of 2 seconds before calling fetchMyEmployer
              setTimeout(() => {
                fetchMyEmployer();
                $('#addJobModal').modal('hide');
                useBtn.disabled = false;
                useBtn.innerHTML = defaultBtnText;
              }, 2000);
            }
          })
          .catch((error) => {
            $('#addJobModal').modal('hide');
            useBtn.disabled = false;
            useBtn.innerHTML = defaultBtnText;
          });
      }
    } else {
      showToast(
        'alert-toast-container',
        'Company profile not updated, please update your company profile',
        'danger'
      );
    }
  });

const expiredBtn = document.getElementById('expired-slot-btn');
expiredBtn.addEventListener('click', expiredJob);

function expiredJob() {
  expiredBtn.disabled = true;
  expiredBtn.innerHTML = loadingText;

  const options = {
    body: JSON.stringify({
      job_id: adminOpenJobId,
    }),
  };

  fetchAPI(
    'https://x8ki-letl-twmt.n7.xano.io/api:P5dHgbq7:v1/admin/job/expired',
    'PUT',
    token,
    options
  )
    .then((data) => {
      if (data?.message) {
        showToast('alert-toast-container', data.message, 'danger');
        expiredBtn.disabled = false;
        expiredBtn.innerHTML = 'Expired Slot';
      } else {
        // delay of 2 seconds before calling fetchMyEmployer
        setTimeout(() => {
          fetchAdminMaster();
          $('#actionModal').modal('hide');
          expiredBtn.disabled = false;
          expiredBtn.innerHTML = 'Expired Slot';
        }, 2000);
      }
    })
    .catch((error) => {
      $('#actionModal').modal('hide');
      expiredBtn.disabled = false;
      expiredBtn.innerHTML = 'Expired Slot';
    });
}

const undoExpiredBtn = document.getElementById('undo-expired-slot-btn');
undoExpiredBtn.addEventListener('click', undoExpiredJob);

function undoExpiredJob() {
  undoExpiredBtn.disabled = true;
  undoExpiredBtn.innerHTML = loadingText;

  const options = {
    body: JSON.stringify({
      job_id: adminOpenJobId,
    }),
  };

  fetchAPI(
    'https://x8ki-letl-twmt.n7.xano.io/api:P5dHgbq7/admin/job/undo/expired',
    'PUT',
    token,
    options
  )
    .then((data) => {
      if (data?.message) {
        showToast('alert-toast-container', data.message, 'danger');
        undoExpiredBtn.disabled = false;
        undoExpiredBtn.innerHTML = 'Undo Expiry';
      } else {
        // delay of 2 seconds before calling fetchMyEmployer
        setTimeout(() => {
          fetchAdminMaster();
          $('#actionModal').modal('hide');
          undoExpiredBtn.disabled = false;
          undoExpiredBtn.innerHTML = 'Undo Expiry';
        }, 2000);
      }
    })
    .catch((error) => {
      $('#actionModal').modal('hide');
      undoExpiredBtn.disabled = false;
      undoExpiredBtn.innerHTML = 'Undo Expiry';
    });
}

const blockBtn = document.getElementById('block-slot-btn');
blockBtn.addEventListener('click', blockSlot);

function blockSlot() {
  blockBtn.disabled = true;
  blockBtn.innerHTML = loadingText;

  const options = {
    body: JSON.stringify({
      job_id: adminOpenJobId,
    }),
  };

  fetchAPI(
    'https://x8ki-letl-twmt.n7.xano.io/api:P5dHgbq7/admin/job/block',
    'PUT',
    token,
    options
  )
    .then((data) => {
      if (data?.message) {
        showToast('alert-toast-container', data.message, 'danger');
        blockBtn.disabled = false;
        blockBtn.innerHTML = 'Block Slot';
      } else {
        // delay of 2 seconds before calling fetchMyEmployer
        setTimeout(() => {
          fetchAdminMaster();
          $('#actionModal').modal('hide');
          blockBtn.disabled = false;
          blockBtn.innerHTML = 'Block Slot';
        }, 2000);
      }
    })
    .catch((error) => {
      $('#actionModal').modal('hide');
      blockBtn.disabled = false;
      blockBtn.innerHTML = 'Block Slot';
    });
}

const unblockBtn = document.getElementById('unblock-slot-btn');
unblockBtn.addEventListener('click', unBlockSlot);

function unBlockSlot() {
  unblockBtn.disabled = true;
  unblockBtn.innerHTML = loadingText;

  const options = {
    body: JSON.stringify({
      job_id: adminOpenJobId,
    }),
  };

  fetchAPI(
    'https://x8ki-letl-twmt.n7.xano.io/api:P5dHgbq7/admin/job/unblock',
    'PUT',
    token,
    options
  )
    .then((data) => {
      if (data?.message) {
        showToast('alert-toast-container', data.message, 'danger');
        unblockBtn.disabled = false;
        unblockBtn.innerHTML = 'Unblock Slot';
      } else {
        // delay of 2 seconds before calling fetchMyEmployer
        setTimeout(() => {
          fetchAdminMaster();
          $('#actionModal').modal('hide');
          unblockBtn.disabled = false;
          unblockBtn.innerHTML = 'Unblock Slot';
        }, 2000);
      }
    })
    .catch((error) => {
      $('#actionModal').modal('hide');
      unblockBtn.disabled = false;
      unblockBtn.innerHTML = 'Unblock Slot';
    });
}

function populateToAdminAllJobs(data) {
  var job_list = data.job;
  var post_list = data.post;

  post_list.map((item1) => {
    job_list.map((item2, index) => {
      if (item1.job_id == item2.id) {
        if (job_list[index].postData) {
          job_list[index].postData.push(item1);
        } else {
          job_list[index].postData = [item1];
        }
      }
    });
  });

  const loadingAdminAllJobCard = document.getElementById(
    'admin-all-job-card-loading'
  );
  const emptyCard = document.getElementById('admin-all-job-card-empty');
  const parentTable = document.getElementById('admin-all-job-table-parent');
  const tableBody = document.getElementById('admin-all-job-table-body');
  // Clear the table before appending the new data
  while (tableBody.firstChild) {
    tableBody.removeChild(tableBody.firstChild);
  }

  adminJobListState = job_list;
  var totalRecord = [];

  job_list.forEach((item) => {
    let isPaid_isFree = false;
    let badge = '';

    let active_date = '-';
    let expired_date = '-';
    let day_visibility = '-';

    let version_type = '-';

    if (item?.payment_info?.payment_status == 'paid') {
      isPaid_isFree = true;
      version_type = 'Plus';
    }
    if (item.is_free == true) {
      isPaid_isFree = true;
      version_type = 'Free';
    }

    if (item.timestamp_active && item.timestamp_expired) {
      let activeDate = new Date(item.timestamp_active);
      let expiredDate = new Date(item.timestamp_expired);

      active_date = activeDate.toLocaleString('en-US', format);
      expired_date = expiredDate.toLocaleString('en-US', format);
      if (item?.payment_info?.payment_status == 'paid') {
        day_visibility = item.payment_info.day_visibility;
      } else {
        day_visibility = 0;
      }
    } else {
      active_date = '-';
      expired_date = '-';
      day_visibility = '-';
    }

    if (isPaid_isFree === false) {
    } else if (isPaid_isFree === true && item.status_id === 1) {
      badge = `<span class="badge badge-pill badge-success">Active</span>`;
    } else if (isPaid_isFree === true && item.status_id === 2) {
      badge = `<span class="badge badge-pill badge-success">Active</span>`;
    } else if (isPaid_isFree === true && item.status_id === 3) {
      badge = `<span class="badge badge-pill badge-secondary">Expired</span>`;
    } else if (isPaid_isFree === true && item.status_id === 4) {
      badge = `<span class="badge badge-pill badge-dark">Blocked</span>`;
    }

    let row = document.createElement('tr');
    let jobId = document.createElement('td');
    jobId.innerText = item.custom_id;
    let jobTitle = document.createElement('td');
    jobTitle.innerText = item.title;
    let companyName = document.createElement('td');
    companyName.innerText = item.company_name;
    let postedAt = document.createElement('td');
    postedAt.innerText = active_date;
    let expiredAt = document.createElement('td');
    expiredAt.innerText = expired_date;
    let days = document.createElement('td');
    days.innerText = day_visibility;
    let version = document.createElement('td');
    version.innerHTML = version_type;

    let button = document.createElement('button');

    if (item.timestamp_active && item.timestamp_expired) {
      let expiredDate = new Date(item.timestamp_expired);

      // Get the current date and time
      let currentDate = new Date();

      // Compare the two dates
      if (
        expiredDate.getTime() < currentDate.getTime() &&
        item.status_id !== 3
      ) {
        badge = `<span class="badge badge-pill badge-warning">Action needed</span>`;
        button.classList.add('btn', 'btn-primary');
      } else {
        button.classList.add('btn', 'btn-secondary');
      }
    } else {
      button.classList.add('btn', 'btn-secondary');
    }

    button.setAttribute('type', 'button');
    button.setAttribute('data-telegram', JSON.stringify(item.telegram));

    if (item?.postData) {
      button.innerHTML = `View All <span class="badge badge-light">${item.postData.length}</span>`;
    } else {
      button.innerHTML = `View All <span class="badge badge-light">0</span>`;
    }

    button.onclick = function () {
      $('#actionModal').modal('show');
      adminOpenJobId = item.id;
      adminFilterJob();
    };

    let status = document.createElement('td');
    status.innerHTML = badge;

    let action = document.createElement('td');
    action.appendChild(button);

    row.appendChild(jobId);
    row.appendChild(jobTitle);
    row.appendChild(companyName);
    row.appendChild(postedAt);
    row.appendChild(expiredAt);
    row.appendChild(days);
    row.appendChild(status);
    row.appendChild(version);
    row.appendChild(action);
    totalRecord.push(item);
    document.getElementById('admin-all-job-table-body').appendChild(row);
  });

  loadingAdminAllJobCard.classList.add('hidden');

  if (totalRecord.length === 0) {
    emptyCard.classList.remove('hidden');
    parentTable.classList.add('hidden');
  } else {
    emptyCard.classList.add('hidden');
    parentTable.classList.remove('hidden');
  }
}

function populateToAdminAllUsers(data) {
  const loadingAdminAllJobCard = document.getElementById(
    'admin-all-user-card-loading'
  );
  const emptyCard = document.getElementById('admin-all-user-card-empty');
  const parentTable = document.getElementById('admin-all-user-table-parent');
  const tableBody = document.getElementById('admin-all-user-table-body');
  // Clear the table before appending the new data
  while (tableBody.firstChild) {
    tableBody.removeChild(tableBody.firstChild);
  }

  var totalRecord = [];

  data.forEach((item) => {
    let badge = ``;

    if (item.verify) {
      badge = `<span class="badge badge-pill badge-success">Verified</span>`;
    } else {
      badge = `<span class="badge badge-pill badge-warning">Not Verified</span>`;
    }

    let row = document.createElement('tr');

    let userId = document.createElement('td');
    userId.innerText = item.id;

    let tempCreatedDate = new Date(item.created_at);
    createdDate = tempCreatedDate.toLocaleString('en-US', format);
    let createdDate_Td = document.createElement('td');
    createdDate_Td.innerText = createdDate;

    let username = document.createElement('td');
    username.innerText = item.username;

    let email = document.createElement('td');
    email.innerText = item.email;

    let companyName = document.createElement('td');
    companyName.innerText = item.company_name ? item.company_name : '-';

    let verify = document.createElement('td');
    verify.innerHTML = badge;

    let role = document.createElement('td');
    role.innerText = item.role_data?.title;

    let lastPosted_Td = document.createElement('td');

    if (item.timestamp_last_posted) {
      let tempLastPosted = new Date(item.timestamp_last_posted);
      lastPosted = tempLastPosted.toLocaleString('en-US', format);
      lastPosted_Td.innerText = lastPosted;
    } else {
      lastPosted_Td.innerText = '-';
    }

    row.appendChild(userId);
    row.appendChild(createdDate_Td);
    row.appendChild(username);
    row.appendChild(email);
    row.appendChild(companyName);
    row.appendChild(verify);
    row.appendChild(role);
    row.appendChild(lastPosted_Td);

    totalRecord.push(item);
    document.getElementById('admin-all-user-table-body').appendChild(row);
  });

  loadingAdminAllJobCard.classList.add('hidden');

  if (totalRecord.length === 0) {
    emptyCard.classList.remove('hidden');
    parentTable.classList.add('hidden');
  } else {
    emptyCard.classList.add('hidden');
    parentTable.classList.remove('hidden');
  }
}

function populateToAdminAllFeedbacks(data) {
  const loadingAdminAllJobCard = document.getElementById(
    'admin-all-feedback-card-loading'
  );
  const emptyCard = document.getElementById('admin-all-feedback-card-empty');
  const parentTable = document.getElementById(
    'admin-all-feedback-table-parent'
  );
  const tableBody = document.getElementById('admin-all-feedback-table-body');
  // Clear the table before appending the new data
  while (tableBody.firstChild) {
    tableBody.removeChild(tableBody.firstChild);
  }

  var totalRecord = [];

  data.forEach((item) => {
    let row = document.createElement('tr');
    let type = document.createElement('td');
    type.innerText = item.type;
    let title = document.createElement('td');
    title.innerText = item.title;
    let description = document.createElement('td');
    description.innerText = item.description;
    let username = document.createElement('td');
    let email = document.createElement('td');

    if (item?.user_data) {
      username.innerText = item.user_data.username;
      email.innerText = item.user_data.email;
    } else {
      username.innerText = '-';
      email.innerText = '-';
    }

    let createdAt = document.createElement('td');
    let newCreatedAt = new Date(item.created_at);
    createdAt.innerText = newCreatedAt.toLocaleString('en-US', format);

    row.appendChild(type);
    row.appendChild(title);
    row.appendChild(description);
    row.appendChild(username);
    row.appendChild(email);
    row.appendChild(createdAt);
    totalRecord.push(item);
    document.getElementById('admin-all-feedback-table-body').appendChild(row);
  });

  loadingAdminAllJobCard.classList.add('hidden');

  if (totalRecord.length === 0) {
    emptyCard.classList.remove('hidden');
    parentTable.classList.add('hidden');
  } else {
    emptyCard.classList.add('hidden');
    parentTable.classList.remove('hidden');
  }
}

function fetchAdminMaster() {
  if (myData.userData.role_id === 1) {
    fetchAPI(
      'https://x8ki-letl-twmt.n7.xano.io/api:P5dHgbq7/admin/master',
      'GET',
      token
    )
      .then((data) => {
        if (data?.message) {
          showToast('alert-toast-container', data.message, 'danger');
        } else {
          populateToAdminAllJobs(data);
          populateToAdminAllUsers(data.user);
          populateToAdminAllFeedbacks(data.feedback);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }
}

function populateJobSeekerNotification(data) {
  const loadingCard = document.getElementById(
    'home-job-seeker-notification-loading'
  );
  const emptyCard = document.getElementById(
    'home-job-seeker-notification-empty'
  );
  const parentTable = document.getElementById(
    'home-job-seeker-notification-parent'
  );
  const style = document.getElementById('home-job-seeker-notification-child');
  const emptyDiv = [];

  data.reverse().forEach(function (item) {
    const card = style.cloneNode(true);

    const spanText = card.getElementsByTagName('span');

    spanText[0].innerHTML = `<b>${
      item?.post_data
        ? item.post_data.title.length > 20
          ? item.post_data.title.slice(0, 20) + '...'
          : item.post_data.title
        : 'Post no longer exists'
    }</b>`;

    spanText[0].addEventListener('click', function () {
      document.querySelector('#my-application-job-seeker-tab').click();
    });
    spanText[1].innerHTML = `${item.message}`;

    const smallText = card.getElementsByTagName('small');
    var created_at = new Date(item.created_at);
    var timeAgo = moment(created_at).fromNow(true);
    smallText[0].innerHTML = `${timeAgo} ago`;

    emptyDiv.push(card);
  });

  loadingCard.classList.add('hidden');

  if (emptyDiv.length === 0) {
    emptyCard.classList.remove('hidden');
    parentTable.classList.add('hidden');
  } else {
    emptyCard.classList.add('hidden');
    parentTable.classList.remove('hidden');

    while (parentTable.firstChild) {
      parentTable.removeChild(parentTable.firstChild);
    }
    emptyDiv.forEach((item) => {
      parentTable.appendChild(item);
    });
  }
}

// create dropdown menu options
const status_list_options = {
  pending: {
    name: 'Pending',
    code: 'pending',
    theme: 'warning',
    is_job_seeker: false,
  },
  withdraw: {
    name: 'Withdraw',
    code: 'withdraw',
    theme: 'secondary',
    is_job_seeker: true,
  },
  selected_for_interview: {
    name: 'Selected for interview',
    code: 'selected_for_interview',
    theme: 'primary',
    is_job_seeker: false,
  },
  offered: {
    name: 'Offered',
    code: 'offered',
    theme: 'success',
    is_job_seeker: false,
  },
  not_selected: {
    name: 'Not selected',
    code: 'not_selected',
    theme: 'danger',
    is_job_seeker: false,
  },
};

document
  .getElementById('refresh-job-seeker-application')
  .addEventListener('click', firstCall);

function populateJobSeekerApplication(data) {
  const loadingCard = document.getElementById(
    'home-job-seeker-application-loading'
  );
  const emptyCard = document.getElementById(
    'home-job-seeker-application-empty'
  );
  const parentTable = document.getElementById(
    'home-job-seeker-application-parent'
  );
  const style = document.getElementById('home-job-seeker-application-child');
  const emptyDiv = [];

  let totalJobOffered = 0;

  data.forEach(function (item) {
    const card = style.cloneNode(true);
    const divs = card.getElementsByTagName('div');
    const mainText = divs[0].getElementsByTagName('h6');
    const subText = divs[0].getElementsByTagName('h7');

    var is_post_exist = false;

    if (item.post_data) {
      is_post_exist = true;
    } else {
      is_post_exist = false;
    }

    mainText[0].innerHTML = `${
      is_post_exist ? item.post_data.title : 'Post no longer exists'
    }`;

    var created_at = new Date(item.created_at);
    var timeAgo = moment(created_at).fromNow(true);
    subText[0].innerHTML = `${timeAgo} ago`;

    mainText[1].innerHTML = `Company: ${
      is_post_exist ? item.post_data.company_data.name : '-'
    }`;
    mainText[2].innerHTML = `Status: <span class="badge badge-pill badge-${
      status_list_options[item.application_status_code].theme
    }">${status_list_options[item.application_status_code].name}</span>`;

    if (item.application_status_code == 'offered') {
      totalJobOffered = totalJobOffered + 1;
    }

    // create button element
    const buttonParent = document.createElement('button');
    buttonParent.classList.add('btn', 'btn-primary', 'dropdown-toggle');
    buttonParent.setAttribute('type', 'button');
    buttonParent.setAttribute('id', 'dropdownMenu2');
    buttonParent.setAttribute('data-toggle', 'dropdown');
    buttonParent.setAttribute('aria-haspopup', 'true');
    buttonParent.setAttribute('aria-expanded', 'false');
    buttonParent.textContent = 'Action';

    // create dropdown menu element
    const dropdownMenu = document.createElement('div');
    dropdownMenu.classList.add('dropdown-menu');
    dropdownMenu.setAttribute('aria-labelledby', 'dropdownMenu2');

    const dropdownButtonContainer = divs[4];

    // remove existing dropdown button (if any)
    while (dropdownButtonContainer.firstChild) {
      dropdownButtonContainer.removeChild(dropdownButtonContainer.firstChild);
    }

    // Convert the object into an array of key-value pairs
    const optionsArray = Object.entries(status_list_options);

    optionsArray.forEach(([key, option]) => {
      if (option.is_job_seeker) {
        const buttonChild = document.createElement('button');
        buttonChild.classList.add('dropdown-item');
        buttonChild.setAttribute('type', 'button');
        buttonChild.textContent = option.name;
        buttonChild.setAttribute('value', option.code);
        buttonChild.addEventListener('click', () => {
          if (is_post_exist) {
            changeApplicantStatus(item.id, option.code, buttonParent);
          } else {
            showToast(
              'alert-toast-container',
              'Post no longer exits.',
              'danger'
            );
          }
        });

        const currentStatus = item.application_status_code;
        const loopStatus = option.code;

        const statusesToHide = {
          pending: ['pending'],
          withdraw: [
            'pending',
            'withdraw',
            'selected_for_interview',
            'offered',
            'not_selected',
          ],
          selected_for_interview: ['selected_for_interview'],
          offered: ['offered'],
          not_selected: ['not_selected'],
        };

        const isLoopStatusInStatusesToHide = statusesToHide[currentStatus]
          ? statusesToHide[currentStatus].includes(loopStatus)
          : statusesToHide.default.includes(loopStatus);

        buttonChild.disabled = isLoopStatusInStatusesToHide;

        dropdownMenu.appendChild(buttonChild);
      }
    });

    buttonParent.appendChild(dropdownMenu);

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'btn btn-outline-secondary  mr-1';
    deleteBtn.type = 'button';
    deleteBtn.style.border = 'none';
    const deleteIcon = document.createElement('i');
    deleteIcon.className = 'fa fa-trash';
    deleteBtn.appendChild(deleteIcon);
    deleteBtn.addEventListener('click', () => {
      var confirmDelete = confirm(
        'Are you sure you want to delete this application? This action cannot be undone.'
      );
      if (confirmDelete) {
        deleteApplicant(item, deleteBtn, deleteBtn.innerHTML);
      }
    });

    const viewBtn = document.createElement('button');
    viewBtn.className = 'btn btn-outline-primary  mr-1';
    viewBtn.type = 'button';
    viewBtn.style.border = 'none';
    const viewIcon = document.createElement('i');
    viewIcon.className = 'fa fa-external-link-alt';
    viewBtn.appendChild(viewIcon);
    viewBtn.addEventListener('click', () => {
      if (is_post_exist) {
        window.open(item.post_data.internal_apply_link, '_blank');
      } else {
        showToast('alert-toast-container', 'Post no longer exits.', 'danger');
      }
    });

    dropdownButtonContainer.appendChild(deleteBtn);
    dropdownButtonContainer.appendChild(viewBtn);
    dropdownButtonContainer.appendChild(buttonParent);

    emptyDiv.push(card);
  });

  document.getElementById('total-job-applied').innerHTML = data.length;
  document.getElementById('total-job-offered').innerHTML = totalJobOffered;

  loadingCard.classList.add('hidden');

  if (emptyDiv.length === 0) {
    emptyCard.classList.remove('hidden');
    parentTable.classList.add('hidden');
  } else {
    emptyCard.classList.add('hidden');
    parentTable.classList.remove('hidden');

    while (parentTable.firstChild) {
      parentTable.removeChild(parentTable.firstChild);
    }
    emptyDiv.forEach((item) => {
      parentTable.appendChild(item);
    });
  }
}

document
  .getElementById('refresh-job-seeker-invitation')
  .addEventListener('click', firstCall);

function populateJobSeekerInvitation(data) {
  const loadingCard = document.getElementById(
    'home-job-seeker-invitation-loading'
  );
  const emptyCard = document.getElementById('home-job-seeker-invitation-empty');
  const parentTable = document.getElementById(
    'home-job-seeker-invitation-parent'
  );
  const style = document.getElementById('home-job-seeker-invitation-child');
  const emptyDiv = [];

  data.forEach(function (item) {
    const card = style.cloneNode(true);
    const divs = card.getElementsByTagName('div');
    const mainText = divs[0].getElementsByTagName('h6');
    const smallText = divs[0].getElementsByTagName('h7');
    const viewButton = divs[0].getElementsByTagName('button');

    var is_post_exist = false;

    if (item.post_data) {
      is_post_exist = true;
    } else {
      is_post_exist = false;
    }

    mainText[0].innerHTML = `${
      is_post_exist ? item.post_data.title : 'Post no longer exists'
    }`;

    viewButton[0].addEventListener('click', function () {
      if (is_post_exist) {
        window.open(item.post_data.internal_apply_link, '_blank');
      } else {
        showToast('alert-toast-container', 'Post no longer exits.', 'danger');
      }
    });

    mainText[1].innerHTML = `Company: ${
      is_post_exist ? item.post_data.company_data.name : '-'
    }`;

    var created_at = new Date(item.created_at);
    var timeAgo = moment(created_at).fromNow(true);

    smallText[0].innerHTML = `${timeAgo} ago`;

    emptyDiv.push(card);
  });

  loadingCard.classList.add('hidden');

  if (emptyDiv.length === 0) {
    emptyCard.classList.remove('hidden');
    parentTable.classList.add('hidden');
  } else {
    emptyCard.classList.add('hidden');
    parentTable.classList.remove('hidden');

    while (parentTable.firstChild) {
      parentTable.removeChild(parentTable.firstChild);
    }
    emptyDiv.forEach((item) => {
      parentTable.appendChild(item);
    });
  }
}
function fetchMyJobSeeker() {
  fetchAPI(
    `https://x8ki-letl-twmt.n7.xano.io/api:P5dHgbq7/application`,
    'GET',
    token
  )
    .then((data) => {
      if (data?.message) {
        showToast('alert-toast-container', data.message, 'danger');
      } else {
        const progressContainer = document.getElementById(
          'job-seeker-profile-progress-bar'
        );
        const progressContainerTitle = document.getElementById(
          'job-seeker-profile-progress-title'
        );
        // const resumeVisibilitySummary = document.getElementById(
        //   'resume-visibility-summary'
        // );

        let percentageProgress = '0%';

        if (data.profile_data) {
          percentageProgress = data.profile_data.progress_percentage;
          // resumeVisibilitySummary.innerHTML = `${data.profile_data.contact_visibility_data.name}`;
        }

        progressContainer.style.width = `${percentageProgress}%`;
        progressContainer.innerHTML = `${percentageProgress}%`;
        progressContainerTitle.innerHTML = `Your resume is ${percentageProgress}% done`;

        document
          .getElementById('update-job-seeker-profile-btn')
          .addEventListener('click', () => {
            location.href = 'profile?code=resume';
          });

        populateJobSeekerNotification(data.notification_list);
        populateJobSeekerApplication(data.application_list);
        populateJobSeekerInvitation(data.invitation_list);
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

function firstCall() {
  if (myData.userData.role_id === 3) {
    fetchMyJobSeeker();
  } else {
    fetchMyEmployer();
    fetchAdminMaster();
  }
}

let tabSwitchCounter = 0;
function handleVisibilityChange() {
  if (document.visibilityState === 'visible') {
    firstCall();

    tabSwitchCounter++;

    if (tabSwitchCounter >= 5) {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    }
  }
}
// Listen for visibility change events (tab switch)
document.addEventListener('visibilitychange', handleVisibilityChange);

$(document).ready(function () {
  if (myData.userData.role_id) {
    firstCall();
  } else {
    location.href = 'account-type';
  }
});
