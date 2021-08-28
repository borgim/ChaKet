const { Socket } = require('dgram')
const express = require('express')
const app = express()

const http = require('http')
const { Server } = require("socket.io")
const server = http.createServer(app)
const io = new Server(server)

app.get('/', (req,res) => {
    res.sendFile(__dirname + '/public' + '/index.html', (err) => {
        if(err) throw err
        console.log("Arquivo index.html carregado")
    })
})

io.on('connection', (socket) => {
    console.log("Usuário conectado")
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg)
    })
    socket.on('disconnect', () => {
        console.log("Usuário desconectado")
        io.emit('chat message', 'usuario desconectado')
    })
})

server.listen(5000, () => {
    console.log("Servidor está rodando *:5000")
})