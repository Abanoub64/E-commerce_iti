var productName = document.getElementById("productName");
var productPrice = document.getElementById("productPrice");
var productCategory = document.getElementById("productCategory");
var productDescription = document.getElementById("productDescription");
var count = document.getElementById("count");

var productContainer = [];

//localStorage
if(localStorage.getItem("Our Product") == null){
  productContainer = [];
}
else{
  productContainer = JSON.parse(localStorage.getItem("Our Product"));
  displayProduct();
}
function addProduct(){
  var product = {
    count: count.value,
    name: productName.value ,
    price: productPrice.value,
    category: productCategory.value,
    description: productDescription.value
   
   }

   productContainer.push(product);
   localStorage.setItem("Our Product", JSON.stringify(productContainer));
   displayProduct();
   clearInput()
}

function displayProduct() {
  var productBox = "";
  for(var i = 0; i < productContainer.length; i++){
    productBox += `
    <tr>
        <td>${i+1}</td>
        <td>${productContainer[i].count}</td>
        <td>${productContainer[i].name}</td>
        <td>${productContainer[i].price}</td>
        <td>${productContainer[i].category}</td>
        <td>${productContainer[i].description}</td>
        
        <td><button  class="btn btn-success" onclick="editRow(${i})">Edit</button></td>
        <td><button onclick="deleteRow(${i})" class="btn btn-danger">Delete</button></td>
    </tr>
    `
} 
  document.getElementById("tBody").innerHTML =productBox;

}
// clear input
function clearInput(){
     count.value = "";
     productName.value = "";
     productPrice.value = "";
     productCategory.value = "";
     productDescription.value = "";
}

  // delete all
  function deleteAll(){
    alert("Are you sure you want to delete all Product?");
    productContainer.splice(0);
    localStorage.setItem("Our Product", JSON.stringify(productContainer));
    displayProduct()
  }

  //delete row
  function deleteRow(i){
 
    productContainer.splice(i,1);
    localStorage.setItem("Our Product", JSON.stringify(productContainer));
    displayProduct();
  }

  //search
function searchProduct(term){
  var productBox = "";
  for(var i = 0; i < productContainer.length; i++){
    if(productContainer[i].name.includes(term.trim()) == true ){
      productBox +=
      `
    <tr>
        <td>${i+1}</td>
        <td>${productContainer[i].count}</td>
        <td>${productContainer[i].name}</td>
        <td>${productContainer[i].price}</td>
        <td>${productContainer[i].category}</td>
        <td>${productContainer[i].description}</td>
        
        <td><button  class="btn btn-success">Edit</button></td>
        <td><button onclick="deleteRow(${i})" class="btn btn-danger">Delete</button></td>
    </tr>
    `
    }
  //alert(term);
}
  document.getElementById("tBody").innerHTML =productBox;
}




// edit row
function editRow(i){
 
  productContainer.splice(i,1);
  
  displayProduct();
}










/* 
const inputs = document.querySelectorAll("input");
const addButton = document.getElementById("addButton");

function checkInputs(){
  let allFilled = false;

  inputs.forEach(inputs => {
    if(input.value.trim() !== ""){
      allFilled = true;
    }
  });
  addButton.disabled = !allFilled;
}

inputs.forEach(input => {
  input.addEventListener("input", checkInputs);
});
  */
