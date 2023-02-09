export async function fetcher(url, options = {}) {
  try {
    let response;
    if (!options) {
      response = await fetch(url);
    } else {
      response = await fetch(url, options);
    }
    const data = await response.json();
    return data;
  } catch (e) {
    console.log(e);
  }
}
