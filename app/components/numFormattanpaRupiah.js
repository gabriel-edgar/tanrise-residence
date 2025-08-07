export default function numFormattanpaRupiah(angka) {
  const data = angka;//Math.floor(angka);
  if (data == null) {
    data = 0;
  }
  return data.toString().replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
}
