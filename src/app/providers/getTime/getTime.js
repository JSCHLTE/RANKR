export function getTime() {
    const now = new Date();

    const options = {
      timeZone: "America/New_York",
      month: "numeric",
      day: "numeric",
      year: "numeric"
    };
    
    const easternDate = new Intl.DateTimeFormat("en-US", options).format(now);
    
    return(easternDate)
}
