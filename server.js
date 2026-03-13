const express = require("express")
const axios = require("axios")

const app = express()
app.use(express.json())

const BOT_ID = "5817ba62-4e65-424c-b1ce-26214dee6288"
const BOTPRESS_URL = "https://api.botpress.cloud/v1/chat"
const ULTRA_INSTANCE = "instance165410"
const ULTRA_TOKEN = "gx55ew9dt8axrn4q"

app.post("/webhook", async (req, res) => {

try {

const message = req.body.data.body
const phone = req.body.data.from

const botpress = await axios.post(BOTPRESS_URL,{
botId: BOT_ID,
userId: phone,
type: "text",
text: message
})

const reply = botpress.data.responses[0].payload.text

await axios.post(`https://api.ultramsg.com/${ULTRA_INSTANCE}/messages/chat`,{
token: ULTRA_TOKEN,
to: phone,
body: reply
})

res.sendStatus(200)

} catch(err){
console.log(err)
res.sendStatus(500)
}

})

app.listen(3000, ()=>{
console.log("Server running")
})