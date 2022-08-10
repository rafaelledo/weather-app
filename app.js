const express = require("express")
const https = require("https")
const bodyParser = require("body-parser")

const app = express()

app.use(bodyParser.urlencoded({urlencoded: true}))

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html")
})

app.post("/", function (req, res) {
    const city = req.body.cityName
    const country = req.body.countryName
    const query = city + "," + country
    const apiKey = "e0a5ca4b6d3e145784a463635e3cda8a"
    const unit = "metric"

    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&units=" + unit + "&appid=" + apiKey + ""

    https.get(url, function (response) {
        response.on("data", function (data) {
            const weatherData = JSON.parse(data)
            const temperature = weatherData.main.temp
            const weatherDescription = weatherData.weather[0].description
            const icon = weatherData.weather[0].icon
            const imgURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"

            res.write("<h1>A temperatura em "+ city + ", " + country  + " eh: " + temperature + " graus Celsius.</h1>")
            res.write("<h2>A descricao do tempo eh: " + weatherDescription + "</h2>")
            res.write("<img src=" + imgURL + ">")

            res.send()
        })
    })
})



app.listen(80, function () {
    console.log("Server is running on port 80.");
})