import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, MessageCircle } from 'lucide-react';

const ChatbotPage = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const messagesEndRef = useRef(null);
  let firstChunk =true;
  const controller = new AbortController();
  const signal = controller.signal;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const startConversation = () => {
    setHasStarted(true);
    setMessages([
      {
        id: 1,
        text: "Hey there... how may I help u ??",
        sender: 'bot',
        timestamp: new Date()
      }
    ]);
  };

  const sendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try{
        const res = await fetch(`http://localhost:4000/bot/input`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          signal,
          body: JSON.stringify({ prompt: userMessage })    
        });
        const data = await res.json();
        const botMessage = {
            id: Date.now() + 1,
            text: data.result,
            sender: 'bot',
            timestamp: new Date(),
            isWriting: true
        };
        setMessages(prev => [...prev, botMessage]);
        setIsLoading(false)
        // const reader = res.body.getReader();
        // const decoder = new TextDecoder("utf-8");
        // while (true){
        //     const { done, value } = await reader.read();
        //     if (done){
        //         setMessages(prev =>
        //             prev.map(msg =>
        //                 msg.sender === 'bot' && msg.isWriting
        //                 ? { ...msg, isWriting: false }
        //                 : msg
        //             )
        //         );
        //         firstChunk = true;
        //         setIsLoading(false);
        //         break;
        //     }
        //     if(isLoading==true){
        //         setIsLoading(false)
        //     }

        //     const chunk = decoder.decode(value, { stream: true });
        //     console.log(firstChunk + " value for the chunk - " + chunk);
        //     if(firstChunk == true){
        //         const botMessage = {
        //             id: Date.now() + 1,
        //             text: chunk,
        //             sender: 'bot',
        //             timestamp: new Date(),
        //             isWriting: true
        //         };
        //         firstChunk = false;
        //         let dummy = messages;
        //         dummy.push(botMessage)
        //         console.log("chunk i recieved - "+ chunk + "set first chunk value now - "+ firstChunk)
        //         setMessages(prev => [...prev, botMessage]);
        //         console.log(dummy.length)
        //     }
        //     else{
        //         let temp = messages;
        //         setMessages(prev =>
        //             prev.map(msg =>
        //                 msg.sender === 'bot' && msg.isWriting
        //                 ? { ...msg, text: msg.text +" \n"+ chunk }
        //                 : msg
        //             ));
        //                     // alert("im here");
        //         console.log("Hey can u see me");
        //     }            
        // }   
    }
    catch(err){
        console.log(err);
        setIsLoading(false);
    }    
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  if (!hasStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center p-4">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        
        {/* Floating Orbs */}
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>

        <div className="relative text-center space-y-8">
          {/* Bot Icon */}
          <div className="inline-flex items-center justify-center w-32 h-32 bg-gradient-to-br from-slate-900 to-slate-700 rounded-3xl shadow-2xl shadow-slate-900/25 mb-8">
            <MessageCircle className="w-16 h-16 text-white" />
          </div>

          {/* Title */}
          <div className="space-y-4">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 bg-clip-text text-transparent">
              AI Assistant
            </h1>
            <p className="text-xl text-slate-600 max-w-md mx-auto">
              Your intelligent conversation partner ready to help with anything
            </p>
          </div>

          {/* Start Button */}
          <button
            onClick={startConversation}
            className="inline-flex items-center gap-4 bg-gradient-to-r from-slate-900 to-slate-800 hover:from-slate-800 hover:to-slate-700 text-white font-semibold py-4 px-8 rounded-2xl transition-all duration-300 shadow-lg shadow-slate-900/25 hover:shadow-xl hover:shadow-slate-900/40 group transform hover:scale-105 active:scale-95"
          >
            <MessageCircle className="w-6 h-6 group-hover:rotate-12 transition-transform duration-200" />
            <span className="text-lg">Start Conversation</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex flex-col">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>
      
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-xl border-b border-white/20 p-4 shadow-sm">
        <div className="max-w-4xl mx-auto flex items-center gap-4">
          <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-slate-900 to-slate-700 rounded-xl">
            <Bot className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900">AI Assistant</h1>
            <p className="text-sm text-slate-600">Online • Ready to help</p>
          </div>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="max-w-4xl mx-auto space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex items-start gap-3 ${
                message.sender === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {message.sender === 'bot' && (
                <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-slate-900 to-slate-700 rounded-xl flex-shrink-0">
                  <Bot className="w-5 h-5 text-white" />
                </div>
              )}
              
              <div
                className={`max-w-md px-4 py-3 rounded-2xl shadow-sm ${
                  message.sender === 'user'
                    ? 'bg-slate-900 text-white rounded-br-md'
                    : 'bg-white/80 backdrop-blur-sm text-slate-800 rounded-bl-md border border-white/20'
                }`}
              >
                <p className="text-sm font-medium">{message.text}</p>
                <span className={`text-xs mt-1 block ${
                  message.sender === 'user' ? 'text-slate-300' : 'text-slate-500'
                }`}>
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>

              {message.sender === 'user' && (
                <div className="flex items-center justify-center w-10 h-10 bg-slate-200 rounded-xl flex-shrink-0">
                  <User className="w-5 h-5 text-slate-600" />
                </div>
              )}
            </div>
          ))}

          {/* Loading Animation */}
          {isLoading && (
            <div className="flex items-start gap-3 justify-start">
              <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-slate-900 to-slate-700 rounded-xl flex-shrink-0">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl rounded-bl-md border border-white/20 px-4 py-3 shadow-sm">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-100"></div>
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-200"></div>
                  </div>
                  <span className="text-sm text-slate-600">Bot is typing...</span>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="bg-white/80 backdrop-blur-xl border-t border-white/20 p-4 shadow-lg">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-end gap-3">
            <div className="flex-1 relative">
              <textarea
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="w-full px-4 py-3 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all duration-200 placeholder-slate-400 text-slate-800 resize-none max-h-32 min-h-[48px]"
                rows="1"
                disabled={isLoading}
              />
            </div>
            <button
              onClick={sendMessage}
              disabled={!inputMessage.trim() || isLoading}
              className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-slate-900 to-slate-800 hover:from-slate-800 hover:to-slate-700 text-white rounded-2xl transition-all duration-200 shadow-lg shadow-slate-900/25 hover:shadow-xl hover:shadow-slate-900/40 disabled:opacity-50 disabled:cursor-not-allowed group transform hover:scale-105 active:scale-95"
            >
              <Send className="w-5 h-5 group-hover:translate-x-0.5 transition-transform duration-200" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatbotPage;