document.getElementById("doctors").style.display="none";
document.getElementById("records").style.display="none";
var counters=0,counterm=0,counterh=0,c;

const jsons = JSON.parse(localStorage.getItem('json'));
document.getElementById("pincode").value=jsons["Items"][0]["pincode"]["N"];
function start(){
    c=setInterval(function(){
        ++counters;
        if(counters==60){counters=0;++counterm}
        if(counterm==60){counterm=0;++counterh}
        
        document.getElementById("time").innerText=((counterh<10)?'0':'')+counterh+" hh : "+((counterm<10)?'0':'')+counterm+ " mm : "+((counters<10)?'0':'')+counters+" ss";
        
        //if(d==true)clearInterval(c);
    },999)
}
function stop(){
    clearInterval(c);
}
function action(){
    var txt=document.getElementById("dropdownMenuButton").value;
    if(txt!="Select specilization")
    fetch("https://zk9ya3vq41.execute-api.ap-south-1.amazonaws.com/testing/cart?adhar=\"0\"&pincode=\""+document.getElementById("pincode").value+"\"&statuss=\"Active\"", {
     
     // Adding method type
     method: "GET",
      
     // Adding headers to the request
     headers: {
         "Content-type": "application/json;"
     }
 })
 // Converting to JSON
 .then(response => response.json())
  
 // Displaying results to console
 .then(json =>{
    if(json["Count"]!=0){
    text="";
    for(let i=0;i<json["Count"];i++)if(json["Items"][i]["specialist"]["S"].search(txt)!=-1)text+="<div class=\"box\" style=\"position:relative;\"><button style=\"position: absolute;right:50px;top:50px;padding:2px 6px;\" onclick=\"alert('D"+json["Items"][i]["AdharID"]["N"]+"')\">+</button><img src=\"images/doc-"+((i%10)+1)+".jpg\"><h3>"+json["Items"][i]["name"]["S"]+"</h3><span>expert doctor</span></div>"
    if(text.length!=0)document.getElementById("listdoc").innerHTML=text;
    else alert("No Docter");

    document.getElementById("doctors").style.display="inline";
    document.getElementById("records").style.display="none";}
    else alert("No Docter");
 })
 else alert("select specialisation")
}
function update(value1,value2){
    alert(value1);
    alert(value2);
}
function action2(){
    fetch("https://0eb3j5aza8.execute-api.ap-south-1.amazonaws.com/dev/cart?adhar1=\""+jsons["Items"][0]["AdharID"]["N"]+"\"&adhar2=\"0\"", {
     
     // Adding method type
     method: "GET",
      
     // Adding headers to the request
     headers: {
         "Content-type": "application/json;"
     }
 })
 // Converting to JSON
 .then(response => response.json())
  
 // Displaying results to console
 .then(json =>{
    if(json["Count"]!=0){
    text="";
    
    for(let i=0;i<json["Count"];i++)text+="<tr><th scope=\"row\">"+(i+1)+"</th><td>"+json["Items"][i]["sickness"]["S"]+"</td><td>Dr."+json["Items"][i]["Dr"]["S"]+"</td><td>"+json["Items"][i]["prescription"]["S"]+"</td><td><input type=\"range\" id=\"vol\"  min=\"0\" max=\"50\" value=10 onchange=\"update("+jsons['Items'][0]['AdharID']['N']+","+json["Items"][i]["Docter"]["N"]+")\" ></td></tr>"
    if(text.length!=0)document.getElementById("listrec").innerHTML=text;
     else document.getElementById("listrec").innerHTML="<h1>No records</h1>";

    document.getElementById("records").style.display="inline";
    document.getElementById("doctors").style.display="none";
}
})}
function action3(){
    if(document.getElementById("patientids").value!=0)fetch("https://0eb3j5aza8.execute-api.ap-south-1.amazonaws.com/dev/cart?adhar1=\""+document.getElementById("patientids").value+"\"&adhar2=\"0\"", {
     
    // Adding method type
    method: "GET",
     
    // Adding headers to the request
    headers: {
        "Content-type": "application/json;"
    }
})
// Converting to JSON
.then(response => response.json())
 
// Displaying results to console
.then(json =>{
   if(json["Count"]!=0){
   text="";
   let i;
   for( i=0;i<json["Count"];i++)text+="<tr><th scope=\"row\">"+(i+1)+"</th><td>"+json["Items"][i]["sickness"]["S"]+"</td><td>Dr."+json["Items"][i]["Dr"]["S"]+"</td><td>"+json["Items"][i]["prescription"]["S"]+"</td></tr>"
   
   text+="<tr><td colspan='4'></td><td><input style='position:absolute;right:0px;width:30px;height:30px;' type='button' value='+'></td></tr>";
   //<th scope=\"row\" id=\"NewrecordId\">"+(i+1)+"</th><td><input  type='text' id='Newsickness'></td><td><input  type='text' id='priscription'></td>
   if(text.length!=0)document.getElementById("listrec").innerHTML=text;
    else document.getElementById("listrec").innerHTML="<h1>No records</h1>";
    
   document.getElementById("records").style.display="inline";
}
})   
else alert("enter patient id");
}
