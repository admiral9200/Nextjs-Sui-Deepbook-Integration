function formatSui(amount: string): string {
    const amountNum = parseInt(amount) / 1_000_000_000;
    return `$${amountNum.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function formatPrice(price: string): string {
    const priceNum = parseInt(price) / 1_000_000_000;
    return priceNum.toFixed(2);
}

export { formatSui, formatPrice };
