import * as express from "express";
import { HelpersWrapper } from "../helpers/helper";
const router = express.Router();

router.post("/grantRole", async(req, res) => {

    try {

        const _parms: { address: string} = req.body;

        if(!_parms) return;
        
        const grantRoleTx = await  HelpersWrapper.grantRole(_parms.address)

        let message = "Successfully Granted Owner Role"

        res.status(200).send({ status: 200, message: message , body: grantRoleTx.hash });

        
    } catch (error) {
        console.log("Error while adding address", error)
    }

    return null;

});

router.post("/revokeRole", async(req, res) => {
    
        try {
    
            const _parms: { address: string} = req.body;
    
            if(!_parms) return;
            
            const grantRoleTx = await  HelpersWrapper.revokeRole(_parms.address)
    
            let message = "Owner Role Revoked Successfully"
    
            res.status(200).send({ status: 200, message: message , body: grantRoleTx.hash });
    
            
        } catch (error) {
            console.log("Error while adding address", error)
        }
    
        return null;
});

router.post("/mintTokens", async(req, res) => {
        
        try {
    
            const _parms: { address: string, amount:  any} = req.body;

            console.log({_parms})
    
            if(!_parms) return;

            const MaxTokenMint = 1000000000

            if(_parms.amount > MaxTokenMint) return res.status(200).send({ status: 200, message: "Max Token Mint Limit Exceeded" , body: {} });

            const mintTx = await  HelpersWrapper.mintTokens(_parms.address, _parms.amount)
    
            let message = "Successfully Minted Tokens"
    
            res.status(200).send({ status: 200, message: message , body: mintTx.hash });
    
            
        } catch (error) {
            console.log("Error while adding address", error)
        }
    
        return null;
});

module.exports = router;