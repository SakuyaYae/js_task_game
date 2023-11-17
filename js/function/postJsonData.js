export default async function postJsonData(data) {
  const requestURL = "./json/users.json"
  const request = new Request(requestURL, {
    method: "POST",
    headers: { "Content-type": "appliction-json" },
    body: JSON.stringify(data)
  });
  const response = await fetch(request);
  console.log(response);
  return response;
}