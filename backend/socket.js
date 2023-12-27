const { Server } = require("socket.io");

const configureSocket = (server) => {
    const io = new Server(server, { cors: { origin: "http://localhost:5173" } })


    io.on("connection", (socket) => {
        console.log("connected")

        socket.on("create-something", (args) => {
            console.log("create-something", args)
        })

        socket.on("disconnect", () => {
            console.log("disconnected")

            socket.emit("create-something", (args) => {
                console.log("create-something", args);
            })
        })
    })

}
module.exports = configureSocket;