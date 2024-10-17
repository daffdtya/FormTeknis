import React, { useEffect,useState } from "react";
import {
  Button,
  TextField,
  InputAdornment,
  Snackbar,
  IconButton,
  Typography,
  Grid,
} from "@mui/material";
import { doc, setDoc } from "firebase/firestore";
import DeleteIcon from "@mui/icons-material/Delete";
import PageContainer from "src/components/container/PageContainer";
import DashboardCard from "src/components/shared/DashboardCard";
import { db } from "../../config/firebase";
import { useNavigate } from "react-router-dom";
import { collection, query, where, getDocs } from 'firebase/firestore';
import { useParams } from 'react-router-dom';

const formatCurrency = (value) => {
  if (!value) return "Rp. 0";
  const numberValue = value.replace(/[^0-9]/g, "");
  return `${numberValue.replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;
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
    peralatan: [{ name: "" }],
  });

  const { paketId } = useParams(); // Mendapatkan ID paket dari URL
  const [penyediaList, setPenyediaList] = useState([]);
  const [peralatan, setPeralatan] = useState([{ name: "" }]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPenyedia = async () => {
      try {
        const penyediaRef = collection(db, 'Penyedia'); // Ganti dengan koleksi penyedia Anda
        const q = query(penyediaRef, where('paketId', '==', paketId)); // Filter berdasarkan paketId
        const querySnapshot = await getDocs(q);
        
        const penyediaData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setPenyediaList(penyediaData);
      } catch (error) {
        console.error('Error fetching penyedia:', error);
      }
    };

    fetchPenyedia();
  }, [paketId]);

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
        peralatan: peralatan.map((item) => item.name),
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
      setPeralatan([]);
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
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Nama Paket"
                name="paket"
                value={formData.paket}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Tanggal Evaluasi"
                name="tglEvaluasi"
                type="date"
                value={formData.tglEvaluasi}
                onChange={handleChange}
                fullWidth
                InputLabelProps={{ shrink: true }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Nama OPD"
                name="opd"
                value={formData.opd}
                onChange={handleChange}
                fullWidth
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Kode Tender"
                name="kodeTender"
                value={formData.kodeTender}
                onChange={handleChange}
                fullWidth
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Sumber Dana"
                name="sumberDana"
                value={formData.sumberDana}
                onChange={handleChange}
                fullWidth
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Pagu Anggaran"
                name="pagu"
                type="text"
                value={formData.pagu}
                onChange={handleChange}
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">Rp.</InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="HPS"
                name="hps"
                type="text"
                value={formData.hps}
                onChange={handleChange}
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">Rp.</InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="80 % HPS"
                name="80hps"
                type="text"
                value={formData["80hps"]}
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">Rp.</InputAdornment>
                  ),
                  readOnly: true,
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Kualifikasi"
                name="kualifikasi"
                value={formData.kualifikasi}
                onChange={handleChange}
                fullWidth
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Klasifikasi"
                name="klasifikasi"
                value={formData.klasifikasi}
                onChange={handleChange}
                fullWidth
              />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Daftar Peralatan
              </Typography>

              {peralatan.map((item, index) => (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginTop: index > 0 ? "20px" : "0px",
                  }}
                >
                  <TextField
                    placeholder={`Daftar Peralatan ${index + 1}`}
                    name="name"
                    value={item.name}
                    onChange={(e) => handleChange(e, index)}
                    fullWidth
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
            </Grid>

            <Grid item xs={12}>
              <Button
                variant="outlined"
                color="primary"
                onClick={handleAddField}
                disabled={peralatan.length >= 5}
              >
                + Tambah Field Peralatan
              </Button>
            </Grid>

            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                SIMPAN
              </Button>
            </Grid>
          </Grid>
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
