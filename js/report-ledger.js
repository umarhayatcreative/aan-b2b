
  flatpickr(".date-range", {
    mode: "range",                 // enable range selection
    dateFormat: "d-m-Y",           // format: dd-mm-yyyy
    allowInput: true,              // allow manual typing
    defaultDate: [new Date(), new Date()], // default today’s date range
    disableMobile: true,           // use same calendar on mobile
  });
