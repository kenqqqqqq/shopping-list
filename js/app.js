// declare variable inside form 
const form = document.getElementById('shop-form');
const inputItem = document.getElementById('item');
const inputQuantity = document.getElementById('quantityItem');
const priceInput = document.getElementById('price');
const btnAddItem = document.querySelector('.btn');

// declare variable inside card 
// const divCard = document.querySelector('.card-action')
const ul = document.querySelector(".collection");
const filter = document.querySelector("#filter");
const btnClear = document.querySelector('a.clear-items');

main();

function main (){
    form.addEventListener('submit', addItem);

    ul.addEventListener('click', deleteItem);

    form.addEventListener('submit', insert);

    btnClear.addEventListener('click', clearAll);

    document.addEventListener('DOMContentLoaded', loadItem);
    
    filter.addEventListener('keyup', filterItem);

    inputItem.addEventListener('input', compute);  
}

// add item in shoplist
function addItem(e){
    if(inputItem.value === "" || inputQuantity.value === ""){
        alert('Provide the items and quantity');
    }else{
        // create an element list items for class collection
        let li = document.createElement('li');

        // add a classname for li
        li.className = "collection-item";

        // insert the input value in the li
        li.innerHTML = inputItem.value;

        // define collection ul variable
        let ul = document.querySelector('.collection');

        // create a element
        let link = document.createElement('a');

        // add classname for a element
        link.className = "delete-item secondary-content";

        // insert the x icon in a element
        link.innerHTML = '<i class="fa fa-times" aria-hidden="true"></i>';

        // create new span for quantity
        let spanQ = document.createElement('span');

        // add classname for span quantity
        spanQ.className = "span-quantity"

        // insert quantity value to span quantity
        spanQ.innerHTML = inputQuantity.value;

        // create new span for price
        let spanP = document.createElement('span');

        // add classname for span price
        spanP.className = "span-price"

        // insert value to span price
        spanP.innerHTML = priceInput.value;

        // append span price to li
        li.appendChild(spanP);

        // append span quantity to li
        li.appendChild(spanQ);

        // append link to li
        li.appendChild(link);

        // append li to ul
        ul.appendChild(li)

        alert("Item saved!");

        // test in console log
        // console.log(ul);
    }
    e.preventDefault();
}

// remove item in the dom and localstorage
function deleteItem(e){
    if (event.target.className === "fa fa-times"){
        if (confirm("r u sure??")){
            let li = event.target.parentElement.parentElement
            li.remove();

        //remove item from array in localstorage
            // parse to array
            let items = JSON.parse(localStorage.getItem("shopitems"));

            // get the index of the selected item
            let index = items.indexOf(li.innerText);

            // delete the item
            items.splice(index, 1);
            
            // convert to array to json string
            localStorage.setItem("shopitems", JSON.stringify(items));

            // console.log(index);
    }
}
    e.preventDefault();
}

// store items in the local storage 
function insert(){

    let items;
    // let quantity;
    if(localStorage.getItem('shopitems')===null){
      items = [];
    //   quantity = [];
    }else{
      // parse the object value as array 
      items = JSON.parse(localStorage.getItem('shopitems'));
    //   quantity = JSON.parse(localStorage.getItem('quantity'));
    }
    // push items in the items array
    items.push(inputItem.value);
    // quantity.push(inputQuantity.value);

    // reset the value of storage
    localStorage.setItem('shopitems',JSON.stringify(items));
    // localStorage.setItem('quantity',JSON.stringify(quantity));

}


// clear items in localstorage and dom
function clearAll(e) {

    // e.target.parentElement.classList.contains('collection')
    // let ul = document.querySelector('.collection');
    // divCard.removeChild(ul);
    
    // localStorage.clear('shopitems')

    // console.log(JSON.parse(localStorage.getItem('shopitems')));

    while (ul.firstChild) {
        //The list is LIVE so it will re-index each call
        ul.removeChild(ul.firstChild);
        localStorage.clear('shopitems')
    }

    e.preventDefault();
}

// automatically loads the items
function loadItem() {
    let items = JSON.parse(localStorage.getItem('shopitems'));
    let quantity = JSON.parse(localStorage.getItem('quantity'));

    for (let i = 0; i < items.length; i++){

        let li = document.createElement('li');

        // add a classname for li
        li.className = "collection-item";
        
        // insert the input value in the li
        li.innerHTML = items[i];
        
        // define collection ul variable
        let ul = document.querySelector('.collection');

        // create a element
        let link = document.createElement('a');

        // add classname for a element
        link.className = "delete-item secondary-content";

        // insert the x icon in a element
        link.innerHTML = '<i class="fa fa-times" aria-hidden="true"></i>'

        // append link to li
        li.appendChild(link);

        // append li to ul
        ul.appendChild(li)

        // console.log(items[i]);

        // for (let x = 0; x < quantity.length; x++){

        //     // create new span
        //     let spanQ = document.createElement('span');
    
        //     // add classname for span
        //     spanQ.className = "span-quantity"
    
        //     // insert quantity value to span
        //     spanQ.innerHTML = quantity[x];
    
        //     // append span to li
        //     li.appendChild(spanQ);
            
        // }
        
    }

    

}


// filter items using keyword
function filterItem(e){
    const inputText = e.target.value.toLowerCase();

    const listitem = document.querySelectorAll('.collection-item');

    listitem.forEach(function(shopitem){
        const item = shopitem.firstChild.textContent;
            if(item.toLowerCase().indexOf(inputText) != -1){
                shopitem.style.display = "block";
            }else{
                shopitem.style.display = "none";   
            }
    });
    
    e.preventDefault();
}

// compute
function compute() {

    const data = {
        fruits: ["apple", "banana", "cherry", "durian"],
        price: [20, 15, 30 ,50]
    }

    for (let i = 0; i < data.fruits.length; i++){
        if (inputItem.value === data.fruits[i]) {
            priceInput.value = data.price[i];
        }
    }

    
}




