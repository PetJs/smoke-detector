import { useState } from 'react';
import Select from 'react-select';

const genderOptions = [
  { value: 'Female', label: 'Female' },
  { value: 'Male', label: 'Male' },
];

const ansOptions = [
  { value: 'Yes', label: 'Yes' },
  { value: 'No', label: 'No' },
];

const residenceOptions = [
  { value: 'Rural', label: 'Rural' },
  { value: 'Urban', label: 'Urban' },
];

const workTypeOptions = [
  { value: 'Private', label: 'Private' },
  { value: 'Self-employed', label: 'Self-employed' },
  { value: 'Govt_job', label: 'Govt_job' },
  { value: 'children', label: 'children' },
  { value: 'Never_worked', label: 'Never_worked' },
];

const smokeHistoryOptions = [
  { value: 'never smoked', label: 'Never Smoked' },
  { value: 'formerly smoked', label: 'Formerly Smoked' },
  { value: 'Smokes', label: 'Smokes' },
  { value: 'Unknown', label: 'Unknown' },
];

function StrokeDetectionForm() {
  const [genderOption, setGenderOption] = useState(null);
  const [hypertensiveOption, setHypertensiveOption] = useState(null);
  const [heartDiseaseOption, setHeartDiseaseOption] = useState(null);
  const [workTypeOption, setWorkTypeOption] = useState(null);
  const [residenceOption, setResidenceOption] = useState(null);
  const [everMarriedOption, setEverMarriedOption] = useState(null)
  const [smokeHistoryOption, setSmokeHistoryOption] = useState(null);
  const [age, setAge] = useState('');
  const [bmi, setBmi] = useState('');
  const [avgGlucoseLevel, setAvgGlucoseLevel] = useState('');
  const [responseMessage, setResponseMessage] = useState('');
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);

  const handleCloseOverlay = () => {
    setIsOverlayVisible(false);
  };

  const handleChange = (setter) => (option) => {
    setter(option);
  };

  const handleNumberChange = (setter) => (event) => {
    setter(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('Form submitted');

    const formData = {
      gender: genderOption ? genderOption.value : '',
      age: age ? parseInt(age, 10) : null,
      hypertension: hypertensiveOption ? hypertensiveOption.value : '',
      heart_disease: heartDiseaseOption ? heartDiseaseOption.value : '',
      Residence_type:  residenceOption ? residenceOption.value : '',
      work_type:  workTypeOption ? workTypeOption.value : '',
      ever_married: everMarriedOption ?  everMarriedOption.value : '',
      smoking_status: smokeHistoryOption ? smokeHistoryOption.value : '',
      bmi: bmi ? parseFloat(bmi) : null,
      avg_glucose_level: avgGlucoseLevel ? parseFloat(avgGlucoseLevel) : null,
    };

    console.log(JSON.stringify(formData));

    try {
      const response = await fetch('https://stroke-detection-0abh.onrender.com/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      console.log('Success:', result);
      if (result.response === 'YES') {
        setResponseMessage('💔 You are liable to having a stroke');
      } else {
        setResponseMessage('😊 You are not liable to having a stroke');
      }
      setIsOverlayVisible(true);
    } catch (error) {
      console.error('Error:', error);
      setResponseMessage('An error occurred while predicting. Please try again.');
      setIsOverlayVisible(true);
    }
  };

  return (
    <>
      <div className="text-center my-8">
        <h3 className="text-2xl font-semibold">Check Your Stroke Risk</h3>
        <p className="text-lg">Enter your details to get an assessment.</p>
      </div>
      <form className="bg-white p-8 rounded-lg shadow-lg max-w-xl mx-auto" onSubmit={handleSubmit}>
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-medium mb-2">What is your Gender?</h2>
            <Select
              value={genderOption}
              onChange={handleChange(setGenderOption)}
              options={genderOptions}
              placeholder="Select Gender"
              className="mb-4"
            />
          </div>

          <div>
            <h2 className="text-lg font-medium mb-2">What is your Age?</h2>
            <input
              value={age}
              onChange={handleNumberChange(setAge)}
              type="number"
              className="w-full p-3 border rounded-lg bg-gray-200"
              placeholder="e.g. 44"
            />
          </div>

          <div>
            <h2 className="text-lg font-medium mb-2">Are you Hypertensive?</h2>
            <Select
              value={hypertensiveOption}
              onChange={handleChange(setHypertensiveOption)}
              options={ansOptions}
              placeholder="Select Hypertension"
              className="mb-4"
            />
          </div>

          <div>
            <h2 className="text-lg font-medium mb-2">Do you have Heart Disease?</h2>
            <Select
              value={heartDiseaseOption}
              onChange={handleChange(setHeartDiseaseOption)}
              options={ansOptions}
              placeholder="Select Heart Disease"
              className="mb-4"
            />
          </div>

          <div>
            <h2 className="text-lg font-medium mb-2">Did you ever married?</h2>
            <Select
              value={everMarriedOption}
              onChange={handleChange(setEverMarriedOption)}
              options={ansOptions}
              placeholder="Select Ever married"
              className="mb-4"
            />
          </div>

          <div>
            <h2 className="text-lg font-medium mb-2">What is your work type</h2>
            <Select
              value={workTypeOption}
              onChange={handleChange(setWorkTypeOption)}
              options={workTypeOptions}
              placeholder="Select Work type"
              className="mb-4"
            />
          </div>

          <div>
            <h2 className="text-lg font-medium mb-2">Where do you reside</h2>
            <Select
              value={residenceOption}
              onChange={handleChange(setResidenceOption)}
              options={residenceOptions}
              placeholder="Select Residence"
              className="mb-4"
            />
          </div>

          <div>
            <h2 className="text-lg font-medium mb-2">Any Smoking History?</h2>
            <Select
              value={smokeHistoryOption}
              onChange={handleChange(setSmokeHistoryOption)}
              options={smokeHistoryOptions}
              placeholder="Select Smoking Status"
              className="mb-4"
            />
          </div>

          <div>
            <h2 className="text-lg font-medium mb-2">BMI</h2>
            <input
              value={bmi}
              onChange={handleNumberChange(setBmi)}
              type="number"
              step="0.01"
              className="w-full p-3 border rounded-lg bg-gray-200"
              placeholder="e.g. 24.5"
            />
          </div>

          <div>
            <h2 className="text-lg font-medium mb-2">Average Glucose Level</h2>
            <input
              value={avgGlucoseLevel}
              onChange={handleNumberChange(setAvgGlucoseLevel)}
              type="number"
              step="1"
              className="w-full p-3 border rounded-lg bg-gray-200"
              placeholder="e.g. 120"
            />
          </div>

          <div className="text-center">
            <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700">
              Submit
            </button>
          </div>
        </div>
      </form>

      {responseMessage && isOverlayVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold text-center mb-4">{responseMessage}</h2>
            <button
              onClick={handleCloseOverlay}
              className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default StrokeDetectionForm;
