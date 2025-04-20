import React, { useState } from "react";

// MUI 컴포넌트
import {
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  ThemeProvider,
  createTheme,
  Paper,
  Typography,
  Button,
  Box,
  ToggleButtonGroup,
  ToggleButton,
  Stepper,
  Step,
  StepLabel,
  Autocomplete,
  Chip
} from "@mui/material";

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
        name="title"
        label="제목"
        value={formData.title}
        onChange={onChange}
        variant="outlined"
        size="small"
        sx={{ mb: 2 }}
      />
      <TextField
        fullWidth
        label="부제목"
        name="subtitle"
        value={formData.subtitle}
        onChange={onChange}
        variant="outlined"
        size="small"
        sx={{ mb: 2 }}
      />
      <TextField
        fullWidth
        label="설립년월일"
        type="month"
        name="establishmentDate"
        value={formData.establishmentDate}
        onChange={onChange}
        InputLabelProps={{ shrink: true }}
        sx={{ mb: 2 }}
        size="small"
      />

      {/* 미리보기 영역 */}
      <Box sx={{ width: "100%", mt: 5 }}>
  <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
    👀 미리보기
  </Typography>

  <Box
    sx={{
      width: "100%",              
      minHeight: "300px",         
      p: 4,
      border: "1px solid #ddd",
      borderRadius: 3,
      backgroundColor: "#fafafa",
      textAlign: "center",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
    }}
  >
    <Typography variant="h5" fontWeight="bold" gutterBottom>
      {formData.title || "제목"}
    </Typography>
    <Typography variant="body1" color="text.secondary" gutterBottom>
      {formData.subtitle || "부제목"}
    </Typography>
    <Typography variant="body2" sx={{ mt: 7 }}>
      {formData.establishmentDate
        ? `${formData.establishmentDate.split("-")[0]}. ${formData.establishmentDate.split("-")[1]}.`
        : "설립일 미입력"}
    </Typography>
    <Typography variant="h6" fontWeight="bold" sx={{ mt: 2 }}>
      {formData.companyName || "회사명"}
    </Typography>
  </Box>
</Box> 
</Box>
  );
};

