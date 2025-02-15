import Chart from "react-apexcharts"; 

export const Modal = ({ isOpen, onClose, eligibility, formData, gaugeOptions, gaugeSeries, ineligibilityReasons }) => {
    if (!isOpen) return null;
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg w-11/12 max-w-md">
          <h2 className="text-xl font-semibold mb-4">
            {eligibility
              ? "Congratulations! You are eligible for a loan."
              : "Sorry, you are not eligible for a loan."}
          </h2>
          {!eligibility && (
            <div className="mb-4">
              <h3 className="text-lg font-medium">Reasons for Ineligibility:</h3>
              <ul className="list-disc pl-5">
                {ineligibilityReasons.map((reason, index) => (
                  <li key={index} className="text-red-500">{reason}</li>
                ))}
              </ul>
            </div>
          )}
          <div className="mb-4">
            <h3 className="text-lg font-medium">Your Information:</h3>
            <p><strong>Name:</strong> {formData.name}</p>
            <p><strong>Age:</strong> {formData.age}</p>
            <p><strong>Employment Type:</strong> {formData.employmentType}</p>
            <p><strong>Monthly Income:</strong> ₹{formData.monthlyIncome}</p>
            <p><strong>Existing Loan Amount:</strong> ₹{formData.existingLoanAmount}</p>
            <p><strong>Credit Score:</strong> {formData.creditScore}</p>
          </div>
          <Chart options={gaugeOptions} series={gaugeSeries} type="radialBar" height={350} />
          <button
            onClick={onClose}
            className="mt-4 w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Close
          </button>
        </div>
      </div>
    );
  };
  