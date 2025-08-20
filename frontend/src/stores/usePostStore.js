import {create} from 'zustand';
import axios from '../lib/axios'

export const usePostStore = create((set, get) => ({
    userPosts: [],

    createPost: async ({content, media}) =>{
        try {
            const res = await axios.post('/post/create', {content, media});
            set({userPosts: res.data.userPosts});
            return true;
        } catch (error) {
            console.log("Error in createPost ", error);    
            return false;
        }
    },

    getPostsByUser: async () => {
        try {
            const res = await axios.get('/post/getUserPosts');
            set({userPosts: res.data.userPosts});
        } catch (error) {
            console.log("Error in getPostByUser", error);
        }
    }
}))