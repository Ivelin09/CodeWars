const mongoose = require("mongoose");
const Users = require("../schemas/user.schema");
const { QrCodes } = require("../schemas/qr_code.schema");
const { Request } = require("../schemas/request.schema");
const {
  validateQRCodeModel,
  getTimeout,
} = require("../schemas/requests.types.schema");

const solutions = (mixedQRCode, id) => {
  const getLetterOrder = (letter) => {
    if (letter >= "a" && letter <= "z")
      return -(letter.charCodeAt(0) - "a".charCodeAt(0) + 1);
    return +(letter.charCodeAt(0) - "A".charCodeAt(0) + 1);
  };

  let res = {
    data: [{ code: "", indexes: { start: 0, end: 0 } }],
    length: 0,
  };
  for (let i = 0; i < mixedQRCode.length; i++) {
    let currId = 0;
    let currStr = "";
    for (let j = i; j < mixedQRCode.length; j++) {
      if (mixedQRCode.charCodeAt(j) >= 65 && mixedQRCode.charCodeAt(j) <= 90)
        currId += getLetterOrder(mixedQRCode[j]);
      else currId += getLetterOrder(mixedQRCode[j]);

      if (currId <= id && currId >= 0) {
        currStr += mixedQRCode[j];
        if (res.length < currStr.length) {
          res.length = currStr.length;
          res.data = [
            {
              code: currStr,
              indexes: {
                start: i,
                end: j,
              },
            },
          ];
        } else if (res.length == currStr.length) {
          res.data.push({
            code: currStr,
            indexes: {
              start: i,
              end: j,
            },
          });
        }
      } else break;
    }
  }

  for (let i = 1; i < res.data.length; i++)
    mixedQRCode =
      mixedQRCode.substring(0, res.data[i].indexes.start) +
      mixedQRCode.substring(res.data[i].indexes.end + 1);

  return { mixed_qr_code: mixedQRCode, valid_qr_code: res.data[0].code };
};

const get = async (req, res) => {
  let qrCode = "";
  const QRCodeInitLength = 200;

  for (let idx = 0; idx < QRCodeInitLength; idx++) {
    if (Math.random() <= 0.5)
      qrCode += String.fromCharCode(97 + Math.floor(Math.random() * 5));
    else qrCode += String.fromCharCode(65 + Math.floor(Math.random() * 5));
  }

  const { mixed_qr_code, valid_qr_code } = solutions(qrCode, 20);

  if (!(await Users.findOne({ auth_token: req.auth_token }))) {
    const k = await Users.create({
      auth_token: req.auth_token,
      qr_codes: await QrCodes.create({
        mixed_qr_code: mixed_qr_code,
        valid_qr_code: valid_qr_code,
      }),
    });
  } else {
    Users.findOneAndUpdate({ auth_token: req.auth_token }).then(
      async (user) => {
        user.qr_codes.push(
          await QrCodes.create({
            mixed_qr_code: mixed_qr_code,
            valid_qr_code: valid_qr_code,
          })
        );
        user.save();
      }
    );
  }

  res.json({
    qr_code: mixed_qr_code,
  });
};

const post = async (req, res) => {
  const { qr_code } = req.body;
  const user = (await Users.find({ auth_token: qr_code }))[0];

  if (!user) {
    res.status(401).json({
      message: "Токенът ви не е валиден",
    });
    return;
  }

  if (!user.qr_codes || user.qr_codes.length == 0) {
    res.json({
      message: "Нямаш налични QR кодове за решения",
    });

    return;
  }

  const isValid = user.qr_codes.some(
    ({ valid_qr_code }) => valid_qr_code == qr_code
  );

  if (isValid) {
    const qrCodesLeft = user.qr_codes.filter(
      ({ valid_qr_code }) => valid_qr_code != qr_code
    );
    await Users.findOneAndUpdate(
      { auth_token: req.auth_token },
      { solved_qr_codes: user.solved_qr_codes + 1, qr_codes: qrCodesLeft }
    );

    res.json({
      message: `Поздравления, вече имаш ${
        user.solved_qr_codes + 1
      }/5 решени билета!`,
    });
  } else {
    await Users.findOneAndUpdate(
      { auth_token: req.auth_token },
      { solved_qr_codes: 0 }
    );

    res.json({
      message:
        "Това е невалиден билет. Иван и приятелите му са изгонени от автобуса и чакат да им оправиш билтите до следващият автобус. Решените ти билети са занулени.",
    });
  }
};

module.exports = { get, post };
