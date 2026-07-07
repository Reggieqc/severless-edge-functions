import type {
  Config,
  Context,
  Handler,
  HandlerContext,
  HandlerEvent,
} from "@netlify/functions";

const notify = async (message: string) => {
  try {
    const response = await fetch(process.env.DISCORD_WEBHOOK_URL ?? "", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: message,
      }),
    });

    if (!response.ok) {
      throw new Error(
        `Failed to send notification to Discord. Status: ${response.status}`,
      );
    }
  } catch (error) {
    console.error("Error sending notification to Discord:", error);
  }
};

const onStar = (payload: any): string => {
  const { starred_at, sender, repository, action } = payload;

  return `User ${sender.login} ${action} star at the repository ${repository.full_name} at ${starred_at}`;
};
const onIssue = (payload: any): string => {
  const { issue, sender, repository, action } = payload;
  return `User ${sender.login} ${action} issue #${issue.number} in repository ${repository.full_name}`;
};

export const handler: Handler = async (
  event: HandlerEvent,
  context: HandlerContext,
) => {
  let message: string;
  const githubEvent = event.headers["x-github-event"] ?? "unknown";
  const payload = JSON.parse(event.body ?? "{}");
  console.log(payload);

  switch (githubEvent) {
    case "star":
      message = onStar(payload);
      break;
    case "issues":
      message = onIssue(payload);
      break;
    default:
      message = `Unhandled GitHub event: ${githubEvent}`;
  }

  await notify(message);
  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Done" }),
    headers: {
      "Content-Type": "application/json",
    },
  };
};

export const config: Config = {
  path: "/github-discord",
};
