import RNFetchBlob from 'rn-fetch-blob';
import TsLoadRegObj from '../dataModel/TsLoadRegObj';
const dirs = RNFetchBlob.fs.dirs;

const url1 = 'https://t.bwzybf.com/2018/12/07/4uvPFAGxlZMdPiVL/playlist.m3u8';
const url2 = 'https://pp.ziyuan605.com/20181130/kynLRJf5/index.m3u8';
const url3 = 'https://156zy.suyunbo.tv/2018/12/12/oF3VHRQVaQE9QnDa/playlist.m3u8';

class M3u8Download {

    download = (url, callback) => {
        RNFetchBlob
            .config({ fileCache: true })
            .fetch('GET', url)
            .then((res) => {
                // 下载并读取m3u8文件
                let filePath = res.path();
                let fs = RNFetchBlob.fs;
                fs.readFile(filePath, 'utf8')
                    .then((data) => {
                        let downloadList = this.praseM3u8Data(data);
                        console.log('list done!');
                        console.log(dirs);
                        this.tsBatchDownload(downloadList, url, callback);
                    });
            })
    }

    //解析m3u8
    praseM3u8Data = (data) => {
        let downloadList = [];
        let dataArr = data.split('\n');
        dataArr.forEach((item) => {
            if (item.indexOf('#') === 0) {
                if (item.indexOf('#EXT-X-KEY:')) {
                    //AES加密
                }
            } else {
                if (item.lastIndexOf('.m3u8') === item.length - 5) {
                    //嵌套式的m3u8
                    // downloadList.push(new (true,false,item,));
                } else {
                    downloadList.push(new TsLoadRegObj(false, false, item));
                }
            }
        });
        return downloadList;
    }

    //
    tsBatchDownload = (downloadList, url, callback) => {
        if (downloadList.length > 0) {
            if (downloadList.length === 1) {
                if (downloadList[0].isM3u8) {
                    //嵌套类型，本次无数据
                }
            }
            //download !!!
            this.downloadByList(downloadList, url, callback);
        }
    }

    downloadByList = (list, url, callback) => {
        //查找有效路径
        let totalTsNum = list.length;//应该下载的所有ts的长度用来计算下载进度
        let paths = this.urlSplit(url);
        paths.forEach((item) => {
            let testFullurl = item + '/' + list[0].originPath;
            RNFetchBlob
                .fetch('GET', testFullurl)
                .then((res) => {
                    if (res.respInfo.status === 200) {
                        //找到有效路径后批量下载
                        let truePath = item;
                        /*下载调度队列*/
                        //list是待下载队列,reg是正在下载的ts列表，500ms进行一次轮询，
                        let reg = [];
                        this.downloadTimer = setInterval(() => {

                            while (reg.length < 3 && list.length > 0) {
                                let shiftTs = list.shift();
                                reg.push(shiftTs);
                                let tsFullUrl = truePath + '/' + shiftTs.originPath;
                                let tsLocalPath = dirs.DocumentDir + '/testFile/' + shiftTs.originPath;
                                RNFetchBlob
                                    .config({ path: tsLocalPath })
                                    .fetch('GET', tsFullUrl)
                                    .then((res) => {
                                        if (res.respInfo.status === 200) {
                                            let doneIndex = -1;
                                            reg.every((item, index, input) => {
                                                if (item.originPath === shiftTs.originPath) {
                                                    doneIndex = index;
                                                    return false
                                                } else {
                                                    return true
                                                }
                                            });
                                            reg.splice(doneIndex, 1);

                                            //计算下载进度
                                            let downloadRate = (totalTsNum - list.length) * 100 / totalTsNum;
                                            callback('loading', downloadRate.toFixed(2));
                                        } else {
                                            console.log('ts download failed');
                                        }
                                    })

                            }

                            if (reg.length === 0 && list.length === 0) {
                                if (this.downloadTimer) {
                                    clearInterval(downloadTimer);
                                    callback('done', 100);
                                }
                            }

                        }, 500);
                    }
                })
        });
    }

    urlSplit = (url) => {
        let protocolReg = url.split('//');
        let reg = protocolReg[1].split('/');
        let resultArr = [];
        reg.reduce((a, b) => {
            resultArr.push(protocolReg[0] + '//' + a);
            return a + '/' + b
        })
        return (resultArr);
    }
}

export default new M3u8Download();