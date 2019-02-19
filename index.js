const fetchData = require('./sendreq/fetchData.js');
const fetchUSN = require('./fetchusn/retrievecsv.js')
const scrapeData = require('./scrapedata/scrape.js')
const addToDatabase = require('./database/addToDatabase')

const cookie = "jjqg2d3aja5pjs4lhp2n391b25"; 
var captcha = 28412;



const gettingData = (usn)=>{
    fetchData.fetchData(cookie,usn,captcha)
        .then((data)=>{
            var obj = scrapeData.processdata(data,usn);
            if(obj === -1){
                console.log("something went wrong")
            }
            else{
                try{
                    addToDatabase.addToDatabase(obj);
                }
                catch(err) {
                    throw err;
                }
            }
            
        })
        .catch((err) => {
            console.log("error encountered while fetching data ")
        })
}

const getAllResults = ()=> {
    fetchUSN.usnArray()
        .then((usn)=>{
            for(var i = 0 ; i < usn.length ; i++){
                var temp = usn[i][0];
                gettingData(temp);
            }
        })
        .catch((usn) => {
            console.log("err getting usns");
        })
}



   

getAllResults();