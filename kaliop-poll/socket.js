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

socketModeClient.on("member_joined_channel", async ({ event, body, ack }) => {
  try {
    // send acknowledgement back to slack over the socketMode websocket connection
    // this is so slack knows you have received the event and are processing it
    await ack();
    await webClient.chat.postMessage({
      blocks: [
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: `Welcome to the channel, <@${event.user}>. We're here to help. Let us know if you have an issue.`,
          },
          accessory: {
            type: "button",
            text: {
              type: "plain_text",
              text: "Get Help",
            },
            value: "get_help",
          },
        },
      ],
      channel: event.channel,
    });
  } catch (error) {
    console.log("An error occurred", error);
  }
});
