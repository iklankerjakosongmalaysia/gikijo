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

document
  .getElementById('button-empty-list-post-job')
  .addEventListener('click', function () {
    location.href = 'index?login=true';
  });

function populateContent(passData) {
  const listLoader = document.getElementById('content-list-loader');
  const listEmpty = document.getElementById('content-list-empty');
  const listContainer = document.getElementById('content-list-container');
  const listBody = document.getElementById('content-list-body');

  var totalRecord = [];

  passData.forEach((item) => {
    const card = listBody.cloneNode(true);
    const divs = card.getElementsByTagName('div');

    const title = divs[0].getElementsByTagName('strong');
    const postedAt = divs[0].getElementsByTagName('h8');
    const listItem = divs[0].getElementsByTagName('li');
    const applyButton = divs[0].getElementsByTagName('button');

    var created_at = new Date(item.created_at);
    var timeAgo = moment(created_at).fromNow(true);

    postedAt[0].innerHTML = ` ${timeAgo} ago`;
    title[0].innerHTML = item.title;

    listItem[0].innerHTML = `<i class="fas fa-building"></i> <a href="company-profile?custom_id=${item.company_data.custom_id}">${item.company_data.name}</a>`;

    listItem[1].innerHTML = `<i class="fas fa-tag"></i> ${item.type}`;

    if (item.min_salary > 0) {
      listItem[2].innerHTML = `<i class="fas fa-money-bill-wave"></i> MYR ${item.min_salary} - ${item.max_salary} ${item.salary_type}`;
    } else {
      listItem[2].innerHTML = `<i class="fas fa-money-bill-wave"></i> Not Stated`;
    }

    listItem[3].innerHTML = `<i class="fas fa-map-marker-alt"></i> ${item.location}`;

    applyButton[0].addEventListener('click', function () {
      window.open(item.internal_apply_link, '_self');
    });

    totalRecord.push(card);
  });

  listLoader.classList.add('hidden');

  const textTotalJOb = document.getElementById('text-total-job');
  textTotalJOb.innerText = ` ${totalRecord.length} `;

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

document
  .getElementById('refresh-channel-list')
  .addEventListener('click', function () {
    populateChannel();
  });

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

    const title = divs[0].getElementsByTagName('h7');

    title[0].innerHTML = `${item.source_name} ∙ ${item.name}`;

    divs[0].addEventListener('click', function () {
      window.open(item.url, '_blank');
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

const inputKeyword = document.getElementById('input-keyword');
const inputLocation = document.getElementById('input-job-location');
const inputType = document.getElementById('input-job-type');
const inputMinSalary = document.getElementById('input-job-min-salary');
const inputMaxSalary = document.getElementById('input-job-max-salary');

var postData = [];

const resetFilterJobBtn = document.getElementById('reset-filter-job-btn');

resetFilterJobBtn.addEventListener('click', function () {
  inputLocation.value = '';
  inputType.value = '';
  inputMinSalary.value = '';
  inputMaxSalary.value = '';

  fetchPostList('', '');
  let useBtn = resetFilterJobBtn;
  useBtn.innerHTML = spinnerLoading(useBtn.innerHTML);
});

const submitFilterJobBtn = document.getElementById('submit-filter-job-btn');

document
  .getElementById('filter-job-form')
  .addEventListener('submit', function (e) {
    e.preventDefault();

    fetchPostList(inputKeyword.value);
    let useBtn = submitFilterJobBtn;
    useBtn.innerHTML = spinnerLoading(useBtn.innerHTML);
  });

const buttonRetryPostList = document.getElementById('button-retry-post-list');
let canClickRetryButton = true;

buttonRetryPostList.addEventListener('click', function () {
  if (canClickRetryButton) {
    canClickRetryButton = false;
    fetchPostList(inputKeyword.value);
    let countdown = 20;
    buttonRetryPostList.textContent = `Try again in ${countdown} seconds`;
    let countdownInterval = setInterval(function () {
      countdown--;
      if (countdown > 0) {
        buttonRetryPostList.textContent = `Try again in ${countdown} seconds`;
      } else {
        clearInterval(countdownInterval);
        canClickRetryButton = true;
        buttonRetryPostList.textContent = 'Retry';
      }
    }, 1000);
  } else {
    buttonRetryPostList.textContent = 'Please wait ...';
  }
});

function fetchPostList(passKeyword, passPostId) {
  inputKeyword.value = passKeyword;

  let defaultBtnText = submitFilterJobBtn.innerHTML;
  let useBtn = submitFilterJobBtn;

  let defaultBtn2Text = resetFilterJobBtn.innerHTML;
  let useBtn2 = resetFilterJobBtn;

  useBtn.disabled = true;
  useBtn2.disabled = true;

  const options = {
    body: JSON.stringify({
      post_id: passPostId,
      search_query: passKeyword,
      location: inputLocation.value,
      type: inputType.value,
      min_salary: inputMinSalary.value,
      max_salary: inputMaxSalary.value,
    }),
  };

  fetchAPI(
    `https://x8ki-letl-twmt.n7.xano.io/api:P5dHgbq7/post/list/all`,
    'POST',
    null,
    options
  )
    .then((data) => {
      if (data?.message) {
        showToast('alert-toast-container', data.message, 'danger');
      } else {
        postData = data.post_list;
        channelListData = data.channel_list;
        populateContent(data.post_list);
        populateChannel();
      }

      useBtn.disabled = false;
      useBtn.innerHTML = defaultBtnText;
      useBtn2.disabled = false;
      useBtn2.innerHTML = defaultBtn2Text;
    })
    .catch((error) => {
      populateChannel();
      populateContent(postData);
      useBtn.disabled = false;
      useBtn.innerHTML = defaultBtnText;
      useBtn2.disabled = false;
      useBtn2.innerHTML = defaultBtn2Text;
      console.error(error);
    });
}

const toggleFilterBtn = document.getElementById('toggle-filter-btn');
const filterJobForm = document.getElementById('filter-job-form');

toggleFilterBtn.addEventListener('click', () => {
  if (filterJobForm.style.display === 'block') {
    filterJobForm.style.display = 'none';
    toggleFilterBtn.innerHTML = `<i class="fas fa-filter"></i> Show Filter`;
  } else {
    filterJobForm.style.display = 'block';
    toggleFilterBtn.innerHTML = `<i class="fas fa-filter"></i> Hide Filter`;
  }
});

$(document).ready(function () {
  fetchPostList(inputKeyword.value);
});
