import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CircularIndeterminate from "./CircularIndeterminate";
import "./Investments.css";
import Table from "./Table";
import AddModal from "./AddModal";
import EditModal from "./EditModal";
import FormButton from "./FormButton";
import ErrorModal from "./ErrorModal";
import {
  calculateTableData,
  investmentFormatter,
} from "../services/CalculationService";
import { apiCall } from "../services/ApiServices";
import { Navigate } from "react-router-dom";

const delay = async (ms) =>
  new Promise((res, rej) => {
    setTimeout(() => {
      res();
    }, ms);
  });

function Home() {
  const [investments, setInvestments] = useState([]);
  const [refreshApp, setRefreshApp] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [fetchErrorMsg, setFetchErrorMsg] = useState(null);
  const [fetchErrorCode, setFetchErrorCode] = useState(null);
  const [addModal, setAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openErrorModal, setOpenErrorModal] = useState(false);
  const [editInv, setEditInv] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const getInvestment = async () => {
      try {
        // add min delay to clearly show loading and improve UX
        const [delayResponse, items] = await Promise.all([
          delay(700),
          apiCall(`${process.env.REACT_APP_BE_BASEURL}/investments`, "GET"),
        ]);

        const { portfolioValue, dataArr } = calculateTableData(items);

        setInvestments(dataArr);
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
        `${process.env.REACT_APP_BE_BASEURL}/equities/add`,
        "POST",
        JSON.stringify(inv)
      );

      setIsLoaded(false);
      setAddModal(false);
      setRefreshApp(true);
    } catch (err) {
      console.log("error adding investment", err.status, err.message);
    }
  };

  const handleDeleteInvestment = async (inv) => {
    try {
      await apiCall(
        `${process.env.REACT_APP_BE_BASEURL}/equities/remove`,
        "POST",
        JSON.stringify({ ticker: inv.ticker })
      );

      setOpenEditModal(false);
      setIsLoaded(false);
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
      `${process.env.REACT_APP_BE_BASEURL}/equities/edit`,
      "PUT",
      JSON.stringify(obj)
    );

    setIsLoaded(false);
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

  const toggleErrorModal = () => {
    navigate("/");
  };

  return (
    <div className="Parent">
      {!isLoaded && !fetchErrorMsg ? (
        <CircularIndeterminate />
      ) : fetchErrorMsg && fetchErrorCode === 401 ? (
        <ErrorModal
          closeErrorModal={toggleErrorModal}
          message="Session Expired.  Please login again."
        />
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
          <FormButton btnClickHandler={handleAddBtn} btnText="Add" />
        </div>
      )}
    </div>
  );
}

export default Home;
