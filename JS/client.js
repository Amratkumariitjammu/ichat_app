
const socket=io('http://localhost:5503')

const form=document.getElementById('send-container');
const messageInput=document.getElementById("messageInp");
const messageContainer=document.querySelector(".container");

var audio=new Audio('tinker.mp3');



const append =(message,position)=>{
    const messageElement=document.createElement('div');
    messageElement.innerText=message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if(position=='left'){
        audio.play();
    }
}

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message=messageInput.value;
    append(`You:${message}`,'right');
    socket.emit('send',message);
    messageInput.value=''
})

const nm = prompt("Enter your name to join");
socket.emit('new-user-joined', nm);

socket.on('user-joined',nm=>{append(`${nm} joined the chat`,'right')})

socket.on('receive',data =>{
    append(`${nm}:${data.message}`,'left')
});

socket.on('left',data=>{
    append(`${nm} left the chat`,'right')
});


 