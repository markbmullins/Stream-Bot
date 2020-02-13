module.exports.run = ({ client, message, args }) => {
    message.reply("Pong!");
};

module.exports.help = {
    name: "ping",
    helpText: "type !Ping to call this command!"
};
