export async function resetDefaults() {
  await b.clearPageData();
  location.reload();
}
