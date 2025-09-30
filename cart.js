let cart = []; 
function addToCart(name, price) { 
  let existing = cart.find(item => item.name === name); 
  if (existing) { 
    existing.qty++; 
  } else { 
    cart.push({ name, price, qty: 1 }); 
  } 
  updateCart(); 
} 

function changeQty(name, amount) { 
  let item = cart.find(i => i.name === name); 
  if (item) { 
    item.qty += amount; 
    if (item.qty <= 0) { 
      cart = cart.filter(i => i.name !== name); 
    } 
  } 
  updateCart(); 
} 

function removeItem(name) { 
  cart = cart.filter(i => i.name !== name); 
  updateCart(); 
} 

function updateCart() { 
  let list = document.getElementById("items"); 
  list.innerHTML = ""; 
  let total = 0; 
  cart.forEach(item => { 
    let li = document.createElement("li"); 
    li.innerHTML = ` 
      ${item.name} x${item.qty} - $${(item.price * item.qty).toFixed(2)} 
      <button class="cart-btn" onclick="changeQty('${item.name}', 1)">+</button> 
      <button class="cart-btn" onclick="changeQty('${item.name}', -1)">-</button> 
      <button class="cart-btn remove-btn" onclick="removeItem('${item.name}')">❌</button> 
    `; 
    list.appendChild(li); 
    total += item.price * item.qty; 
  }); 
  document.getElementById("total").textContent = "Total: $" + total.toFixed(2); 
}  