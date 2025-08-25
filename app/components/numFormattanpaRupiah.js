export default function numFormattanpaRupiah(angka) {
  let data = angka;//Math.floor(angka);
  if (!data) {
    data = 0;
  }
  return data.toString().replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
}
