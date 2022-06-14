import { FaTrashAlt } from "react-icons/fa";
import { GoHome } from "react-icons/go";
import { FiEdit } from "react-icons/fi";
import { BiSearch } from "react-icons/bi";
import { BiMessageSquareAdd } from "react-icons/bi";
import Spinner from "react-bootstrap/Spinner";
const types = {
  comum: "info",
  importante: "warning",
  muito_importante: "danger",
};
const softTypes = {
  comum: "#c9ebff",
  importante: "#f9ffc9",
  muito_importante: "#ffc9c9",
};

export const Handdler = {
  getString: (data) => {
    return data.replace(/[^a-zA-Zs]/g, " ");
  },
  getTypeColor: (type) => {
    return types[type] || "info";
  },
  getSoftTypeColor: (type) => {
    return softTypes[type] || "#c9ebff";
  },
  getStatusColor: (status) => {
    return status === 200 ? "info" : "danger";
  },
  getTrashIcon: () => {
    return <FaTrashAlt />;
  },
  getHomeIcon: () => {
    return <GoHome />;
  },
  getEditIcon: () => {
    return <FiEdit />;
  },
  getSearchIcon: () => {
    return <BiSearch />;
  },
  getAddIcon: () => {
    return <BiMessageSquareAdd />;
  },
  getLoadingSpin: () => {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  },
};
