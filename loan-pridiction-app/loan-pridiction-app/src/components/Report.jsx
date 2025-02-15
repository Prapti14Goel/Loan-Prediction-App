import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

const Report = ({ reportData }) => {
  const [selectedReport, setSelectedReport] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);


  const openModal = (report) => {
    setSelectedReport(report);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedReport(null);
    setIsModalOpen(false);
  };

  return (
    <div className="mb-10" id="reports">
      <h2 className="text-xl font-bold mb-4 bg-blue-900 text-center text-white py-2">Loan Reports</h2>
      {reportData.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-center m-4">
          {reportData.map((report, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition duration-300 transform hover:scale-105 cursor-pointer"
              onClick={() => openModal(report)}
            >
              <p><strong>Name:</strong> {report.name}</p>
              <p><strong>Age:</strong> {report.age}</p>
              <p><strong>Employment Type:</strong> {report.employmentType}</p>
              <p>
                <strong>Eligibility:</strong>{" "}
                <span
                  className={`font-bold ${
                    report.eligibility ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {report.eligibility ? "Eligible" : "Not Eligible"}
                </span>
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600">No reports available.</p>
      )}

      {/* Modal */}
      {isModalOpen && selectedReport && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg">
            <h2 className="text-xl font-bold mb-4 text-center">Loan Report Details</h2>
            <p><strong>Name:</strong> {selectedReport.name}</p>
            <p><strong>Age:</strong> {selectedReport.age}</p>
            <p><strong>Employment Type:</strong> {selectedReport.employmentType}</p>
            <p><strong>Monthly Income:</strong> ₹{selectedReport.monthlyIncome}</p>
            <p><strong>Existing Loan Amount:</strong> ₹{selectedReport.existingLoanAmount}</p>
            <p><strong>Credit Score:</strong> {selectedReport.creditScore}</p>
            <p>
              <strong>Eligibility:</strong>{" "}
              <span
                className={`font-bold ${
                  selectedReport.eligibility ? "text-green-600" : "text-red-600"
                }`}
              >
                {selectedReport.eligibility ? "Eligible" : "Not Eligible"}
              </span>
            </p>

            {/* Credit Score Chart */}
            <div className="mt-4">
              <h3 className="font-bold mb-2 text-center">Credit Score Chart</h3>
              <ReactApexChart
                options={{
                  chart: {
                    type: "radialBar",
                    height: 250,
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
                          fontSize: "24px",
                          fontWeight: 600,
                          offsetY: 16,
                          formatter: (val) => `${selectedReport.creditScore}`,
                        },
                      },
                    },
                  },
                  colors: [selectedReport.creditScore >= 650 ? "#22c55e" : "#ef4444"],
                  labels: ["Your Credit Score"],
                }}
                series={[Math.min((selectedReport.creditScore / 900) * 100, 100)]}
                type="radialBar"
                height={250}
              />
            </div>

            {!selectedReport.eligibility && (
              <div>
                <p><strong>Reasons for Ineligibility:</strong></p>
                <ul className="list-disc pl-5">
                  {selectedReport.ineligibilityReasons.map((reason, idx) => (
                    <li key={idx}>{reason}</li>
                  ))}
                </ul>
              </div>
            )}
            <div className="flex justify-end mt-4">
              <button
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition duration-300"
                onClick={closeModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Report;