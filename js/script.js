// Placeholder for any JavaScript functionality
// E.g., mobile menu toggle, search button click, cart count update, etc.

// Example: Simple dropdown hover fallback (optional if handling mobile later)
document.querySelectorAll('.dropdown > a').forEach(anchor => {
    anchor.addEventListener('click', e => {
        e.preventDefault();
        const dropdownMenu = anchor.nextElementSibling;
        if(dropdownMenu.style.display === 'flex'){
            dropdownMenu.style.display = 'none';
        } else {
            // close others
            document.querySelectorAll('.dropdown-menu').forEach(menu => {
                menu.style.display = 'none';
            });
            dropdownMenu.style.display = 'flex';
        }
    });
});

// Close dropdown if clicked outside
document.addEventListener('click', e => {
    if (!e.target.closest('.dropdown')) {
        document.querySelectorAll('.dropdown-menu').forEach(menu => {
            menu.style.display = 'none';
        });
    }
});

// Khởi tạo Swiper cho slider chính
const mainSlider = new Swiper('.main-slider', {
  loop: true,
  speed: 1500,
  autoplay: {
    delay: 5000, // Chuyển hình sau 5 giây (5000ms)
    disableOnInteraction: false,
  },

  speed: 1200,
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});


//// Khởi tạo slider sản phẩm mới với swiper
const productSlider = new Swiper('.product-new-slider', {
  loop: true,
  speed: 700,
  slidesPerView: 5,
  spaceBetween: 25,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
  },
  breakpoints: {
    320: {
      slidesPerView: 2,
      spaceBetween: 12,
    },
    576: {
      slidesPerView: 3,
      spaceBetween: 15,
    },
    768: {
      slidesPerView: 4,
      spaceBetween: 18,
    },
    992: {
      slidesPerView: 5,
      spaceBetween: 25,
    }
  }
});

// Lọc sản phẩm theo tab bấm
const tabs = document.querySelectorAll('.product-tabs .tab');
const slides = document.querySelectorAll('.product-new-slider .swiper-slide');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    // Xóa active tab hiện tại
    document.querySelector('.product-tabs .tab.active').classList.remove('active');
    // Thêm active tab được click
    tab.classList.add('active');

    const filter = tab.dataset.tab;

    // Ẩn/hiện slide theo filter
    slides.forEach(slide => {
      const cats = slide.dataset.category.split(' '); // Tách category nếu có nhiều (mặc dù hiện tại chỉ 1)
      if (filter === 'all') {
        slide.style.display = ''; // Hiển thị tất cả
      } else {
        slide.style.display = cats.includes(filter) ? '' : 'none'; // Hiển thị chỉ khớp
      }
    });

    // Tắt loop và autoplay khi lọc (để tránh lỗi với slide ẩn)
    if (filter !== 'all') {
      productSlider.params.loop = false;
      productSlider.autoplay.stop(); // Dừng autoplay
    } else {
      productSlider.params.loop = true;
      productSlider.autoplay.start(); // Bật lại autoplay
    }

    // Cập nhật swiper sau khi ẩn/hiện sản phẩm (với delay nhỏ để DOM ổn định)
    setTimeout(() => {
      productSlider.update();
      productSlider.slideTo(0); // Trả về slide đầu tiên sau khi lọc
    }, 100); // Delay 100ms
  });
});
document.addEventListener('DOMContentLoaded', () => {
  const xemCuaHang = document.querySelector('.footer-column .highlight');
  if (xemCuaHang) {
    xemCuaHang.addEventListener('click', () => {
      alert('Chuyển đến trang danh sách cửa hàng VNB.');
      // window.location.href = 'link_to_store_list_page.html';
    });
  }
});
const scrollToTopBtn = document.getElementById("scrollToTopBtn");

window.addEventListener("scroll", () => {
  if (window.scrollY > 100) {
    scrollToTopBtn.classList.add("show");
  } else {
    scrollToTopBtn.classList.remove("show");
  }
});

scrollToTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});
//Phần lọc sale off
// Lấy checkbox chi nhánh và sản phẩm
const checkboxes = document.querySelectorAll(".filter-sidebar input[type='checkbox']");
const products = document.querySelectorAll(".product-card");

function filterProducts() {
  const checkedBranches = Array.from(document.querySelectorAll(".filter-sidebar input[name='branch']:checked")).map(cb => cb.value.toLowerCase());

  products.forEach(prod => {
    const prodBranch = prod.getAttribute("data-branch").toLowerCase();
    // Nếu không có chi nhánh nào chọn thì show tất cả, nếu có chọn thì show sản phẩm có thuộc chi nhánh được chọn
    if (checkedBranches.length === 0 || checkedBranches.includes(prodBranch)) {
      prod.style.display = "flex";
    } else {
      prod.style.display = "none";
    }
  });
}

// Gắn sự kiện change cho checkbox bộ lọc
checkboxes.forEach(cb => {
  cb.addEventListener("change", filterProducts);
});

// Lọc sản phẩm lần đầu khi trang được tải
window.addEventListener("DOMContentLoaded", filterProducts);

document.addEventListener('DOMContentLoaded', () => {
    const searchForm = document.getElementById('searchForm');
    const keywordInput = document.getElementById('keyword');
    const cardList = document.querySelector('.card-list');

    searchForm.addEventListener('submit', e => {
        e.preventDefault();
        const keyword = keywordInput.value.toLowerCase().trim();

        // Filter cards by keyword in title or description
        const cards = cardList.querySelectorAll('.card');
        cards.forEach(card => {
            const title = card.querySelector('h3')?.textContent.toLowerCase() || '';
            const desc = card.querySelector('p')?.textContent.toLowerCase() || '';
            if (title.includes(keyword) || desc.includes(keyword)) {
                card.style.display = '';
            } else {
                card.style.display = 'none';
            }
        });
    });

    // Optional: Add toggle functionality for sidebar categories if needed
    const toggles = document.querySelectorAll('.news-categories li span.toggle');
    toggles.forEach(toggle => {
        toggle.addEventListener('click', e => {
            const li = e.target.parentElement;
            // Manage expanding or collapsing submenus here if needed
            // For demo: toggle plus/minus sign
            if (toggle.textContent === '+') {
                toggle.textContent = '-';
            } else {
                toggle.textContent = '+';
            }
        });
    });
});
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contactForm');

    form.addEventListener('submit', e => {
        e.preventDefault();

        // Simple validation
        const fullname = form.fullname.value.trim();
        const email = form.email.value.trim();
        const phone = form.phone.value.trim();
        const message = form.message.value.trim();

        if (!fullname) {
            alert('Vui lòng nhập họ và tên.');
            form.fullname.focus();
            return;
        }

        if (!email || !validateEmail(email)) {
            alert('Vui lòng nhập email hợp lệ.');
            form.email.focus();
            return;
        }

        if (!phone || !validatePhone(phone)) {
            alert('Vui lòng nhập số điện thoại hợp lệ.');
            form.phone.focus();
            return;
        }

        if (!message) {
            alert('Vui lòng nhập nội dung.');
            form.message.focus();
            return;
        }

        // Nếu validation ok, có thể xử lý gửi form (ví dụ AJAX hoặc submit thật)
        alert('Thông tin đã được gửi thành công! Chúng tôi sẽ liên hệ lại bạn sớm.');
        form.reset();
    });

    function validateEmail(email) {
        // Regex email đơn giản
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    function validatePhone(phone) {
        // Dùng pattern + số 9-15 chữ số
        const re = /^\+?\d{9,15}$/;
        return re.test(phone);
    }
});
