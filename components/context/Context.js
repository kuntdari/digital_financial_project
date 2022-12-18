import React, {useContext, useEffect, useState} from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';


const AuthContext = React.createContext()

let selectedAccount ;

export function useAuth(){

    return useContext(AuthContext)

}

export function AuthProvider({children}) {

    const [currentUser, SetCurrentUser] =useState()
    const [isloading, Setloading] =useState(true)
    const [pinData, SetPinData]= useState([])
    
    useEffect(() => {
       Setloading(false)
       LoaduserInfo() 
    },[currentUser])


    const LoaduserInfo = async() =>{

        let provider = window.ethereum;

        if (typeof provider !=='undefined'){
    
          provider.request({method:'eth_requestAccounts'})
          .then(accounts=>{

            selectedAccount =accounts[0];
            SetCurrentUser(selectedAccount)

            if (accounts.length === 0) {
              
               // toast.dark("You are disconnected", {position:toast.POSITION.BOTTOM_RIGHT});
                SetCurrentUser("")
    
                }
                else { 
                    console.log(`connected to 1 ${selectedAccount}`);
                    SetCurrentUser(selectedAccount)
                   //toast.dark("You are connected to MetaMask", {position:toast.POSITION.BOTTOM_RIGHT});
              }
            
          })
          .catch((err)=>{
    
              console.log(err.message);
    
              if (err.code===-32002){
                toast.error("MetaMask is waiting to connect", {position:toast.POSITION.TOP_CENTER});
              } else if (err.code===4001){
                toast.error("Request rejected", {position:toast.POSITION.TOP_CENTER});
              }
    
            
          });
    
            window.ethereum.on('accountsChanged', function(accounts){

              selectedAccount =accounts[0];

              SetCurrentUser(selectedAccount);
            
              if (accounts.length === 0) {
              
            // toast.dark("User disconnected", {position:toast.POSITION.BOTTOM_RIGHT});
              SetCurrentUser("")
              
    
              } else { 
                    console.log(`Account changed to 2 ${selectedAccount}`);
                    selectedAccount =accounts[0];
                    SetCurrentUser(selectedAccount) 
                  
              }
      
          })
    
    
        } else {

            console.log('metamask not detected')
            toast.error("Wallet not detected, please install ethereum wallet like Metamask", {position:toast.POSITION.TOP_CENTER});
        }
       
    }
 
    const value ={
        currentUser, 
        LoaduserInfo,
      

    }

    return (
        <AuthContext.Provider value={value}>
            {!isloading && children}
        </AuthContext.Provider>
    )
}


