const myData = getSavedData("masterData");
const token = myData?.authToken;

const topbarNotAuth = document.getElementById("topbar-not-auth");
const topbarWithAuth = document.getElementById("topbar-with-auth");
const topbarUsername = document.getElementById("topbar-username");
const topBarPostJobButton = document.getElementById("topbar-post-job-btn");
const logoutBtn = document.getElementById("button-logout-yes");
logoutBtn.addEventListener("click", clearSession);

if (token) {
  topbarWithAuth.removeAttribute("style");
  topbarNotAuth.setAttribute("style", "display: none");
  topbarUsername.innerHTML = myData.userData.username;
} else {
  topbarNotAuth.removeAttribute("style");
  topbarWithAuth.setAttribute("style", "display: none");
  topbarUsername.innerHTML = "...";
  topBarPostJobButton.addEventListener("click", function () {
    location.href = "index?postJob=true";
  });
}

document
  .getElementById("topbar-job-list-btn-not-auth")
  .addEventListener("click", function () {
    location.href = "job-list";
  });

document
  .getElementById("topbar-job-list-btn-with-auth")
  .addEventListener("click", function () {
    location.href = "job-list";
  });

const format = {
  year: "numeric",
  month: "short",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
  hour12: true,
};

function populateMoreProfiles(data) {
  const listLoader = document.getElementById("profile-list-loader");
  const listEmpty = document.getElementById("profile-list-empty");
  const listContainer = document.getElementById("profile-list-container");
  const listBody = document.getElementById("profile-list-body");

  var totalRecord = [];

  data.forEach((item) => {
    const card = listBody.cloneNode(true);
    const divs = card.getElementsByTagName("div");

    divs[0].addEventListener("click", function () {
      location.href = `user-profile.html?profile_id=${item.id}`;
    });

    const title = divs[0].getElementsByTagName("h7");

    title[0].innerHTML = `<i class="fas fa-user"></i> ${item.full_name}`;

    totalRecord.push(card);
  });

  listLoader.classList.add("hidden");

  if (totalRecord.length === 0) {
    listEmpty.classList.remove("hidden");
    listContainer.classList.add("hidden");
  } else {
    listEmpty.classList.add("hidden");
    listContainer.classList.remove("hidden");

    while (listContainer.firstChild) {
      listContainer.removeChild(listContainer.firstChild);
    }
    totalRecord.forEach((item) => {
      listContainer.appendChild(item);
    });
  }
}

const loadingText =
  '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Loading...';

var loading = false;

function cancelInvite(invite_id, inviteBtn, typeText) {
  var confirmDelete = confirm(
    `Are you sure you want to cancel this ${typeText}? This action cannot be undone.`
  );

  if (confirmDelete) {
    loading = true;
    inviteBtn.disabled = true;
    inviteBtn.innerHTML = loadingText;

    fetchAPI(
      `https://x8ki-letl-twmt.n7.xano.io/api:P5dHgbq7/application/${invite_id}`,
      "DELETE",
      token
    )
      .then((data) => {
        if (data?.message) {
          showAlert(
            "alert-user-profile-container",
            "Error!",
            data.message,
            "danger",
            "my-user-profile-alert",
            15000
          );

          inviteBtn.disabled = false;
          inviteBtn.innerHTML = `Invite`;
          loading = false;
          $("#inviteModal").modal("hide");
        } else {
          setTimeout(() => {
            fetchUserProfile();

            showAlert(
              "alert-user-profile-container",
              "Success!",
              `The ${typeText} has been successfully canceled.`,
              "success",
              "my-user-profile-alert",
              15000
            );

            inviteBtn.disabled = false;
            inviteBtn.innerHTML = `Invite`;
            loading = false;
            $("#inviteModal").modal("hide");
          }, 2000);
        }
      })
      .catch((error) => {
        inviteBtn.disabled = false;
        inviteBtn.innerHTML = `Invite`;
        loading = false;
        $("#inviteModal").modal("hide");
      });
  }
}

