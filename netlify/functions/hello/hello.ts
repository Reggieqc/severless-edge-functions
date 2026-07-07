import type {
  Config,
  Context,
  Handler,
  HandlerContext,
  HandlerEvent,
} from "@netlify/functions";

export const handler: Handler = async (
  event: HandlerEvent,
  context: HandlerContext,
) => {
  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Hello World" }),
    headers: {
      "Content-Type": "application/json",
    },
  };
};

export const config: Config = {
  path: "/hello",
};
