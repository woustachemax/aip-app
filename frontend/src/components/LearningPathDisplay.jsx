export const LearningPathDisplay = ({ result }) => {
    if (!result) {
      return <div className="text-gray-500 italic">Enter your goal to see the learning path.</div>;
    }
  
    return (
      <div className="rounded-md bg-white shadow-md p-6">
        <h2 className="text-lg font-semibold text-slate-800 mb-3">Learning Path:</h2>
        {typeof result === 'string' ? (
          <p className="text-slate-700 whitespace-pre-line">{result}</p>
        ) : (
          <pre className="whitespace-pre-wrap text-slate-700">{JSON.stringify(result, null, 2)}</pre>
        )}
      </div>
    );
  };