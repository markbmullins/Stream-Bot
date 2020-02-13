module.exports.run = ({ message, args, Discord }) => {
    const banUser = message.guild.member(message.mentions.users.first());
    if (!banUser) return message.reply("Sorry, I couldn't find that user.");
    const [_, ...reasonParts] = args;
    const reason = reasonParts.join(" ");

    if (!message.member.hasPermission("BAN_MEMBERS")) {
        return message.reply("You do not have permission to do that!");
    }

    const banEmbed = new Discord.RichEmbed()
        .setDescription("~~~~~BANNED~~~~~")
        .setColor("#fc2403")
        .addField("Banned User", `${banUser} with ID: ${banUser.Id}`);

    message.channel.send(banEmbed);
    message.guild.member(banUser).ban(reason);
};

module.exports.help = {
    name: "ban"
};
