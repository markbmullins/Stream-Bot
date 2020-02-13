const Discord = require("discord.js");
require("dotenv").config();
const client = new Discord.Client();
const fs = require("fs");
client.commands = new Discord.Collection();

client.login(process.env.token);

client.on("ready", () => {
    console.log("I'm online");
});

fs.readdir("./commands/", (err, files) => {
    if (err) console.log(err);
    const jsfiles = files.filter(file => file.split(".").pop() === "js");
    if (jsfiles.length <= 0) {
        console.log("Couldn't find commands!");
        return;
    }
    jsfiles.forEach(file => {
        const command = require(`./commands/${file}`);
        console.log(`${file} loaded!`);
        client.commands.set(command.help.name, command);
    });
});

client.on("message", message => {
    if (message.author.bot) return;
    if (message.channel.type === "dm") return;

    // Message parsing
    const prefix = "!";
    let [cmd, ...args] = message.content.split(" ");
    cmd = cmd.toLowerCase();
    if (!cmd.startsWith(prefix)) return;
    cmd = cmd.substr(prefix.length);

    // Command runner
    const commandFile = client.commands.get(cmd);
    if (commandFile) {
        commandFile.run({ client, message, args });
    }
});
