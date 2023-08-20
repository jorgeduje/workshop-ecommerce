import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, IconButton, TextField } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { db } from "../../../firebaseConfig";
import { deleteDoc, doc } from "firebase/firestore";
import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import ProductsForm from "./ProductsForm";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const ProductsList = ({ products, setIsChange }) => {
  const [open, setOpen] = useState(false);
  const [productSelected, setProductSelected] = useState(null);

  const deleteProduct = (id) => {
    deleteDoc(doc(db, "products", id));
    setIsChange(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = (product) => {
    setProductSelected(product);
    setOpen(true);
  };

  return (
    <div>
      <Button variant="contained" onClick={() => handleOpen(null)}>
        Agregar nuevo
      </Button>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">id</TableCell>
              <TableCell align="left">titulo</TableCell>
              <TableCell align="left">precio</TableCell>
              <TableCell align="left">stock</TableCell>
              <TableCell align="left">imagen</TableCell>
              <TableCell align="left">categoria</TableCell>
              <TableCell align="left">acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow
                key={product.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row" align="left">
                  {product.id}
                </TableCell>
                <TableCell component="th" scope="row" align="left">
                  {product.title}
                </TableCell>
                <TableCell component="th" scope="row" align="left">
                  {product.unit_price}
                </TableCell>
                <TableCell component="th" scope="row" align="left">
                  {product.stock}
                </TableCell>
                <TableCell component="th" scope="row" align="left">
                  <img
                    src={product.image}
                    alt=""
                    style={{ width: "80px", height: "80px" }}
                  />
                </TableCell>
                <TableCell component="th" scope="row" align="left">
                  {product.category}
                </TableCell>
                <TableCell component="th" scope="row" align="left">
                  <IconButton onClick={() => handleOpen(product)}>
                    <EditIcon color="primary" />
                  </IconButton>
                  <IconButton onClick={() => deleteProduct(product.id)}>
                    <DeleteForeverIcon color="primary" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <ProductsForm
            handleClose={handleClose}
            setIsChange={setIsChange}
            productSelected={productSelected}
            setProductSelected={setProductSelected}
          />
        </Box>
      </Modal>
    </div>
  );
};

export default ProductsList;
