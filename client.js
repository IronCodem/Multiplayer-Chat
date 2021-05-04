const io = require('socket.io-client');
const readline = require('readline');

var socket = io("https://repl-chat-server.yashasshah.repl.co");

const chat_interface = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

var colors = require('colors/safe');
colors.setTheme({
  input: 'grey',
  prompt: 'grey',
  info: 'green',
  data: 'grey',
  help: 'cyan',
  warn: 'yellow',
  debug: 'blue',
  error: 'red'
});

var chat_handle = "";
var message_to_send = "";


socket.on('connect', function(){
    get_chat_handle();
    socket.on('broadcast', display_message);
});

function get_chat_handle(){
    chat_interface.question(colors.prompt(`Hello! What's your username? `), function(answer){
        chat_handle = answer;
        socket.emit("message", chat_handle + (colors.info(' has entered the chat')));
        chat();
    });
}

function chat(){
    chat_interface.question(chat_handle + ": ", function(message){
        message_to_send = chat_handle + ': ' + message;
        socket.emit("message", message_to_send );
        chat();
    });
}

function display_message(message){
    if(message_to_send != message){
        console.log("\n" + message);
        chat();
    }
}


