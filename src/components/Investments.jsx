import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CircularIndeterminate from "./CircularIndeterminate";
import "./Investments.css";
import Table from "./Table";
import AddModal from "./AddModal";
import EditModal from "./EditModal";
import FormButton from "./FormButton";
import ErrorModal from "./ErrorModal";
import Portfolio from "../services/Portfolio";
import { investmentFormatter } from "../services/CalculationService";
import {
  getBackendApi,
  putBackendApi,
  postBackendApi,
} from "../services/ApiServices";

function Home() {
  const [investments, setInvestments] = useState([]);
  const [investmentTotals, setInvestmentTotals] = useState({});
  const [refreshApp, setRefreshApp] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [fetchErrorMsg, setFetchErrorMsg] = useState(null);
  const [fetchErrorCode, setFetchErrorCode] = useState(null);
  const [addModal, setAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [editInv, setEditInv] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const getInvestment = async () => {
      try {
        const data = await getBackendApi();
        const portfolio = new Portfolio(data);

        setInvestments(portfolio.updatedData);
        setInvestmentTotals({
          targetAllocation: portfolio.totalTargetAllocation,
          currentAllocation: portfolio.totalCurrentAllocation,
          value: portfolio.portfolioValue,
          market: "TOTAL",
        });

        setFetchErrorMsg(null);
        setFetchErrorCode(null);
        setIsLoaded(true);
        setRefreshApp(false);
      } catch (err) {
        const { message = "error fetching investment data", statusCode = 500 } =
          err;

        setFetchErrorMsg(message);
        setFetchErrorCode(statusCode);
        setIsLoaded(false);
        setRefreshApp(false);
      }
    };

    getInvestment();
  }, [refreshApp]);

  const handleAddInvestment = async (inv) => {
    try {
      inv = investmentFormatter(inv);

      await postBackendApi("equities/add", inv);

      setIsLoaded(false);
      setAddModal(false);
      setRefreshApp(true);
    } catch (err) {
      const { message = "error fetching investment data", statusCode = 500 } =
        err;

      setFetchErrorMsg(message);
      setFetchErrorCode(statusCode);
      setIsLoaded(false);
      setRefreshApp(false);
    }
  };

  const handleDeleteInvestment = async (inv) => {
    try {
      await postBackendApi("equities/remove", { ticker: inv.ticker });

      setOpenEditModal(false);
      setIsLoaded(false);
      setRefreshApp(true);
    } catch (err) {
      const { message = "error fetching investment data", statusCode = 500 } =
        err;

      setFetchErrorMsg(message);
      setFetchErrorCode(statusCode);
      setIsLoaded(false);
      setRefreshApp(false);
    }
  };

  const openEditInvestment = async (obj) => {
    try {
      setEditInv(obj);
      setOpenEditModal(true);
    } catch (err) {
      console.log("edit error", err);
    }
  };

  const submitEdit = async (obj) => {
    setOpenEditModal((prev) => !prev);
    // obj = investmentFormatter(obj);

    await putBackendApi("equities/edit", obj);

    setIsLoaded(false);
    setRefreshApp(true);
  };

  // set display message if error
  if (fetchErrorCode) {
    var displayMsg = "Oops something went wrong.  Please try back later";

    if (fetchErrorCode === 401)
      displayMsg = "Session Expired.  Please login again.";
    if (fetchErrorCode === 404)
      displayMsg = "Not found.  Please register or login.";
  }

  return (
    <div className="investment-container">
      {!isLoaded && !fetchErrorMsg ? (
        <CircularIndeterminate />
      ) : fetchErrorMsg ? (
        <ErrorModal
          closeErrorModal={() => navigate("/")}
          message={displayMsg}
        />
      ) : (
        <div className="tableContainer">
          {addModal && (
            <AddModal
              closeModal={() => setAddModal((prev) => !prev)}
              addInv={handleAddInvestment}
            ></AddModal>
          )}
          {openEditModal && (
            <EditModal
              deleteInv={handleDeleteInvestment}
              onEdit={submitEdit}
              closeModal={() => setOpenEditModal((prev) => !prev)}
            >
              {editInv}
            </EditModal>
          )}
          <Table
            handleRowClick={openEditInvestment}
            data={investments}
            totals={investmentTotals}
          />
          <FormButton btnClickHandler={() => setAddModal(true)} btnText="Add" />
        </div>
      )}
    </div>
  );
}

export default Home;
