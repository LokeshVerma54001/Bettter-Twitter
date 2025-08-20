import {create} from "zustand";

export const useUtilStore = create((set, get) =>({
    showCreatePostPopUp: false,
    
    setShowCreatePostPopUp: (value) =>{
        set({showCreatePostPopUp: value});
    }
}))

