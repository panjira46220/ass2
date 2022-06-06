import axios from "axios";

 export default async (req:any, res:any) => {
     res.statusCode = 200

     const {token1,token2} = req.query;
     const newUrl1 =`https://ftx.com/api/markets/${token1}/${token2}`;
     const aa = await axios
        .get(newUrl1)
       .catch((err) => console.log(err));
     res.json(aa.data)


 }