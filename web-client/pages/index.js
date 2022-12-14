import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import styles from "../styles/Home.module.css";
import axios from "axios";

export default function Home() {
  const [file, setFile] = useState("");
  const uploadFile = () => {
    const formData = new FormData();
    formData.append("recording", file);
    formData.append("class_id", "1234");
    axios
      .post("http://localhost:5000/recordings/upload", formData)
      .then((res) => {
        console.log(res);
      });
  };
  return (
    <div className={styles.container}>
      <Head>
        <title>Recording Upload</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <form>
        <input
          type="file"
          onChange={(e) => {
            console.log(e.target);
            console.log(e.target.files[0]);
            setFile(e.target.files[0]);
          }}
        />
        <button
          onClick={(e) => {
            e.preventDefault();
            uploadFile();
          }}
        >
          Submit
        </button>
      </form>
    </div>
  );
}
