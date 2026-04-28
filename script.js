const api = "https://dummyjson.com/products";
const produkContainer = document.getElementById("produk");
const kategoriContainer = document.getElementById("kategori");
const hamburger = document.getElementById("hamburger");
const listNav = document.getElementById("list-nav");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  listNav.classList.toggle("open");
});

function renderSkeleton() {
  const skeletonHTML = Array(8)
    .fill(
      `<div class="card skeleton">
        <div class="skeleton-img"></div>
        <div class="skeleton-text title"></div>
        <div class="skeleton-text brand"></div>
        <div class="text-price">
          <div class="skeleton-text price"></div>
          <div class="skeleton-text rating"></div>
        </div>
        <div class="skeleton-btn"></div>
      </div>`
    )
    .join("");
  produkContainer.innerHTML = skeletonHTML;
}

function renderKategoriSkeleton() {
  const skeletonHTML = Array(5)
    .fill(`<li><div class="skeleton-text" style="width: 100%; height: 20px;"></div></li>`)
    .join("");
  kategoriContainer.innerHTML = skeletonHTML;
}

async function loadProducts() {
  try {
    renderSkeleton();
    const response = await fetch(api);
    const data = await response.json();

    const render = data.products
      .map(
        (value) => `<div class="card">
          <img src="${value.images[0]}" alt="${value.title}" loading="lazy" />
          <h2 class="title-product">${value.title}</h2>
          <h4 class="brand">${value.brand || ""}</h4>
          <div class="text-price">
            <span class="price">$${value.price}</span>
            <span class="rating">⭐ ${value.rating}</span>
          </div>
          <button class="btn-view">View Details</button>
        </div>`
      )
      .join("");

    produkContainer.innerHTML = render;
  } catch (error) {
    produkContainer.innerHTML = `<p>Gagal memuat produk.</p>`;
  }
}

async function loadCategories() {
  try {
    renderKategoriSkeleton();
    const response = await fetch(api);
    const data = await response.json();

    const uniqueKategori = [...new Set(data.products.map((item) => item.category))];

    const render = uniqueKategori
      .map((category) => `<li><a href="#">${category}</a></li>`)
      .join("");

    kategoriContainer.innerHTML = render;
  } catch (error) {
    kategoriContainer.innerHTML = `<p>Gagal memuat kategori.</p>`;
  }
}

loadCategories();
loadProducts();