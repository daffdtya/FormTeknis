import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // Import useParams
import FormAdministrasi from "./form/FormAdministrasi";
import FormKualifikasi from "./form/FormKualifikasi";
import FormTeknis from "./form/FormTeknis";
import DashboardCard from "src/components/shared/DashboardCard";
import { Button, Snackbar, TextField } from "@mui/material";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../../config/firebase";
import { useNavigate } from "react-router-dom";

const EvaluasiForm = () => {
  const { paketId } = useParams(); // Dapatkan paketId dari URL
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    penyedia: "",
    evaluasiAdministrasi: {
      suratPenawaran: "",
      metode: "",
      jangkaWaktu: "",
      peralatan: "",
      personel: "",
      subkontrak: "",
      dokumenRKK: "",
      jaminanPenawaran: "",
      dokumenHarga: "",
      penawaran: "",
    },
    evaluasiKualifikasi: {
      nomorIUJKNIB: "",
      berlakusampaiIUJKNIB: "",
      instansipemberiIUJKNIB: "",
      nomorSBU: "",
      berlakusampaiSBU: "",
      instansipemberiSBU: "",
      kualifikasi: "",
      klasifikasi: "",
      NPWP: "",
      statusvalidasi: "",
      alamat: "",
      kepemilikanperusahaan: "",
      pengurusperusahaan: "",
      aktapendirianperusahaan: "",
      aktaperubahanperusahaan: "",
      daftarhitam: "",
      SPKSPK: "",
      namatenagatetap: "",
      ijazahtenagatetap: "",
      SKT: "",
      butkisetorpajak: "",
      pengalaman: "",
      SKP: "",
    },
    evaluasiTeknis: {
      paktaomitmen: "",
      namapelaksana: "",
      penawaran: "",
      kapasitasminimal: "",
      jumlahkapasitasminimal: "",
      Kepemilikanstatusbeton: "",
      tingkatpendidikanpelaksana: "",
      sertifikatkompetensipelaksana: "",
      pengalamankerjapelaksana: "",
      namaK3: "",
      tingkatpendidikanK3: "",
      sertifikatkompetensiK3: "",
      pengalamankerjaK3: "",
      kepemimpinan: "",
      perencanaan: "",
      dukungankeselamatan: "",
      operasikeselamatan: "",
      evaluasikinerja: "",
    },
  });

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const docRef = doc(db, "formPaket", paketId); // Ubah 'formPaket' sesuai dengan koleksi Anda
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setFormData(docSnap.data());
      } else {
        console.log("No such document!");
      }
    };

    if (paketId) {
      fetchData();
    }
  }, [paketId]);

  // Fungsi untuk mengubah nilai form
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => {
      const newFormData = { ...prevData };
      if (name === "penyedia") {
        newFormData[name] = value;
      }

      if (step === 1) {
        newFormData.evaluasiAdministrasi[name] = value;
      } else if (step === 2) {
        newFormData.evaluasiKualifikasi[name] = value;
      } else if (step === 3) {
        newFormData.evaluasiTeknis[name] = value;
      }

      return newFormData;
    });
  };

  const handleNext = () => {
    setStep((prevStep) => prevStep + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBack = () => {
    setStep((prevStep) => prevStep - 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = async () => {
    console.log("Form Data Before Saving: ", formData);
    try {
      const penyediaDocRef = doc(db, "Penyedia dan Evaluasi", formData.penyedia);
      await setDoc(
        penyediaDocRef,
        {
          ...formData,
          penyedia: formData.penyedia,
        },
        { merge: true }
      );
      console.log("Data saved successfully!");
      setOpenSnackbar(true);
      navigate(`/ui/TambahPenyedia/${formData.penyedia}`);
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <div>
      <DashboardCard
        title={`Form Tambah Penyedia & Evaluasi - Step ${step}`}
        width="1160px"
      >
        {step === 1 && (
          <div>
            <TextField
              name="penyedia"
              label="Penyedia"
              type="text"
              style={{ width: "950px", marginBottom: "20px" }}
              fullWidth
              value={formData.penyedia}
              onChange={handleChange}
              required
            />
            <FormAdministrasi formData={formData} handleChange={handleChange} />
          </div>
        )}

        {step === 2 && (
          <FormKualifikasi formData={formData} handleChange={handleChange} />
        )}

        {step === 3 && (
          <FormTeknis formData={formData} handleChange={handleChange} />
        )}

        <div style={{ marginTop: "20px" }}>
          {step > 1 && <Button onClick={handleBack}>Back</Button>}
          {step < 3 ? (
            <Button variant="contained" color="primary" onClick={handleNext}>
              Next
            </Button>
          ) : (
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Submit
            </Button>
          )}
        </div>
      </DashboardCard>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        message="Data saved successfully!"
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      />
    </div>
  );
};

export default EvaluasiForm;
