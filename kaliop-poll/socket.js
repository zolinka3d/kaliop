const { SocketModeClient } = require("@slack/socket-mode");
const { WebClient } = require("@slack/web-api");

const dotenv = require("dotenv");

dotenv.config();

const appToken = process.env.SLACK_APP_TOKEN;
const socketModeClient = new SocketModeClient({
  appToken: appToken,
});

socketModeClient.on("message", async ({ event }) => {
  console.log(event);
});

const webClient = new WebClient(process.env.SLACK_BOT_TOKEN);

socketModeClient.on("message", async ({ event, body, ack }) => {
  if (event.text === "helloworld") {
    await ack();
    await webClient.chat.postMessage({
      channel: event.channel,
      text: "hey you",
    });
  }
});
