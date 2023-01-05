const express = require("express");
const request = require("request");

const app = express();
const path = require("path");

app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.get("/gatewayjson", (req, res) => {
  const xKey = req.query.xKey;
  const xCommand = req.query.xCommand;
  const xCardNum = req.query.xCardNum;
  const xExp = req.query.xExp;
  const xAmount = req.query.xAmount;
  const xSoftwareName = "Cardknox";
  const xSoftwareVersion = "2.1";
  const xVersion = "5.0.0";

  const body = JSON.stringify({
    xKey: xKey,
    xCommand: xCommand,
    xCardNum: xCardNum,
    xExp: xExp,
    xSoftwareName: xSoftwareName,
    xSoftwareVersion: xSoftwareVersion,
    xVersion: xVersion,
    xAmount: xAmount,
  });

  request(
    {
      url: "https://x1.cardknox.com/gatewayjson",
      method: "POST",
      body: body,
    },
    (error, response, body) => {
      if (error) {
        console.log(error);
      } else {
        console.log(body);

        const responseObject = JSON.parse(body);
        const xAuthCode = responseObject.xAuthCode;
        const xRefNum = responseObject.xRefNum;
        const xStatus = responseObject.xStatus;
        const xError = responseObject.xError;

        if (xError) {
          res.render("template", {
            xError: xError,
            xRefNum: xRefNum,
          });
        } else {
          res.render("template", {
            xKey: xKey,
            xAuthCode: xAuthCode,
            xRefNum: xRefNum,
            xStatus: xStatus,
          });
        }
      }
    }
  );
});

app.get("/reportjson", (req, res) => {
  const xKey = req.query.xKey;
  const xCommand = req.query.xCommand;
  const xVersion = "5.0.0";
  const xSoftwareName = "Cardknox";
  const xSoftwareVersion = "2.1";
  const xBeginDate = req.query.xBeginDate;
  const xEndDate = req.query.xEndDate;

  const body = JSON.stringify({
    xKey: xKey,
    xCommand: xCommand,
    xVersion: xVersion,
    xSoftwareName: xSoftwareName,
    xSoftwareVersion: xSoftwareVersion,
    xBeginDate: xBeginDate,
    xEndDate: xEndDate,
  });

  request(
    {
      url: "https://x1.cardknox.com/reportjson",
      method: "POST",
      body: body,
    },
    (error, response, body) => {
      if (error) {
        console.log(error);
      } else {
        console.log(body);

        // Parse the response body
        const responseObject = JSON.parse(body);

        // Extract the relevant fields from the response
        const xAmount = responseObject.xAmount;
        const xAuthAmount = responseObject.xAuthAmount;
        const xCardType = responseObject.xCardType;
        const xCommand = responseObject.xCommand;
        const xEnteredDate = responseObject.xEnteredDate;
        const xExp = responseObject.xExp;
        const xMaskedAccountNumber = responseObject.xMaskedAccountNumber;
        const xMaskedCardnumber = responseObject.xMaskedCardnumber;
        const xRefnum = responseObject.xRefnum;
        const xRefNumCurrent = responseObject.xRefNumCurrent;
        const xResponseError = responseObject.xResponseError;
        const xResponseResult = responseObject.xResponseResult;
        const xToken = responseObject.xToken;

        // Render the response fields in a template
        res.render("template", {
          xAmount: xAmount,
          xAuthAmount: xAuthAmount,
          xCardType: xCardType,
          xCommand: xCommand,
          xEnteredDate: xEnteredDate,
          xExp: xExp,
          xMaskedAccountNumber: xMaskedAccountNumber,
          xMaskedCardnumber: xMaskedCardnumber,
          xRefnum: xRefnum,
          xRefNumCurrent: xRefNumCurrent,
          xResponseError: xResponseError,
          xResponseResult: xResponseResult,
          xToken: xToken,
        });
      }
    }
  );
});

app.listen(3060, () => {
  console.log("Server listening on port 3060");
});
