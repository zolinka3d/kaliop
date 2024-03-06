const Slack = require("@slack/bolt");
const dotenv = require("dotenv");

dotenv.config();

const app = new Slack.App({
    signingSecret: process.env.SLACK_SIGNING_SECRET,
    token: process.env.SLACK_BOT_TOKEN,
    socketMode: true,
    appToken: process.env.SLACK_APP_TOKEN,
    port: process.env.PORT || 3000
});

const blocks = [
    {
        type: "section",
        text: {
            type: "mrkdwn",
            text: "Moody"
        }
    },
    {
        type: "actions",
        elements: [
            {
                type: "button",
                text: {
                    type: "plain_text",
                    text: "Ankieta"
                },
                action_id: "open_modal"
            }
        ]
    }
];

await app.client.chat.postMessage({
    channel: 'C06MY8PHZSN',
    text: 'asdf',
    blocks: blocks
});

app.action('open_modal', async ({  ack, body }) => {
    await ack();

    const modal = {
        type: "modal",
        title: {
            type: "plain_text",
            text: "Moody"
        },
        submit: {
            type: "plain_text",
            text: "Wyślij"
        },
        close: {
            type: "plain_text",
            text: "Zamknij"
        },
        callback_id: "submit_modal",
        blocks: [
            {
                type: "input",
                label: {
                    type: "plain_text",
                    text: "Labelka"
                },
                element: {
                    type: "plain_text_input",
                    action_id: "input_text",
                    placeholder: {
                        type: "plain_text",
                        text: "Placholder bla bla bla"
                    },
                }
            }
        ]
    };

    await app.client.views.open({
        trigger_id: body.trigger_id,
        view: modal
    });
});


app.action('submit_modal', async ({ ack, body }) => {
    await ack();
    console.log(body.view.state.values)

    const text = body.view.state.values.input_text.value;

    // w tym miejscu przetwarzamy dane z modala po submicie i albo robimy close, albo update (update w przypadku kolejnych pytań)
    // Tylko trzeba rozkminić dlaczego to nie działa podejrzewam że jest jakiś problem przez Vercela, najlepiej jakbyś z Frankiem to postawiła na AWS

    await app.client.views.close({
        view_id: body.view.id
    });
});

async function main() {
    await app.start();
}

module.exports = main;