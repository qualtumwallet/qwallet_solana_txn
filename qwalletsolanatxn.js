if (msg.type === "SEND_SOL") {




    ( async ()=>{



        console.log("send_sol inisde")
      
        if (!msg.recipient || !msg.amount) {
            sendResponse({ success: false, error: "Recipient and amount required" });
            return true;
          }

            
        const encoded_wallet_secretkey= await getSession("cwallet");
        const senderw = Keypair.fromSecretKey(base58.decode(encoded_wallet_secretkey));

          
        if (!senderw) {
            sendResponse({ success: false, error: "Wallet not unlocked" });
            return true;
          }

      

        if (!msg.recipient || !msg.amount) {
    
                sendResponse({ success: false, error: "Recipient and amount required" });
                return true; 
        }
              


        console.log("approval req")
        let txnapproval=await maketxnrequest()


        if(txnapproval==false){

              sendResponse({ success: false, error: "Not approved" });
              return ;

        }


        let response=await sendSol(senderw,msg.recipient,msg.amount,msg.network)
    
        if (response.success==true && response.signature !==undefined) {

            sendResponse({ success: true,txid:response.signature});

        }
        else {
            sendResponse({ success:false,txid:response.signature});

        }
    
  })()

        return true;

}  

  }
