const port=process.env.PORT || 8000;
const io=require("socket.io")(process.env.PORT || port,{
    cors:{
        origin:'*',
    }
});



const users={};

io.on("connection",socket=>{
    socket.on("new-user-joined",name=>{
        console.log("server is running at port 8000");
        users[socket.id]=name;
        socket.broadcast.emit('user-joined',name);
    })

    socket.on("send",msg=>{
        console.log(msg);
        socket.broadcast.emit('receiver',{
            name:users[socket.id],
            msg:msg
        });
    })
});

