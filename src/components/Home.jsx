import React, { useEffect, useState } from "react";
import Login from "./Login";

function Home() {
  const [investments, setInvestments] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [fetchErrorMsg, setFetchErrorMsg] = useState(null);
  const [fetchErrorCode, setFetchErrorCode] = useState(null);

  useEffect(() => {
    const getInvestment = async () => {
      try {
        const res = await fetch("http://localhost:5000/investments", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("investmentsToken")}`,
            "Content-Type": "application/json",
          },
        });

        if (res.status !== 200) {
          throw Error(
            JSON.stringify({
              message: "fetch error",
              statusCode: res.status,
            })
          );
        }

        const items = await res.json();
        setInvestments(items);
        setFetchErrorMsg(null);
        setFetchErrorCode(null);
        setIsLoaded(true);
      } catch (err) {
        const { message = "error fetching data", statusCode = 500 } =
          JSON.parse(err.message) || {};
        setFetchErrorMsg(message);
        setFetchErrorCode(statusCode);
        setIsLoaded(false);
      }
    };

    getInvestment();
  }, []);

  return (
    <div>
      {!isLoaded && !fetchErrorMsg ? (
        <h3> loading ... </h3>
      ) : fetchErrorMsg && fetchErrorCode === 401 ? (
        <h3>Session Expired. Please login again.</h3>
      ) : fetchErrorMsg ? (
        <h3>Error loading page. Please try back later.</h3>
      ) : (
        <ul>
          {investments.map((inv) => {
            return (
              <p key={inv._id}>
                ticker: {inv.ticker} | price: {inv.unitPrice} | units:{" "}
                {inv.units} | market: {inv.market} | value:{" "}
                {inv.unitPrice * inv.units}
              </p>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default Home;
