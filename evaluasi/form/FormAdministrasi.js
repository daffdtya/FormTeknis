import React, { useState } from "react";
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  Grid,
  Typography,
  FormControl,
  TextField,
  InputAdornment,
} from "@mui/material";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import PageContainer from "src/components/container/PageContainer";
import DashboardCard from "src/components/shared/DashboardCard";
import { db } from "../../../../config/firebase";

const formatCurrency = (value) => {
  const numberValue = value.replace(/[^0-9]/g, "");
  return `${numberValue.replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;
};

// Parse currency string to number
const parseCurrency = (value) => {
  const numberValue = value.replace(/[^0-9]/g, "");
  return parseFloat(numberValue) || 0;
};

const FormAdministrasi = ({ formData, handleChange }) => {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const navigate = useNavigate();

  const handleBlur = (e) => {
    const { name, value } = e.target;
    if (name === "evaluasiAdministrasi.penawaran") {
      const parsedValue = parseCurrency(value);
      const formattedValue = formatCurrency(value);

      // Calculate 80% HPS
      const calculated80Hps = (parsedValue * 0.8).toFixed(0);
      const updatedFormData = {
        ...formData,
        evaluasiAdministrasi: {
          ...formData.evaluasiAdministrasi,
          penawaran: formattedValue,
          "80hps": formatCurrency(calculated80Hps),
        },
      };

      setFormData(updatedFormData);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const penyediaDocRef = doc(
        db,
        "Penyedia dan Evaluasi",
        formData.penyedia
      );
      await setDoc(
        penyediaDocRef,
        {
          evaluasiAdministrasi: formData, // Pastikan formData ini hanya mengandung data dari FormAdministrasi
        },
        { merge: true }
      );
      console.log("Data saved successfully!");
      setOpenSnackbar(true);
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  return (
    <DashboardCard
      title="Form Evaluasi Administrasi"
      width="1160px"
      height="auto"
    >
      <PageContainer
        title="Form Evaluasi Administrasi"
        description="this is Form Evaluasi Administrasi"
      >
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h6" component="div" gutterBottom>
                1. Surat Penawaran
              </Typography>
            </Grid>
            <Grid container item xs={12} spacing={1}>
              <Grid item xs={6}>
                <Typography
                  variant="body2"
                  style={{ fontSize: "14px", fontWeight: "bold" }}
                >
                  Jangka Waktu Berlakunya Harga Penawaran
                  <br />
                  (60 Hari semenjak batas akhir pemasukan dokumen penawaran)
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <FormControl component="fieldset">
                  <RadioGroup
                    name="suratPenawaran"
                    value={formData.evaluasiAdministrasi.suratPenawaran || ""}
                    onChange={handleChange}
                    row
                    style={{ marginLeft: "100px" }}
                  >
                    <FormControlLabel value="M" control={<Radio />} label="M" />
                    <FormControlLabel
                      value="TM"
                      control={<Radio />}
                      label="TM"
                    />
                    <FormControlLabel
                      value="TD"
                      control={<Radio />}
                      label="TD"
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h6" component="div" gutterBottom>
                2. Dokumen Penawaran Teknis
              </Typography>
            </Grid>
            {[
              {
                label: "a. Metode Pelaksanaan Pekerjaan",
                name: "metode",
              },
              {
                label: "b. Jangka Waktu Pelaksanaan Pekerjaan",
                name: "jangkaWaktu",
              },
              {
                label: "c. Peralatan Utama",
                name: "peralatan",
              },
              {
                label: "d. Personel Manajerial",
                name: "personel",
              },
              {
                label: "e. Bagian Pekerjaan yang Akan Disubkontrakkan",
                name: "subkontrak",
              },
              {
                label: "f. Dokumen RKK",
                name: "dokumenRKK",
              },
            ].map((item) => (
              <Grid container item xs={12} spacing={1} key={item.name}>
                <Grid item xs={6}>
                  <Typography
                    variant="body2"
                    style={{ fontSize: "14px", fontWeight: "bold" }}
                  >
                    {item.label}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <FormControl component="fieldset">
                    <RadioGroup
                      name={item.name}
                      value={formData.evaluasiAdministrasi[item.name] || ""}
                      onChange={handleChange}
                      row
                      style={{ marginLeft: "100px" }}
                    >
                      <FormControlLabel
                        value="M"
                        control={<Radio />}
                        label="M"
                      />
                      <FormControlLabel
                        value="TM"
                        control={<Radio />}
                        label="TM"
                      />
                      {item.name.includes("subkontrak") && (
                        <FormControlLabel
                          value="TD"
                          control={<Radio />}
                          label="TD"
                        />
                      )}
                    </RadioGroup>
                  </FormControl>
                </Grid>
              </Grid>
            ))}

            <Grid item xs={12}>
              <Typography variant="h6" component="div" gutterBottom>
                3. Jaminan Penawaran
              </Typography>
            </Grid>
            <Grid container item xs={12} spacing={1}>
              <Grid item xs={6}>
                <Typography
                  variant="body2"
                  style={{ fontSize: "14px", fontWeight: "bold" }}
                >
                  Jaminan Penawaran
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <FormControl component="fieldset">
                  <RadioGroup
                    name="jaminanPenawaran"
                    value={formData.evaluasiAdministrasi.jaminanPenawaran || ""}
                    onChange={handleChange}
                    row // gunakan row tanpa inline styling
                    style={{ marginLeft: "100px" }}
                  >
                    <FormControlLabel value="M" control={<Radio />} label="M" />
                    <FormControlLabel
                      value="TM"
                      control={<Radio />}
                      label="TM"
                    />
                    <FormControlLabel
                      value="TD"
                      control={<Radio />}
                      label="TD"
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h6" component="div" gutterBottom>
                4. Dokumen Penawaran Harga
              </Typography>
            </Grid>
            <Grid container item xs={12} spacing={1}>
              <Grid item xs={3}>
                <Typography
                  variant="body2"
                  style={{ fontSize: "14px", fontWeight: "bold" }}
                >
                  Dokumen Penawaran Harga
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <TextField
                  label="Penawaran"
                  name="penawaran"
                  value={formData.penawaran}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                  InputLabelProps={{ shrink: true }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">Rp.</InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Grid item xs={4}>
                <FormControl component="fieldset">
                  <RadioGroup
                    name="dokumenHarga"
                    value={formData.evaluasiAdministrasi.dokumenHarga || ""}
                    onChange={handleChange}
                    row
                    style={{ marginLeft: "10px" }}
                  >
                    <FormControlLabel value="M" control={<Radio />} label="M" />
                    <FormControlLabel
                      value="TM"
                      control={<Radio />}
                      label="TM"
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </PageContainer>
    </DashboardCard>
  );
};

export default FormAdministrasi;
