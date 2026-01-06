const { Telegraf } = require("telegraf");

const token = process.env.BOT_TOKEN;

if (!token) {
  console.error("ERROR: BOT_TOKEN is not defined!");
  process.exit(1);
}

const bot = new Telegraf(token);

bot.use(async (ctx) => {
  await ctx.reply(JSON.stringify(ctx.update, null, 2));
});

bot.launch().then(() => console.log("Бот запущен в Kubernetes"));

process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
