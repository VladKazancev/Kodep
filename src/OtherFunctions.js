export function digitChecking(value) {
  var rep = /[-\/;":'a-zA-Zа-яА-Я]/;
  return rep.test(value) ? null : value;
}
