// //creating a local storage
let cart = JSON.parse(localStorage.getItem("cart")) ? JSON.parse(localStorage.getItem(cart)) : [];

//Read
console.log(cart);
function readCart(cart){
  document.querySelector("#cart").innerHTML = "";
  let total = cart.reduce((total, product) =>{
    return total+ product.price * product.qty;
  },0).toFixed(2);

  cart.forEach((product,i )=> {
    document.querySelector("#cart").innerHTML+=`
    <div class="card mb-3 w-100 position-relative" >
    <button type="button" class="position-absolute top-0 start-100 translate-middle
    badge btn btn-danger"
    onclick="removeFromCart(${i})">X</button>
      <div class="row g-0">
        <div class="col-md-4">
          <img src="${product.img}" class="img-fluid rounded-start" alt="..."
        </div>
        <div class="col-md-8">
          <div class="card-body d-flex flex-column container">
          <h5 class="card-title mb-3" >${product.title}</h5>
          <div class="d-flex mb-3 justify-content-between">
          <p class="card-text">Individual price: </p>
          <span> R${product.price} <span>


      </div>
      <div class= "d-flex mb-3 justify-content-between">
                    <label class="form-label">Quantity:</label>
                    <input type="number" min=1 id="remove${i}" value=${product.qty} onchange="updatecart(${i})" />
                    </div>
                    <div class="card-footer bg-white d-flex justify-content-between p-0 pt-3>
                    <p>Total Cost: </p>
                    <span>R${(parseFloat(product.price)* parseInt(product.qty)).toFixed(2)}</span>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    `;
  });
  showCartBadge();
  document.querySelector("#cart-footer").innerHTML +=`
  <h3>Total cost: R${total}</h3>
  <button class="btn btn-primary btn-lg" onclick="checkout()">checkout </button>
  `;
  }

//update cart badge
function showCartBadge(){
  document.querySelector("#badge").innerHTML= cart ? cart.length : "";
}
readCart(cart);

//update
function updateCart(i){
  let qty = document.querySelector(`#remove${i}`).value;
  cart[i] = { ...cart[i],qty};
  localStorage.setItem("cart", JSON.stringify(cart));
  readCart(cart);
}
//remove
function removeFromCart(i) {
  let confirmation = confirm(
    "Are you sure you want to remove this product from the cart?"
  );

  if (confirmation) {
    cart.splice(i, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    readCart(cart);
  }
}
//addtoCart
function checkout() {
  let total = cart
    .reduce((total, product) => {
      return total + product.price * product.qty;
    }, 0)
    .toFixed(2);
  try {
    if (parseInt(total) == 0) throw new Error("Nothing in cart");
    let confirmation = confirm(`Total payment needed: R${total}`);

    if (confirmation) {
      cart.length = 0;
      localStorage.removeItem("cart");
      readCart(cart);
    }
  } catch (err) {
    alert(err);
  }
}