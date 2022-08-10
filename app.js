const express = require("express")
const https = require("https")

const app = express()

app.get("/", function (req, res) {
    const url = "https://api.openweathermap.org/data/2.5/weather?q=salvador,br&units=metric&appid=e0a5ca4b6d3e145784a463635e3cda8a"

    https.get(url, function (response) {
        response.on("data", function (data) {
            const weatherData = JSON.parse(data)
            const temperature = weatherData.main.temp
            const weatherDescription = weatherData.weather[0].description
            const icon = weatherData.weather[0].icon
            const imgURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"

            res.write("<h1>A temperatura em Salvador - BA eh: " + temperature + " graus Celsius.</h1>")
            res.write("<h2>Ja a situacao do tempo eh: " + weatherDescription + "</h2>")
            res.write("<img src=" + imgURL + ">")
            
            res.send()
        })
    })
})

app.listen(80, function () {
    console.log("Server is running on port 80.");
})