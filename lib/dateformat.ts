// Output depends on local timezone, e.g., "5/20/2025, 3:15:11 PM"
export default function formatDate(dateString: string) {
    const isoString = dateString;
    const date = new Date(isoString);
    return date.toLocaleString();
  }
  
// Returns date in "YYYY-MM-DD" format
export function formatDateYMD(dateString: string): string {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

/**
 * Calculates how many days are left until the given expiration date.
 * Accepts an ISO-formatted UTC date string (e.g., "2025-06-25T00:00:00.000Z").
 *
 * @param {string} expirationDateUTC - The expiration date in ISO 8601 UTC format.
 * @returns {string} A string indicating how many days are left, or if it has expired.
 */
export function daysLeftToExpiration(expirationDateUTC: string): string {
    const today = new Date();
    const expiration = new Date(expirationDateUTC);

    // Clear time components for an accurate day count
    today.setHours(0, 0, 0, 0);
    expiration.setHours(0, 0, 0, 0);

    const diffTime = expiration.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return 'Expired';
    if (diffDays === 0) return 'Expires today';

    return `${diffDays} day(s) left`;
}
/**
 * Converts a UTC date string to MM-DD-YYYY format.
 * 
 * @param utcString - A date string in UTC format (e.g., "2025-05-30T00:00:00Z").
 * @returns A string formatted as MM-DD-YYYY (e.g., "05-30-2025").
 */
export function formatUTCToMMDDYYYY(utcString: string): string {
    const date = new Date(utcString);
    const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are 0-based
    const day = String(date.getUTCDate()).padStart(2, '0');
    const year = date.getUTCFullYear();

    return `${month}-${day}-${year}`;
}

/**
 * Converts a UTC date string to MM-DD-YY format.
 * 
 * @param utcString - A date string in UTC format (e.g., "2025-05-30T00:00:00Z").
 * @returns A string formatted as MM-DD-YY (e.g., "05-30-25").
 */
export function formatUTCToMMDDYY(utcString: string): string {
    const date = new Date(utcString);
    const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are 0-based
    const day = String(date.getUTCDate()).padStart(2, '0');
    const year = date.getUTCFullYear().toString().slice(-2); 

    const hours = String(date.getUTCHours()).padStart(2, '0');
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');

    return `${month}-${day}-${year}`;
}


