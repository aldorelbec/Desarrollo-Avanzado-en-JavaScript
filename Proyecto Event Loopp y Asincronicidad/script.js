
const ordersContainer = document.getElementById("ordersContainer");
const addOrderBtn = document.getElementById("addOrderBtn");

let orderCount = 0;


function randomPrepTime() {
  return Math.floor(Math.random() * 4000) + 2000;
}


function prepareOrder(orderId) {
  return new Promise((resolve) => {
    const prepTime = randomPrepTime();
    setTimeout(() => {
      resolve(orderId);
    }, prepTime);
  });
}

function updateOrderStatus(orderElement, status) {
  const statusElement = orderElement.querySelector(".status");
  statusElement.textContent = status;

  if (status === "En Proceso") {
    statusElement.className = "status processing";
  } else if (status === "Completado") {
    statusElement.className = "status completed";
  }
}

async function handleOrder(orderId, orderElement) {
  updateOrderStatus(orderElement, "En Proceso");

  await prepareOrder(orderId);

  updateOrderStatus(orderElement, "Completado");
}

function addOrder() {
  orderCount++;
  const orderId = orderCount;

  const orderElement = document.createElement("div");
  orderElement.classList.add("order");
  orderElement.innerHTML = `
    <p><strong>Pedido #${orderId}</strong></p>
    <p class="status">Pendiente...</p>
  `;
  ordersContainer.appendChild(orderElement);

  handleOrder(orderId, orderElement);
}

addOrderBtn.addEventListener("click", addOrder);
