import React, { useEffect, useState } from "react";
import "./Home.css";
import Table from "./Table";
import AddModal from "./AddModal";
import EditModal from "./EditModal";
import {
  calculateTableData,
  investmentFormatter,
} from "../services/CalculationService";
import { apiCall } from "../services/ApiServices";

function Home() {
  const [investments, setInvestments] = useState([]);
  const [refreshApp, setRefreshApp] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [fetchErrorMsg, setFetchErrorMsg] = useState(null);
  const [fetchErrorCode, setFetchErrorCode] = useState(null);
  const [addModal, setAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [editInv, setEditInv] = useState(null);

  useEffect(() => {
    const getInvestment = async () => {
      try {
        const items = await apiCall(
          `${process.env.REACT_APP_BASEURL}/investments`,
          "GET"
        );
        const updatedInv = await calculateTableData(items);

        setInvestments(updatedInv);
        setFetchErrorMsg(null);
        setFetchErrorCode(null);
        setIsLoaded(true);
        setRefreshApp(false);
      } catch (err) {
        console.log(JSON.stringify(err));
        const { message = "error fetching data", statusCode = 500 } =
          JSON.parse(err.message) || {};
        setFetchErrorMsg(message);
        setFetchErrorCode(statusCode);
        setIsLoaded(false);
        setRefreshApp(false);
      }
    };

    getInvestment();
  }, [refreshApp]);

  const handleAddBtn = (e) => {
    setAddModal(true);
  };

  const handleAddInvestment = async (inv) => {
    try {
      inv = investmentFormatter(inv);

      await apiCall(
        `${process.env.REACT_APP_BASEURL}/equities/add`,
        "POST",
        JSON.stringify(inv)
      );

      setAddModal(false);
      setRefreshApp(true);
    } catch (err) {
      console.log("error adding investment", err.status, err.message);
    }
  };

  const handleDeleteInvestment = async (inv) => {
    try {
      await apiCall(
        `${process.env.REACT_APP_BASEURL}/equities/remove`,
        "POST",
        JSON.stringify({ ticker: inv.ticker })
      );

      setOpenEditModal(false);
      setRefreshApp(true);
    } catch (err) {
      console.log("delete error: ", err);
    }
  };

  const handleEditInvestment = async (obj) => {
    try {
      setEditInv(obj);
      setOpenEditModal(true);
    } catch (err) {
      console.log("edit error", err);
    }
  };

  const submitEdit = async (obj) => {
    closeEditModal();
    obj = investmentFormatter(obj);

    await apiCall(
      `${process.env.REACT_APP_BASEURL}/equities/edit`,
      "PUT",
      JSON.stringify(obj)
    );

    setRefreshApp(true);
  };

  const closeAddModal = () => {
    setAddModal((prev) => {
      return !prev;
    });
  };

  const closeEditModal = () => {
    setOpenEditModal((prev) => {
      return !prev;
    });
  };

  return (
    <div className="Parent">
      {!isLoaded && !fetchErrorMsg ? (
        <h3> loading ... </h3>
      ) : fetchErrorMsg && fetchErrorCode === 401 ? (
        <h3>Session Expired. Please login again.</h3>
      ) : fetchErrorMsg ? (
        <h3>Error loading page. Please try back later.</h3>
      ) : (
        <div className="tableContainer">
          {addModal && (
            <AddModal
              closeModal={closeAddModal}
              addInv={handleAddInvestment}
            ></AddModal>
          )}
          {openEditModal && (
            <EditModal
              deleteInv={handleDeleteInvestment}
              onEdit={submitEdit}
              closeModal={closeEditModal}
            >
              {editInv}
            </EditModal>
          )}
          <Table handleRowClick={handleEditInvestment} data={investments} />
          <button onClick={handleAddBtn}>Add</button>
        </div>
      )}
    </div>
  );
}

export default Home;
