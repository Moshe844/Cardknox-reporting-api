document
  .querySelector("#payment-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    const xCommand = document.querySelector("#xCommand").value;

    if (xCommand === "cc:sale") {
      this.action = "/gatewayjson";
    } else if (xCommand === "Report:Approved") {
      this.action = "/reportjson";
    }

    setTimeout(function () {
      document.querySelector("#success-message").style.display = "none";
      document.querySelector("#error-message").style.display = "none";
    }, 10000);
  });
