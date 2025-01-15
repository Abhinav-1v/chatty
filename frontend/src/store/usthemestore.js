import { create } from "zustand";

export const Usethemestore=create((set)=>({
    theme:localStorage.getItem('chat-theme')||'dark',
    setTheme:(theme)=>{
        localStorage.setItem('chat-theme',theme);
        set({theme});
    }
}));