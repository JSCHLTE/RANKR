export const getStat = (type, low, mid) => {
    return `table-stat ${type <= low ? "red" : type <= mid ? "yellow" : "green"}`
}

export const getStatLow = (type, low, mid) => {
  return `table-stat ${type <= low ? "green" : type <= mid ? "yellow" : "red"}`
}