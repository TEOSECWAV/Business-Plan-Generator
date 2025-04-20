import React, { useState } from "react";

// MUI 컴포넌트
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Paper, Typography, Button, Box } from "@mui/material";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";
import { Stepper, Step, StepLabel } from '@mui/material';

// 기본 폰트 지정 
const theme = createTheme({
  typography: {
    fontFamily: `"Noto Sans KR", "Malgun Gothic", "Roboto", "Helvetica", "Arial", sans-serif`,
    fontSize: 14,
  },
});

//CoverSection 컴포넌트
const CoverSection = ({ formData, onChange }) => {
  return (
    <Box>
      <TextField
        fullWidth
        label="회사명"
        name="companyName"
        value={formData.companyName}
        onChange={onChange}
        sx={{ mb: 2 }}
      />
      <TextField
        fullWidth
        label="설립년월일"
        type="month"
        name="establishmentDate"
        value={formData.establishmentDate}
        onChange={onChange}
      />
    </Box>
  );
};

// BankSelector 컴포넌트
const BankSelector = ({ selectedBanks, setSelectedBanks }) => {
  const [input, setInput] = useState("");

  const bankList = [
    "국민은행",
    "신한은행",
    "우리은행",
    "하나은행",
    "SC제일은행",
    "씨티은행",
    "기업은행",
    "농협은행",
    "수협은행",
    "한국산업은행",
    "한국수출입은행",
    "부산은행",
    "대구은행",
    "경남은행",
    "전북은행",
    "광주은행",
    "제주은행",
    "카카오뱅크",
    "케이뱅크",
    "토스뱅크",
    "우체국",
    "새마을금고",
    "신협",
    "산림조합중앙회",
  ];

  const handleSelect = (bank) => {
    if (!selectedBanks.includes(bank)) {
      setSelectedBanks([...selectedBanks, bank]);
    }
    setInput("");
  };

  const handleRemove = (bank) => {
    setSelectedBanks(selectedBanks.filter((b) => b !== bank));
  };

  const filteredBanks = bankList.filter(
    (b) =>
      b.toLowerCase().includes(input.toLowerCase()) &&
      !selectedBanks.includes(b)
  );

  return (
    <div style={{ width: "100%" }}>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "5px",
          margin: "10px 0",
          padding: "8px",
          border: "1px solid #ccc",
          borderRadius: "6px",
          backgroundColor: "#f9f9f9",
        }}
      >
        {selectedBanks.map((bank, idx) => (
          <span
            key={idx}
            style={{
              padding: "5px 10px",
              backgroundColor: "#e0e0e0",
              borderRadius: "15px",
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            {bank}
            <button
              onClick={() => handleRemove(bank)}
              style={{
                background: "transparent",
                border: "none",
                cursor: "pointer",
                fontWeight: "bold",
                color: "#333",
              }}
            >
              ×
            </button>
          </span>
        ))}
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="거래은행을 입력하세요"
          style={{
            flex: 1,
            border: "none",
            outline: "none",
            minWidth: "150px",
          }}
        />
      </div>

      {input && (
        <div
          style={{
            border: "1px solid #ccc",
            borderRadius: "4px",
            maxHeight: "150px",
            overflowY: "auto",
            background: "#fff",
            boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
          }}
        >
          {filteredBanks.length > 0 ? (
            filteredBanks.map((bank, idx) => (
              <div
                key={idx}
                onClick={() => handleSelect(bank)}
                style={{
                  padding: "8px",
                  cursor: "pointer",
                  borderBottom: "1px solid #eee",
                }}
              >
                {bank}
              </div>
            ))
          ) : (
            <div style={{ padding: "8px", color: "#777" }}>
              검색 결과가 없습니다.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const App = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    companyName: "",
    establishmentDate: "",
    businessNumber: "",
    representative: "",
    headquartersPhone: "",
    factoryPhone: "",
    headquartersAddress: "",
    factoryAddress: "",
    businessType: "",
    ksicCode:"",
    products: "",
    client: "",
    bank: [],
    factoryScale: {
      owned: false,
      large: false,
      registered: false,
      unregistered: false,
    },
    factoryLand: "",   
    factoryBuilding: "", 
  });

  const steps = ['표지', '기본정보', '미리보기'];

  const handleNext = () => {
    setActiveStep((prevActiveStep) => Math.min(prevActiveStep + 1, steps.length - 1));
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => Math.max(prevActiveStep - 1, 0));
  };

  // 입력 필드 변경 핸들러
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  // 사업자등록번호 변경 핸들러
  const handleBusinessNumberChange = (e) => {
    const { name, value } = e.target;
    const formattedValue = value.replace(/(\d{3})(\d{2})(\d{5})/, "$1-$2-$3");
    setFormData({ ...formData, [name]: formattedValue });
  };
  
  // 전화번호 변경 핸들러
  const handlePhoneChange = (e) => {
    const { name, value } = e.target;
    const formattedValue = value.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3");
    setFormData({ ...formData, [name]: formattedValue });
  };
  
  // 업종 선택 핸들러
  const handleIndustryChange = (selectedLabel) => {
    if (selectedLabel === "기타") {
      setFormData({
        ...formData,
        businessType: "기타",
        ksicCode: "",
        businessTypeText: "",
      });
    } else {
      const selected = industryList.find((item) => item.label === selectedLabel);
      if (selected) {
        setFormData({
          ...formData,
          businessType: selected.label,
          ksicCode: selected.ksic,
          businessTypeText: "",
        });
      }
    }
  };
 
  // 공장규모 토글 핸들러
  const handleFactoryScaleToggle = (e, newSelections) => {
    const updated = {
      owned: false,
      large: false,
      registered: false,
      unregistered: false,
    };
    newSelections.forEach((key) => {
      updated[key] = true;
    });
    setFormData((prev) => ({ ...prev, factoryScale: updated }));
  };

  // 공장 부지, 건물 입력 핸들러
  const handleFactorySizeChange = (e) => {
    const { name, value } = e.target;
    if (/^\d*$/.test(value)) {
      setFormData({ ...formData, [name]: value });
    }
  };

  // 산업 분류 리스트
  const industryList = [
    { label: "1차 산업", type: "category" },
    { label: "농업", code: "1-1", ksic: "01" },
    { label: "어업", code: "1-3", ksic: "03" },
    { label: "2차 산업", type: "category" },
    { label: "식품 제조업", code: "2-1-1", ksic: "10" },
    { label: "의류 제조업", code: "2-1-4", ksic: "14" },
    { label: "전자기기 제조업", code: "2-2-1", ksic: "26" },
    { label: "자동차 제조업", code: "2-3-1", ksic: "30" },
    { label: "화장품 제조업", code: "2-1-3", ksic: "20431" },
    { label: "기계 제조업", code: "2-4-1", ksic: "29" },
    { label: "전기전자 제조업", code: "2-2-2", ksic: "27" },
    { label: "화학 제조업", code: "2-5-1", ksic: "20" },
    { label: "제약 제조업", code: "2-5-2", ksic: "21" },
    { label: "철강 제조업", code: "2-6-1", ksic: "24" },
    { label: "건설 자재 제조업", code: "2-7-1", ksic: "23" },
    { label: "3차 산업", type: "category" },
    { label: "외식업", code: "3-1-1", ksic: "56" },
    { label: "호텔업", code: "3-1-2", ksic: "55" },
    { label: "첨단 기술 산업", type: "category" },
    { label: "AI 서비스", code: "5-1", ksic: "62010" },
    { label: "로봇 공학", code: "5-4", ksic: "28909" },
  ];

  // 표지 및 기본정보 섹션 렌더링
  const renderCompanyInfo = () => (
    <div style={styles.section}>
      {/* 회사명 */}
      <Box sx={{ mb: 2 }}>
        <TextField
          fullWidth
          label="회사명"
          name="companyName"
          value={formData.companyName}
          onChange={handleInputChange}
          placeholder="예: 파도 푸드컴퍼니"
          variant="outlined"
          size="small"
          sx={{ mb: 2 }}
        />
      </Box>

      {/* 설립년월일 */}
      <div style={styles.formGroup}>
        <label style={styles.label}>설립년월일</label>
        <input
          style={styles.input}
          type="month"
          name="establishmentDate"
          value={formData.establishmentDate}
          onChange={handleInputChange}
        />
      </div>

      {/* 사업자등록번호 */}
      <div style={styles.formGroup}>
        <label style={styles.label}>사업자등록번호</label>
        <input
          style={styles.input}
          type="text"
          name="businessNumber"
          value={formData.businessNumber}
          onChange={handleBusinessNumberChange}
          placeholder="000-00-00000"
          maxLength={12}
        />
      </div>

      {/* 대표자 */}
      <div style={styles.formGroup}>
        <label style={styles.label}>대표자</label>
        <input
          style={styles.input}
          type="text"
          name="representative"
          value={formData.representative}
          onChange={handleInputChange}
          placeholder="예: 김대표"
        />
      </div>

      {/* 본사주소 */}
      <div style={styles.formGroup}>
        <label style={styles.label}>본사주소</label>
        <input
          style={styles.input}
          type="text"
          name="headquartersAddress"
          value={formData.headquartersAddress}
          onChange={handleInputChange}
          placeholder="예: 서울특별시 강남구 테헤란로 123"
        />
      </div>

       {/* 본사전화 */}
       <div style={styles.formGroup}>
        <label style={styles.label}>본사전화</label>
        <input
          style={styles.input}
          type="tel"
          name="headquartersPhone"
          value={formData.headquartersPhone}
          onChange={handlePhoneChange}
          placeholder="예: 010-1234-5678"
          maxLength={13}
        />
      </div>

      {/* 공장주소 */}
      <div style={styles.formGroup}>
        <label style={styles.label}>공장주소</label>
        <input
          style={styles.input}
          type="text"
          name="factoryAddress"
          value={formData.factoryAddress}
          onChange={handleInputChange}
          placeholder="예: 경기도 시흥시 시화공단로 456"
        />
      </div>

       {/* 공장전화 */}
       <div style={styles.formGroup}>
        <label style={styles.label}>공장전화</label>
        <input
          style={styles.input}
          type="tel"
          name="factoryPhone"
          value={formData.factoryPhone}
          onChange={handlePhoneChange}
          placeholder="예: 010-1234-5678"
          maxLength={13}
        />
      </div>
      
      {/* 업종선택 */}
      <div style={styles.formGroup}>
        <label style={styles.label}>업종선택</label>
        <div style={{ width: "100%" }}>
          <select
            style={styles.input2}
            onChange={(e) => handleIndustryChange(e.target.value)}
            value={formData.businessType}
          >
            <option value="">업종을 선택하세요</option>
            {industryList
              .filter((item) => !item.type)
              .map((item) => (
                <option key={item.code} value={item.label}>
                  {item.label}
                </option>
              ))}
            <option value="기타">기타 (직접 입력)</option>
          </select>
        </div>
      </div> 

      {/* 생산품목 */}
      <div style={styles.formGroup}>
        <label style={styles.label}>생산품목</label>
        <input
          style={styles.input}
          type="text"
          name="products"
          value={formData.products}
          onChange={handleInputChange}
          placeholder="예: 샌드위치, 크로와상, 치아바타 등"
        />
      </div>

      {/* 주거래처 */}
      <div style={styles.formGroup}>
        <label style={styles.label}>주거래처</label>
        <input
          style={styles.input}
          type="text"
          name="client"
          value={formData.client}
          onChange={handleInputChange}
          placeholder="예: 프렌차이즈, 마트, 기업 등"
        />
      </div>

      {/* 거래은행 */}
      <div style={styles.formGroup}>
        <label style={styles.label}>거래은행</label>
        <BankSelector
          selectedBanks={formData.bank}
          setSelectedBanks={(banks) =>
            setFormData({ ...formData, bank: banks })
          }
        />
      </div>

     {/* 공장규모 */}
     <div style={styles.formGroup}>
        <label style={styles.label}>공장규모</label>

     {/* 공장유형 선택 */}
     <ToggleButtonGroup
        value={Object.entries(formData.factoryScale)
          .filter(([_, checked]) => checked)
          .map(([key]) => key)}
        onChange={handleFactoryScaleToggle}
        aria-label="factory scale">

        <ToggleButton value="owned" aria-label="자가공장">자가공장</ToggleButton>
        <ToggleButton value="large" aria-label="대공장">대공장</ToggleButton>
        <ToggleButton value="registered" aria-label="등록">등록</ToggleButton>
        <ToggleButton value="unregistered" aria-label="무등록">무등록</ToggleButton>
      </ToggleButtonGroup>

      {/* 평수 입력 */}
      <div>
        <div style={{ marginBottom: "10px" }}>
          <label style={styles.label}>공장 부지</label>
          <input
            style={styles.input}
            type="text"
            name="factoryLand"
            value={formData.factoryLand}
            onChange={handleFactorySizeChange}
            placeholder="단위: 평"
          />
        </div>
        <div>
          <label style={styles.label}>공장 건물</label>
          <input
            style={styles.input}
            type="text"
            name="factoryBuilding"
            value={formData.factoryBuilding}
            onChange={handleFactorySizeChange}
            placeholder="단위: 평"
          />
        </div>
      </div>
     </div>
    </div>
  );

  //미리보기 섹션 렌더링 
  const renderPreview = () => (
    <Paper elevation={3} sx={{ p: 3, mt: 4 }}>
      <Typography variant="h6" gutterBottom>👀 미리보기</Typography>
      <Typography>
        회사명: {formData.companyName || "미입력"}
      </Typography>
      <Typography>
        설립년월일: {formData.establishmentDate || "미입력"}
      </Typography>
      <Typography>
        사업자등록번호: {formData.businessNumber || "미입력"}
      </Typography>
      <Typography>
        대표자: {formData.representative || "미입력"}
      </Typography>
      <Typography>
        본사 주소: {formData.headquartersAddress || "미입력"}
      </Typography>
      <Typography>
        본사전화: {formData.headquartersPhone || "미입력"}
      </Typography>
      <Typography>
        공장 주소: {formData.factoryAddress || "미입력"}
      </Typography>
      <Typography>
        공장전화: {formData.factoryPhone || "미입력"}
      </Typography>
      <Typography>
        업종:{" "} 
        {formData.businessType === "기타"
          ? formData.businessTypeText || "미입력"
          : formData.businessType || "미선택"}
      </Typography>
      <Typography>
        산업분류코드: {formData.ksicCode || "없음"}
      </Typography>
      <Typography>
        생산품목: {formData.products || "미입력"}
      </Typography>
      <Typography>
        주거래처: {formData.client || "미입력"}
      </Typography>
      <Typography>
        거래은행: {formData.bank.length > 0 ? formData.bank.join(", ") : "미입력"}
      </Typography>
      <Typography>
        공장규모:{" "}
        {Object.entries(formData.factoryScale)
          .filter(([_, v]) => v)
          .map(([k]) => {
            const labelMap = {
              owned: "자가공장",
              large: "대공장",
              registered: "등록",
              unregistered: "무등록",
            };
            return labelMap[k];
          })
          .join(", ") || "미선택"}
      </Typography>
      <Typography>
        공장부지: {formData.factoryLand ? `${formData.factoryLand} 평` : "미입력"}
      </Typography>
      <Typography>
        공장건물: {formData.factoryBuilding ? `${formData.factoryBuilding} 평` : "미입력"}
      </Typography>
      {/* 저장 버튼 추가 */}
      <Button variant="contained" color="primary" sx={{ mt: 3 }}>
        저장하기
      </Button>
    </Paper>
  );

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
        {/* Stepper 표시시 */}
        <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
          {steps.map((label, index) => (
            <Step key={index}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {/* 단계별 화면 렌더링 */}
        {activeStep === 0 && (
          <>
            <Typography variant="h4" align="center" gutterBottom>📝 사업계획서</Typography>
            <CoverSection formData={formData} onChange={handleInputChange} />
          </>
        )}

        {activeStep === 1 && (
          <>
            <Typography variant="h5" sx={{ mt: 2, mb: 2 }}>📄 기본정보</Typography>
            {renderCompanyInfo()}
          </>
        )}

        {activeStep === 2 && (
          <>
            <Typography variant="h5" sx={{ mt: 2, mb: 2 }}>👀 미리보기</Typography>
            {renderPreview()}
          </>
        )}

        {/* 네비게이션 버튼 */}
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
          <Button disabled={activeStep === 0} onClick={handleBack} variant="contained" color="primary">이전</Button>
          <Button disabled={activeStep === steps.length - 1} onClick={handleNext} variant="contained" color="primary">다음</Button>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

// 스타일 정의
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
  previewSection: {
    marginTop: "20px",
    padding: "20px",
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
  },
  formGroup: { 
    marginBottom: "15px" 
  },
  input: {
    width: "100%",          
    padding: "8px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    fontSize: "14px",
    appearance: "none",     
    MozAppearance: "none",
  },
  input2: {
    width: "100%",          
    padding: "8px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    fontSize: "14px",
    appearance: "auto",     
    backgroundColor: "#fff",
    WebkitAppearance: "auto", 
    MozAppearance: "auto",
  },
  label: {
    fontWeight: "bold",
    display: "block",      
    marginBottom: "8px",
   },
};

export default App;