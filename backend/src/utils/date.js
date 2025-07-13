export function getActualMonthYear() {
  const hoje = new Date();
  return {
    mes: hoje.getMonth() + 1,
    ano: hoje.getFullYear(),
  };
}
