import React, { useState } from "react";
import {
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  Snackbar,
  Grid,
  Typography,
  FormControl,
  TextField,
} from "@mui/material";
import { collection, addDoc } from "firebase/firestore";
import PageContainer from "src/components/container/PageContainer";
import DashboardCard from "src/components/shared/DashboardCard";
import { db } from "../../../../config/firebase";

const formKualifikasi = ({ formData, handleChange }) => {
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const penyediaDocRef = doc(db, "Penyedia dan Evaluasi", formData.penyedia);
      await setDoc(penyediaDocRef, {
        evaluasiKualifikasi: formData // Pastikan formData ini hanya mengandung data dari evaluasiKualifikasi
      }, { merge: true });
      console.log("Data saved successfully!");
      setOpenSnackbar(true);
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  return (
    <DashboardCard title="Form Kualifikasi" width="1160px" height="2220px">
      <PageContainer title="Form Kualifikasi" description="Form Kualifikasi">
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h6" component="div" gutterBottom>
                Evaluasi Kualifikasi Administrasi / Legalitas
              </Typography>
            </Grid>
            {/* 1 */}
            <Grid container item xs={12} spacing={1}>
              {/* Header */}
              <Grid item xs={12}>
                <Typography variant="h6" component="div" gutterBottom>
                  1. IUJK/NIB
                </Typography>
              </Grid>

              {[
                { label: "a. Nomor", name: "nomorIUJKNIB" },
                { label: "b. Berlaku Sampai", name: "berlakusampaiIUJKNIB" },
                { label: "c. Instansi Pemberi", name: "instansipemberiIUJKNIB"},
              ].map((item) => (
                <Grid container item xs={12} spacing={1} key={item.name} display="flex">
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
                      // value={formData.evaluasiKualifikasi?.[item.name] || ""}
                      value={formData.evaluasiKualifikasi?.[item.name] || ""}
                      onChange={handleChange}
                    />
                  </Grid>

                  {/* Kolom 3: Radio Button */}
                  <Grid item xs={4}>
                    <FormControl component="fieldset">
                      <RadioGroup
                        name={`${item.name}1Radio`}
                        value={formData.evaluasiKualifikasi?.[`${item.name}1Radio`] || ""}
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
              console.log(formData);
            </Grid>

            {/* 2 */}
            <Grid container item xs={12} spacing={1}>
              {/* Header */}
              <Grid item xs={12}>
                <Typography variant="h6" component="div" gutterBottom>
                  2. SBU
                </Typography>
              </Grid>

              {/* Implementasi label dengan ukuran dan ketebalan font yang diubah */}
              {[
                { label: "a. Nomor", name: "nomorSBU" },
                { label: "b. Berlaku Sampai", name: "berlakusampaiSBU" },
                { label: "c. Instansi Pemberi", name: "instansipemberiSBU" },
                { label: "d. Kualifikasi", name: "kualifikasi" },
                { label: "e. Klasifikasi", name: "klasifikasi" },
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
                      value={formData.evaluasiKualifikasi?.[item.name] || ""}
                      onChange={handleChange}
                    />
                  </Grid>

                  {/* Kolom 3: Radio Button */}
                  <Grid item xs={4}>
                    <FormControl component="fieldset">
                      <RadioGroup
                        name={`${item.name}2Radio`}
                        value={
                          formData.evaluasiKualifikasi?.[`${item.name}2Radio`] ||
                          ""
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

            {/* 3 */}
            <Grid container item xs={12} spacing={1}>
              {/* Header */}
              <Grid item xs={12}>
                <Typography variant="h6" component="div" gutterBottom>
                  3. Perpajakan
                </Typography>
              </Grid>

              {/* Implementasi label dengan ukuran dan ketebalan font yang diubah */}
              {[
                { label: "a. Nomor Pokok Wajib Pajak (NPWP)", name: "NPWP" },
                {
                  label:
                    "b. Mempunyai status valid keterangan Wajib Pajak berdasarkan hasil Konfirmasi Status Wajib Pajak KSWP",
                  name: "statusvalidasi",
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
                      value={formData.evaluasiKualifikasi?.[item.name] || ""}
                      onChange={handleChange}
                    />
                  </Grid>

                  {/* Kolom 3: Radio Button */}
                  <Grid item xs={4}>
                    <FormControl component="fieldset">
                      <RadioGroup
                        name={`${item.name}Radio`}
                        value={
                          formData.evaluasiKualifikasi?.[`${item.name}Radio`] ||
                          ""
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

            {/* 4 */}
            <Grid container item xs={12} spacing={1}>
              {/* Header */}
              <Grid item xs={12}>
                <Typography variant="h6" component="div" gutterBottom>
                  3. Alamat
                </Typography>
              </Grid>

              {/* Implementasi label dengan ukuran dan ketebalan font yang diubah */}
              {[{ label: "a. Alamat", name: "alamat" }].map((item) => (
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
                      value={formData.evaluasiKualifikasi?.[item.name] || ""}
                      onChange={handleChange}
                    />
                  </Grid>

                  {/* Kolom 3: Radio Button */}
                  <Grid item xs={4}>
                    <FormControl component="fieldset">
                      <RadioGroup
                        name={`${item.name}Radio`}
                        value={
                          formData.evaluasiKualifikasi?.[`${item.name}Radio`] ||
                          ""
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

            {/* 5 */}
            <Grid container item xs={12} spacing={1}>
              {/* Header */}
              <Grid item xs={12}>
                <Typography variant="h6" component="div" gutterBottom>
                  4. Kepemilikan Perusahaan
                </Typography>
              </Grid>

              {/* Implementasi label dengan ukuran dan ketebalan font yang diubah */}
              {[
                {
                  label: "a. Kepemilikan Perusahaan",
                  name: "kepemilikanperusahaan",
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
                      value={formData.evaluasiKualifikasi?.[item.name] || ""}
                      onChange={handleChange}
                    />
                  </Grid>

                  {/* Kolom 3: Radio Button */}
                  <Grid item xs={4}>
                    <FormControl component="fieldset">
                      <RadioGroup
                        name={`${item.name}Radio`}
                        value={
                          formData.evaluasiKualifikasi?.[`${item.name}Radio`] ||
                          ""
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

            {/* 6 */}
            <Grid container item xs={12} spacing={1}>
              {/* Header */}
              <Grid item xs={12}>
                <Typography variant="h6" component="div" gutterBottom>
                  6. Pengurus Perusahaan
                </Typography>
              </Grid>

              {/* Implementasi label dengan ukuran dan ketebalan font yang diubah */}
              {[
                { label: "a. Pengurus Perusahaan", name: "pengurusperusahaan" },
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
                      value={formData.evaluasiKualifikasi?.[item.name] || ""}
                      onChange={handleChange}
                    />
                  </Grid>

                  {/* Kolom 3: Radio Button */}
                  <Grid item xs={4}>
                    <FormControl component="fieldset">
                      <RadioGroup
                        name={`${item.name}Radio`}
                        value={
                          formData.evaluasiKualifikasi?.[`${item.name}Radio`] ||
                          ""
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

            {/* 7 */}
            <Grid container item xs={12} spacing={1}>
              {/* Header */}
              <Grid item xs={12}>
                <Typography variant="h6" component="div" gutterBottom>
                  7. Landasan Hukum Perusahaan
                </Typography>
              </Grid>

              {/* Implementasi label dengan ukuran dan ketebalan font yang diubah */}
              {[
                {
                  label: "a. Akta Pendirian Perusahaan ",
                  name: "aktapendirianperusahaan",
                },
                {
                  label: "b. Akta Perubahan Perusahaan",
                  name: "aktaperubahanperusahaan",
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
                      value={formData.evaluasiKualifikasi?.[item.name] || ""}
                      onChange={handleChange}
                    />
                  </Grid>

                  {/* Kolom 3: Radio Button */}
                  <Grid item xs={4}>
                    <FormControl component="fieldset">
                      <RadioGroup
                        name={`${item.name}Radio`}
                        value={
                          formData.evaluasiKualifikasi?.[`${item.name}Radio`] ||
                          ""
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

            {/* 8 */}
            <Grid container item xs={12} spacing={1}>
              {/* Header */}
              <Grid item xs={12}>
                <Typography variant="h6" component="div" gutterBottom>
                  7. Tidak Masuk Dalam Daftar Hitam
                </Typography>
              </Grid>

              {/* Implementasi label dengan ukuran dan ketebalan font yang diubah */}
              {[
                {
                  label:
                    "Keikutsertaannya tidak meninmbulkan pertentangan kepentingan pihak yang terkait, tidak dalam pengawasan pengadilan, tidak pailit, kegiatan usahanya tidak sedang dihentikan dan/ atau yang bertindak untuk dan atas nama Badan Usaha tidak sedang dalam menjalani sanksi pidana, dan pengurus/ pegawai tidak berstatus Aparatur Sipil Negara, kecuali yang bersangkutan mengambil cuti diluar tanggungan Negara ",
                  name: "daftarhitam",
                },
              ].map((item) => (
                <Grid container item xs={12} spacing={1} key={item.name}>
                  <Grid item xs={4}>
                    <Typography
                      variant="body2"
                      style={{
                        fontSize: "14px",
                        fontWeight: "bold",
                        textAlign: "justify",
                      }}
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
                      value={formData.evaluasiKualifikasi?.[item.name] || ""}
                      onChange={handleChange}
                    />
                  </Grid>

                  {/* Kolom 3: Radio Button */}
                  <Grid item xs={4}>
                    <FormControl component="fieldset">
                      <RadioGroup
                        name={`${item.name}Radio`}
                        value={
                          formData.evaluasiKualifikasi?.[`${item.name}Radio`] ||
                          ""
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

            {/* Judul 2 */}
            <Grid item xs={12}>
              <Typography
                variant="h6"
                component="div"
                gutterBottom
                style={{ marginTop: "50px" }}
              >
                Evaluasi Kualifikasi
              </Typography>
            </Grid>

            {/* 1 */}
            <Grid container item xs={12} spacing={1}>
              {/* Header */}
              <Grid item xs={12}>
                <Typography variant="h6" component="div" gutterBottom>
                  1. Tenaga Tetap
                </Typography>
              </Grid>

              {/* Implementasi label dengan ukuran dan ketebalan font yang diubah */}
              {[
                {
                  label:
                    "a. Surat Pernyataan Kepemilikan Sertifikat Kompetensi Kerja sebagai Tenaga Tetap",
                  name: "SPKSPK",
                },
                { label: "b. Nama", name: "namatenagatetap" },
                { label: "c. Ijazah", name: "ijazahtenagatetap" },
                {
                  label:
                    "d. SKT yang sesuai dengan Klasifikasi SBU yang disyaratkan",
                  name: "SKT",
                },
                {
                  label:
                    "3. Bukti Setor Pajak PPh Pasal 21 Form 1721 atau Form 1721-A1",
                  name: "butkisetorpajak",
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
                      value={formData.evaluasiKualifikasi?.[item.name] || ""}
                      onChange={handleChange}
                    />
                  </Grid>

                  {/* Kolom 3: Radio Button */}
                  <Grid item xs={4}>
                    <FormControl component="fieldset">
                      <RadioGroup
                        name={`${item.name}Radio`}
                        value={
                          formData.evaluasiKualifikasi?.[`${item.name}Radio`] ||
                          ""
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

            {/* 2 */}
            <Grid container item xs={12} spacing={1}>
              {/* Header */}
              <Grid item xs={12}>
                <Typography variant="h6" component="div" gutterBottom>
                  2. Pengalaman
                </Typography>
              </Grid>

              {/* Implementasi label dengan ukuran dan ketebalan font yang diubah */}
              {[
                {
                  label:
                    "Pengalaman paling kurang 1 (satu) pekerjaan dalam kurun waktu 4 (empat) tahun terakhir, baik di lingkungan pemerintah maupun swasta termasuk pengalaman subkontrak, kecuali bagi pelaku usaha yang baru berdiri kurang dari 3 (tiga) tahun",
                  name: "pengalaman",
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
                      value={formData.evaluasiKualifikasi?.[item.name] || ""}
                      onChange={handleChange}
                    />
                  </Grid>

                  {/* Kolom 3: Radio Button */}
                  <Grid item xs={4}>
                    <FormControl component="fieldset">
                      <RadioGroup
                        name={`${item.name}Radio`}
                        value={
                          formData.evaluasiKualifikasi?.[`${item.name}Radio`] ||
                          ""
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

            {/* 3 */}
            <Grid container item xs={12} spacing={1}>
              {/* Header */}
              <Grid item xs={12}>
                <Typography variant="h6" component="div" gutterBottom>
                  3. Memenuhi Sisa Kemampuan Paket (SKP)
                </Typography>
              </Grid>

              {/* Implementasi label dengan ukuran dan ketebalan font yang diubah */}
              {[
                {
                  label: `SKP = KP - Jumlah paket yang sedang dikerjakan
KP = Kemampuan menangani paket pekerjaan
Untuk badan usaha kecil KP = 5`,
                  name: "SKP",
                },
              ].map((item) => (
                <Grid container item xs={12} spacing={1} key={item.name}>
                  <Grid item xs={4}>
                    <Typography
                      variant="body2"
                      style={{
                        fontSize: "14px",
                        fontWeight: "bold",
                        whiteSpace: "pre-line",
                      }}
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
                      value={formData.evaluasiKualifikasi[item.name] || ""}
                      onChange={handleChange}
                    />
                  </Grid>

                  {/* Kolom 3: Radio Button */}
                  <Grid item xs={4}>
                    <FormControl component="fieldset">
                      <RadioGroup
                        name={`${item.name}Radio`}
                        value={
                          formData.evaluasiKualifikasi?.[`${item.name}Radio`] ||
                          ""
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
          onClose={() => setOpenSnackbar(false)}
          message="Data saved successfully!"
          anchorOrigin={{ vertical: "center", horizontal: "center" }}
        />
      </PageContainer>
    </DashboardCard>
  );
};

export default formKualifikasi;
    