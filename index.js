const config = require("./config.js");
const fetch = require("node-fetch")
const Discord = require("discord.js");
const client = new Discord.Client();

const sadWords = ["sad", "depressed", "unhappy", "angry"]
const insultWords = ['insult', 'insulting', 'make fun of']
const encouragements = [
    "Cheer up!",
    "Hang in there.",
    "You're an alright person."
]

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

    } else if (insultWords.some(word => msg.content.includes(word))) {
        getInsult().then(quote => msg.channel.send(quote))

    } else if (msg.content === "encourage") {
        getEncouragement().then(quote => msg.channel.send(quote))

    } else if (sadWords.some(word => msg.content.includes(word))) {
        const encouragement = encouragements[Math.floor(Math.random() * encouragements.length)]
        msg.reply(encouragement)
    }
})

client.login(config.token)
