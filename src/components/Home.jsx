import React, { useEffect, useState } from "react";
import "./Home.css";
import Table from "./Table";
import AddModal from "./AddModal";
import EditModal from "./EditModal";
import Modal from "./Modal";
import { calculateTableData } from "../services/CalculationService";

function Home() {
  const [investments, setInvestments] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [fetchErrorMsg, setFetchErrorMsg] = useState(null);
  const [fetchErrorCode, setFetchErrorCode] = useState(null);
  const [addModal, setAddModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [editInv, setEditInv] = useState(null);

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

        const updatedInv = calculateTableData(items);
        setInvestments(updatedInv);
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

  const handleAdd = (e) => {
    e.preventDefault();
    setAddModal(true);
  };

  const handleEdit = (obj) => {
    setEditInv(obj);
    setEditModal(true);
  };

  const closeAddModal = () => {
    setAddModal((prev) => {
      return !prev;
    });
  };

  const closeEditModal = () => {
    setEditModal((prev) => {
      return !prev;
    });
  };

  return (
    <div>
      {!isLoaded && !fetchErrorMsg ? (
        <h3> loading ... </h3>
      ) : fetchErrorMsg && fetchErrorCode === 401 ? (
        <h3>Session Expired. Please login again.</h3>
      ) : fetchErrorMsg ? (
        <h3>Error loading page. Please try back later.</h3>
      ) : (
        <div className="tableContainer">
          {addModal && <AddModal closeModal={closeAddModal}></AddModal>}
          {editModal && (
            <EditModal closeModal={closeEditModal}>{editInv}</EditModal>
          )}
          <Table handleRowClick={handleEdit} data={investments} />
          <button onClick={handleAdd}>Add</button>
        </div>
      )}
    </div>
  );
}

export default Home;
