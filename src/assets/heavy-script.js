// Simula bloqueio de thread principal (main thread) com cálculo pesado
console.time("heavyCalculation");

function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

// Cálculo propositalmente custoso
const result = fibonacci(43); // ⚠️ Leva vários segundos para completar

console.timeEnd("heavyCalculation");
console.log("Resultado do cálculo pesado:", result);
