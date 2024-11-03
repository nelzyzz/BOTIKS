const { sendMessage } = require('./sendMessage');

const handlePostback = (event, pageAccessToken) => {
  const toshia = event.sender?.id;
  const cutie = event.postback?.payload;

  if (toshia && cutie) {
    if (cutie === 'GET_STARTED_PAYLOAD') {
      const combinedMessage = {
        attachment: {
          type: "template",
          payload: {
            template_type: "button",
            text: `Welcome to TOSHIA CHATBOT! 🌟\n\nI'm your AI-powered assistant, here to make your experience smoother and more enjoyable! 🤖\n\n𝗧𝗘𝗥𝗠𝗦 𝗢𝗙 𝗦𝗘𝗥𝗩𝗜𝗖𝗘 & 𝗣𝗥𝗜𝗩𝗔𝗖𝗬 𝗣𝗢𝗟𝗜𝗖𝗬\n\nBy using this bot, you agree to:\n1. 𝗜𝗻𝘁𝗲𝗿𝗮𝗰𝘁𝗶𝗼𝗻: Automated responses may log interactions to enhance service.\n\n2. 𝗗𝗮𝘁𝗮: We collect data to improve functionality, without sharing it.\n\n3. 𝗦𝗲𝗰𝘂𝗿𝗶𝘁𝘆: Your data is kept secure and confidential.\n\n4. 𝗖𝗼𝗺𝗽𝗹𝗶𝗮𝗻𝗰𝗲: Adhere to platform guidelines or face access limitations.\n\n5. 𝗨𝗽𝗱𝗮𝘁𝗲𝘀: Terms may evolve, and continued use indicates acceptance.\n\nFailure to comply may result in access restrictions.\n\nType "help" to see commands or click the "Help" button below!`,
            buttons: [
              {
                type: "web_url",
                url: "https://toshiatermsandprivacypolicy.vercel.app/",
                title: "PRIVACY POLICY"
              }
            ]
          }
        },
        quick_replies: [
          {
            content_type: "text",
            title: "Help",
            payload: "HELP_PAYLOAD"
          }
        ]
      };

      sendMessage(toshia, combinedMessage, pageAccessToken);

    } else {
      sendMessage(toshia, { text: `You sent a postback with payload: ${cutie}` }, pageAccessToken);
    }
  } else {
    console.error('Invalid postback event data');
  }
};

module.exports = { handlePostback };
