import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./Nav.css";

function Nav() {
  const [activePath, setActivePath] = useState("");
  let location = useLocation();

  useEffect(() => {
    const { pathname = null } = location;
    setActivePath(pathname);
  }, [location]);

  const links = [
    { name: "Home", path: "/" },
    { name: "Investments", path: "/investments" },
    { name: "Login", path: "/login" },
    { name: "Register", path: "/register" },
  ];

  return (
    <nav>
      {links.map((thisLink) => (
        <a
          key={thisLink.name}
          className={activePath === thisLink.path ? "active-link" : ""}
          href={thisLink.path}
        >
          {thisLink.name}
        </a>
      ))}
    </nav>
  );
}

export default Nav;
