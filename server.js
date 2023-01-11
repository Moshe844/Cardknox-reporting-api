const express = require("express");
const request = require("request");

const app = express();
const path = require("path");

app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.get("/gatewayjson", (req, res) => {
  const { xKey } = req.query;
  const { xCommand } = req.query;
  const { xCardNum } = req.query;
  const { xExp } = req.query;
  const { xAmount } = req.query;
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
    // eslint-disable-next-line no-shadow
    (error, response, body) => {
      if (error) {
        console.log(error);
      } else {
        console.log(body);

        const responseObject = JSON.parse(body);
        const { xAuthCode } = responseObject;
        const { xRefNum } = responseObject;
        const { xStatus } = responseObject;
        const { xError } = responseObject;

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
            xCommand: xCommand,
          });
        }
      }
    }
  );
});

app.get("/reportjson", (req, res) => {
  const { xKey } = req.query;
  const { xCommand } = req.query;
  const xVersion = "5.0.0";
  const xSoftwareName = "Cardknox";
  const xSoftwareVersion = "2.1";
  const { xBeginDate } = req.query;
  const { xEndDate } = req.query;

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
    // eslint-disable-next-line no-shadow
    (error, response, body) => {
      if (error) {
        console.log(error);
      } else {
        console.log(body);

        // Parse the response body
        const responseObject = JSON.parse(body);

        // Extract the relevant fields from the response

        const data = [];
        data.push({
          xAmount: responseObject.xAmount,
          xAuthAmount: responseObject.xAuthAmount,
          xCardType: responseObject.xCardType,
          xCommand: responseObject.xCommand,
          xEnteredDate: responseObject.xEnteredDate,
          xExp: responseObject.xExp,
          xMaskedAccountNumber: responseObject.xMaskedAccountNumber,
          xMaskedCardnumber: responseObject.xMaskedCardnumber,
          xRefNum: responseObject.xRefNum,
          xRefNumCurrent: responseObject.xRefNumCurrent,
          xResponseError: responseObject.xResponseError,
          xResponseResult: responseObject.xResponseResult,
          xToken: responseObject.xToken,
        });
        res.render("report", {
          data: data,
        });
      }
    }
  );
});

app.listen(3060, () => {
  console.log("Server listening on port 3060");
});
