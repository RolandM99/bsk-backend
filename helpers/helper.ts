import { Contract, ethers, providers, Wallet } from "ethers";
import { Config } from "../config/config";
import { BULKSENDER_ABI, MINTER_CONTRACT_ABI } from "../constants/constants";
require('dotenv').config();

class Helpers {

    //initial setup 
    private _providers: providers.WebSocketProvider;

    private _signer: Wallet;

    constructor() {
        this._providers = new ethers.providers.WebSocketProvider(Config.WSS_URL)
        this._signer = new ethers.Wallet(Config.PRIVATE_KEY!, this._providers)
    }

    bulkSenderContract = async()=> {
        return new Contract(
            Config.BULKSENDER_CONTRACT,
            BULKSENDER_ABI,
            this._signer
        )
    }

    minTokensContract = async()=> {
        return new Contract(
            Config.MINTER_CONTRACT,
            MINTER_CONTRACT_ABI,
            this._signer
        )
    }

    grantRole = async(roleAddress: string) => {
        try {

            let contract = await this.bulkSenderContract()

            let transactionTx = await contract.grantRole(Config.DEFAULT_ADMIN, roleAddress ) 

            console.info({transactionTx})

            return transactionTx
            
        } catch (error) {
            console.log("Error Granting Role", error)
        }

        return null;
    }

    revokeRole = async(roleAddress: string) => {
        try {

            let contract = await this.bulkSenderContract()

            let transactionTx = await contract.revokeRole(Config.DEFAULT_ADMIN, roleAddress ) 

            console.info({transactionTx})

            return transactionTx
            
        } catch (error) {
            console.log("Error Revoking Role", error)
        }

        return null;
    }

    mintTokens = async(address: string , amount: any) => {
        try {

            let contract = await this.minTokensContract()

            const _amount = ethers.utils.parseEther(amount)

            let transactionTx = await contract.mint(address , _amount) 

            console.info({transactionTx})

            return transactionTx
            
        } catch (error) {
            console.log("Error Minting Tokens", error)
        }

        return null;
    }

}

export const HelpersWrapper = new Helpers()


  
