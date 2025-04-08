import { useState, useEffect } from "react";
import { GoalInput } from "../components/GoalInput";
import { LearningPathDisplay } from "../components/LearningPathDisplay";

const WavePattern = () => (
  <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
    <svg className="absolute bottom-0 left-0 w-full" viewBox="0 0 1440 320" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 216L40 213.3C80 211 160 205.7 240 192C320 168 400 136 480 133.3C560 131 640 158 720 181.3C800 205 880 224 960 221.3C1040 219 1120 205 1200 197.3C1280 189 1360 186 1440 186.7V320H0V216Z" fill="#9CA3AF" fillOpacity="0.2"/>
      <path d="M0 160L40 165.3C80 171 160 182.7 240 186C320 189 400 184 480 165.3C560 147 640 114 720 101.3C800 89 880 96 960 112C1040 128 1120 152 1200 160C1280 168 1360 160 1440 154.7V320H0V160Z" fill="#9CA3AF" fillOpacity="0.3"/>
    </svg>
  </div>
);

export const Functionality = () => {
  const [learningPath, setLearningPath] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const authToken = localStorage.getItem("authToken");
  const backendUrl = "http://localhost:8787/api/v1/app/generate-learning-path";

  const handleGoalSubmit = async (goal) => {
    setLoading(true);
    setLearningPath(null);
    setError(null);

    try {
      const response = await fetch(backendUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({ goal }),
      });

      if (response.ok) {
        const data = await response.json();
        setLearningPath(data);
      } else {
        const errorData = await response.json();
        setError(errorData.error || "Failed to generate learning path.");
      }
    } catch (err) {
      setError("Network error occurred.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    document.title = "Generate Learning Path - AIP App";
  }, []);

  return (
    <div className="min-h-screen bg-slate-800 py-6 flex flex-col justify-center sm:py-12 relative">
      <WavePattern />
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gray-400 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl opacity-30"></div>
        <div className="relative bg-white shadow-lg sm:rounded-3xl p-8">
          <h1 className="text-2xl font-bold text-slate-800 mb-6">Generate Your Learning Path</h1>
          <GoalInput onGoalSubmit={handleGoalSubmit} />

          {loading && <div className="text-gray-500 italic">Generating learning path...</div>}
          {error && <div className="text-red-500">{error}</div>}

          <LearningPathDisplay result={learningPath} />
        </div>
      </div>
    </div>
  );
};