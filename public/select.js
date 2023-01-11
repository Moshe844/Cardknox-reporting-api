window.addEventListener("DOMContentLoaded", function () {
  const xCommand = document.getElementById("xCommand");
  const xCardNum = document.getElementById("xCardNum");
  const xExp = document.getElementById("xExp");
  const xAmount = document.getElementById("xAmount");
  const labelCardNum = document.querySelector('label[for="xCardNum"]');
  const labelExp = document.querySelector('label[for="xExp"]');
  const labelAmount = document.querySelector('label[for="xAmount"]');
  const reportFields = document.getElementById("reportFields");

  xCommand.addEventListener("change", (event) => {
    console.log(xCommand);
    event.preventDefault();

    if (this.value === "Report:Approved") {
      // Hide the credit card, expiration date, and amount fields
      xCardNum.style.display = "none";
      xExp.style.display = "none";
      xAmount.style.display = "none";
      // Hide the labels for the credit card number, expiration date, and amount fields
      labelCardNum.style.display = "none";
      labelExp.style.display = "none";
      labelAmount.style.display = "none";
      // Show the report fields
      reportFields.style.display = "block";
    } else if (this.value === "cc:sale") {
      document.getElementById("reportFields").style.display = "none";

      // Show the credit card, expiration date, and amount fields
      xCardNum.style.display = "block";
      xExp.style.display = "block";
      xAmount.style.display = "block";
      // Show the labels for the credit card number, expiration date, and amount fields
      labelCardNum.style.display = "block";
      labelExp.style.display = "block";
      labelAmount.style.display = "block";
      // Hide the report fields
      reportFields.style.display = "none";
    }
  });
});
