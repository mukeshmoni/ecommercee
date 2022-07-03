/* nav bar */
const bar= document.getElementById('bar');
const nav=document.getElementById('navbar');
const close=document.getElementById("close");
let totalSum=0;

if(bar){
    bar.addEventListener('click', () => {
        nav.classList.add('active');
    })
}

if(close){
    close.addEventListener('click', () => {
        nav.classList.remove('active');
    })
}

/* navbar-end */


/* redirect to shop.html after checkout */
// if(localStorage.getItem("shopping")){
//     window.location.href='shop.html';
//     localStorage.clear();
// }

/*check whether cart is empty or not */

if(localStorage.getItem("proDetails")){
    var emptyCart=document.getElementById('empty-cart');
    emptyCart.style.display="none";
    document.getElementById('cart').style.display="";
    document.getElementById('cart-add').style.display="";
}


cartItems=JSON.parse(localStorage.getItem("proDetails"));
if(!localStorage.getItem("proDetails")){
    document.getElementById('empty-cart').style.display="";
    document.getElementById('cart').style.display="none";
    document.getElementById('cart-add').style.display="none";
}



/* appending value to table data */
if(localStorage.getItem("proDetails")){
var objLen=Object.keys(cartItems).length;
if(objLen>0){
var table = document.createElement('table');
var thead = document.createElement('thead');
var tbody = document.createElement('tbody');

table.appendChild(thead);
table.appendChild(tbody);

document.getElementById('cart').appendChild(table);

var row_1 = document.createElement('tr');
var heading_0 = document.createElement('th');
heading_0.innerHTML="Remove";
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

row_1.appendChild(heading_0);
row_1.appendChild(heading_1);
row_1.appendChild(heading_2);
row_1.appendChild(heading_3);
row_1.appendChild(heading_4);
row_1.appendChild(heading_5);
thead.appendChild(row_1);
}

for(let i=0;i<objLen;i++){

   var row=document.createElement('tr') ;
   
   var data0=document.createElement('td');
   data0.innerHTML=`<button style="border: none; background: #fff; cursor: pointer;" onclick="removeItems(${cartItems[i].dressCode})"><i class="far fa-times-circle"></i></button>`;

   var data1=document.createElement('td');
   data1.innerHTML=`<img src='${cartItems[i].imagePath}' alt=''/>`;

   var data2=document.createElement('td');
   data2.innerHTML=cartItems[i].proName;

   var data3=document.createElement('td');
   data3.innerHTML=cartItems[i].proCost;
   

   var data4=document.createElement('td');
   data4.innerHTML=cartItems[i].proQuantity;

   var data5=document.createElement('td');
   data5.innerHTML=(cartItems[i].proCost*cartItems[i].proQuantity);
   totalSum+=(cartItems[i].proCost*cartItems[i].proQuantity); // adding total items sum

   row.appendChild(data0);
   row.appendChild(data1);
   row.appendChild(data2);
   row.appendChild(data3);
   row.appendChild(data4);
   row.appendChild(data5);
   tbody.appendChild(row);
};
};




/* remove function */


function removeItems(dCode){
const objectLength=Object.keys(cartItems).length;
var deleted_index=0;
 for(let i=0;i<objectLength;i++){
    if(dCode==cartItems[i].dressCode){
        delete cartItems[i];
        deleted_index=i;
        continue;
    }
    cartItems[deleted_index]=cartItems[i];
    deleted_index++;
 }
 if(deleted_index<objectLength){
    delete cartItems[objectLength-1];
 }
 localStorage.setItem("proDetails",JSON.stringify(cartItems));
 location.reload();

};




/* calculate total amount and applying coupon(discount)*/

let discountAmount=0;
function applyCoupon(){
    var proLength=Object.keys(cartItems).length;
    if(proLength>0){
    var couponcode=document.getElementById("couponInput").value.toUpperCase();
    if(couponcode=="ACCIOJOB"){
        discountAmount=totalSum;
        document.getElementById("couponInput").disabled = true;
        onloadChanges();

    }else if(couponcode=="GET10"){
        discountAmount= parseInt((totalSum*10)/100);
        document.getElementById("couponInput").disabled = true;
        onloadChanges();
    }

}

};

function onloadChanges(){
    let subSum=document.getElementById("totalSum");
    subSum.innerHTML=totalSum;
    let discount=document.getElementById("discountAmount");
    discount.innerHTML=discountAmount;
    let subTotal=document.getElementById("subTotal");
    subTotal.innerHTML=totalSum-discountAmount;
};
onloadChanges();


function sendMail(){
    var newsMail=document.getElementById("newsMail").value;
    if(newsMail==""){
        alert("please enter your mail");
    }else{
        alert(`Thanks for subscribing ${newsMail}`);
    }
}

function formSubmit(){
    var formName=document.getElementById("formName").value;
    var formMail=document.getElementById("formMail").value;
    var formSubject=document.getElementById("formSubject").value;
    var formMessage=document.getElementById("formMessage").value;
    if(formName=="" || formMessage=="" || formMail=="" || formSubject==""){
        alert("fields cannot be empty");
    }else{
        alert(`Name: ${formName}\nMail Id: ${formMail}\nSubject: ${formSubject}\nMessage: ${formMessage}`);
    }

}

function setNewPrices(){
    localStorage.setItem("discountVar",discountAmount);
    window.location.href='receipt.html';
}






