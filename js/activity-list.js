// activities input date 
flatpickr(".checkInDateInput", {
    dateFormat: "d-M-Y",
    defaultDate: new Date()
});

document.addEventListener('DOMContentLoaded', function () {
    flatpickr(".checkInDateInput", {
        dateFormat: "d-M-Y",
        defaultDate: new Date()
    });
});


// ---- Activity list rendering with class-based pagination (no IDs) ----
(function () {
    const activityListContainer = document.querySelector('.activity-list-detail');
    if (!activityListContainer) return;

    // Sample data (7 items). Extend as needed
    const activities = [
        {
            title: "6 Emirates in A Day Tour – Explore UAE's Top Attractions",
            image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            rating: 5,
            reviews: 2847,
            price: "PKR 61,590",
            description: "Experience all 7 Emirates in one unforgettable day! Visit iconic landmarks, traditional souks.",
            features: ["Non-Refundable", "Free Cancellation 24"],
            packages: [
                {
                    title: "Standard Tour (No Transfers)",
                    checked: true,
                    date: "2025-09-03",
                    transfers: [
                        { label: "Without Transfers", checked: true },
                        { label: "Sharing Transfers" },
                        { label: "Private Transfers" }
                    ],
                    price: "PKR 61,590.00"
                },
                {
                    title: "Premium Tour (Sharing Transfers)",
                    checked: true,
                    date: "2025-09-11",
                    transfers: [
                        { label: "Without Transfers" },
                        { label: "Sharing Transfers", checked: true },
                        { label: "Private Transfers" }
                    ],
                    price: "PKR 74,900.00"
                }
            ]
        },
        {
            title: "Desert Safari with BBQ Dinner",
            image: "https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=1200&auto=format&fit=crop",
            rating: 5,
            reviews: 1901,
            price: "PKR 24,990",
            description: "Dune bashing, camel rides, and a traditional BBQ dinner under the stars.",
            features: ["Non-Refundable", "Free Cancellation 24"],
            packages: [
                {
                    title: "Evening Safari (Without Transfers)",
                    checked: true,
                    date: "2025-09-05",
                    transfers: [
                        { label: "Without Transfers", checked: true },
                        { label: "Sharing Transfers" },
                        { label: "Private Transfers" }
                    ],
                    price: "PKR 24,990.00"
                },
                {
                    title: "Evening Safari (Sharing Transfers)",
                    date: "2025-09-07",
                    transfers: [
                        { label: "Without Transfers" },
                        { label: "Sharing Transfers", checked: true },
                        { label: "Private Transfers" }
                    ],
                    price: "PKR 29,500.00"
                }
            ]
        },
        {
            title: "Burj Khalifa At The Top",
            image: "https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?q=80&w=1200&auto=format&fit=crop",
            rating: 5,
            reviews: 11234,
            price: "PKR 18,450",
            description: "Soar to the top and enjoy panoramic views of Dubai's skyline.",
            features: ["Non-Refundable", "Free Cancellation 24"],
            packages: [
                {
                    title: "Non-Prime Hours",
                    checked: true,
                    date: "2025-09-08",
                    transfers: [
                        { label: "Without Transfers", checked: true },
                        { label: "Sharing Transfers" }
                    ],
                    price: "PKR 18,450.00"
                },
                {
                    title: "Prime Hours",
                    date: "2025-09-12",
                    transfers: [
                        { label: "Without Transfers", checked: true },
                        { label: "Sharing Transfers" }
                    ],
                    price: "PKR 26,750.00"
                }
            ]
        },
        {
            title: "Dhow Cruise Dinner Marina",
            image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop",
            rating: 4,
            reviews: 2567,
            price: "PKR 14,200",
            description: "Relaxing evening cruise with live entertainment and buffet dinner.",
            features: ["Non-Refundable", "Free Cancellation 24"],
            packages: [
                {
                    title: "Beverage Package - Add on only",
                    checked: true,
                    date: "2025-09-03",
                    transfers: [
                        { label: "Without Transfers", checked: true }
                    ],
                    price: "PKR 3,940.00"
                },
                {
                    title: "Lower Deck",
                    checked: true,
                    date: "2025-09-11",
                    transfers: [
                        { label: "Without Transfers", checked: true },
                        { label: "Sharing Transfers" },
                        { label: "Private Transfers" }
                    ],
                    price: "PKR 7,080.00"
                },
                {
                    title: "Upper Deck",
                    date: "2025-09-12",
                    transfers: [
                        { label: "Without Transfers", checked: true },
                        { label: "Sharing Transfers" },
                        { label: "Private Transfers" }
                    ],
                    price: "PKR 7,910.00"
                }
            ]
        },
        {
            title: "Abu Dhabi City Tour",
            image: "https://images.unsplash.com/photo-1568584711075-3d021a7c3ca3?q=80&w=1200&auto=format&fit=crop",
            rating: 5,
            reviews: 3850,
            price: "PKR 39,999",
            description: "Visit Sheikh Zayed Grand Mosque, Louvre Abu Dhabi, and more.",
            features: ["Non-Refundable", "Free Cancellation 24"],
            packages: [
                {
                    title: "City Highlights (Sharing)",
                    checked: true,
                    date: "2025-09-06",
                    transfers: [
                        { label: "Sharing Transfers", checked: true },
                        { label: "Private Transfers" }
                    ],
                    price: "PKR 39,999.00"
                },
                {
                    title: "City Highlights (Private)",
                    date: "2025-09-10",
                    transfers: [
                        { label: "Private Transfers", checked: true }
                    ],
                    price: "PKR 62,500.00"
                }
            ]
        },
        {
            title: "Aquaventure Waterpark",
            image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop",
            rating: 4,
            reviews: 7420,
            price: "PKR 27,500",
            description: "A day of thrilling rides and lazy rivers for the whole family.",
            features: ["Non-Refundable", "Free Cancellation 24"],
            packages: [
                {
                    title: "General Admission",
                    checked: true,
                    date: "2025-09-04",
                    transfers: [
                        { label: "Without Transfers", checked: true },
                        { label: "Sharing Transfers" }
                    ],
                    price: "PKR 27,500.00"
                },
                {
                    title: "Admission + Lost Chambers",
                    date: "2025-09-09",
                    transfers: [
                        { label: "Without Transfers", checked: true },
                        { label: "Sharing Transfers" }
                    ],
                    price: "PKR 33,200.00"
                }
            ]
        },
        {
            title: "Old Dubai Walking Tour",
            image: "https://images.unsplash.com/photo-1548013146-5d79e8bc6df4?q=80&w=1200&auto=format&fit=crop",
            rating: 4,
            reviews: 980,
            price: "PKR 9,999",
            description: "Explore Al Fahidi, souks, and Dubai Creek with a local guide.",
            features: ["Non-Refundable", "Free Cancellation 24"],
            packages: [
                {
                    title: "Morning Guided Walk",
                    checked: true,
                    date: "2025-09-03",
                    transfers: [
                        { label: "Without Transfers", checked: true }
                    ],
                    price: "PKR 9,999.00"
                },
                {
                    title: "Evening Guided Walk",
                    date: "2025-09-05",
                    transfers: [
                        { label: "Without Transfers", checked: true }
                    ],
                    price: "PKR 11,200.00"
                }
            ]
        }
    ];

    const pageSize = 3; // cards per page
    let currentPage = 1;

    function createRatingStars(rating) {
        const fullStar = '<i class="fas fa-star"></i>';
        const emptyStar = '<i class="far fa-star"></i>';
        const max = 5;
        return fullStar.repeat(Math.min(rating, max)) + emptyStar.repeat(Math.max(0, max - rating));
    }

    function createFeatures(features) {
        return features.map((text) => {
            const icon = text.toLowerCase().includes('free')
                ? '<i class="fa-solid fa-circle-check me-2 text-muted"></i>'
                : '<i class="fa-solid fa-ban me-2 text-muted"></i>';
            return `<span class="d-inline-flex align-items-center text-muted">${icon}${text}</span>`;
        }).join('');
    }

    function renderOffcanvas(activity, globalIndex) {
        const packagesHtml = (activity.packages || []).map((pkg, pkgIndex) => {
            const radioName = `transfers-${globalIndex}-${pkgIndex}`;
            const transfersHtml = (pkg.transfers || []).map((t, i) => `
        <div class="form-check">
          <input class="form-check-input" type="radio" name="${radioName}" ${t.checked ? 'checked' : ''}>
          <label class="form-check-label text-muted">${t.label}</label>
        </div>
      `).join('');
            return `
        <div class="package-box mb-3">
          <div class="form-check mb-2">
            <input class="form-check-input" type="checkbox" ${pkg.checked ? 'checked' : ''}>
            <label class="form-check-label fw-semibold">${pkg.title}</label>
          </div>
          <input type="text" class="form-control mb-4 checkInDateInput" name="date" id="checkInDateInput-${globalIndex}-${pkgIndex}" value="${pkg.date || ''}">
          <div class="mb-4">
            ${transfersHtml}
          </div>
          <div class="row g-2 align-items-center mb-4">
            <div class="col">
              Adults:
              <select class="form-select form-select-sm">
                <option>1</option>
                <option>2</option>
              </select>
            </div>
            <div class="col">
              Children:
              <select class="form-select form-select-sm">
                <option>0</option>
                <option>1</option>
              </select>
            </div>
            <div class="col">
              Infants:
              <select class="form-select form-select-sm">
                <option>0</option>
                <option>1</option>
              </select>
            </div>
          </div>
          <div class="text-end price fw-semibold mt-2">${pkg.price}</div>
        </div>
      `;
        }).join('');

        return `
      <div class="offcanvas offcanvas-start cartSidebar activity-booking-slidebar" tabindex="-1" id="cartSidebar-${globalIndex}">
        <div class="offcanvas-header">
          <h5 class="offcanvas-title">Tour List</h5>
          <button type="button" class="btn-close" data-bs-dismiss="offcanvas"></button>
        </div>
        <div class="offcanvas-body">
          ${packagesHtml}
          <a href="/activity-booking.html" class="btn proceed-check-btn w-100">Proceed to Checkout</a>
        </div>
      </div>
    `;
    }

    function renderCards(page) {
        const start = (page - 1) * pageSize;
        const end = start + pageSize;
        const slice = activities.slice(start, end);

        activityListContainer.innerHTML = slice.map((a, idx) => {
            const globalIndex = start + idx;
            return `

           
  
<div class="card activity-card overflow-hidden mb-4" 
     onclick="openActivityPage(event)" 
     style="cursor:pointer;">
    <div class="row g-0">
        <div class="col-md-4">
            <div class="activity-image-box">
                <img src="${a.image}" class="card-image" alt="${a.title}">
            </div>
        </div>
        <div class="col-md-8">
            <div class="card-body p-4 h-100 d-flex flex-column">
                <h5 class="card-title fw-bold mb-2">${a.title}</h5>
                <div class="d-flex align-items-center mb-2 flex-wrap">
                    <div class="rating-stars me-2">${createRatingStars(a.rating)}</div>
                    <span class="text-muted small">
                        (${a.rating}.0/5 • ${a.reviews.toLocaleString()} reviews)
                    </span>
                </div>
                <div class="d-flex align-items-center gap-3 flex-wrap mb-2 small">
                    ${createFeatures(a.features)}
                </div>
                <p class="card-text text-muted mb-3 flex-grow-1">${a.description}</p>
                <div class="d-flex justify-content-between align-items-end mt-auto flex-wrap">
                    <div>
                        <p class="text-muted small activity-price-start">From</p>
                        <div class="fw-bold fs-5 activity-price">${a.price}</div>
                        <span class="text-muted small">per person</span>
                    </div>
                    <a href="javascript:void(0)" 
                       class="btn activity-book-btn px-4 py-2 text-white position-relative"
                       data-bs-toggle="offcanvas"
                       data-bs-target="#cartSidebar-${globalIndex}"
                       onclick="event.stopPropagation();">
                        <i class="fas fa-calendar-check me-2"></i>Book Now
                    </a>
                </div>
                <!-- Offcanvas Sidebar -->
                ${renderOffcanvas(a, globalIndex)}
            </div>
        </div>
    </div>
</div>

        
        `;
        }).join('');
    }

    function renderPagination(page) {
        const paginationContainer = document.querySelector('.activity-pagination-list');
        if (!paginationContainer) return;

        const totalPages = Math.ceil(activities.length / pageSize);
        const prevDisabled = page === 1 ? ' disabled' : '';
        const nextDisabled = page === totalPages ? ' disabled' : '';

        const pageButtons = Array.from({ length: totalPages }, (_, i) => i + 1)
            .map((p) => `
                <li class="page-item activity-page-btn${p === page ? ' active' : ''}">
                    <a class="page-link" href="#" data-page="${p}">${p}</a>
                </li>
            `).join('');

        paginationContainer.innerHTML = `
            <li class="page-item activity-prev${prevDisabled}"><a class="page-link" href="#" data-direction="prev">Previous</a></li>
            ${pageButtons}
            <li class="page-item activity-next${nextDisabled}"><a class="page-link" href="#" data-direction="next">Next</a></li>
        `;

        // Events (class-based, delegated)
        paginationContainer.addEventListener('click', function (e) {
            const target = e.target;
            if (!(target instanceof Element)) return;
            if (!target.closest('.page-link')) return;
            e.preventDefault();

            const link = target.closest('.page-link');
            if (link && link.closest('.page-item') && link.closest('.page-item').classList.contains('disabled')) {
                return; // ignore disabled
            }
            const dir = link.getAttribute('data-direction');
            const pageAttr = link.getAttribute('data-page');

            const total = Math.ceil(activities.length / pageSize);
            if (dir === 'prev' && currentPage > 1) currentPage -= 1;
            else if (dir === 'next' && currentPage < total) currentPage += 1;
            else if (pageAttr) currentPage = parseInt(pageAttr, 10);

            renderCards(currentPage);
            renderPagination(currentPage);
        }, { once: true });
    }

    // Initial render
    renderCards(currentPage);
    renderPagination(currentPage);
})();



// activity list card book now button offcanvas
 let offcanvasOpen = false;

  // Jab offcanvas open ho
  document.addEventListener('show.bs.offcanvas', function () {
    offcanvasOpen = true;
  });

  // Jab offcanvas close ho
  document.addEventListener('hidden.bs.offcanvas', function () {
    offcanvasOpen = false;
  });

  function openActivityPage(e) {
    if (!offcanvasOpen) {
      window.location.href = "/activity-detail.html";
    }
  }