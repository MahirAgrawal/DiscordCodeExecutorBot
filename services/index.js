const axios = require('axios');

const compileAPI = async(code,language,stdin) => {
  const req = {'code':code,'language':language,'stdin':stdin};
  try{
    const res = await axios.post(process.env.SERVICE_URL,req);
    return {'stderr':res.data.stderr||'','stdout':res.data.stdout||''};
  }catch(err){
    return {'stderr':'Internal Server Error','stdout':''};
  }
}

module.exports = compileAPI;