module.exports.run = ({ message }) => {
    message.guild.voiceConnection.disconnect();
};

module.exports.help = {
    name: "stop"
};
