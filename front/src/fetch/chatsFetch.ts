import { CHATS_URL } from "@/lib/apiEndPoints";
import { id } from "zod/v4/locales";

export async function fetchChats(groupId:string){
    const res = await fetch(`${CHATS_URL}/${groupId}`, {
       cache:"no-cache" 
    });

    if(!res.ok){
        throw new Error("Failed to fetch Data");

    }

    const response = await res.json();
    if(response?.data){
        return response?.data
    }
    return [];
}