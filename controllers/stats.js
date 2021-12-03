import User from "../models/user.js";
export const getStatus = async(req,res)=>{
  if (!req.userId) return res.json({ message: "No current User logged in" });
    try {
        const currentUser = await User.findById(req.userId);
        //console.log('came here')
        //console.log(currentUser)
        const status = {
            net_balance:currentUser.net_balance,
            amount_credited:currentUser.amount_credited,
            amount_debited:currentUser.amount_debited
        }
        //res.json(currentUser.net_balance,currentUser.amount_credited,currentUser.amount_debited)
        res.send(status)
    } catch (error) {
        res.json({message:'There was some error'});
    }
}