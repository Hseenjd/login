// بيانات المنتجات الأولية
const productsData = [
  {
    type: "laptop",
    name: "حاسبة Dell XPS 13",
    description: "لابتوب سريع بشاشة 13 بوصة.",
    img: "",
    stars: 5,
  },
  {
    type: "desktop",
    name: "حاسوب مكتبي Lenovo",
    description: "مناسب للأعمال والبرمجة.",
    img: "https://images.unsplash.com/photo-1587202372775-d3db1b0635fd?auto=format&fit=crop&w=500&q=80",
    stars: 4,
  },
  {
    type: "accessory",
    name: "فأرة لاسلكية Logitech",
    description: "راحة في الاستخدام ودقة عالية.",
    img: "https://images.unsplash.com/photo-1555617117-08db5c9e0d9f?auto=format&fit=crop&w=500&q=80",
    stars: 4,
  },
  {
    type: "laptop",
    name: "حاسبة MacBook Pro",
    description: "قوة الأداء مع تصميم مميز.",
    img: "https://images.unsplash.com/photo-1580910051072-4c1942e138b7?auto=format&fit=crop&w=500&q=80",
    stars: 5,
  },
  {
    type: "desktop",
    name: "حاسوب مكتبي ASUS",
    description: "مناسب للألعاب والعمل المكثف.",
    img: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=500&q=80",
    stars: 4,
  },
  {
    type: "accessory",
    name: "لوحة مفاتيح ميكانيكية",
    description: "إحساس ممتاز مع إضاءة خلفية.",
    img: "https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=500&q=80",
    stars: 5,
  }
];

// إنشاء نجوم التقييم
function createStars(num) {
  return "⭐".repeat(num);
}

// توليد المنتجات في الصفحة
function generateProducts(numProducts) {
  const container = document.getElementById("products");
  container.innerHTML = "";

  for (let i = 0; i < numProducts; i++) {
    const product = productsData[i % productsData.length];

    const productDiv = document.createElement("div");
    productDiv.classList.add("product-item");
    productDiv.setAttribute("data-type", product.type);

    productDiv.innerHTML = `
      <img src="${product.img}" alt="${product.name}">
      <h3>${product.name} #${i + 1}</h3>
      <p>${product.description}</p>
      <div class="stars">${createStars(product.stars)}</div>
    `;

    container.appendChild(productDiv);
  }
}

// عرض اليوم والتاريخ
function showToday() {
  const todayElement = document.getElementById('today');
  const days = ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];
  const date = new Date();
  const dayName = days[date.getDay()];
  const dateString = date.toLocaleDateString('ar-IQ');
  todayElement.textContent = اليوم هو ${dayName} - ${dateString};
}

// الوضع الليلي
function setupDarkMode() {
  const toggleDark = document.getElementById('toggle-dark');
  toggleDark.addEventListener('click', () => {
    document.body.classList.toggle('dark');
  });
}

// فلترة وبحث
function setupFilterAndSearch() {
  const searchInput = document.getElementById('search');
  const filterSelect = document.getElementById('filter');
  const container = document.getElementById("products");

  function filterProducts() {
    const searchText = searchInput.value.toLowerCase();
    const selectedType = filterSelect.value;

    Array.from(container.children).forEach(product => {
      const title = product.querySelector('h3').textContent.toLowerCase();
      const type = product.getAttribute('data-type');

      const matchesSearch = title.includes(searchText);
      const matchesType = !selectedType || type === selectedType;

      if (matchesSearch && matchesType) {
        product.style.display = 'block';
      } else {
        product.style.display = 'none';
      }
    });
  }

  searchInput.addEventListener('input', filterProducts);
  filterSelect.addEventListener('change', filterProducts);
}

// تهيئة كل شيء عند التحميل
document.addEventListener('DOMContentLoaded', () => {
  showToday();
  setupDarkMode();
  generateProducts(1000); // عدد المنتجات التي تريدها
  setupFilterAndSearch();
});