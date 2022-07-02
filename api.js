

import axios from "axios";

export const apiCall = async (url,method,body,headers)=>{
   const response = await axios({
        method: method, 
        url: url,
        data: body, 
        headers:headers,
      });

      return response; 
}  