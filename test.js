// function solution(tinggi) {
//   for (let i = 0; i <= tinggi; i++) {
//     const space = " ".repeat(tinggi - i);
//       const star = "*".repeat(i)
//       console.log( star+space);
//   }
// }
// solution(5);

// function solutionRemove(kata) {
//   const array = kata.split("");
//   const uniqueArray = [...new Set(array)];
//   return uniqueArray;
// }
// const result = solutionRemove("imaginatioin");
// console.log(result);

// function solution(hargaProduk) {
//   const total = hargaProduk.reduce(
//     (accumulator, currentValue) => accumulator + currentValue,
//     0
//   );
//   let diskon;
//   if (total <= 200000) {
//     diskon = (5 / 100) * total;
//     const acumate = total - diskon;
//     return acumate;
//   } else if (total > 200000 && total <= 400000) {
//     diskon = (7 / 100) * total;
//     const acumate = total - diskon;
//     return acumate;
//   } else {
//     diskon = (10 / 100) * total;
//     const acumate = total - diskon;
//     return acumate;
//   }
// }
// const array = [2000, 50000, 200000];
// const result = solution(array);
// console.log(result);
// function solution(noAkun, nominal) {
//   const sameIdx = noAkun === nominal && noAkun - nominal;
//   console.log(sameIdx);
// }

function solution(hargaProduk) {
    const total = hargaProduk.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    );
    let diskon;
    if (total <= 200000) {
      diskon = (5 / 100) * total;
      const acumate = total - diskon;
      return acumate;
    } else if (total > 200000 && total <= 400000) {
      diskon = (7 / 100) * total;
      const acumate = total - diskon;
      return acumate;
    } else {
      diskon = (10 / 100) * total;
      const acumate = total - diskon;
      return acumate;
    }
  }
  const array = [2000, 50000, 200000];
  const result = solution(array);
  console.log(result);