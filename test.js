var axios=require('axios');

axios.get('http://www.google.com/',{
	responseType:'text',
	proxy: {
    host: '127.0.0.1',
    port: 1080
  },
}).then(function(res){
	console.log(res.data);
})