import React, { useState } from "react";

// App 컴포넌트 위에 BankSelector 컴포넌트 선언
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
  // 회사현황 데이터 상태 관리
  const [formData, setFormData] = useState({
    companyName: "",
    establishmentDate: "",
    businessNumber: "",
    representative: "",
    phone: "",
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
const handleFactoryScaleToggle = (type) => {
  setFormData((prev) => ({
    ...prev,
    factoryScale: {
      ...prev.factoryScale,
      [type]: !prev.factoryScale[type],
    },
  }));
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
      <div style={styles.formGroup}>
        <label style={styles.label}>회사명</label>
        <input
          style={styles.input}
          type="text"
          name="companyName"
          value={formData.companyName}
          onChange={handleInputChange}
          placeholder="예: 파도 푸드컴퍼니"
        />
      </div>

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
          name="phone"
          value={formData.phone}
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
          name="phone"
          value={formData.phone}
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
     <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginBottom: "10px" }}>
     {[
        { label: "자가공장", key: "owned" },
        { label: "대공장", key: "large" },
        { label: "등록", key: "registered" },
        { label: "무등록", key: "unregistered" }
      ].map((item) => (
          <div
            key={item.key}
            onClick={() => handleFactoryScaleToggle(item.key)}
            style={{
              border: "1px solid #ccc",
              borderRadius: "5px",
              padding: "5px 12px",
              cursor: "pointer",
              backgroundColor: formData.factoryScale[item.key] ? "#e3f2fd" : "#fff",
            }}
          >
            {item.label} ({formData.factoryScale[item.key] ? "O" : " "})
          </div>
        ))}
      </div>

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
    <div style={{ marginTop: "40px" }}>
      <h2 style={{ marginBottom: "10px" }}>👀 미리보기</h2>
      <div style={styles.previewSection}>
        <div>
          <strong>회사명:</strong> {formData.companyName || "미입력"}
        </div>
        <div>
          <strong>설립년월일:</strong> {formData.establishmentDate || "미입력"}
        </div>
        <div>
          <strong>사업자등록번호:</strong> {formData.businessNumber || "미입력"}
        </div>
        <div>
          <strong>대표자:</strong> {formData.representative || "미입력"}
        </div>
        <div>
          <strong>본사 주소:</strong> {formData.headquartersAddress || "미입력"}
        </div>
        <div>
          <strong>본사전화:</strong> {formData.phone || "미입력"}
        </div>
        <div>
          <strong>공장 주소:</strong> {formData.factoryAddress || "미입력"}
        </div>
        <div>
          <strong>공장전화:</strong> {formData.phone || "미입력"}
        </div>
        <div>
          <strong>업종:</strong> 
          {formData.businessType === "기타"
             ? formData.businessTypeText || "미입력"
             : formData.businessType || "미선택"}
        </div>
        <div>
          <strong>산업분류코드:</strong> {formData.ksicCode || "없음"}
        </div>
        <div>
          <strong>생산품목:</strong> {formData.products || "미입력"}
        </div>
        <div>
          <strong>주거래처:</strong> {formData.client || "미입력"}
        </div>
        <div>
          <strong>거래은행:</strong>{" "}
          {formData.bank.length > 0 ? formData.bank.join(", ") : "미입력"}
        </div>
        <div>
  <strong>공장규모:</strong>{" "}
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
        </div>
        <div>
          <strong>공장부지:</strong> {formData.factoryLand ? `${formData.factoryLand} 평` : "미입력"}
        </div>
        <div>
          <strong>공장건물:</strong> {formData.factoryBuilding ? `${formData.factoryBuilding} 평` : "미입력"}
        </div>
      </div>
    </div>
  );

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>📝 사업계획서</h1>
      <h2 style={{ marginTop: "30px" }}>📄 기본정보</h2>
      {renderCompanyInfo()}
      {renderPreview()}
    </div>
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