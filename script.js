if(document.readyState=='loading'){
   document.addEventListener('DOMContentLoaded',ready)
}else{
   ready()
}

function ready(){
    
    var removeButtons = document.getElementsByClassName('btn-remove');
    for(var i=0;i<removeButtons.length;i++){
        var button= removeButtons[i];
       button.addEventListener('click',removeCartRow)
    }
    var inputs = document.getElementsByClassName('input');
    for(var i=0;i<inputs.length;i++){
        var input=inputs[i];
        input.addEventListener('click',inputChange)
    }
    var addBtns = document.getElementsByClassName('btn-add');
    for(var i=0;i<addBtns.length;i++){
        var addBtn=addBtns[i];
        addBtn.addEventListener('click',addCart)
    }
    document.getElementsByClassName('purchase-btn')[0].addEventListener('click',purchaseClicked);

}
function removeCartRow(event){
    var button = event.target;
   
    button.parentElement.parentElement.remove();
    updateAll();
}
function inputChange(event){
    var input = event.target;
    if(isNaN(input.value) || input.value<=0){
        input.value=1;
    }
    updateAll();
}
function updateAll(){
   var cartItems = document.getElementsByClassName('items-cart')[0];
   var cartRows=cartItems.getElementsByClassName('cart-container');
   var total=0;
    for(var i=0;i<cartRows.length;i++){
        var cartRow=cartRows[i];
        var input = cartRow.getElementsByClassName('input')[0];
        var quantity = input.value;
        var priceElement =cartRow.getElementsByClassName('cart-price')[0];
        var price = parseFloat(priceElement.innerText.replace('£',''));
        total =total+ quantity * price;
        }
        total = Math.round(total*100)/100;
        var totalPrice = document.getElementsByClassName('total-price')[0];
        totalPrice.innerText='£'+total;
      
}
function addCart(event){
   
       var button=event.target;
        var shopItem =button.parentElement.parentElement;
        var srcImg =shopItem.getElementsByClassName('shop-img')[0].src;
        var title = shopItem.getElementsByClassName('shop-title')[0].innerText;
        var price = shopItem.getElementsByClassName('price')[0].innerText;
        var newRow = document.createElement('div');
        newRow.classList.add('cart-container');
        var cartItems = document.getElementsByClassName('items-cart')[0]; 
        var cartItemNames =cartItems.getElementsByClassName('cart-title')
        for(var i=0;i<cartItemNames.length;i++){
            if(cartItemNames[i].innerText==title){
                alert('This item is already in the cart');
                return;
            }
        }
        
        var content =`
           
                <img src="${srcImg}" alt="t-shirt" class='cart-img'>
                <h4 class="cart-title">${title}</h4>
                <div class="cart-price">${price}</div>
                <div class="cart-details">
                <input type='number'  class="input" value='1'/>
                <button class="btn btn-remove">Remove</button>
                </div>
      
        `;
            
        newRow.innerHTML= content;  
          
        cartItems.append(newRow)  
      newRow.getElementsByClassName('btn-remove')[0].addEventListener('click',removeCartRow);
      newRow.getElementsByClassName('input')[0].addEventListener('click',inputChange);
        
        updateAll();
}
function purchaseClicked(event){
    alert('Thankyou for your purchase!')
    
    var cartItems = document.getElementsByClassName('items-cart')[0]
    cartItems.innerHTML= '';
   
    updateAll();
}