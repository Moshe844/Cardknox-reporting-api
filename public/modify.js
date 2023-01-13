document.querySelector("#payment-form").addEventListener("submit", function () {
  const xCommand = document.querySelector("#xCommand");
  // eslint-disable-next-line no-self-assign
  xCommand.value = xCommand.value;

  if (xCommand.value === "cc:sale") {
    this.action = "/gatewayjson";
  } else if (xCommand.value === "Report:Approved") {
    this.action = "/reportjson";
  }
});
