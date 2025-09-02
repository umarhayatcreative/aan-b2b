

flatpickr(".date-visass", {
  dateFormat: "d-m-Y",       // dd-mm-yyyy format
  allowInput: true,          // manual typing allowed
  defaultDate: new Date(),   // by default aaj ki date show hogi
  disableMobile: true        // same calendar on mobile
});



// Simple mapping (demo) - full Urdu mapping kaafi badi hogi

const mapping = {
  "sh": "ش",
  "kh": "خ",
  "gh": "غ",
  "ch": "چ",
  "th": "تھ",
  "ph": "پھ",
  "aa": "آ",
  "a": "ا",
  "b": "ب",
  "p": "پ",
  "t": "ت",
  "j": "ج",
  "k": "ک",
  "m": "م",
  "n": "ن",
  "r": "ر",
  "s": "س",
  "d": "د",
  "i": "ی",
  "e": "ے",
  "o": "و",
  "u": "و",
  "h": "ہ",
  "g": "گ",
  "f": "ف",
  "l": "ل",
  "y": "ی"
};

// sari Urdu input fields select karo
document.querySelectorAll(".urdufield").forEach(input => {
  input.addEventListener("keydown", function (e) {
    let key = e.key.toLowerCase();

    // Allow backspace, delete, arrows
    if (["backspace", "delete", "arrowleft", "arrowright"].includes(key)) {
      return;
    }

    // Agar mapping me hai
    if (mapping[key]) {
      e.preventDefault();
      this.value += mapping[key];
    } else {
      // Otherwise block kar do
      e.preventDefault();
    }
  });
});