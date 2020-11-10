export function digitChecking(value) {
  var rep = /[-\/;":'a-zA-Zа-яА-Я ]/;
  return rep.test(value) ? null : value;
}

export function changeInputHelper (firstCurrentValue, secondCurrentValue, targetValue){
  firstCurrentValue.value = сalculating(targetValue, secondCurrentValue.rate,
    firstCurrentValue.rate);
  secondCurrentValue.value = targetValue;
}

export function changeListHelper (сurrentValue, currentRate, targetValue, addition){
  сurrentValue.tag = targetValue;
  сurrentValue.rate = currentRate;
  сurrentValue.value = typeof addition !== 'undefined' ? сalculating(addition.value,
    addition.rate, currentRate) : сurrentValue.value;
}

export function сalculating (first, second, third){
  const calculatedValue = first * second / third;
  return isNaN(calculatedValue) ? '' : Number(calculatedValue.toFixed(3));
}
