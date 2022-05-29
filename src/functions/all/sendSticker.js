module.exports = async (d) => {
  const inside = d.inside;
  const fs = require('fs');
  const axios = require('axios')
  if (!inside) {
    d.isError = true;
    d.error("❌ WhatscodeError: Usage: $sendSticker[image path]");
  } else {
    var [url, packname = "Whatscode Sticker", author = "npmjs.com/whatscode.js"] = inside.split(
      ";"
    );
    try {
      var a = await axios.post('https://whatscode.api.jstnlt.my.id/api/sticker', {
        headers: {
          "User-Agent": `Whatsapp Bot using Whatscode.js (https://npmjs.com/whatscode.js, ${require("../../../package.json").version})`
        },
        data: {
          buffer: fs.readFileSync(url),
          packname: packname,
          author: author,
          emoji: [""],
          id: "npmjs.com/whatscode.js",
          bufferRes: false
        }
      })

      await fs.writeFileSync("./tmp/prepareStciker.webp", Buffer.from(a.data.sticker.data))
      await d.client.sendMessage(d.msg.key.remoteJid, { sticker: { url: './tmp/prepareStciker.webp' } });
      await fs.unlinkSync(url)
      await fs.unlinkSync("./tmp/prepareStciker.webp")
    } catch(e) {
      console.log(e);
      d.isError = true;
      d.error(`❌ WhatscodeError: Something error in $sendSticker: ${e}`)
    }

    return "";
  }
};
