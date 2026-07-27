export async function resetDefaults(_, __, ___) {
  s.data = defaults;
  await s.save();
  location.reload();
}
