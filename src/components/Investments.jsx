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
import {
  getBackendApi,
  putBackendApi,
  postBackendApi,
} from "../services/ApiServices";

function Home() {
  const [investments, setInvestments] = useState([]);
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
        const { dataArr } = calculateTableData(data);

        setInvestments(dataArr);
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

  const handleAddBtn = (e) => {
    setAddModal(true);
  };

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
    closeEditModal();
    obj = investmentFormatter(obj);

    await putBackendApi("equities/edit", obj);

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
        <ErrorModal closeErrorModal={toggleErrorModal} message={displayMsg} />
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
          <Table handleRowClick={openEditInvestment} data={investments} />
          <FormButton btnClickHandler={handleAddBtn} btnText="Add" />
        </div>
      )}
    </div>
  );
}

export default Home;
