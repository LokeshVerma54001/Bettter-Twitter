import {create} from 'zustand';
import axios from '../lib/axios'

export const usePostStore = create((set, get) => ({
    userPosts: [],
    allPosts: [],
    hasMore: true,
    nextCursor: null,

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
    },

    getAllPosts: async (cursor = null) => {
        try {
        const res = await axios.get("/post/getAllPosts", {
            params: { cursor, limit: 20 },
        });

        if (cursor) {
            // appending more posts
            set((state) => ({
            allPosts: [...state.allPosts, ...res.data.posts],
            hasMore: res.data.hasMore,
            nextCursor: res.data.nextCursor,
            }));
        } else {
            // first load
            set({
            allPosts: res.data.posts,
            hasMore: res.data.hasMore,
            nextCursor: res.data.nextCursor,
            });
        }
        } catch (error) {
        console.log("Error in getAllPosts:", error);
        }
    },

    getPostDetails: async (id) => {
        try {
            const res = await axios.post('/post/getPostDetails', {id});
            return res.data.post;
        } catch (error) {
            console.log("Error in getPostDetails:", error);
        }
    }

}))