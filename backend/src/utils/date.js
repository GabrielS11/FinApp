/**
 * I created this function to get the date, so it will be easier since
 * we will be using the date a lot. Trying to simplify and make
 * Readable code for everyone
 */

export function getActualMonthYear() {
  const hoje = new Date();
  return {
    mes: hoje.getMonth() + 1,
    ano: hoje.getFullYear(),
  };
}
