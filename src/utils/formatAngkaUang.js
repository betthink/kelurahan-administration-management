export function formatAngka(angka) {
  // Mengubah angka menjadi string untuk mempermudah manipulasi
  let angkaString = angka.toString();

  // Menambahkan titik setiap 3 karakter dari belakang
  let formattedAngka = "";
  for (let i = angkaString.length - 1, j = 1; i >= 0; i--, j++) {
    formattedAngka = angkaString[i] + formattedAngka;
    // Menambahkan titik setiap 3 karakter
    if (j % 3 === 0 && i !== 0) {
      formattedAngka = "." + formattedAngka;
    }
  }

  return formattedAngka;
}
