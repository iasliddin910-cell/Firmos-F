export function moneyUZS(amount: number) {
  const n = Math.round(amount);
  return new Intl.NumberFormat("uz-UZ").format(n) + " so'm";
}

export function pct(v: number) {
  return `${(v * 100).toFixed(1)}%`;
}

export function dt(iso: string) {
  const d = new Date(iso);
  return d.toLocaleString("uz-UZ");
}
