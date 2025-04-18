import React, { useState } from "react";

const App = () => {
  const [formData, setFormData] = useState({
    companyName: "",
    title: "",
    subtitle: "",
    date: new Date().toISOString().split("T")[0],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>📝 사업계획서</h1>
      <h2 style={{ marginTop: "30px" }}>📄 기본정보</h2>

      <div style={styles.section}>
        <div style={styles.formGroup}>
          <label style={styles.label}>회사명</label>
          <input
            style={styles.input}
            type="text"
            name="companyName"
            value={formData.companyName}
            onChange={handleInputChange}
            placeholder="회사명을 입력하세요"
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>사업계획서 제목</label>
          <input
            style={styles.input}
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="제목을 입력하세요"
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>부제목</label>
          <input
            style={styles.input}
            type="text"
            name="subtitle"
            value={formData.subtitle}
            onChange={handleInputChange}
            placeholder="부제목을 입력하세요"
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>작성일</label>
          <input
            style={styles.input}
            type="date"
            name="date"
            value={formData.date}
            onChange={handleInputChange}
          />
        </div>
      </div>

      {/* 미리보기 */}
      <div style={{ minWidth: "500px", marginTop: "20px" }}>
        <h2>👀 미리보기</h2>
        <div style={styles.preview}>
          <h3 style={{ fontSize: "30px", marginBottom: "10px" }}>
            {formData.title}
          </h3>
          <p style={{ color: "#555", fontSize: "20px", marginTop: "0px" }}>
            {formData.subtitle}
          </p>
          <p style={{ marginTop: "70px", fontSize: "16px" }}>
            {new Date(formData.date).toLocaleDateString("ko-KR")}
          </p>
          <p
            style={{ marginTop: "20px", fontWeight: "bold", fontSize: "20px" }}
          >
            {formData.companyName}
          </p>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "800px",
    margin: "0 auto",
    padding: "20px",
    fontFamily: "Malgun Gothic, sans-serif",
  },
  title: { textAlign: "center", marginBottom: "20px" },
  section: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
  },
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "15px",
    fontSize: "16px",
    border: "1px solid #ccc",
    borderRadius: "4px",
  },
  label: {
    fontWeight: "bold",
    display: "block",
    marginBottom: "5px",
  },
  preview: {
    padding: "30px",
    border: "1px solid #ddd",
    backgroundColor: "#fafafa",
    borderRadius: "6px",
    textAlign: "center",
  },
};

export default App;