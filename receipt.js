
if(!localStorage.getItem("proDetails")){
    window.location.href='shop.html';
}

var totalSum=0;
var totalQ=0;
cartItems=JSON.parse(localStorage.getItem("proDetails"));
var objLen=Object.keys(cartItems).length;
if(objLen>0){
var table = document.createElement('table');
var thead = document.createElement('thead');
var tbody = document.createElement('tbody');

table.appendChild(thead);
table.appendChild(tbody);

document.getElementById('receipt').appendChild(table);

var row_1 = document.createElement('tr');

var heading_1 = document.createElement('th');
heading_1.innerHTML = "Image";
var heading_2 = document.createElement('th');
heading_2.innerHTML = "Product";
var heading_3 = document.createElement('th');
heading_3.innerHTML = "Price";
var heading_4 = document.createElement('th');
heading_4.innerHTML = "Quantity";
var heading_5 = document.createElement('th');
heading_5.innerHTML = "Subtotal";


row_1.appendChild(heading_1);
row_1.appendChild(heading_2);
row_1.appendChild(heading_3);
row_1.appendChild(heading_4);
row_1.appendChild(heading_5);
thead.appendChild(row_1);
}

for(let i=0;i<objLen;i++){

   var row=document.createElement('tr') ;
   
  

   var data1=document.createElement('td');
   data1.innerHTML=`<img src='${cartItems[i].imagePath}' alt=''/>`;

   var data2=document.createElement('td');
   data2.innerHTML=cartItems[i].proName;

   var data3=document.createElement('td');
   data3.innerHTML=cartItems[i].proCost;
   

   var data4=document.createElement('td');
   data4.innerHTML=cartItems[i].proQuantity;
   totalQ+=parseInt(cartItems[i].proQuantity);

   var data5=document.createElement('td');
   data5.innerHTML=(cartItems[i].proCost*cartItems[i].proQuantity);
   totalSum+=(cartItems[i].proCost*cartItems[i].proQuantity); 

   
   row.appendChild(data1);
   row.appendChild(data2);
   row.appendChild(data3);
   row.appendChild(data4);
   row.appendChild(data5);
   tbody.appendChild(row);
};
document.getElementById("totalQ").innerHTML=totalQ;
var discountAmount=localStorage.getItem("discountVar");
document.getElementById("discountVar").innerHTML=discountAmount;

document.getElementById("totalAmount").innerHTML=totalSum-discountAmount;
window.print();
localStorage.clear();
window.onunload=function() {};
