import { useEffect, useState } from "react";
import "./App.css";
const BASE_URL =
  "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json";
function App() {
  const ITEM_PER_PAGE = 10;
  const [employeeArray, setEmployeeArray] = useState([]);
  const [perPageData, setPerPageData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const getEmployeeData = async () => {
    try {
      const employeeResponse = await fetch(BASE_URL);
      const employeeResponseJson = await employeeResponse.json();
      setEmployeeArray(employeeResponseJson);
      setPerPageData(employeeResponseJson.slice(0, 10));
    } catch (err) {
      console.log(err, "failed to fetch data");
      window.alert("failed to fetch data");
    }
  };
  const handleClick = (direction) => {
    setTotalPages(Math.ceil(employeeArray.length / ITEM_PER_PAGE));
    if (direction === "next" && currentPage < totalPages) {
      const nextPage = currentPage + 1;
      const startIndex = (nextPage - 1) * ITEM_PER_PAGE;
      const endIndex = startIndex + ITEM_PER_PAGE;
      setPerPageData(employeeArray.slice(startIndex, endIndex));
      setCurrentPage(nextPage);
    }
    if (direction === "previous" && currentPage > 1) {
      const nextPage = currentPage - 1;
      const startIndex = (nextPage - 1) * ITEM_PER_PAGE;
      const endIndex = startIndex + ITEM_PER_PAGE;
      setPerPageData(employeeArray.slice(startIndex, endIndex));
      setCurrentPage(nextPage);
    }
  };
  useEffect(() => {
    getEmployeeData();
  }, []);
  return (
    <>
      <h1 className="heading">Employee Data Table</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {perPageData?.map((item, index) => {
            return (
              <tr key={index}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.role}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="pagination">
        <button
          className="btn"
          // disabled={currentPage === 1}
          onClick={() => handleClick("previous")}
        >
          Previous
        </button>
        <span className="current-page">{currentPage}</span>
        <button
          className="btn"
          // disabled={totalPages === currentPage}
          onClick={() => handleClick("next")}
        >
          Next
        </button>
      </div>
    </>
  );
}

export default App;
