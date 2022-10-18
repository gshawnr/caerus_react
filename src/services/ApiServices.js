export const apiCall = async (url, method, bodyStr) => {
  const res = await fetch(url, {
    method,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("investmentsToken")}`,
      "Content-Type": "application/json",
    },
    body: bodyStr,
  });

  if (res.status !== 200) {
    throw Error(
      JSON.stringify({
        message: "fetch error",
        statusCode: res.status,
      })
    );
  }

  return await res.json();
};
