import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Grid } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import React, { useMemo } from "react";
import DataTable from "react-data-table-component";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../../hooks/useToast";
import { DELETED, DELETE_TASK } from "../../../utils/Constant";
import FilterComponent from "../../../Components/Common/FilteredComponents/FilterComponent";
import { taskAsync } from "../taskStore/taskSlice";

const TaskTable = ({ data, onClickDelete, onClickSend, index }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fire = useToast();

  const [filterText, setFilterText] = React.useState("");
  const [resetPaginationToggle, setResetPaginationToggle] =
    React.useState(false);

  const filteredItems = data.filter((item) =>
    JSON.stringify(item).toLowerCase().includes(filterText.toLowerCase())
  );

  const subHeaderComponentMemo = React.useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText("");
      }
    };

    return (
      <FilterComponent
        onFilter={(e) => setFilterText(e.target.value)}
        onClear={handleClear}
        filterText={filterText}
      />
    );
  }, [filterText, resetPaginationToggle]);
  const handleDelete = (row) => {
    console.log("row is", row);
    fetch("http://localhost:8000/tasks/" + row.id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        console.log("res is", res);
        fire(DELETE_TASK, DELETED);
        //Recalling the data from server
        dispatch(taskAsync()).unwrap();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handelDetails = (row) => {
    console.log("row is", row);
    navigate(`/update-task/${row}`);
  };

  let UserColumns = useMemo(() => [
    {
      name: "Sl No.",
      sortable: true,

      selector: "slNo",
      cell: (row, index) => <p>{index + 1}</p>,
    },
    {
      name: "Title",
      sortable: true,

      selector: "title",
      cell: (row) => (
        <Box onClick={() => handelDetails(row.id)} sx={{ cursor: "pointer" }}>
          {row?.title}
        </Box>
      ),
    },
    {
      name: "Description",
      sortable: true,

      selector: "description",
      cell: (row) => <p>{row.description}</p>,
    },
    {
      name: "Creation Date",
      sortable: true,

      selector: "createdAt",
      cell: (row) => <p>{row.createdAt}</p>,
    },
    {
      name: "Assigned To.",
      sortable: true,

      selector: "assignedTo",
      cell: (row) => <p>{row.assignedTo}</p>,
    },
    {
      name: "Action",
      sortable: true,

      selector: "action",
      cell: (row) => (
        <Box>
          <IconButton onClick={() => handleDelete(row)}>
            <DeleteIcon />
          </IconButton>
        </Box>
      ),
    },
  ]);

  return (
    <Grid>
      <DataTable
        columns={UserColumns}
        data={filteredItems}
        pagination
        paginationResetDefaultPage={resetPaginationToggle}
        subHeader
        subHeaderComponent={subHeaderComponentMemo}
        striped={true}
        center={true}
        responsive={true}
      />
    </Grid>
  );
};

export default TaskTable;