// BankSelector 컴포넌트
const BankSelector = ({ selectedBanks, setSelectedBanks }) => {

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

  return (
    <Autocomplete
      multiple
      options={bankList}
      value={selectedBanks}
      onChange={(event, newValue) => {
        setSelectedBanks(newValue);
      }}
      renderTags={(value, getTagProps) =>
        value.map((option, index) => (
          <Chip
            label={option}
            {...getTagProps({ index })}
            key={option}
          />
        ))
      }
      renderInput={(params) => (
        <TextField
          {...params}
          variant="outlined"
          label="거래은행을 입력하거나 선택하세요"
          size="small"
        />
      )}
    />
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
    let numbersOnly = value.replace(/\D/g, "");
    if (numbersOnly.length > 10) {
      numbersOnly = numbersOnly.slice(0, 10);
    }
    const formattedValue = numbersOnly.replace(
      /(\d{3})(\d{2})(\d{5})/,
      (match, p1, p2, p3) =>
        [p1, p2, p3].filter(Boolean).join("-")
    );

    setFormData({ ...formData, [name]: formattedValue });
  };
  
  // 전화번호 변경 핸들러
  const handlePhoneChange = (e) => {
    const { name, value } = e.target;
    let numbersOnly = value.replace(/\D/g, "");
    if (numbersOnly.length > 11) {
      numbersOnly = numbersOnly.slice(0, 11);
    }

    const formattedValue = numbersOnly.replace(
      /(\d{3})(\d{4})(\d{4})/,
      (match, p1, p2 ,p3) =>
        [p1, p2, p3].filter(Boolean).join("-")
    );

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
          variant="outlined"
          size="small"
        />
      </Box>
      
      {/* 설립년월일 */}
      <Box sx={{ mb: 2 }}>
      <TextField
        fullWidth
        label="설립년월일"
        type="month"
        name="establishmentDate"
        value={formData.establishmentDate}
        onChange={handleInputChange}
        InputLabelProps={{ shrink: true }}
        size="small"
        />
      </Box>

      {/* 사업자등록번호 */}
      <Box sx={{ mb:2}}>
        <TextField
        fullWidth
        label="사업자등록번호"
        name="businessNumber"
        value={formData.businessNumber}
        onChange={handleBusinessNumberChange}
        variant="outlined"
        size="small"
        placeholder="000-00-00000"
        />
      </Box>

      {/* 대표자 */}
      <Box sx={{ mb:2 }}>
        <TextField
        fullWidth
        label="대표자"
        name="representative"
        value={formData.representative}
        onChange={handleInputChange}
        variant="outlined"
        size="small"
        placeholder="홍길동"
        />
      </Box>
      
      {/* 본사주소 */}
      <Box sx={{ mb:2 }}>
        <TextField
        fullWidth
        label="본사주소"
        name="headquartersAddress"
        value={formData.headquartersAddress}
        onChange={handleInputChange}
        variant="outlined"
        size="small"
        placeholder="서울특별시 강남구 테헤란로 123"
        />
      </Box>

      {/* 본사전화 */}
      <Box sx={{ mb:2}}>
        <TextField
        fullWidth
        label="본사전화"
        name="headquartersPhone"
        value={formData.headquartersPhone}
        onChange={handlePhoneChange}
        variant="outlined"
        size="small"
        placeholder="000-0000-0000"
        />
      </Box>

      {/* 대표자 */}
      <Box sx={{ mb:2 }}>
        <TextField
        fullWidth
        label="공장주소"
        name="factoryAddress"
        value={formData.factoryAddress}
        onChange={handleInputChange}
        variant="outlined"
        size="small"
        placeholder="경기도 시흥시 시화공단로 456"
        />
      </Box>

       {/* 공장전화 */}
      <Box sx={{ mb:2 }}>
        <TextField
        fullWidth
        label="공장전화"
        name="factoryPhone"
        value={formData.factoryPhone}
        onChange={handlePhoneChange}
        variant="outlined"
        size="small"
        placeholder="000-0000-0000"
        />
      </Box>
      
       {/* 업종선택 */}
      <Box sx={{ mb: 2 }}>
        
        <TextField
          select
          fullWidth
          label="업종"
          value={formData.businessType}
          onChange={(e) => handleIndustryChange(e.target.value)}
          size="small"
          variant="outlined"
        >
        {industryList
          .filter((item) => !item.type)
          .map((item) => (
            <MenuItem key={item.code} value={item.label}>
              {item.label}
            </MenuItem>
          ))}
        <MenuItem value="기타">기타 (직접 입력)</MenuItem>
      </TextField>

        {/* 기타 업종 선택 시 입력란 표시 */}
        {formData.businessType === "기타" && (
          <TextField
            fullWidth
            label="직접 업종 입력"
            name="businessTypeText"
            value={formData.businessTypeText}
            onChange={handleInputChange}
            size="small"
            variant="outlined"
            sx={{ mt: 2 }}
          />
        )}

        {/* KSIC 코드 자동 표시 */}
        {formData.ksicCode && (
          <Typography sx={{ mt: 2, fontSize: "14px", color: "#666" }}>
            <strong>산업분류코드 (KSIC):</strong> {formData.ksicCode}
          </Typography>
        )}
      </Box>

      {/* 생산품목 */}
      <Box sx={{ mb:2 }}>
        <TextField
        fullWidth
        label="생산품목"
        name="products"
        value={formData.products}
        onChange={handleInputChange}
        variant="outlined"
        size="small"
        />
      </Box>

      {/* 주거래처 */}
      <Box sx={{ mb:2 }}>
        <TextField
        fullWidth
        label="주거래처"
        name="client"
        value={formData.client}
        onChange={handleInputChange}
        variant="outlined"
        size="small"
        />
      </Box>

      {/* 거래은행 */}
      <Box sx={{ mb: 0.5
       }}>
      <Typography
        variant="subtitle2"
        sx={{
        fontWeight: "bold",
        fontSize: "14px",
        mb: 0.5,
        color: "rgba(0, 0, 0, 0.6)",
        }}
      >
        거래은행
      </Typography>

      <BankSelector
        selectedBanks={formData.bank}
        setSelectedBanks={(banks) =>
        setFormData({ ...formData, bank: banks })
        }
     />
      </Box>

     {/* 공장규모 */}
     <Box sx={{ mb: 2 }}>
      <Typography
        variant="subtitle2"
        sx={{ fontWeight: "bold", color: "rgba(0,0,0,0.6)" }}
        >
          공장규모
      </Typography>
 
      {/* 공장유형 선택 */}
      <ToggleButtonGroup
        value={Object.entries(formData.factoryScale)
          .filter(([_, checked]) => checked)
          .map(([key]) => key)}
        onChange={handleFactoryScaleToggle}
        aria-label="factory scale"
        sx={{ width: "100%", flexWrap: "wrap" }}
      >
        <ToggleButton value="owned" aria-label="자가공장">
          자가공장
        </ToggleButton>
        <ToggleButton value="large" aria-label="대공장">
          대공장
        </ToggleButton>
        <ToggleButton value="registered" aria-label="등록">
          등록
        </ToggleButton>
        <ToggleButton value="unregistered" aria-label="무등록">
          무등록
        </ToggleButton>
      </ToggleButtonGroup>
      </Box>

      {/* 평수입력 */}
      <Box sx={{ mb:2 }}>
        <TextField
        fullWidth
        label="공장부지"
        name="factoryLand"
        value={formData.factoryLand}
        onChange={handleFactorySizeChange}
        variant="outlined"
        size="small"
        placeholder="단위: 평"
        />
      </Box>
      <Box sx={{ mb:2 }}>
        <TextField
        fullWidth
        label="공장건물"
        name="factoryBuilding"
        value={formData.factoryBuilding}
        onChange={handleFactorySizeChange}
        variant="outlined"
        size="small"
        placeholder="단위: 평"
        />
      </Box>
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