var fs = require('fs'),
    files = fs.readdirSync('./video'),
    stream,
    clips=[],
    currentfile,
    dhh = fs.createWriteStream('./result/output毒液.mp4',{flag:'a'});
// create an array with filenames (time)
    files.forEach(function (file) {
        var strArr=file.split('');
        strArr.splice(-3);
        strArr.splice(0,6);
        clips.push(strArr.join(''));
    });
// Sort
    // console.log(files.shift());
    // console.log(files);
// recursive function
    clips.sort(function(a,b){
        return parseInt(a)-parseInt(b);
    })
    console.log(clips.length);
function main() {
    console.log(clips.length);
    if (!clips.length) {
        dhh.end("Done");
        return;
    }
    currentfile = './video/output'+clips.shift()+'.ts';
    stream = fs.createReadStream(currentfile);
    //pipe函数 end选项默认为true表示写入以后自动关闭写入流 所以设置为false 这里要看英文文档 中文没翻译
    stream.pipe(dhh, {end: false});
    stream.on("end", function() {
        console.log(currentfile + ' appended');
        main();        
    });
}
main();