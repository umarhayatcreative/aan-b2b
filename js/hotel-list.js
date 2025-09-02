document.querySelectorAll('.dropdown').forEach(function(dropdown) {
    let button = dropdown.querySelector('.custom-dropdown-toggle');
    let items = dropdown.querySelectorAll('.dropdown-item');

    items.forEach(function(item) {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            button.textContent = this.textContent;
        });
    });
});




document.addEventListener('DOMContentLoaded', () => {
    initializeDateRangePickers();
    setupGuestRoomDropdowns();
    renderHotelCards();
  });
  
  function initializeDateRangePickers() {
    const dateInputs = document.querySelectorAll('.date-range-input');
    if (!dateInputs.length || typeof flatpickr === 'undefined') return;
  
    dateInputs.forEach((input) => {
      flatpickr(input, {
        mode: 'range',
        minDate: 'today',
        dateFormat: 'd M Y',
        disableMobile: true,
        onOpen: () => {
          // Ensure dropdowns remain above pickers if overlapping
          document.body.classList.add('flatpickr-open');
        },
        onClose: () => {
          document.body.classList.remove('flatpickr-open');
        },
      });
    });
  }
  
function setupGuestRoomDropdowns() {
    const toggles = document.querySelectorAll('.guest-room-toggle');
    if (!toggles.length) return;

    toggles.forEach((toggleButton) => {
      const scope = toggleButton.closest('.hotel-input-group') || toggleButton.closest('.form-floating') || document;
      const summarySpan = toggleButton.querySelector('.guest-room-summary') || scope.querySelector('.guest-room-summary');
      const dropdownMenu = scope.querySelector('.guest-room-dropdown');
      if (!summarySpan || !dropdownMenu) return;

      const roomsContainer = dropdownMenu.querySelector('.rooms-container');
      const addRoomBtn = dropdownMenu.querySelector('.btn-add-room');
      const applyBtn = dropdownMenu.querySelector('.btn-apply-guests');
      const MAX_ROOMS = 6;
      const MIN_ADULTS = 1;
      const MAX_ADULTS = 6;
      const MIN_CHILDREN = 0;
      const MAX_CHILDREN = 6;

      function refreshTooltips(scopeEl) {
        const tooltipTriggerList = (scopeEl || dropdownMenu).querySelectorAll('[data-bs-toggle="tooltip"]');
        tooltipTriggerList.forEach((el) => {
          if (window.bootstrap && bootstrap.Tooltip) {
            bootstrap.Tooltip.getOrCreateInstance(el);
          }
        });
      }

      refreshTooltips();

      dropdownMenu.addEventListener('click', (e) => {
        e.stopPropagation();
      });

      function createChildAgeSelect() {
        const col = document.createElement('div');
        col.className = 'col-auto';
        const select = document.createElement('select');
        select.className = 'form-select';
        for (let i = 0; i <= 17; i += 1) {
          const opt = document.createElement('option');
          opt.value = String(i);
          opt.textContent = `${i}`;
          select.appendChild(opt);
        }
        col.appendChild(select);
        return col;
      }

      function updateChildrenAgesVisibility(roomEl) {
        const childrenCountEl = roomEl.querySelector('.children-count');
        const agesWrapper = roomEl.querySelector('.children-ages');
        const agesList = roomEl.querySelector('.children-ages-list');
        const count = parseInt(childrenCountEl.textContent, 10) || 0;
        if (count > 0) {
          agesWrapper.classList.remove('d-none');
        } else {
          agesWrapper.classList.add('d-none');
        }
        const current = agesList.querySelectorAll('select').length;
        if (current < count) {
          for (let i = current; i < count; i += 1) {
            agesList.appendChild(createChildAgeSelect());
          }
        } else if (current > count) {
          for (let i = current; i > count; i -= 1) {
            const last = agesList.lastElementChild;
            if (last) agesList.removeChild(last);
          }
        }
      }

      function reindexRooms() {
        const roomEls = roomsContainer.querySelectorAll('.room');
        roomEls.forEach((roomEl, idx) => {
          const title = roomEl.querySelector('.room-header h6');
          if (title) title.textContent = `Room ${idx + 1}`;
          const removeBtn = roomEl.querySelector('.btn-remove-room');
          if (removeBtn) {
            removeBtn.classList.remove('d-none');
            removeBtn.disabled = false;
          }
        });
      }

      function updateSummary() {
        const roomEls = roomsContainer.querySelectorAll('.room');
        let totalAdults = 0;
        let totalChildren = 0;
        roomEls.forEach((roomEl) => {
          totalAdults += parseInt(roomEl.querySelector('.adults-count').textContent, 10) || 0;
          totalChildren += parseInt(roomEl.querySelector('.children-count').textContent, 10) || 0;
        });
        const roomCount = roomEls.length;
        const roomLabel = roomCount > 1 ? 'Rooms' : 'Room';
        summarySpan.textContent = `${totalAdults} Adults, ${totalChildren} Children - ${roomCount} ${roomLabel}`;
      }

      function cloneInitialRoom() {
        const template = roomsContainer.querySelector('.room');
        const cloned = template.cloneNode(true);
        const adultsCount = cloned.querySelector('.adults-count');
        const childrenCount = cloned.querySelector('.children-count');
        if (adultsCount) adultsCount.textContent = '2';
        if (childrenCount) childrenCount.textContent = '0';
        const agesList = cloned.querySelector('.children-ages-list');
        if (agesList) agesList.innerHTML = '';
        const agesWrapper = cloned.querySelector('.children-ages');
        if (agesWrapper) agesWrapper.classList.add('d-none');
        return cloned;
      }

      if (addRoomBtn) {
        addRoomBtn.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          const currentRooms = roomsContainer.querySelectorAll('.room').length;
          if (currentRooms >= MAX_ROOMS) return;
          const newRoom = cloneInitialRoom();
          roomsContainer.appendChild(newRoom);
          reindexRooms();
          refreshTooltips(newRoom);
          updateSummary();
        });
      }

      dropdownMenu.addEventListener('click', (e) => {
        const target = e.target;
        if (!(target instanceof Element)) return;
        if (target.classList.contains('btn-increase') || target.classList.contains('btn-decrease')) {
          e.preventDefault();
          const roomEl = target.closest('.room');
          if (!roomEl) return;
          const controlGroup = target.closest('.d-flex');
          if (!controlGroup) return;
          const countEl = controlGroup.querySelector('.count');
          if (!countEl) return;
          const isAdults = countEl.classList.contains('adults-count');
          const isIncrease = target.classList.contains('btn-increase');
          const min = isAdults ? MIN_ADULTS : MIN_CHILDREN;
          const max = isAdults ? MAX_ADULTS : MAX_CHILDREN;
          let value = parseInt(countEl.textContent, 10) || 0;
          if (isIncrease && value < max) value += 1;
          if (!isIncrease && value > min) value -= 1;
          countEl.textContent = String(value);
          if (!isAdults) {
            updateChildrenAgesVisibility(roomEl);
          }
          updateSummary();
          return;
        }

        if (target.classList.contains('btn-remove-room')) {
          e.preventDefault();
          const roomEl = target.closest('.room');
          if (!roomEl) return;
          const rooms = roomsContainer.querySelectorAll('.room');
          if (rooms.length <= 1) return;
          roomEl.remove();
          reindexRooms();
          updateSummary();
          return;
        }
      });

      if (applyBtn) {
        applyBtn.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          updateSummary();
          if (window.bootstrap && bootstrap.Dropdown) {
            const dd = bootstrap.Dropdown.getOrCreateInstance(toggleButton);
            dd.hide();
          }
        });
      }

      // Initialize default state for this widget
      reindexRooms();
      const firstRoom = roomsContainer.querySelector('.room');
      if (firstRoom) updateChildrenAgesVisibility(firstRoom);
      updateSummary();
    });
  }
  
  
  
