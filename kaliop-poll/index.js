const Slack = require("@slack/bolt");
const dotenv = require("dotenv");

dotenv.config();

const app = new Slack.App({
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  token: process.env.SLACK_BOT_TOKEN,
});

// app.client.chat.postMessage({
//   token: process.env.SLACK_BOT_TOKEN,
//   channel: process.env.SLACK_CHANNEL,
//   text: "Hello world",
// });

async function main() {
  await app.start(process.env.PORT || 3000);
  console.log("⚡️ Bolt app is running!");

  app.message("helloworld", async ({ message, say }) => {
    await say(`Hey there <@${message.user}>!`);
  });
}

main();
