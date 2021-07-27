const config = require("./config.js");
const fetch = require("node-fetch")
const Discord = require("discord.js");
const client = new Discord.Client();

function getInsult() {
    return fetch("https://evilinsult.com/generate_insult.php?type=json")
        .then(res => {
            return res.json()
        })
        .then(data => {
            return data['insult']
        })
}

function getEncouragement() {
    return fetch("https://zenquotes.io/api/random")
        .then(res => {
            return res.json()
        })
        .then(data => {
            return data[0]["q"] + " -" + data[0]["a"]
        })
}

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`)
})

client.on("message", msg => {
    if (msg.author.bot) return

    if (msg.content === "test") {
        msg.reply("test_passed")

    } else if (msg.content === "insult") {
        getInsult().then(quote => msg.channel.send(quote))

    } else if (msg.content === "encourage") {
        getEncouragement().then(quote => msg.channel.send(quote))
    }
})

client.login(config.token)
