export const getHeight = (height) => {
    const feet = Math.floor(height / 12);
    const inches = height % 12;
    const calcHeight = `${feet}'${inches}"`

    if(Number.isNaN(inches) || Number.isNaN(feet)) return "N/A"

    return calcHeight;
  };