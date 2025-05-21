
// Output depends on local timezone, e.g., "5/20/2025, 3:15:11 PM"



export default function formatDate(dateString:string) {
    const isoString = dateString;
    const date = new Date(isoString);
    
    console.log(date.toLocaleString()); 

    return date.toLocaleString();
};