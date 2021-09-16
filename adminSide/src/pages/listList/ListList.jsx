import "./listList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";

import { ListContext } from "../../context/listContext/ListContext";
import { getLists, deleteList } from "../../context/listContext/apiCalls";

export default function ListList() {
  const { lists, dispatch } = useContext(ListContext);
  useEffect(() => {
    getLists(dispatch);
  }, [dispatch]);

  const handleDelete = (id) => {
    // setData(data.filter((item) => item.id !== id));
    deleteList(id, dispatch);
  };

  // console.log(movies);

  const columns = [
    {
      field: "_id",
      headerName: "ID",
      width: 180,
    },
    {
      field: "title",
      headerName: "List Title",
      width: 220,
      // renderCell: (params) => {
      //   return (
      //     <div className="productListItem">
      //       <img className="productListImg" src={params.row.image} alt="" />
      //       {params.row.title}
      //     </div>
      //   );
      // },
    },
    { field: "type", headerName: "Type", width: 120 },
    { field: "genre", headerName: "Genre", width: 120 },
    { field: "content", headerName: "Content", width: 120 },

    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link
              to={{ pathname: `/list/${params.row._id}`, list: params.row }}
            >
              <button className="productListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="productListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="productList">
      <DataGrid
        rows={lists}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        checkboxSelection
        getRowId={(r) => r._id}
      />
    </div>
  );
}
