// const select = document.getElementById("xCommand");
// const paymentForm = document.getElementById("payment-form");

// select.addEventListener("change", () => {
//   console.log(select.value);
// });

// paymentForm.addEventListener("submit", (e) => {
//   e.preventDefault();
//   submitForm(select.value);
// });

// const submitForm = async (request) => {
//   const data = {
//     xKey: document.getElementById("xKey").value,
//     xCardNum: document.getElementById("xCardNum").value,
//     xExp: document.getElementById("xExp").value,
//     xAmount: document.getElementById("xAmount").value,
//   };
//   const url = request === "cc:sale" ? "/gatewayjson" : "/reportjson";
//   console.log(url);

//   const response = await fetch(url, {
//     method: "POST", // *GET, POST, PUT, DELETE, etc.
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(data),
//   });

//   // SEND THE DATA IN THE
//   data = await response.json();

//   AuthCode = data.xAuthCode;
//   xError = data.xError;
//   xRefNum = data.xRefNum;
//   xCommand = data.xCommand;
//   xAmount = data.xAmount;
//   xCardType = data.xCardType;
//   xBeginDate = data.xBeginDate;
//   xEndDate = data.xEndDate;

//   if (data.status === "success") {
//     window.location.replace(
//       `/success?xAuthCode=${data.xAuthCode}&xRefNum=${data.xRefNum}`
//     );
//   } else {
//     window.location.replace(`/error?message=${data.message}`);
//   }
// };
