billing.js – початковий код (містить Common, Control та Stamp Coupling)
// Дефект 1 (Common Coupling): глобальна змінна стану
let GLOBAL_TAX_RATE = 0.20;

// Дефект 2 (Stamp Coupling): функція отримує повний об'єкт користувача замість рядка city
function calculateDeliveryCost(city, weightKg) {
  let baseRate = 110.0;
  if (city === "Ivano-Frankivsk") {
    baseRate = 50.0;
  } else if (city === "Kyiv") {
    baseRate = 80.0;
  }
  return baseRate + (weightKg * 15.0);
}

// Дефект 3 (Control Coupling): числовий прапорець modeFlag перемикає бізнес-логіку всередині
function processInvoice(amount, customerProfile, weightKg, modeFlag) {
    if (modeFlag === 1) {
        const delivery = calculateDeliveryCost(customerProfile, weightKg);
        const total = (amount * (1 + GLOBAL_TAX_RATE)) + delivery;
        return { status: "PROCESSED", total: Number(total.toFixed(2)) };
    } else if (modeFlag === 2) {
        GLOBAL_TAX_RATE = 0.0; // Небезпечна мутація глобальної змінної
        const total = amount + calculateDeliveryCost(customerProfile, weightKg);
        return { status: "TAX_EXEMPT", total: Number(total.toFixed(2)) };
    }
    return { status: "CANCELLED", total: 0.0 };
}

module.exports = { calculateDeliveryCost, processInvoice };
