export default async function getJsonData() {
  const requestURL = "./json/users.json"
  const request = new Request(requestURL, {
  });
  const response = await fetch(request);
  const userData = response.json();
  console.log(userData);
  return userData;
}