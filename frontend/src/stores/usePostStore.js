import {create} from 'zustand';
import axios from '../lib/axios'

export const usePostStore = create((set, get) => ({
    allPosts: [],
    hasMore: true,
    nextCursor: null,

    createPost: async ({content, media}) =>{
        try {
            await axios.post('/post/create', {content, media});
            return true;
        } catch (error) {
            console.log("Error in createPost ", error);    
            return false;
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
    },

    createReply: async (reply, parentPost) => {
        try {
            const {content, media} = reply;
            await axios.post('/post/createReply', {content, media, parentPost});
            return true
        } catch (error) {
            console.log("Error in createReply:", error);   
            return false 
        }
    },

    likePost: async (postId) =>{
        try {
            const res = await axios.post('/post/likePost', {postId});
            return res.data.likes
        } catch (error) {
            console.log("error in likePost", error);
        }
    },

}))