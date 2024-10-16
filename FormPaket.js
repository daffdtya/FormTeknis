import React, { useState } from "react";
import {
  Button,
  TextField,
  InputAdornment,
  Snackbar,
  IconButton,
  Typography,
} from "@mui/material";
import { doc, setDoc } from "firebase/firestore";
import DeleteIcon from "@mui/icons-material/Delete";
import PageContainer from "src/components/container/PageContainer";
import DashboardCard from "src/components/shared/DashboardCard";
import { db } from "../../config/firebase";
import { useNavigate } from "react-router-dom";

const formatCurrency = (value) => {
  if (!value) return "Rp. 0";
  const numberValue = value.replace(/[^0-9]/g, "");
  return `Rp. ${numberValue.replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;
};

const parseCurrency = (value) => {
  const numberValue = value.replace(/[^0-9]/g, "");
  return parseFloat(numberValue) || 0;
};

const FormPaket = () => {
  const [formData, setFormData] = useState({
    paket: "",
    opd: "",
    kodeTender: "",
    sumberDana: "",
    pagu: "",
    hps: "",
    "80hps": "",
    tglEvaluasi: "",
    kualifikasi: "",
    klasifikasi: "",
    peralatan: [{ name: "" }], // Tambahkan peralatan ke dalam formData
  });
  

  const [peralatan, setPeralatan] = useState([{ name: "" }]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e, index = null) => {
    const { name, value } = e.target;

    if (index !== null) {
      const updatedPeralatan = [...peralatan];
      updatedPeralatan[index] = { ...updatedPeralatan[index], [name]: value };
      setPeralatan(updatedPeralatan);
    } else {
      const updatedFormData = {
        ...formData,
        [name]: value,
      };

      if (name === "pagu" || name === "hps") {
        const parsedValue = parseCurrency(value);
        updatedFormData[name] = formatCurrency(value);

        if (name === "hps") {
          const calculated80Hps = (parsedValue * 0.8).toFixed(0);
          updatedFormData["80hps"] = formatCurrency(calculated80Hps);
        }
      }

      setFormData(updatedFormData);
    }
  };
  
  const handleAddField = () => {
    if (peralatan.length < 5) {
      setPeralatan([...peralatan, { name: "" }]);
    }
  };

  const handleRemoveField = (index) => {
    const updatedPeralatan = peralatan.filter((_, i) => i !== index);
    setPeralatan(updatedPeralatan);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const paketDocRef = doc(db, "formPaket", formData.paket);
      await setDoc(paketDocRef, {
        ...formData,
        peralatan: peralatan.map((item) => item.name), // Convert to array of names
      });
      console.log("Data saved successfully!");

      setFormData({
        paket: "",
        opd: "",
        kodeTender: "",
        sumberDana: "",
        pagu: "",
        hps: "",
        "80hps": "",
        tglEvaluasi: "",
        kualifikasi: "",
        klasifikasi: "",
      });
      setPeralatan([]); // Clear peralatan fields
      setOpenSnackbar(true);
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
    navigate("/ui/Paket");
  };

  return (
    <DashboardCard
      title="Form Pengisian Kertas Kerja"
      sx={{
        width: { xs: "100%", sm: "100%", md: "75%", lg: "60%" },
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      <PageContainer title="Form Paket" description="this is Form Paket">
        <form onSubmit={handleSubmit}>
          <TextField
            label="Nama Paket"
            name="paket"
            value={formData.paket}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Tanggal Evaluasi"
            name="tglEvaluasi"
            type="date"
            value={formData.tglEvaluasi}
            onChange={handleChange}
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="Nama OPD"
            name="opd"
            value={formData.opd}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Kode Tender"
            name="kodeTender"
            value={formData.kodeTender}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Sumber Dana"
            name="sumberDana"
            value={formData.sumberDana}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Pagu Anggaran"
            name="pagu"
            type="text"
            value={formData.pagu}
            onChange={handleChange}
            fullWidth
            margin="normal"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">Rp.</InputAdornment>
              ),
            }}
          />
          <TextField
            label="HPS"
            name="hps"
            type="text"
            value={formData.hps}
            onChange={handleChange}
            fullWidth
            margin="normal"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">Rp.</InputAdornment>
              ),
            }}
          />
          <TextField
            label="80 % HPS"
            name="80hps"
            type="text"
            value={formData["80hps"]}
            fullWidth
            margin="normal"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">Rp.</InputAdornment>
              ),
              readOnly: true,
            }}
          />
          <TextField
            label="Kualifikasi"
            name="kualifikasi"
            value={formData.kualifikasi}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Klasifikasi"
            name="klasifikasi"
            value={formData.klasifikasi}
            onChange={handleChange}
            fullWidth
            margin="normal"
            style={{ marginBottom: "40px" }}
          />

          <Typography variant="h6" component="div" gutterBottom>
            Daftar Peralatan
          </Typography>

          {peralatan.map((item, index) => (
            <div key={index} style={{ display: "flex", alignItems: "center" }}>
              <TextField
                label={`Daftar Peralatan ${index + 1}`}
                name="name"
                value={item.name}
                onChange={(e) => handleChange(e, index)}
                fullWidth
                margin="normal"
              />
              <IconButton
                aria-label="delete"
                onClick={() => handleRemoveField(index)}
                style={{ marginLeft: "10px" }}
              >
                <DeleteIcon />
              </IconButton>
            </div>
          ))}

          <Button
            variant="outlined"
            color="primary"
            onClick={handleAddField}
            style={{ marginTop: "20px", marginRight: "10px" }}
            disabled={peralatan.length >= 5}
          >
            + Tambah Field Peralatan
          </Button>

          <Button
            type="submit"
            variant="contained"
            color="primary"
            style={{ marginTop: "20px" }}
          >
            SIMPAN
          </Button>
        </form>
        <Snackbar
          open={openSnackbar}
          autoHideDuration={1000}
          onClose={handleCloseSnackbar}
          message="Data saved successfully!"
          anchorOrigin={{ vertical: "center", horizontal: "center" }}
        />
      </PageContainer>
    </DashboardCard>
  );
};

export default FormPaket;
