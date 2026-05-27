const https = require('https');

async function getBalance(address) {
  return new Promise((resolve, reject) => {
    const payload = JSON.stringify({
      jsonrpc: "2.0",
      method: "eth_getBalance",
      params: [address, "latest"],
      id: 1
    });

    const options = {
      hostname: "api.zan.top",
      path: "/node/v1/pharos/mainnet/139482a231794f9488a572bcda7bedd7",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Content-Length": Buffer.byteLength(payload)
      }
    };

    const req = https.request(options, (res) => {
      let body = "";
      res.on("data", (chunk) => { body += chunk; });
      res.on("end", () => {
        try {
          const json = JSON.parse(body);
          if (json.error) {
            reject(new Error(json.error.message));
            return;
          }
          const wei = parseInt(json.result, 16);
          const eth = wei / 1e18;
          resolve(eth);
        } catch (e) {
          reject(e);
        }
      });
    });

    req.on("error", reject);
    req.write(payload);
    req.end();
  });
}

async function checkWalletHealth(address) {
  console.log("\nChecking wallet: " + address + "\n");

  try {
    const balance = await getBalance(address);
    const balanceNum = parseFloat(balance);
    let status, advice;

    if (isNaN(balanceNum) || balanceNum === 0) {
      status = "Empty";
      advice = "This wallet has no funds.";
    } else if (balanceNum < 0.01) {
      status = "Low";
      advice = "Balance is very low. May not cover gas fees.";
    } else {
      status = "Healthy";
      advice = "Wallet has sufficient balance.";
    }

    console.log("Wallet  : " + address);
    console.log("Balance : " + (isNaN(balanceNum) ? "0.0000" : balanceNum.toFixed(4)) + " PHRS");
    console.log("Status  : " + status);
    console.log("Advice  : " + advice);
  } catch (err) {
    console.error("Could not fetch balance:", err.message);
  }
}

const address = process.argv[2];
if (!address) {
  console.error("Usage: node scripts/check.js <wallet-address>");
  process.exit(1);
}
checkWalletHealth(address).catch(console.error);