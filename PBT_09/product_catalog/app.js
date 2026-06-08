const products = [
    { id:1,name:"iPhone 16",price:25990000,category:"phone",image:"https://placehold.co/200",rating:4.5,inStock:true },
    { id:2,name:"Samsung S24",price:22990000,category:"phone",image:"https://placehold.co/200",rating:4.4,inStock:true },
    { id:3,name:"Pixel 9",price:19990000,category:"phone",image:"https://placehold.co/200",rating:4.6,inStock:true },

    { id:4,name:"MacBook Pro",price:45990000,category:"laptop",image:"https://placehold.co/200",rating:4.9,inStock:true },
    { id:5,name:"Dell XPS 15",price:35990000,category:"laptop",image:"https://placehold.co/200",rating:4.7,inStock:true },
    { id:6,name:"ThinkPad X1",price:32990000,category:"laptop",image:"https://placehold.co/200",rating:4.5,inStock:true },

    { id:7,name:"iPad Air",price:16990000,category:"tablet",image:"https://placehold.co/200",rating:4.6,inStock:true },
    { id:8,name:"Xiaomi Pad 6",price:7990000,category:"tablet",image:"https://placehold.co/200",rating:4.2,inStock:true },
    { id:9,name:"Galaxy Tab",price:12990000,category:"tablet",image:"https://placehold.co/200",rating:4.4,inStock:true },

    { id:10,name:"AirPods Pro",price:6990000,category:"accessory",image:"https://placehold.co/200",rating:4.3,inStock:true },
    { id:11,name:"Galaxy Buds",price:3490000,category:"accessory",image:"https://placehold.co/200",rating:4.1,inStock:true },
    { id:12,name:"Magic Mouse",price:2490000,category:"accessory",image:"https://placehold.co/200",rating:4.0,inStock:true }
];

let cartCount = 0;
let currentProducts = [...products];

document.body.innerHTML = `
<div class="header">
    <h1>Product Catalog</h1>

    <div>
        <button id="darkBtn">🌙</button>

        <span class="cart">
            🛒
            <span class="badge" id="badge">0</span>
        </span>
    </div>
</div>

<div class="controls">
    <input id="search" placeholder="Search...">

    <button data-category="all">All</button>
    <button data-category="phone">Phone</button>
    <button data-category="laptop">Laptop</button>
    <button data-category="tablet">Tablet</button>
    <button data-category="accessory">Accessory</button>

    <select id="sort">
        <option value="">Sort</option>
        <option value="priceAsc">Giá tăng</option>
        <option value="priceDesc">Giá giảm</option>
        <option value="name">Tên A-Z</option>
        <option value="rating">Rating cao nhất</option>
    </select>
</div>

<div id="products" class="products"></div>
`;

const productContainer =
    document.querySelector("#products");

function renderProducts(list){
    productContainer.innerHTML = "";

    list.forEach(product=>{
        const card =
            document.createElement("div");

        card.className = "card";

        card.innerHTML = `
            <img src="${product.image}">
            <h3>${product.name}</h3>
            <p>${product.price.toLocaleString()}đ</p>
            <p>⭐ ${product.rating}</p>
            <button data-id="${product.id}">
                Thêm giỏ
            </button>
        `;

        card.addEventListener("click",()=>{
            openModal(product);
        });

        card.querySelector("button")
            .addEventListener("click",(e)=>{
                e.stopPropagation();

                cartCount++;

                document.querySelector("#badge")
                    .textContent = cartCount;
            });

        productContainer.appendChild(card);
    });
}

function searchProducts(keyword){
    currentProducts = products.filter(product =>
        product.name
            .toLowerCase()
            .includes(keyword.toLowerCase())
    );

    renderProducts(currentProducts);
}

function filterByCategory(category){
    if(category === "all"){
        currentProducts = [...products];
    }else{
        currentProducts = products.filter(
            p => p.category === category
        );
    }

    renderProducts(currentProducts);
}

function sortProducts(type){
    const arr = [...currentProducts];

    switch(type){
        case "priceAsc":
            arr.sort((a,b)=>a.price-b.price);
            break;

        case "priceDesc":
            arr.sort((a,b)=>b.price-a.price);
            break;

        case "name":
            arr.sort((a,b)=>
                a.name.localeCompare(b.name)
            );
            break;

        case "rating":
            arr.sort((a,b)=>
                b.rating-a.rating
            );
            break;
    }

    renderProducts(arr);
}

function openModal(product){
    const modal =
        document.createElement("div");

    modal.className = "modal";

    modal.innerHTML = `
        <div class="modal-content">
            <h2>${product.name}</h2>
            <p>Giá:
                ${product.price.toLocaleString()}đ
            </p>
            <p>Category:
                ${product.category}
            </p>
            <p>Rating:
                ${product.rating}
            </p>
        </div>
    `;

    modal.addEventListener("click",()=>{
        modal.remove();
    });

    document.body.appendChild(modal);
}

document.querySelector("#search")
    .addEventListener("input",(e)=>{
        searchProducts(e.target.value);
    });

document.querySelectorAll("[data-category]")
    .forEach(btn=>{
        btn.addEventListener("click",()=>{
            filterByCategory(
                btn.dataset.category
            );
        });
    });

document.querySelector("#sort")
    .addEventListener("change",(e)=>{
        sortProducts(e.target.value);
    });

document.querySelector("#darkBtn")
    .addEventListener("click",()=>{
        document.body.classList.toggle(
            "dark-mode"
        );
    });

renderProducts(products);