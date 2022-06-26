const privKeyElem = document.getElementById("privatekey");
const pubKeyElem = document.getElementById("publickey");
const addressElem = document.getElementById("address");
const errorlogElem = document.getElementById("errorlog_showcase");
let qrcode = null;

const refreshBalance = (addr, elem) => {
  elem.innerText = "balance取得中...";

  let config = {
    method: "get",
    url:
      "https://api.whatsonchain.com/v1/bsv/main/address/" + addr + "/balance",
  };

  axios(config).then((response) => {
    let data = JSON.stringify(response.data);
    console.log(data);
    elem.innerText = data;
  });
};

const generateQRCode = (content, elem) => {
  if (qrcode) {
    qrcode.makeCode(String(content));
  } else {
    qrcode = new QRCode(elem, String(content));
  }
};

const main = () => {
  const inputValue = document.getElementById("privatekey_input").value;
  errorlogElem.innerText = "";

  try {
    const privKey = bsv.PrivateKey.fromString(inputValue);
    const pubKey = bsv.PublicKey.fromPrivateKey(privKey);
    const addr = bsv.Address.fromPrivateKey(privKey);

    privKeyElem.innerText = privKey;
    pubKeyElem.innerText = pubKey;
    addressElem.innerText = addr;

    refreshBalance(addr.toString(), document.getElementById("balance"));
    generateQRCode(addr.toString(), document.getElementById("qrcode"));
  } catch (e) {
    console.log(e);
    errorlogElem.innerText = e;
  }
};

document.getElementById("btn_checkout").onclick = main;
