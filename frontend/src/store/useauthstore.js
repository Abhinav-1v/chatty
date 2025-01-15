import {create} from 'zustand';
import { axiosinstance } from '../lib/axios';
import toast from 'react-hot-toast';
import { io } from 'socket.io-client';
import Cookies, {} from 'js-cookie';

const BACKENDURL='https://chatty-bqe1.onrender.com';


export const Useauthstore=create((set,get)=>({
    authuser:null,
    isSigningin:false,
    isLoggingin:false,
    isUpdatingProfile:false,
    isCheckingAuth:true,
    onlineUsers:[],
    socket:null,

    checkauthfun:async()=>{
        if(!Cookies?.get('token')){
            set({isCheckingAuth:false});
            return;
        }
        try {
            const res=await axiosinstance.get('/auth/check');
            set({authuser:res.data});
            get().connectSocket();
        } catch (error) {
            set({authuser:null});
            console.log('error in checkauthfun',error);
        }
        finally{
            set({isCheckingAuth:false});
        }
    },
    signupfun:async(data)=>{
        set({isSigningin:true});
        try{
            const res=await axiosinstance.post('/auth/signup',data);
            set({authuser:res.data});
            toast.success('Account Created successfully!');
            get().connectSocket();
        }
        catch(error){
            toast.error(error.response.data.message);
        }
        finally{
            set({isSigningin:false});
        }
    },
    logoutfun:async()=>{
        try{

            await axiosinstance.post('/auth/logout');
            set({authuser:null});
            toast.success('Logged out successfully!');
            get().disconnectSocket();
        }
        catch(error){
            toast.error('Error.response.data.message');
        }
    },
    loginfun:async(data)=>{
        set({isLoggingin:true});
        try{
            const res=await axiosinstance.post('/auth/login',data);
            set({authuser:res.data});
            toast.success('Logged In successfully!');
            get().connectSocket();
        }
        catch(error){
            toast.error(error.response.data.message);
        }
        finally{
            set({isLoggingin:false});
        }

    },
    updateprofilefun:async(data)=>{
        set({isUpdatingProfile:true});
        try {
            const res=await axiosinstance.put('/auth/updateprofile',data);
            set({authuser:res.data});
            toast.success('Profile updated successfully!');
        } catch (error) {
            toast.error(error.response.message);
        }
        finally{
            set({isUpdatingProfile:false});
        }
    },
    connectSocket:()=>{
        const {authuser}=get();
        if(!authuser || get().socket?.connected)return;

        const socket=io(BACKENDURL,{
            query:{
                userId:authuser._id
            }
        });
        socket.connect();
        set({socket:socket});
        socket.on('getOnlineUsers',(userIds)=>{
            set({onlineUsers:userIds});
        })
    },
    disconnectSocket:()=>{
        if(get().socket?.connected)get().socket?.disconnect();
    }

}))