import jwt from 'jsonwebtoken'

const auth = (req,res,next)=>{
    
        
        try {
            
            const authHeader = req.headers['authorization'];
             const token = authHeader&&authHeader.split(" ")[1];
             if(!token) return res.status(401).json({message:'Not authorised'})
             let decodedData;
             if(token){
                 decodedData=jwt.verify(token,'test')
                 req.userId = decodedData?.id; 
             }else{
                 decodedData = jwt.decode(token);
                 req.userId = decodedData?.sub;
     
             }
             next();
         } catch (error) {
             console.log(error)
         }
    
}

export default auth;