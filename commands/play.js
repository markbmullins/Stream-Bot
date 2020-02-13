const ytdl = require("ytdl-core");

module.exports.run = ({ message, args }) => {
    const voiceChannel = message.member.voiceChannel;
    const url = args[0];

    if (!voiceChannel) {
        return message.reply("You must be in a voice channel.");
    }

    const permissions = voiceChannel.permissionsFor(message.client.user);
    if (!permissions.has("CONNECT")) {
        return message.reply("I can't connect to that voice channel, sorry.");
    }
    if (!permissions.has("SPEAK")) {
        return message.reply("I can't speak in that voice channel, sorry.");
    }
    if (!voiceChannel.joinable) {
        return message.reply("Something went wrong, I can't join your voice channel.");
    }

    const stream = ytdl(url, { filter: "audioonly" });
    const streamOptions = { bitrate: 40000 };
    voiceChannel.join().then(connection => {
        const dispatcher = connection.playStream(stream, streamOptions);
        dispatcher.on("end", () => connection.disconnect());
    });
};

module.exports.help = {
    name: "play"
};
