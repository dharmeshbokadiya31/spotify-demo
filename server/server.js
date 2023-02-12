const express = require("express")
const cors = require("cors")
const SpotifyWebApi = require("spotify-web-api-node")
const bodyParser = require("body-parser")

const app = express()
app.use(cors())
app.use(bodyParser.json())

app.post("/refresh", (req, res) => {
  const refreshToken = req.body.refreshToken
  const spotifyApi = new SpotifyWebApi({
    redirectUri: "http://localhost:3000",
    clientId: "3a9a76f893c44dd391d99b514595a208",
    clientSecret: "58744af492874bbdb7931bb5739adfac",
    refreshToken,
  })
   spotifyApi.refreshAccessToken().then((data) => {
      res.json({
        accessToken: data.body.accessToken,
        expiresIn: data.body.expiresIn
      })
   }).catch((error) => {
      res.sendStatus(400)
   })
})

app.post("/login", (req, res) => {
    const code = req.body.code
    const spotifyApi = new SpotifyWebApi({
        redirectUri: "http://localhost:3000",
        clientId: "3a9a76f893c44dd391d99b514595a208",
        clientSecret: "58744af492874bbdb7931bb5739adfac"
    })

    spotifyApi.authorizationCodeGrant(code).then(data => {
        res.json({
            accessToken: data.body.access_token,
            refreshToken: data.body.refresh_token,
            expiresIn: data.body.expires_in
        })
    }).catch((error) => {
        res.sendStatus(400)
    })
})

app.listen(3001)