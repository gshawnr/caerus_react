import React, { useState } from "react";

import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import EmailIcon from "@mui/icons-material/Email";
import WebIcon from "@mui/icons-material/Web";

import "./Home.css";

const Home = () => {
  const [moreHow, showMoreHow] = useState(false);
  const [moreLimits, showMoreLimits] = useState(false);

  return (
    <div className="home-container">
      <section className="home-section">
        <div className="home-intro">
          <p>
            <span style={{ fontSize: 19, fontWeight: "bold" }}>
              Please note{" "}
            </span>{" "}
            this website is a work in progress. It was designed as a tool to
            facilitate rebalancing an investment portfolio. It replaces the
            manual process of looking up security prices and updating data
            tables to calculate the allocation of each investment. Due to limits
            on the free tier used for fetching investment price data, this site
            is currently only for demo purposes.
          </p>
        </div>
        <div className="home-intro">
          <p>
            <span style={{ fontSize: 19, fontWeight: "bold" }}>In order</span>{" "}
            to use the application you will first need to register a user. Once
            registered, you can add investments to your portfiolio and set
            target allocations. The Investments page provides a table that is
            used to add, edit, and delete investments. The primary function of
            the app is to fetch real-time price data and calculate the amount of
            each investment to be purchased or sold to maintain your target{" "}
            {!moreHow && (
              <span
                style={{ fontWeight: "bold", cursor: "pointer" }}
                onClick={() => showMoreHow(true)}
              >
                ... more
              </span>
            )}
            {moreHow && (
              <span>
                allocation. I have created a demo user that can be used to sign
                in and explore the app: Username=demoUser, Password=demoPass.
                Once on the main table, you are able to delete, edit or add new
                investments. The price data for each investment is updated
                periodically.{" "}
              </span>
            )}
          </p>
        </div>
        <div className="home-intro">
          <p>
            <span style={{ fontSize: 19, fontWeight: "bold" }}>
              Restrictions imposed
            </span>{" "}
            by the API provider where price data is being fetched. These limits
            currently include: o Only 100 fetches per month No intraday price
            fetches previous day close is the most recent. Given the API limits,
            no new investments can be added once the 100 fetch limit is reached
            each month. Additionally, I have disabled the automatic price
            updates in the database. As this{" "}
            {!moreLimits && (
              <span
                style={{ cursor: "pointer", fontWeight: "bold" }}
                onClick={() => showMoreLimits(true)}
              >
                ... more
              </span>
            )}{" "}
            {moreLimits && (
              <span>
                app is a work in progress, other ongoing issues include: Error
                handling proper UX handling to be implemented Currency
                considerations current all dollar values are based on raw data
                provide by the exchange ie TSX data is in CAD whereas NYSE is
                USD o The input ticker symbol when adding new assets must match
                that of the providing API. For example US data requires no
                extension AAPL (apple) or MSFT (Microsoft). However, BMO (on the
                TSX) is BMO.XTSE.
              </span>
            )}
          </p>
        </div>
      </section>
      <section className="home-details">
        <div className="details-frontend">
          <h1>Client-Side App</h1>
          <p>
            This app was built using express on the backend for the APIs with a
            MongoDB, and a React client to access the APIs. Some of the key
            components include: o Authentication using bcrypt User session use
            JWTs RESTful CRUD apis Custom CSS Responsive web app (in progress)
          </p>
        </div>
        <div className="details-frontend">
          <h1>Server-Side App</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Id
            assumenda dicta, amet consequatur aperiam, ipsa omnis, asperiores
            suscipit labore corrupti iusto quisquam! Ex voluptas odio quo
            accusantium repellat consequuntur, amet unde impedit facere
          </p>
        </div>
      </section>
      <section className="home-contact">
        <a href="https://www.linkedin.com/in/shawn-richardson-3132bbb/">
          <LinkedInIcon sx={{ fontSize: 70, color: "#eaeaea" }} />
        </a>
        <a href="https://www.github.com/gshawnr">
          <GitHubIcon sx={{ color: "#eaeae", fontSize: 70 }} />
        </a>
        <a href="mailto:gshawnr@gmail.com">
          <EmailIcon sx={{ fontSize: 70, color: "#eaeaea" }} />
        </a>
        <a href="http://www.gsrdev.com">
          <WebIcon sx={{ fontSize: 70, color: "#eaeaea" }} />
        </a>
      </section>
    </div>
  );
};

export default Home;
