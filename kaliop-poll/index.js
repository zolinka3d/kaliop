const Slack = require("@slack/bolt");
const dotenv = require("dotenv");

dotenv.config();

const app = new Slack.App({
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  token: process.env.SLACK_BOT_TOKEN,
});

const channelId = 'C06MY8PHZSN';

const interval = setInterval(() => {
  const message = await generatePollMessage();

  app.client.chat.postMessage({
    channel: channelId,
    text: message
  });
}, 120000);

async function generatePollMessage() {
  const options = [
    {
      text: "Test 1",
      value: "test1"
    },
    {
      text: "Test 2",
      value: "test2"
    }
  ];

  const blocks = [
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: "Ankieta nastrojowa"
      }
    },
    {
      type: "actions",
      elements: options.map((option) => {
        return {
          type: "button",
          text: option.text,
          value: option.value,
          action_id: "vote"
        };
      })
    }
  ];

  return {
    blocks: blocks
  };
}

app.start();