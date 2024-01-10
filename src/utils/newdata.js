const today = new Date();

const year = today.getFullYear();
const month = (today.getMonth() + 1).toString().padStart(2, "0"); // Tambahkan 0 di depan jika bulan kurang dari 10
const day = today.getDate().toString().padStart(2, "0"); // Tambahkan 0 di depan jika hari kurang dari 10

export const recentDate = `${year}-${month}-${day}`;
