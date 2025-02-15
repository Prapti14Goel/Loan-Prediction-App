import { useState, useEffect } from "react";
import CreditImage from "../assets/credit-image.jpg";
import { InputField } from "./InputField";
import { SelectField } from "./SelectField";
import { Modal } from "./Modal";
import Report from "./Report";

const Form = () => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    employmentType: "Salaried",
    monthlyIncome: "",
    existingLoanAmount: "",
    creditScore: "",
  });
  const [step, setStep] = useState(1);
  const [eligibility, setEligibility] = useState(null);
  const [errors, setErrors] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [ineligibilityReasons, setIneligibilityReasons] = useState([]);
  const [reportData, setReportData] = useState([]);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("loanReports")) || [];
    setReportData(storedData);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required.";
    if (!formData.age || formData.age < 21 || formData.age > 60)
      newErrors.age = "Age must be between 21 and 60.";
    if (!formData.monthlyIncome || formData.monthlyIncome < 25000)
      newErrors.monthlyIncome = "Monthly income must be at least ₹25,000.";
    if (!formData.creditScore || formData.creditScore < 0 || formData.creditScore > 900)
      newErrors.creditScore = "Credit score must be between 0 and 900.";
    if (formData.existingLoanAmount && formData.existingLoanAmount < 0)
      newErrors.existingLoanAmount = "Loan amount cannot be negative.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const checkEligibility = (data) => {
    const { age, monthlyIncome, creditScore, existingLoanAmount } = data;
    const emi = existingLoanAmount / 12;
    const reasons = [];
    if (age < 21 || age > 60) reasons.push("Age must be between 21 and 60.");
    if (monthlyIncome < 25000) reasons.push("Monthly income must be at least ₹25,000.");
    if (creditScore < 650) reasons.push("Credit score must be above 650.");
    if (existingLoanAmount && monthlyIncome < emi * 2)
      reasons.push("Monthly income should be at least double the EMI.");
    setIneligibilityReasons(reasons);
    return reasons.length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const isEligible = checkEligibility(formData);
      setEligibility(isEligible);
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    const updatedReportData = [
      ...reportData,
      { ...formData, eligibility, ineligibilityReasons },
    ];
    localStorage.setItem("loanReports", JSON.stringify(updatedReportData));
    setReportData(updatedReportData);
  };

  const nextStep = () => {
    if (step === 1 && !formData.name) {
      setErrors({ ...errors, name: "Name is required." });
      return;
    }
    if (step === 2 && (!formData.age || formData.age < 21 || formData.age > 60)) {
      setErrors({ ...errors, age: "Age must be between 21 and 60." });
      return;
    }
    setStep(step + 1);
  };

  const gaugeOptions = {
    chart: {
      type: "radialBar",
      height: 350,
    },
    plotOptions: {
      radialBar: {
        startAngle: -90,
        endAngle: 90,
        hollow: {
          size: "70%",
        },
        track: {
          background: "#f3f4f6",
          strokeWidth: "100%",
          margin: 5,
        },
        dataLabels: {
          name: {
            show: true,
            fontSize: "16px",
            fontWeight: 600,
            offsetY: -10,
          },
          value: {
            show: true,
            fontSize: "32px",
            fontWeight: 600,
            offsetY: 16,
            formatter: (val) => `${formData.creditScore}`,
          },
        },
      },
    },
    colors: [formData.creditScore >= 650 ? "#22c55e" : "#ef4444"],
    labels: ["Your Credit Score"],
  };
  const gaugeSeries = [Math.min((formData.creditScore / 900) * 100, 100)];

  return (
    <div>
      <div className="flex flex-col lg:flex-row min-h-screen" id="form">

        <div className="lg:w-1/2 flex items-center justify-center bg-white">
          <img
            src={CreditImage}
            alt="Credit"
            className="max-w-full max-h-full object-contain"
          />
        </div>
        <div className="lg:w-1/2 p-6 bg-white shadow-md rounded-lg flex items-center justify-center">
          <div className="w-full max-w-md">
            <h1 className="text-2xl font-bold ">
              Welcome to <i className="fas fa-chart-line text-3xl text-yellow-400"></i>{" "}
              Loan Predictor
            </h1>
            <p className="mb-5 text-gray-500">Smart Predictions for Smarter Loans</p>
            {step === 1 && (
              <>
                <InputField
                  label="Name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  error={errors.name}
                />
                <button
                  onClick={nextStep}
                  className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                >
                  Next
                </button>
              </>
            )}
            {step === 2 && (
              <>
                <InputField
                  label="Age"
                  name="age"
                  type="number"
                  value={formData.age}
                  onChange={handleChange}
                  error={errors.age}
                />
                <button
                  onClick={nextStep}
                  className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                >
                  Next
                </button>
              </>
            )}
            {step === 3 && (
              <form onSubmit={handleSubmit}>
                <SelectField
                  label="Employment Type"
                  name="employmentType"
                  value={formData.employmentType}
                  onChange={handleChange}
                  options={[
                    { value: "Salaried", label: "Salaried" },
                    { value: "Self-Employed", label: "Self-Employed" },
                  ]}
                />
                <InputField
                  label="Monthly Income (₹)"
                  name="monthlyIncome"
                  type="number"
                  value={formData.monthlyIncome}
                  onChange={handleChange}
                  error={errors.monthlyIncome}
                />
                <InputField
                  label="Existing Loan Amount (₹)"
                  name="existingLoanAmount"
                  type="number"
                  value={formData.existingLoanAmount}
                  onChange={handleChange}
                  error={errors.existingLoanAmount}
                />
                <InputField
                  label="Credit Score"
                  name="creditScore"
                  type="number"
                  value={formData.creditScore}
                  onChange={handleChange}
                  error={errors.creditScore}
                />
                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                >
                  Check Eligibility
                </button>
              </form>
            )}
            <Modal
              isOpen={isModalOpen}
              onClose={closeModal}
              eligibility={eligibility}
              formData={formData}
              gaugeOptions={gaugeOptions}
              gaugeSeries={gaugeSeries}
              ineligibilityReasons={ineligibilityReasons}
            />
          </div>
        </div>
      </div>
      <Report reportData={reportData} />
    </div>
  );
};

export default Form;