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
  try {
    const myImportantVariable = process.env.MY_IMPORTANT_VARIABLE;

    if (!myImportantVariable) {
      throw "Missing MY_IMPORTANT_VARIABLE environment variable";
    }
    console.log('hola mundo desde los logs');
    return {
      statusCode: 200,
      body: JSON.stringify(myImportantVariable),
      headers: {
        "Content-Type": "application/json",
      },
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error }),
      headers: {
        "Content-Type": "application/json",
      },
    };
  }
};

export const config: Config = {
  path: "/variables",
};
