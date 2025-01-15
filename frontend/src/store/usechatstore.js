import { create } from 'zustand';
import { axiosinstance } from '../lib/axios'
import toast, {} from 'react-hot-toast';
import { Useauthstore } from './useauthstore';


export const usechatstore=create((set,get)=>({
    messages:[],
    users:[],
    selecteduser:null,
    isUserLoading:false,
    isMessagesLoading:false,

    getUsers:async()=>{
        set({isUserLoading:true});
        try{
            const res=await axiosinstance.get('/message');
            set({users:res.data});
        }
        catch(error){
            toast.error(error.response.data.message);
        }
        finally{
            set({isUserLoading:false});
        }
    },
    getMessages:async(userid)=>{
        set({isMessagesLoading:true});
        try {
            const res=await axiosinstance.get(`/message/${userid}`);
            set({messages:res.data});
        } catch (error) {
            toast.error(error.response.data.message);
        }
        finally{
            set({isMessagesLoading:false});
        }
    },
    setSelectedUser:async(selecteduser)=>{
        set({selecteduser})
    },
    sendMessage:async(data)=>{
        const{selecteduser,messages}=get();
        try {
            const res=await axiosinstance.post(`/message/send/${selecteduser._id}`,data);
            set({messages:[...messages,res.data]});
        } catch (error) {
            toast.error(error.response.data.message);
        }
    },
    subscribeToMessages:()=>{
        const {selecteduser}=get();
        if(!selecteduser)return;
        const socket=Useauthstore.getState().socket;

        socket.on('newMessage',(newmessage)=>{
            if(newmessage.senderid!==selecteduser._id)return 
            set({messages:[...get().messages,newmessage]}); 
        })
    },
    unSubscribeFromMessages:()=>{
        const socket=Useauthstore.getState().socket;
        socket.off('newMessage');
    },
}));


