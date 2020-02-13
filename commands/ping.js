module.exports.run = ({ message }) => {
    message.reply("Pong!");
};

module.exports.help = {
    name: "ping",
    helpText: "type !Ping to call this command!"
};
