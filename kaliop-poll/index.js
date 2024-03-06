const Slack = require("@slack/bolt");
const dotenv = require("dotenv");

dotenv.config();

const app = new Slack.App({
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  token: process.env.SLACK_BOT_TOKEN,
});

const blocks = [
  {
    type: "section",
    text: {
      type: "mrkdwn",
      text: "Moody",
    },
  },
  {
    type: "actions",
    elements: [
      {
        type: "button",
        text: {
          type: "plain_text",
          text: "Ankieta",
        },
        action_id: "open_modal",
      },
    ],
  },
];

app.client.chat.postMessage({
  channel: "C06MY8PHZSN",
  text: "ASD",
  blocks: blocks,
});

// Obsługa kliknięcia przycisku
app.action("open_modal", async ({ ack, body }) => {
  console.log("asd");
  // Potwierdź akcję
  await ack();

  // Ustaw parametry modala
  const modal = {
    title: "Tytuł modala",
    callback_id: "submit_modal",
    submit_label: "Wyślij",
    close: {
      text: "Zamknij",
      action_id: "close_modal",
    },
    blocks: [
      {
        type: "input",
        element: {
          type: "text",
          action_id: "input_text",
        },
        label: "Wpisz tekst",
      },
    ],
  };

  // Otwórz modal
  await app.client.views.open({
    trigger_id: body.trigger_id,
    view: modal,
  });
});

// Obsługa zatwierdzenia modala
app.action("submit_modal", async ({ ack, body }) => {
  // Potwierdź akcję
  await ack();

  // Pobierz dane z modala
  const text = body.view.state.values.input_text.value;
  console.log(text);

  // ... przetwórz dane (np. zapisz w bazie danych)

  // Zamknij modal
  await app.client.views.close({
    view_id: body.view.id,
  });
});

app.start();
