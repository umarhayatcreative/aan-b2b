document.addEventListener("DOMContentLoaded", function () {
  const input = document.getElementById("dateRange");

  flatpickr(input, {
    mode: "range",
    dateFormat: "d-m-Y",
    allowInput: true,
    disableMobile: true,
    onReady: function () {
      // Bootstrap ke placeholder ko overwrite karke custom dikhayenge
      input.setAttribute("placeholder", "dd-mm-yyyy - dd-mm-yyyy");
    },
    onChange: function (selectedDates, dateStr) {
      if (!dateStr) {
        input.setAttribute("placeholder", "dd-mm-yyyy - dd-mm-yyyy");
      }
    }
  });
});