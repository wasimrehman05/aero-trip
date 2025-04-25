// utils/formatCurrency.ts

/**
 * Formats a number as a currency string with no decimal places.
 *
 * @param amount - The numeric value to format.
 * @param currency - The ISO 4217 currency code (e.g., 'INR', 'USD').
 * @param locale - Optional locale string (default is 'en-IN').
 * @returns The formatted currency string.
 */
export function formatCurrency(
    amount: number,
    currency: string = "INR",
    locale: string = "en-IN"
): string {
    return new Intl.NumberFormat(locale, {
        style: "currency",
        currency,
        maximumFractionDigits: 0,
    }).format(amount);
}
