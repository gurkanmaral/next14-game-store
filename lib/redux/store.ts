import { configureStore } from '@reduxjs/toolkit';
import { create } from 'zustand';
import {persist} from "zustand/middleware"

interface CartTypes {
    games:CartItemType[];
    totalItems:number;
    totalPrice:number;
}

export interface CartItemType  {
    gameId:string;
    gameImage:string;
    gameTitle:string;
    price:number;
}

const INITIAL_STATE = {
    games:[],
    totalItems:0,
    totalPrice:0,
}
export type ActionTypes = {
    addtoCart : (item:CartItemType)=>void;
    removeFromCart:(item:CartItemType)=>void;
}
export const useCartStore = create(persist<CartTypes & ActionTypes>((set,get)=>({
   
    games:INITIAL_STATE.games,
    totalItems:INITIAL_STATE.totalItems,
    totalPrice:INITIAL_STATE.totalPrice,
    addtoCart(item){
        const games = get().games
        const isGameInCart = games.some((game) => game.gameId === item.gameId);

        if (isGameInCart) {
            // Game is already in the cart, do nothing
            return;
          }
            // The game is not in the cart, add it
            set((state) => ({
                games: [...state.games, item],
                totalItems: state.totalItems + 1, 
                totalPrice: state.totalPrice + item.price,
            }));
       
    },removeFromCart({gameId,price}){
        set((state)=>({
            games: state.games.filter((game) => game.gameId !== gameId),
            totalItems: state.totalItems - 1, 
            totalPrice: state.totalPrice - price,
        }))
    }


}),{
    name:"cart"
}))

// export const makeStore = () => {
//     return configureStore({
//       reducer: {}
//     })
//   }

//   // Infer the type of makeStore
// export type AppStore = ReturnType<typeof makeStore>
// // Infer the `RootState` and `AppDispatch` types from the store itself
// export type RootState = ReturnType<AppStore['getState']>
// export type AppDispatch = AppStore['dispatch']