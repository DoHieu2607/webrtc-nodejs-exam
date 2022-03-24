const options = {
  cors: {
    origin: "*",
  },
};
const io = require("socket.io")(options);

const ROOM = "ROOM";

io.on("connection", (socket) => {
  console.log("+ Connected", socket.id);

  socket.to(ROOM).emit("ready");
  socket.join(ROOM);

  socket.on("disconnect", () => {
    socket.leave(ROOM);
    console.log("- Disconnected", socket.id);
  });

  socket.on("data", (data) => {
    socket.to(ROOM).emit("data", data);
  });
});

io.listen(3421);
console.log("Listening at *:3421");
