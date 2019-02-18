var fs=require('fs');
var axios=require('axios');
file=fs.readdirSync('./video');
var http=require('http');


// stat=fs.existsSync('./video/output1096.ts');
//console.log(stat);

var lackArr=[];
var index=0;

var maxNum=1526;
for(var i=0;i<=maxNum;i++){
	var strIndex=index+'';
	while(strIndex.length<3){
		strIndex='0'+strIndex;
	}
	if(!fs.existsSync('./video/output'+strIndex+'.ts')){
		lackArr.push(strIndex);
	}
	index++;
}

var len=lackArr.length;
var maxConnect=8;
var curConnect=0;
console.log(len);
var arrIn=0;

var timer=setInterval(function(){
	if(arrIn>=len){
		clearInterval(timer);
		return;
	}
	// if(curConnect<maxConnect){
	// 	download(arrIn++);
	// 	curConnect++;
	// }
	download(arrIn++);
},600)

function download(index){
	var url='http://youku.iqiyi-yongjiu.com/20181122/7GgrAwRE/800kb/hls/qgszMwU3999'+lackArr[index]+'.ts';
	//var url='http://youku.iqiyi-yongjiu.com/20181122/7GgrAwRE/800kb/hls/qgszMwU3999'+index+'.ts';
	console.log('开始下载第'+index+'个');
	axios.get(url,{
		headers:{
			Host: 'youku.iqiyi-yongjiu.com',
			'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.87 Safari/537.36'
		},
		proxy: {
			host: '127.0.0.1',
			port: 1080
		},
		responseType:'arraybuffer'
	}).then(function(res){
		fs.writeFile('./video/output'+lackArr[index]+'.ts',res.data,'binary',function(err){
			if(err){
				console.log('保存失败');
				return;
			}else{
				console.log('保存成功');
				curConnect--;
				// var next=parseInt(index);
				// download(++next);
			}
		})
	})
}