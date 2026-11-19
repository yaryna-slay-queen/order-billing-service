// Дефект 2 (Stamp Coupling): функція отримує повний об'єкт користувача замість рядка city
function calculateDeliveryCost(city, weightKg) {
    const baseRate = city === "Ivano-Frankivsk" ? 50.0 : 110.0;
    return baseRate + (weightKg * 15.0);
}

// Дефект 3 (Control Coupling): числовий прапорець modeFlag перемикає бізнес-логіку всередині
function processStandardInvoice(amount, city, weightKg, modeFlag, taxRate = 0.20) {
        const delivery = calculateDeliveryCost(city, weightKg);
        const total = (amount * (1 + taxRate)) + delivery;
        return { status: "PROCESSED", total: Number(total.toFixed(2)) };

function processTaxExemptInvoice(amount, city, weightKg) {
        const delivery = calculateDeliveryCost(city, weightKg);
        const total = amount + delivery;
        return { status: "TAX_EXEMPT", total: Number(total.toFixed(2)) };

function cancelInvoice() {
    return { status: "CANCELLED", total: 0.0 };
}

module.exports = { calculateDeliveryCost, processStandardInvoice, processTaxExemptInvoice, cancelInvoice };
