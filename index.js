//接受控制台的参数
//var url=process.argv[2];
var axios=require('axios');
var fs=require('fs');

var index=0;

var maxNum=1526;

var timer=setInterval(function(){
	if(index>maxNum){
		clearInterval(timer);
		return;
	}
	download(index++);
},600)


// for(var i=0;i<=maxNum;i++){
// 	show(i);
// }

function show(index){
	index=index+'';
	while(index.length<3){
		index='0'+index;
	}
	var url='https://youku.iqiyi-yongjiu.com/20181122/7GgrAwRE/800kb/hls/qgszMwU3999'+index+'.ts';
	console.log(url);
}

function download(index){
	if(index>maxNum){
		return;
	}
	index=index+'';
	while(index.length<3){
		index='0'+index;
	}
	var url='https://youku.iqiyi-yongjiu.com/20181122/7GgrAwRE/800kb/hls/qgszMwU3999'+index+'.ts';
	console.log('开始下载第'+index+'个');
	axios.get(url,{
		headers:{
			Origin:'http://www.twoeggz.com',
			'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.87 Safari/537.36'
		},
		responseType:'arraybuffer'
	}).then(function(res){
		fs.writeFile('./video/output'+index+'.ts',res.data,'binary',function(err){
			if(err){
				console.log('保存失败');
				return;
			}else{
				console.log('保存成功');
				// var next=parseInt(index);
				// download(++next);
			}
		})
	})
}	
