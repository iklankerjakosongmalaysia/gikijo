function findJobs() {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id");

  var countdownElement = document.getElementById("countdown");

  if (id) {
    fetchAPI(
      `https://x8ki-letl-twmt.n7.xano.io/api:P5dHgbq7/job/link/${id}`,
      "GET",
      null
    )
      .then((data) => {
        if (data.apply_link) {
          var seconds = 10;
          var countdownInterval = setInterval(function () {
            seconds--;
            if (seconds > 0) {
              countdownElement.innerHTML =
                "<p>Loading...</p>" +
                "<p>Please wait while we redirect you to the job application page</p>" +
                "<span>Redirecting in " +
                "<span style='font-weight:bold; font-size:larger;'>" +
                seconds +
                " seconds...</span>";
            } else {
              clearInterval(countdownInterval);
              window.location.href = data.apply_link;
            }
          }, 1000);
        } else {
          countdownElement.innerHTML = data.message;
        }
      })
      .catch((error) => {});
  } else {
    countdownElement.innerHTML = "Job not found";
  }
}

findJobs();
