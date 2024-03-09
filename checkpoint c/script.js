// Déclaration d'un tableau vide pour stocker les produits dans le panier
let cart = [];

// Fonction pour ajouter un produit au panier
function addToCart(productId) {
  // Récupère le produit à partir de son ID
  let product = document.getElementById(productId);
  // Récupère le nom du produit
  let productName = product.querySelector('h2').textContent;
  // Prix du produit
  let productPrice = 1000;

  // Vérification du produit dans le panier
  let existingProduct = cart.find(item => item.name === productName);
  if (existingProduct) {
    // Augmentation de quantité
    existingProduct.quantity += 1;
  } else {
    // ajout du produit avec une quantité de 1
    cart.push({ name: productName, price: productPrice, quantity: 1 });
  }
  
  // mise a jour de l'affichage du page
  updateCart();
}

// Fonction pour supprimer un produit du panier
function removeFromCart(index) {
  // Supprime le produit du panier en fonction de son index
  cart.splice(index, 1);
  // Met à jour l'affichage du panier
  updateCart();
}

// Fonction pour augmenter la quantité d'un produit dans le panier
function increaseQuantity(index) {
  // Augmente la quantité du produit en fonction de son index
  cart[index].quantity += 1;
  // Met à jour l'affichage du panier
  updateCart();
}

// Fonction pour réduire la quantité d'un produit dans le panier
function decreaseQuantity(index) {
  // Vérifie si la quantité est supérieure à 1
  if (cart[index].quantity > 1) {
    // Si oui, réduit la quantité du produit en fonction de son index
    cart[index].quantity -= 1;
    // Met à jour l'affichage du panier
    updateCart();
  }
}

// Fonction pour valider la commande
function validateOrder() {
  // Ajoutez ici le code pour valider la commande, par exemple, en envoyant les données au serveur
  console.log('Commande validée :', cart);
}

// Fonction pour mettre à jour l'affichage du panier
function updateCart() {
  // Sélectionne l'élément HTML qui contient la liste des produits du panier
  let cartItems = document.getElementById('cart-items');
  // Sélectionne l'élément HTML qui affiche le total de la commande
  let cartTotal = document.getElementById('cart-total');
  // Vide la liste des produits du panier
  cartItems.innerHTML = '';
  // Initialise la variable pour stocker le total de la commande
  let total = 0;

  // Parcourt tous les produits dans le panier
  cart.forEach((item, index) => {
    // Crée un nouvel élément de liste pour chaque produit
    let li = document.createElement('li');
    // Affiche le nom du produit, sa quantité et son prix total
    li.textContent = `${item.name} x ${item.quantity} - ${item.price * item.quantity} €`;
    
    // Crée un bouton "+" pour augmenter la quantité du produit
    let addButton = document.createElement('button');
    addButton.textContent = '+';
    addButton.onclick = function() {
      increaseQuantity(index);
    };
    
    // Crée un bouton "-" pour réduire la quantité du produit
    let removeButton = document.createElement('button');
    removeButton.textContent = '-';
    removeButton.onclick = function() {
      decreaseQuantity(index);
    };
    
    // Crée un bouton "Supprimer" pour supprimer complètement le produit du panier
    let deleteButton = document.createElement('button');
    deleteButton.textContent = 'Supprimer';
    deleteButton.onclick = function() {
      removeFromCart(index);
    };
    
    // Ajoute les boutons à l'élément de liste
    li.appendChild(addButton);
    li.appendChild(removeButton);
    li.appendChild(deleteButton);
    // Ajoute l'élément de liste à la liste des produits du panier
    cartItems.appendChild(li);
    // Calcule le prix total de la commande en ajoutant le prix de chaque produit
    total += item.price * item.quantity;
  });

  // Met à jour l'affichage du total de la commande
  cartTotal.textContent = total;
}