function sendInvite(postId, inviteBtn, profileId) {
  if (loading) {
    alert("The invitation process is still in progress. Please wait...");
  } else {
    const options = {
      body: JSON.stringify({
        post_id: postId,
        profile_id: profileId,
        type: "invitation",
      }),
    };

    loading = true;
    inviteBtn.disabled = true;
    inviteBtn.innerHTML = loadingText;

    fetchAPI(
      "https://x8ki-letl-twmt.n7.xano.io/api:P5dHgbq7/application",
      "POST",
      token,
      options
    )
      .then((data) => {
        if (data?.message) {
          showAlert(
            "alert-user-profile-container",
            "Error!",
            data.message,
            "danger",
            "my-user-profile-alert",
            15000
          );

          inviteBtn.disabled = false;
          inviteBtn.innerHTML = `Invite`;
          loading = false;
          $("#inviteModal").modal("hide");
        } else {
          setTimeout(() => {
            fetchUserProfile();

            showAlert(
              "alert-user-profile-container",
              "Success!",
              "The invitation has been sent successfully!",
              "success",
              "my-user-profile-alert",
              15000
            );

            inviteBtn.disabled = false;
            inviteBtn.innerHTML = `Invite`;
            loading = false;
            $("#inviteModal").modal("hide");
          }, 2000);
        }
      })
      .catch((error) => {
        inviteBtn.disabled = false;
        inviteBtn.innerHTML = loadingText;
        loading = false;
        $("#inviteModal").modal("hide");
      });
  }
}

function listPostedJob(passData, profileId, applicationList) {
  const emptyCard = document.getElementById("posted-job-card-empty");

  const parentTable = document.getElementById("posted-job-card-list-parent");
  const style = document.getElementById("posted-job-card-list-child");

  const emptyDiv = [];

  if (passData.length !== 0) {
    passData.map((item) => {
      const card = style.cloneNode(true);
      const divs = card.getElementsByTagName("div");
      const titleContainer = divs[0].getElementsByTagName("h6");
      const activeAtContainer = divs[0].getElementsByTagName("h7");

      let invited = false;
      let invite_id = null;
      let invite_type = null;

      applicationList.map((item2) => {
        if (item.id == item2.post_id && profileId == item2.profile_id) {
          invited = true;
          invite_id = item2.id;
          invite_type = item2.type;
        }
      });

      const inviteBtn = divs[0].getElementsByTagName("button")[0];

      let badgeText = "";
      let buttonText = "";

      if (invite_type == "application") {
        badgeText = `<span class="badge badge-pill badge-success">Applied</span>`;
        buttonText = "Cancel Application";
      } else if (invite_type == "invitation") {
        badgeText = `<span class="badge badge-pill badge-success">Invited</span>`;
        buttonText = "Cancel Invite";
      } else {
        badgeText = "";
        buttonText = "Invite to Apply";
      }

      inviteBtn.innerHTML = buttonText;
      titleContainer[0].innerHTML = `${item.title} ${badgeText}`;

      if (invited === true) {
        inviteBtn.classList.remove("btn-primary");
        inviteBtn.classList.add("btn-secondary");
        inviteBtn.addEventListener("click", function () {
          cancelInvite(invite_id, this, invite_type);
        });
      } else {
        inviteBtn.disabled = false;
        inviteBtn.classList.remove("btn-secondary");
        inviteBtn.classList.add("btn-primary");
        inviteBtn.addEventListener("click", function () {
          sendInvite(item.id, this, profileId);
        });
      }

      titleContainer[0].addEventListener("click", function () {
        window.open(item.internal_apply_link);
      });

      var created_at = new Date(item.created_at);
      var timeAgo = moment(created_at).fromNow(true);

      activeAtContainer[0].innerHTML = `Posted ${timeAgo} ago`;

      emptyDiv.push(card);
    });
  }

  if (emptyDiv.length === 0) {
    emptyCard.classList.remove("hidden");
    parentTable.classList.add("hidden");
  } else {
    emptyCard.classList.add("hidden");
    parentTable.classList.remove("hidden");
    while (parentTable.firstChild) {
      parentTable.removeChild(parentTable.firstChild);
    }
    emptyDiv.forEach((item) => {
      parentTable.appendChild(item);
    });
  }
}

