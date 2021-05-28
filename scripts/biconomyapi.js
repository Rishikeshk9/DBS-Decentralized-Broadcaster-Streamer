function supplyeth(useraddr){
    var jsonres;
    var jdata = { 'userAddress' : ''+useraddr ,'apiId': '4e834a8a-8bdb-40f5-83f3-758287993b6a','params': [],'gasLimit':'0x927c0'};
    $.ajax({
        type: "POST",
        url: "https://api.biconomy.io/api/v2/meta-tx/native",
        headers: {"x-api-key" : "w7drmz352.e3ebfd00-e924-4641-8fbd-bcb414e5970c"},
        data: JSON.stringify(jdata),
        contentType: 'application/json',
        async: false,
        success: function (res) {
            //alert(JSON.stringify(res));
           // var res = JSON.parse(res);
            console.log(res);
            jsonres=res.txHash;
        },
        error: function (err){
            console.log(err);
            (async function() {

                let c = await rinkRemixContract.supplyEthToCompound();
                console.log(c);
            
            })().catch(console.error); 
            
            console.log("Error Occured ");
        },
  });
  return jsonres;
}

/*function verifytxn(txhash){
    var gjson = getJSON("https://api-rinkeby.etherscan.io/api?module=transaction&action=getstatus&txhash="+txhash+"&apikey=JDRCFSFRBEEJNJ1UR2QUYUMVMUF6AC9UK8");
    gjson = JSON.parse(gjson);

}*/

function redeemeth(useraddr,amount){
    //amount = 995832105 for 0.25eth
    var jsonres;
    var jdata =  { 'userAddress' : ''+useraddr ,'apiId': '7439865e-a532-4344-b970-5480fc2d882f','params': [amount],'gasLimit':'0x927c0'};
    $.ajax({
        type: "POST",
        url: "https://api.biconomy.io/api/v2/meta-tx/native",
        headers: {"x-api-key" : "w7drmz352.e3ebfd00-e924-4641-8fbd-bcb414e5970c"},
        data:  JSON.stringify(jdata),
        contentType: 'application/json',
        async: false,
        success: function (res) {
            //alert(JSON.stringify(res));
           // var res = JSON.parse(res);
        console.log(res);
            jsonres=res.txHash;
        },
        error: function (err){
            console.log(err);
            (async function() {

                let c = await rinkRemixContract.redeemCEth(ethers.BigNumber.from(amount));
                console.log(c);
            
            })().catch(console.error); 
            console.log("Error Occured ");
        },
  });
  return jsonres;
}

function checkBou(useraddr){
    var jsonres;
    var jdata = { 'userAddress' :''+useraddr ,'apiId': '75a3322f-0152-42f9-a015-10aceff98bf2','params': [],'gasLimit':'0x927c0'};
    $.ajax({
        type: "POST",
        url: "https://api.biconomy.io/api/v2/meta-tx/native",
        headers: {"x-api-key" : "w7drmz352.e3ebfd00-e924-4641-8fbd-bcb414e5970c"},
        data: JSON.stringify(jdata),
        contentType: 'application/json',
        dataType: 'JSON',
        async: false,
        success: function (res) {
            //alert(JSON.stringify(res));
            //var res = JSON.parse(res);
            console.log(res);
            jsonres=res.result;
        },
        error: function (err){
            console.log(err);
            (async function() {

                let c = await rinkRemixContract.checkbou();
                //alert("Error came");
                console.log(c);
            
            })().catch(console.error); 
            console.log("Error Occured ");
        },
  });
  return jsonres;
}
function viewbalance(useraddr){
    var jsonres;
    var jdata = { 'userAddress' :''+useraddr ,'apiId': '419e994a-0857-41bb-afb2-365bab13d486','params': [],'gasLimit':'0x55730'};
    $.ajax({
        type: "POST",
        url: "https://api.biconomy.io/api/v1/meta-tx/getData",
        headers: {"x-api-key" : "w7drmz352.e3ebfd00-e924-4641-8fbd-bcb414e5970c"},
        data: JSON.stringify(jdata),
        contentType: 'application/json',
        dataType: 'JSON',
        async: false,
        success: function (res) {
            //alert(JSON.stringify(res));
            //var res = JSON.parse(res);
            console.log(res);
            jsonres=res.result;
        },
        error: function (err){
            console.log(err);
            (async function() {

                let c = await rinkRemixContract.viewBalance();
                console.log(c);
            
            })().catch(console.error); 
            console.log("Error Occured ");
        },
  });
  return jsonres;
}
function viewBou(useraddr){
    var jsonres;
    var jdata = { 'userAddress' :''+useraddr ,'apiId': '87c455a9-1337-49b3-9d7b-f6dc69d3a610','params': [],'gasLimit':'0x55730'};
    $.ajax({
        type: "POST",
        url: "https://api.biconomy.io/api/v1/meta-tx/getData",
        headers: {"x-api-key" : "w7drmz352.e3ebfd00-e924-4641-8fbd-bcb414e5970c"},
        data: JSON.stringify(jdata),
        contentType: 'application/json',
        dataType: 'JSON',
        async: false,
        success: function (res) {
            //alert(JSON.stringify(res));
            //var res = JSON.parse(res);
            console.log(res);
            jsonres=res.result;
        },
        error: function (err){
            console.log(err);

            (async function() {

                let c = await rinkRemixContract.viewbou();
                console.log(c);
            
            })().catch(console.error); 
            console.log("Error Occured ");
        },
  });
  return jsonres;
}

