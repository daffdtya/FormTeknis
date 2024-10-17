import React, { useState, useEffect } from "react";
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  Snackbar,
  Grid,
  Typography,
  FormControl,
  TextField,
} from "@mui/material";
import { doc, setDoc, getDoc } from "firebase/firestore";
import PageContainer from "src/components/container/PageContainer";
import DashboardCard from "src/components/shared/DashboardCard";
import { db } from "../../../../config/firebase";

const FormTeknis = ({ paketId, formData, handleChange }) => {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [peralatan, setPeralatan] = useState([
    { name: "", description: "", quantity: "" },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Gunakan Firestore reference untuk dokumen spesifik berdasarkan 'formData.paket'
        const paketNama = formData.paket; // Pastikan ini adalah input dinamis, bukan hardcoded
        if (!paketNama) {
          console.error("Paket tidak ditemukan di formData.");
          return;
        }

        const docRef = doc(db, "formPaket", paketNama); // Menggunakan 'paketNama' yang dinamis
        const docSnap = await getDoc(docRef);

        console.log("Data exists: ", docSnap.exists());
        console.log("Data paket: ", docSnap.data());

        if (docSnap.exists()) {
          const data = docSnap.data();

          // Mengambil data peralatan dari Firestore dan menyetelnya ke state
          if (Array.isArray(data.peralatan)) {
            setPeralatan(data.peralatan); // Menyimpan array peralatan dari Firestore ke state
          } else {
            console.log("Peralatan tidak ditemukan di dokumen.");
          }
        } else {
          console.log("Dokumen tidak ditemukan!");
        }
      } catch (error) {
        console.error("Error fetching document:", error);
      }
    };

    // Pastikan formData.paket sudah di-set sebelum fetchData
    if (formData.paket) {
      fetchData();
    }
  }, [formData.paket]); // Memastikan useEffect dipicu ulang saat 'paket' berubah

  const handlePeralatanChange = (e, index) => {
    const { name, value } = e.target;
    const updatedPeralatan = [...peralatan];
    updatedPeralatan[index] = { ...updatedPeralatan[index], [name]: value };
    setPeralatan(updatedPeralatan);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const penyediaDocRef = doc(db, "Penyedia dan Evaluasi", paketId);
      await setDoc(
        penyediaDocRef,
        {
          evaluasiTeknis: {
            ...formData.evaluasiTeknis,
            peralatan: peralatan, // Simpan data peralatan ke Firestore
          },
        },
        { merge: true }
      );
      console.log("Data disimpan dengan sukses!");
      setOpenSnackbar(true);
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <DashboardCard title="Form Evaluasi Teknis" width="1160px" height="auto">
      <PageContainer
        title="Form Evaluasi Teknis"
        description="Form Evaluasi Teknis"
      >
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {/* Judul 1 */}
            <Grid item xs={12}>
              <Typography variant="h6" component="div" gutterBottom>
                Peralatan yang Dibutuhkan:
              </Typography>
            </Grid>
            {peralatan.length > 0 ? (
              peralatan.map((peralatanItem, index) => (
                <Grid container item xs={12} spacing={1} key={index}>
                  <Grid item xs={4}>
                    <Typography
                      variant="body2"
                      style={{ fontSize: "14px", fontWeight: "bold" }}
                    >
                      Nama Peralatan
                    </Typography>
                    <TextField
                      name={`peralatan-${index}`} // Nama berdasarkan indeks
                      value={peralatanItem || ""} // Mengakses item array langsung
                      onChange={(e) => handlePeralatanChange(e, index)} // Menangani perubahan input
                      variant="outlined"
                      fullWidth
                      placeholder="Masukkan Nama Peralatan"
                    />
                  </Grid>

                  <Grid item xs={4}>
                    <Typography
                      variant="body2"
                      style={{ fontSize: "14px", fontWeight: "bold" }}
                    >
                      Deskripsi Peralatan
                    </Typography>
                    <TextField
                      name="description"
                      value={peralatanItem.description || ""}
                      onChange={(e) => handlePeralatanChange(e, index)}
                      variant="outlined"
                      fullWidth
                      placeholder="Masukkan Deskripsi" // Add placeholder for description
                    />
                  </Grid>

                  <Grid item xs={4}>
                    <Typography
                      variant="body2"
                      style={{ fontSize: "14px", fontWeight: "bold" }}
                    >
                      Jumlah
                    </Typography>
                    <TextField
                      name="quantity"
                      value={peralatanItem.quantity || ""}
                      onChange={(e) => handlePeralatanChange(e, index)}
                      variant="outlined"
                      fullWidth
                      placeholder="Masukkan Jumlah" // Add placeholder for quantity
                    />
                  </Grid>
                </Grid>
              ))
            ) : (
              <Grid item xs={12}>
                <Typography variant="body2">
                  Tidak ada peralatan tersedia
                </Typography>
              </Grid>
            )}

            {/* Pelaksana */}
            <Grid container item xs={12} spacing={1}>
              {/* Header */}
              <Grid item xs={12}>
                <Typography variant="h6" component="div" gutterBottom>
                  1. Pelaksana
                </Typography>
              </Grid>

              {/* Fields Pelaksana */}
              {[
                {
                  label: "Nama",
                  name: "namapelaksana",
                },
                {
                  label: "Tingkat Pendidikan / Ijazah",
                  name: "tingkatpendidikanpelaksana",
                },
                {
                  label: "Sertifikat Kompetensi Kerja",
                  name: "sertifikatkompetensipelaksana",
                },
                {
                  label: "Pengalaman Kerja",
                  name: "pengalamankerjapelaksana",
                },
              ].map((item) => (
                <Grid container item xs={12} spacing={1} key={item.name}>
                  <Grid item xs={4}>
                    <Typography
                      variant="body2"
                      style={{ fontSize: "14px", fontWeight: "bold" }}
                    >
                      {item.label}
                    </Typography>
                  </Grid>
                  {/* Kolom 2: TextField */}
                  <Grid item xs={4}>
                    <TextField
                      name={item.name}
                      label="Uraian"
                      variant="outlined"
                      fullWidth
                      style={{ marginLeft: "30px" }}
                      value={formData.evaluasiTeknis?.[item.name] || ""} // Gunakan optional chaining dan default value
                      onChange={handleChange}
                    />
                  </Grid>

                  {/* Kolom 3: Radio Button */}
                  <Grid item xs={4}>
                    <FormControl component="fieldset">
                      <RadioGroup
                        name={`${item.name}Radio`}
                        value={
                          formData.evaluasiTeknis?.[`${item.name}Radio`] || ""
                        }
                        onChange={handleChange}
                        row
                        style={{ marginLeft: "150px" }}
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
                      </RadioGroup>
                    </FormControl>
                  </Grid>
                </Grid>
              ))}
            </Grid>

            {/* Ahli K3 */}
            <Grid container item xs={12} spacing={1}>
              {/* Header */}
              <Grid item xs={12}>
                <Typography variant="h6" component="div" gutterBottom>
                  2. Ahli K3 Konstruksi/ Ahli Keselamatan Konstruksi/ Petugas
                  Keselamatan Konstruksi
                </Typography>
              </Grid>

              {/* Fields Ahli K3 */}
              {[
                {
                  label: "Nama",
                  name: "namaK3",
                },
                {
                  label: "Tingkat Pendidikan / Ijazah",
                  name: "tingkatpendidikanK3",
                },
                {
                  label: "Sertifikat Kompetensi Kerja",
                  name: "sertifikatkompetensiK3",
                },
                {
                  label: "Pengalaman Kerja",
                  name: "pengalamankerjaK3",
                },
              ].map((item) => (
                <Grid container item xs={12} spacing={1} key={item.name}>
                  <Grid item xs={4}>
                    <Typography
                      variant="body2"
                      style={{ fontSize: "14px", fontWeight: "bold" }}
                    >
                      {item.label}
                    </Typography>
                  </Grid>
                  {/* Kolom 2: TextField */}
                  <Grid item xs={4}>
                    <TextField
                      name={item.name}
                      label="Uraian"
                      variant="outlined"
                      fullWidth
                      style={{ marginLeft: "30px" }}
                      value={formData.evaluasiTeknis?.[item.name] || ""}
                      onChange={handleChange}
                    />
                  </Grid>

                  {/* Kolom 3: Radio Button */}
                  <Grid item xs={4}>
                    <FormControl component="fieldset">
                      <RadioGroup
                        name={`${item.name}Radio`}
                        value={
                          formData.evaluasiTeknis?.[`${item.name}Radio`] || ""
                        }
                        onChange={handleChange}
                        row
                        style={{ marginLeft: "150px" }}
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
                      </RadioGroup>
                    </FormControl>
                  </Grid>
                </Grid>
              ))}
            </Grid>

            {/* Rencana Keselamatan Konstruksi (RKK) */}
            <Grid item xs={12}>
              <Typography
                variant="h6"
                component="div"
                gutterBottom
                style={{ marginTop: "50px" }}
              >
                Rencana Keselamatan Konstruksi (RKK):
              </Typography>
            </Grid>

            {/* Pakta Komitmen */}
            <Grid container item xs={12} spacing={1}>
              {/* Header */}
              <Grid item xs={12}>
                <Typography variant="h6" component="div" gutterBottom>
                  1. Pakta komitmen yang ditandatangani oleh wakil sah badan
                  usaha
                </Typography>
              </Grid>

              <Grid container item xs={12} spacing={1}>
                <Grid item xs={4}>
                  <TextField
                    name="paktaomitmen"
                    label="Uraian"
                    style={{ width: "350px" }}
                    fullWidth
                    value={formData.evaluasiTeknis?.paktaomitmen}
                    onChange={handleChange}
                  />
                </Grid>
                {/* Kolom 3: Radio Button */}
                <Grid item xs={4}>
                  <FormControl component="fieldset">
                    <RadioGroup
                      name="penawaran"
                      value={formData.evaluasiTeknis?.penawaran}
                      onChange={handleChange}
                      row
                      style={{ marginLeft: "10px" }}
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
                    </RadioGroup>
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>

            {/* Elemen SMKK */}
            <Grid container item xs={12} spacing={1}>
              {/* Header */}
              <Grid item xs={12}>
                <Typography variant="h6" component="div" gutterBottom>
                  2. Elemen SMKK
                </Typography>
              </Grid>

              {/* Fields Elemen SMKK */}
              {[
                {
                  label:
                    "Kepemimpinan dan Partisipasi pekerja dalam keselamatan konstruksi",
                  name: "kepemimpinan",
                },
                {
                  label: "Perencanaan Keselamatan Konstruksi",
                  name: "perencanaan",
                },
                {
                  label: "Dukungan Keselamatan konstruksi",
                  name: "dukungankeselamatan",
                },
                {
                  label: "Operasi Keselamatan Konstruksi",
                  name: "operasikeselamatan",
                },
                {
                  label: "Evaluasi Kinerja Keselamatan Konstruksi",
                  name: "evaluasikinerja",
                },
              ].map((item) => (
                <Grid container item xs={12} spacing={1} key={item.name}>
                  <Grid item xs={4}>
                    <Typography
                      variant="body2"
                      style={{ fontSize: "14px", fontWeight: "bold" }}
                    >
                      {item.label}
                    </Typography>
                  </Grid>
                  {/* Kolom 2: TextField */}
                  <Grid item xs={4}>
                    <TextField
                      name={item.name}
                      label="Uraian"
                      variant="outlined"
                      fullWidth
                      style={{ marginLeft: "30px" }}
                      value={formData.evaluasiTeknis?.[item.name] || ""}
                      onChange={handleChange}
                    />
                  </Grid>

                  {/* Kolom 3: Radio Button */}
                  <Grid item xs={4}>
                    <FormControl component="fieldset">
                      <RadioGroup
                        name={`${item.name}Radio`}
                        value={
                          formData.evaluasiTeknis?.[`${item.name}Radio`] || ""
                        }
                        onChange={handleChange}
                        row
                        style={{ marginLeft: "150px" }}
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
                      </RadioGroup>
                    </FormControl>
                  </Grid>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </form>
        <Snackbar
          open={openSnackbar}
          autoHideDuration={1000}
          onClose={handleCloseSnackbar}
          message="Data disimpan dengan sukses!"
          anchorOrigin={{ vertical: "center", horizontal: "center" }}
        />
      </PageContainer>
    </DashboardCard>
  );
};

export default FormTeknis;