var unlockProfileLoading = false;

function unlockProfile(profileId, passBtn, passBtnDefaultText) {
  if (unlockProfileLoading) {
    alert("Unlock profile is still in progress. Please wait...");
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
      "POST",
      token,
      options
    )
      .then((data) => {
        if (data?.message) {
          alert(data?.message);
          unlockProfileLoading = false;
          passBtn.innerHTML = passBtnDefaultText;
          $("#coinBalanceModal").modal("hide");
        } else {
          setTimeout(() => {
            fetchUserProfile();
            unlockProfileLoading = false;
            passBtn.innerHTML = passBtnDefaultText;
            $("#coinBalanceModal").modal("hide");
          }, 2000);
        }
      })
      .catch((error) => {
        unlockProfileLoading = false;
        passBtn.innerHTML = passBtnDefaultText;
      });
  }
}

const unlockNowButton = document.getElementById("unlock-now");
const textCurrentBalance = document.getElementById("text-current-balance");

function fetchUserProfile() {
  var urlParams = new URLSearchParams(window.location.search);
  var profileId = urlParams.get("profile_id");

  if (profileId) {
    fetchAPI(
      `https://x8ki-letl-twmt.n7.xano.io/api:P5dHgbq7/profile/resume/list?profile_id=${profileId}`,
      "GET",
      token
    )
      .then((data) => {
        if (data?.message) {
          alert(data.message);
        } else {
          populateMoreProfiles(data.other_profiles);

          listPostedJob(
            data.employer_posts,
            profileId,
            data.employer_applications
          );

          textCurrentBalance.innerHTML = `Your Current Balance: <b>${data.employer_coin_balance}</b> <i class="fas fa-coins mr-1"></i>`;

          if (data.profile_details !== null) {
            const progressContainer =
              document.getElementById("profile-progress");
            progressContainer.style.width =
              data.profile_details.progress_percentage;
            progressContainer.innerHTML =
              data.profile_details.progress_percentage;

            const actionProfileBtnContainer = document.getElementById(
              "action-profile-button-container"
            );

            // remove existing dropdown button (if any)
            while (actionProfileBtnContainer.firstChild) {
              actionProfileBtnContainer.removeChild(
                actionProfileBtnContainer.firstChild
              );
            }

            if (myData.userData.role_id == 1 || myData.userData.role_id == 2) {
              const buttonInvite = document.createElement("button");
              buttonInvite.setAttribute("type", "button");
              buttonInvite.setAttribute(
                "class",
                "btn btn-outline-primary mr-1"
              );
              buttonInvite.setAttribute("data-toggle", "modal");
              buttonInvite.setAttribute("data-target", "#inviteModal");
              buttonInvite.setAttribute("id", "button-send-invite");
              buttonInvite.innerHTML = `<i class="fas fa-envelope mr-1"></i>Invite`;

              const buttonUnlock = document.createElement("button");
              buttonUnlock.setAttribute("type", "button");
              buttonUnlock.setAttribute("id", "unlock-button");

              if (data.profile_unlocked == true) {
                buttonInvite.disabled = false;
                buttonUnlock.disabled = true;
                buttonUnlock.setAttribute("class", "btn btn-secondary");
                buttonUnlock.innerHTML = `<i class="fas fa-lock-open mr-1"></i>Profile Unlocked`;
              } else {
                buttonInvite.disabled = true;
                buttonUnlock.disabled = false;
                buttonUnlock.setAttribute("class", "btn btn-primary");
                buttonUnlock.innerHTML = `<i class="fas fa-lock mr-1"></i>Unlock Profile`;
                buttonUnlock.setAttribute("data-toggle", "modal");
                buttonUnlock.setAttribute("data-target", "#coinBalanceModal");

                // unclock now button on modal open
                unlockNowButton.addEventListener("click", () => {
                  unlockProfile(
                    data.profile_details.id,
                    unlockNowButton,
                    unlockNowButton.innerHTML
                  );
                });

                if (data.employer_coin_balance > 0) {
                  unlockNowButton.setAttribute("class", "btn btn-success");
                  unlockNowButton.innerHTML =
                    '<i class="fas fa-unlock mr-1"></i> Unlock Now';
                } else {
                  unlockNowButton.setAttribute("class", "btn btn-secondary");
                  unlockNowButton.innerHTML =
                    '<i class="fas fa-unlock mr-1"></i> Not enough coins';
                }
              }
              actionProfileBtnContainer.appendChild(buttonInvite);
              actionProfileBtnContainer.appendChild(buttonUnlock);
            }

            const textFullName = document.getElementById("text-full-name");
            textFullName.innerHTML = `<i class="fas fa-user"></i> ${
              data.profile_details?.full_name ?? "-"
            }`;

            const textElements = [
              document.getElementById("text-gender"),
              document.getElementById("text-email"),
              document.getElementById("text-phone-number"),
              document.getElementById("text-date-of-birth"),
              document.getElementById("text-current-job-status"),
              document.getElementById("text-preferred-job"),
              document.getElementById("text-expected-salary"),
              document.getElementById("text-location"),
              document.getElementById("text-address"),
              document.getElementById("text-about-me"),
              document.getElementById("text-work-experience"),
              document.getElementById("text-education"),
              document.getElementById("text-skills"),
              document.getElementById("text-languages"),
              document.getElementById("text-other-information"),
            ];

            if (data.profile_details?.gender == "male") {
              textElements[0].innerHTML = "Male";
            } else if (data.profile_details?.gender == "female") {
              textElements[0].innerHTML = "Female";
            } else {
              textElements[0].innerHTML = "";
            }

            textElements[4].innerHTML =
              data.profile_details?.current_job_status;
            textElements[5].innerHTML = data.profile_details?.preferred_job;
            let minSalary = data.profile_details?.expected_min_salary;
            let maxSalary = data.profile_details?.expected_max_salary;
            let salaryType = data.profile_details?.expected_salary_type;
            if (minSalary && maxSalary && salaryType) {
              textElements[6].innerHTML = `${minSalary} - ${maxSalary} ${salaryType}`;
            }

            textElements[1].innerHTML = data.profile_details?.email;
            textElements[2].innerHTML = data.profile_details?.phone_number;
            textElements[3].innerHTML = data.profile_details?.date_of_birth;

            textElements[7].innerHTML =
              data.profile_details?.location_data?.name;
            textElements[8].innerHTML = data.profile_details?.address;
            textElements[9].innerHTML = data.profile_details?.about_me;
            textElements[10].innerHTML = data.profile_details?.work_experience;
            textElements[11].innerHTML = data.profile_details?.education;
            textElements[12].innerHTML = data.profile_details?.skills;
            textElements[13].innerHTML = data.profile_details?.languages;
            textElements[14].innerHTML =
              data.profile_details?.other_information;

            // var hiddenText = `<i class="fas fa-eye-slash"></i>`;

            for (let i = 0; i < textElements.length; i++) {
              if (textElements[i].innerText == "") {
                textElements[i].innerHTML = "-";
              }
            }
          } else {
            const textCompanyName = document.getElementById("text-full-name");
            textCompanyName.innerHTML = `This profile is set to private <i class="fas fa-lock"></i>`;
          }
        }
      })
      .catch((error) => {
        populateMoreProfiles([]);
        console.error(error);
      });
  } else {
    populateMoreProfiles([]);
    alert("Resume Id not found");
  }
}

document
  .getElementById("refresh-profile-list")
  .addEventListener("click", function () {
    fetchUserProfile();
  });

fetchUserProfile();
