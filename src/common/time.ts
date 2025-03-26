function getVietnamTimePeriod() {
    const hour = new Date().toLocaleString("en-US", { timeZone: "Asia/Ho_Chi_Minh", hour12: false }).split(", ")[1].split(":")[0];
    const hourInt = parseInt(hour, 10);
  
    if (hourInt >= 5 && hourInt < 12) {
      return "Morning";
    } else if (hourInt >= 12 && hourInt < 18) {
      return "Afternoon";
    } else {
      return "Night";
    }
  }
  
  export default getVietnamTimePeriod