// price range slider start

  
  // price range slider end

// Dynamic hotel cards renderer
function renderHotelCards() {
  const container = document.getElementById('hotelList');
  if (!container) return;

  const hotels = [
    {
      name: 'Anantara The Palm Dubai Resort',
      rating: 4.8,
      reviews: 6002,
      location: 'Business Bay - Dubai - United Arab Emirates, PO Box 71847, Dubai, United Arab Emirates',
      price: 'AED 66',
      discountText: '10% Discount',
      image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=1200&q=80',
      features: ['Mentions: Modern', 'Value', 'Trendy'],
    },
    {
      name: 'Jumeirah Beach Hotel',
      rating: 4.6,
      reviews: 4820,
      location: 'Jumeirah St - Dubai - United Arab Emirates',
      price: 'AED 120',
      discountText: 'Limited Time Deal',
      image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=1200&q=80',
      features: ['Beachfront', 'Family Friendly', 'Spa'],
    },
    {
      name: 'Burj Al Arab',
      rating: 4.9,
      reviews: 7250,
      location: 'Umm Suqeim 3 - Dubai - United Arab Emirates',
      price: 'AED 950',
      discountText: 'Member Exclusive',
      image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80',
      features: ['Luxury', 'Iconic', 'Private Beach'],
    },
    {
      name: 'Atlantis The Palm',
      rating: 4.7,
      reviews: 10320,
      location: 'Crescent Rd - The Palm Jumeirah - Dubai',
      price: 'AED 420',
      discountText: 'Breakfast Included',
      image: 'https://images.unsplash.com/photo-1501117716987-c8e3f1875411?auto=format&fit=crop&w=1200&q=80',
      features: ['Aquaventure Access', 'Family Rooms', 'Ocean Views'],
    },
    {
      name: 'Rixos Premium Dubai',
      rating: 4.5,
      reviews: 3910,
      location: 'Jumeirah Beach Residence - Dubai',
      price: 'AED 310',
      discountText: 'Early Bird 15%',
      image: 'https://images.unsplash.com/photo-1528909514045-2fa4ac7a08ba?auto=format&fit=crop&w=1200&q=80',
      features: ['Nightlife', 'Modern', 'City Views'],
    },
  ];

  // Pagination
  const pageSize = 3; // cards per page
  let currentPage = 1;

  const paginationEl = document.getElementById('hotelPagination');

  function renderPage() {
    const start = (currentPage - 1) * pageSize;
    const pageItems = hotels.slice(start, start + pageSize);
    container.innerHTML = pageItems.map(renderHotelCardHTML).join('');
    renderPaginationControls(hotels.length, currentPage, pageSize, paginationEl, (page) => {
      currentPage = page;
      renderPage();
      // Scroll to list top on page change
      container.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  renderPage();
}

function renderHotelCardHTML(hotel) {
  const stars = '★★★★★';
  return `
    <div class="card card-travel mb-3">
      <div class="row g-0">
        <div class="col-md-4 position-relative">
          <img src="${hotel.image}" class="img-fluid hotel-img w-100 h-100" alt="${escapeHtml(
            hotel.name
          )}">
          <button class="heart-btn position-absolute top-0 end-0 m-3 d-flex align-items-center justify-content-center">
            <i class="far fa-heart text-muted"></i>
          </button>
        </div>
        <div class="col-md-8">
          <div class="card-body p-4">
            <div class="row align-items-start mb-3">
              <div class="col-md-8">
                <div class="mb-2">
                  <span class="badges discount-badge px-3 py-1 rounded-pill fw-medium small">${escapeHtml(
                    hotel.discountText
                  )}</span>
                </div>
                <h5 class="card-title fw-bold mb-2">${escapeHtml(hotel.name)}</h5>
                <div class="d-flex align-items-center mb-2">
                  <span class="fw-bold me-1">${hotel.rating}</span>
                  <div class="rating-green me-2 small" aria-label="${hotel.rating} out of 5">${stars}
                  </div>
                  <a href="#" class="text-decoration-none text-muted small">(${hotel.reviews.toLocaleString()} reviews)</a>
                </div>
                <div class="mb-3 d-flex align-items-start">
                  <i class="fa-solid fa-location-dot text-muted small me-2 mt-1"></i>
                  <p class="badges value-badge text-muted mb-0">${escapeHtml(hotel.location)}</p>
                </div>
                <div class="d-flex flex-wrap gap-1">
                  ${hotel.features
                    .map(
                      (f) => `
                    <span class="badges feature-tag px-2 py-1 rounded-pill text-muted">
                      <i class="fas fa-check me-2"></i>${escapeHtml(f)}
                    </span>`
                    )
                    .join('')}
                </div>
              </div>
              <div class="col-lg-4 text-end">
                <div class="price-main fs-5 mb-1">${escapeHtml(hotel.price)}</div>
                <div class="fully-refundable small fw-semibold mb-1">Fully refundable</div>
                <div class="text-muted small mb-3">No prepayment needed</div>
                <a href="/hotel-detail.html" class="btn btn-view text-white fw-medium py-2 w-100">Book Now</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

function escapeHtml(str) {
  return String(str)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function renderPaginationControls(totalItems, currentPage, pageSize, container, onChange) {
  if (!container) return;
  const totalPages = Math.ceil(totalItems / pageSize) || 1;
  const maxButtons = 5; // max numbered buttons shown

  function createButton(label, page, disabled = false, active = false) {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = `page-btn ${active ? 'active' : ''}`;
    btn.textContent = label;
    btn.disabled = disabled;
    btn.addEventListener('click', () => onChange(page));
    return btn;
  }

  container.innerHTML = '';

  // Prev
  container.appendChild(createButton('Prev', Math.max(1, currentPage - 1), currentPage === 1));

  // Determine start/end range
  let start = Math.max(1, currentPage - Math.floor(maxButtons / 2));
  let end = start + maxButtons - 1;
  if (end > totalPages) {
    end = totalPages;
    start = Math.max(1, end - maxButtons + 1);
  }

  if (start > 1) {
    container.appendChild(createButton('1', 1, false, currentPage === 1));
    if (start > 2) {
      const dots = document.createElement('span');
      dots.textContent = '…';
      dots.className = 'px-2 text-muted';
      container.appendChild(dots);
    }
  }

  for (let i = start; i <= end; i += 1) {
    container.appendChild(createButton(String(i), i, false, i === currentPage));
  }

  if (end < totalPages) {
    if (end < totalPages - 1) {
      const dots = document.createElement('span');
      dots.textContent = '…';
      dots.className = 'px-2 text-muted';
      container.appendChild(dots);
    }
    container.appendChild(createButton(String(totalPages), totalPages, false, currentPage === totalPages));
  }

  // Next
  container.appendChild(createButton('Next', Math.min(totalPages, currentPage + 1), currentPage === totalPages));
}