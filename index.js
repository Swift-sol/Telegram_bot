var utils = require("./utils.js");
const TelegramBot = require('node-telegram-bot-api');

// replace the value below with the Telegram token you receive from @BotFather
const token = process.env.TELEGRAM_TOKEN ;
const url = process.env.APP_URL;
const options = {
    /* webHook: {
        port: process.env.PORT,
    } */
    // to run local node, comment webhook and uncomment polling
    polling: true
};

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, options);


bot.onText(/hola/, (msg) => {
  // 'msg' is the received Message from Telegram
  const chatId = msg.chat.id;

  // send back a message with the name of the user
  bot.sendMessage(chatId, "Hola " + msg.from.first_name);
});

bot.onText(/\/new_user/, (msg) => {
    const user_id = msg.from.id;
    const user_name = msg.from.first_name;
    const creation_date = new Date();
  
    database.ref('/users/' + user_id).set({
      name: user_name,
      date: creation_date.getTime()
    });
  
    bot.sendMessage(msg.chat.id, "User " + user_name + " added to the database.");
  })

  bot.onText(/\/get_users/, (msg) => {
    let message = "";
    database.ref('/users/').once('value').then(snapshot => {
      snapshot.forEach(id_usuario => {
        message += "Usuario: " + id_usuario.val().name + '\n';
      })
  
      bot.sendMessage(msg.chat.id, message);
    })
  })