import { useState } from "react";

export const GoalInput = ({ onGoalSubmit }) => {
  const [goal, setGoal] = useState("");

  const handleChange = (e) => {
    setGoal(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (goal.trim()) {
      onGoalSubmit(goal);
      setGoal("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <label htmlFor="goal" className="block text-slate-800 text-sm font-medium mb-2">
        Your Goal:
      </label>
      <div className="relative rounded-md shadow-sm">
        <input
          type="text"
          id="goal"
          className="shadow-sm focus:ring-gray-400 focus:border-gray-400 block w-full sm:text-sm border-gray-300 rounded-md py-2 px-3 text-slate-800"
          placeholder="e.g., Learn about Python"
          value={goal}
          onChange={handleChange}
        />
        <div className="absolute inset-y-0 right-0 flex items-center">
          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-slate-800 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
          >
            Generate Path
          </button>
        </div>
      </div>
    </form>
  );
};