function sendEther(useraddr,amount){
    var jsonres;
    var jdata =  { 'userAddress' :''+useraddr,'apiId': '5f26036a-b13a-4af2-8e2e-573cd71fb8f4','params': [useraddr,amount],'gasLimit':'0x927c0'};
    $.ajax({
        type: "POST",
        url: "https://api.biconomy.io/api/v2/meta-tx/native",
        headers: {"x-api-key" : "w7drmz352.e3ebfd00-e924-4641-8fbd-bcb414e5970c"},
        data:JSON.stringify(jdata),
        contentType: 'application/json',
        async: false,
        success: function (res) {
            //alert(JSON.stringify(res));
            //var res = JSON.parse(res);
            console.log(res);
            jsonres=res.txHash;
        },
        error: function (err){
            console.log(err);
            (async function() {

                let c = await rinkRemixContract.sendEther(useraddr,ethers.BigNumber.from(amount));
                console.log(c);
            
            })().catch(console.error); 
            console.log("Error Occured ");

        },
  });
  return jsonres;
}


function redeemDonations(walletAdd,artistid){
    var jsonres;
    var jdata =  { 'userAddress' :''+walletAdd,'apiId': 'cf704bea-ae12-4cc3-93f1-1af94f90b230','params': [walletAdd,artistid],'gasLimit':'0x927c0'};
    $.ajax({
        type: "POST",
        url: "https://api.biconomy.io/api/v2/meta-tx/native",
        headers: {"x-api-key" : "w7drmz352.e3ebfd00-e924-4641-8fbd-bcb414e5970c"},
        data:JSON.stringify(jdata),
        contentType: 'application/json',
        async: false,
        success: function (res) {
            //alert(JSON.stringify(res));
            //var res = JSON.parse(res);
            console.log(res);
            jsonres=res.txHash;
        },
        error: function (err){
            console.log(err);
            (async function() {

                let redeemDonation = await donRemixContract.redeemDonations(walletAdd, artistid); 
                console.log(redeemDonation);
            
            })().catch(console.error); 
            console.log("Error Occured ");

        },
  });
  return jsonres;
}




/*curl --request POST 
'https://api.biconomy.io/api/v2/meta-tx/native'  
--header 'x-api-key: w7drmz352.e3ebfd00-e924-4641-8fbd-bcb414e5970c'  
--header 'Content-Type: application/json' 
--data-raw '{ 
    "userAddress": "0x93ba13F5958cEf4A4beB2f40E9282012125B329c",
"apiId": "7d70c70c-a084-4467-a932-5b4e833f8238",
"params": [],
"gasLimit":"0x55730" }'*/