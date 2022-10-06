export async function postApi(data) {
  try {
    const res = await fetch(data.url, data);
    return await res.json();
  } catch (err) {
    console.log("postApi error", err);
  }
}
