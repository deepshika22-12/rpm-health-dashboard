import React from 'react';
import { Bar } from 'react-chartjs-2';

const AnalyticsPage = () => {
  const data = {
    labels: ['Headache', 'Fever', 'Cough', 'Fatigue'],
    datasets: [
      {
        label: 'Symptom Frequency',
        data: [12, 19, 3, 5], // dummy/mock values
        backgroundColor: ['#36A2EB', '#FF6384', '#FFCE56', '#4BC0C0'],
      },
    ],
  };

  return (
    <div className="analytics">
      <h2>📊 Health Analytics</h2>
      <Bar data={data} />
    </div>
  );
};

export default AnalyticsPage;
