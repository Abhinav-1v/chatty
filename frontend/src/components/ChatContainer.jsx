import { useEffect, useRef } from "react";
import { usechatstore } from "../store/usechatstore";
import ChatHeader, {} from './ChatHeader';
import MessageSkeleton, {} from './skeletons/MessageSkeleton';
import MessageInput, {} from './MessageInput';
import { Useauthstore } from "../store/useauthstore";
import { formatMessageTime } from '../lib/utils'

const ChatContainer = () => {
  const { messages, isMessagesLoading, selecteduser, getMessages,subscribeToMessages, unSubscribeFromMessages}=usechatstore();
  const {authuser} =Useauthstore();
  const messageEndRef=useRef(null);

  useEffect(() => {
    getMessages(selecteduser._id);
    subscribeToMessages();

    return ()=>unSubscribeFromMessages();
  }, [selecteduser._id, getMessages,subscribeToMessages,unSubscribeFromMessages]);
  
  useEffect(()=>{
    if(messageEndRef.current && messages){
      messageEndRef.current.scrollIntoView({behavior:'smooth'});
    }
  },[messages]);
  
  if (isMessagesLoading){
    return (
      <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  
  return (
    <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader />
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message._id}
            className={`chat ${message.senderid === authuser._id ? "chat-end" : "chat-start" }`}
            ref={messageEndRef}
          >
            <div className=" chat-image avatar">
              <div className="size-10 rounded-full border">
                <img
                  src={
                    message.senderid === authuser._id
                      ? authuser.profilepic || "/avatar.png"
                      : selecteduser.profilepic || "/avatar.png"
                  }
                  alt="profile pic"
                />
              </div>
            </div>
            <div className="chat-header mb-1">
              <time className="text-xs opacity-50 ml-1">
                {formatMessageTime(message.createdAt)}
              </time>
            </div>
            <div className="chat-bubble flex flex-col">
              {message.image && (
                <img
                  src={message.image}
                  alt="Attachment"
                  className="sm:max-w-[200px] rounded-md mb-2"
                />
              )}
              {message.text && <p>{message.text}</p>}
            </div>
          </div>
        ))}
      </div>
      <MessageInput />
    </div>
  );
}

export default ChatContainer