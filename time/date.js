class Date {
    constructor() {
      this.timestamp = new Date();
    }
  
    getFormattedDate() {
      return this.timestamp.toLocaleString();
    }
  }
  
  // Example usage
  const myDate = new Date();
  const formattedDate = myDate.getFormattedDate();
  console.log("Current timestamp:", formattedDate);
  