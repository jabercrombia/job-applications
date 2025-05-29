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
  