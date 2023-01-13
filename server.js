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
  const xVersion = "5.0.0";
  const xSoftwareName = "Cardknox";
  const xSoftwareVersion = "2.1";
  const { xKey } = req.query;
  const { xCommand } = req.query;
  const { xBeginDate } = req.query;
  const { xEndDate } = req.query;

  const body = JSON.stringify({
    xKey,
    xCommand,
    xVersion,
    xSoftwareName,
    xSoftwareVersion,
    xBeginDate,
    xEndDate,
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
        const data = responseObject.xReportData.map((item) => ({
          amount: item.xAmount,
          cardType: item.xCardType,
          beginDate: item.xEnteredDate,
          endDate: item.xEnteredDate,
          cardLastFour: item.xMaskedCardnumber,
          refNum: item.xRefNum,
        }));

        // Render the template with the data
        res.render("template", {
          data: data,
        });
      }
    }
  );
});

app.listen(3060, () => {
  console.log("Server listening on port 3060");
});
