// activities input date 
flatpickr(".checkInDateInput", {
  dateFormat: "d-M-Y",   // Example: 19-Aug-2025
  minDate: "today",      // past dates disable
  defaultDate: "today"   // by default today ki date select
});
// activities input date 


document.addEventListener('DOMContentLoaded', () => {
  initializeDateRangePickers();
  setupGuestRoomDropdown();
  setupHeaderNavLinkColorToggle();
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

function setupGuestRoomDropdown() {
  const toggleButton = document.querySelector('.guest-room-toggle');
  const summarySpan = document.querySelector('.guest-room-summary');
  const dropdownMenu = document.querySelector('.guest-room-dropdown');
  if (!toggleButton || !dropdownMenu || !summarySpan) return;

  const roomsContainer = dropdownMenu.querySelector('.rooms-container');
  const addRoomBtn = dropdownMenu.querySelector('.btn-add-room');
  const applyBtn = dropdownMenu.querySelector('.btn-apply-guests');
  const MAX_ROOMS = 6;
  const MIN_ADULTS = 1;
  const MAX_ADULTS = 6;
  const MIN_CHILDREN = 0;
  const MAX_CHILDREN = 6;

  // Initialize tooltips within the dropdown (including dynamically created elements)
  function refreshTooltips(scope) {
    const tooltipTriggerList = (scope || dropdownMenu).querySelectorAll('[data-bs-toggle="tooltip"]');
    tooltipTriggerList.forEach((el) => {
      if (window.bootstrap && bootstrap.Tooltip) {
        bootstrap.Tooltip.getOrCreateInstance(el);
      }
    });
  }

  refreshTooltips();

  // Prevent dropdown from closing when interacting inside
  dropdownMenu.addEventListener('click', (e) => {
    e.stopPropagation();
  });

  function createChildAgeSelect() {
    const col = document.createElement('div');
    col.className = 'col-auto';
    const select = document.createElement('select');
    select.className = 'form-select';
    // Age 0-17
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
    // Adjust number of selects to match count
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
        // Keep remove button visible even for the first room
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
    // Reset counts
    const adultsCount = cloned.querySelector('.adults-count');
    const childrenCount = cloned.querySelector('.children-count');
    if (adultsCount) adultsCount.textContent = '2';
    if (childrenCount) childrenCount.textContent = '0';
    // Reset ages list
    const agesList = cloned.querySelector('.children-ages-list');
    if (agesList) agesList.innerHTML = '';
    const agesWrapper = cloned.querySelector('.children-ages');
    if (agesWrapper) agesWrapper.classList.add('d-none');
    // Ensure remove button visible for additional rooms (visibility handled by reindex)
    return cloned;
  }

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

  dropdownMenu.addEventListener('click', (e) => {
    const target = e.target;
    if (!(target instanceof Element)) return;

    // Increase / Decrease buttons
    if (target.classList.contains('btn-increase') || target.classList.contains('btn-decrease')) {
      e.preventDefault();
      const roomEl = target.closest('.room');
      if (!roomEl) return;
      // Find the count element within the same control group
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

    // Remove room
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

  applyBtn.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    updateSummary();
    if (window.bootstrap && bootstrap.Dropdown) {
      const dd = bootstrap.Dropdown.getOrCreateInstance(toggleButton);
      dd.hide();
    }
  });

  // Set initial state
  reindexRooms();
  updateChildrenAgesVisibility(roomsContainer.querySelector('.room'));
  updateSummary();
}



// cart button js start
// Cart toggle functionality using classes
document.addEventListener('DOMContentLoaded', function () {
  const cartToggle = document.querySelector('.cart-toggle');
  const cartDropdown = document.querySelector('.cart-dropdown');

  // Toggle cart dropdown
  cartToggle.addEventListener('click', function (e) {
    e.preventDefault();
    cartDropdown.classList.toggle('d-none');
  });

  // Close cart when clicking outside
  document.addEventListener('click', function (e) {
    if (!e.target.closest('.cart-container')) {
      cartDropdown.classList.add('d-none');
    }
  });
});
// cart button js end