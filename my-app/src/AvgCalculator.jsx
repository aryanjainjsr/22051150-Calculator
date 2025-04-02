import { useState } from "react";
import axios from "axios";

const API_BASE_URL = "http://20.244.56.144/evaluation-service";
const ACCESS_TOKEN = "YOUR_ACCESS_TOKEN_HERE";

const AvgCalculator = () => {
  const [numbers, setNumbers] = useState([]);
  const [prevState, setPrevState] = useState([]);
  const [currState, setCurrState] = useState([]);
  const [average, setAverage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchNumbers = async (type) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${API_BASE_URL}/${type}`, {
        headers: { Authorization: `Bearer ${ACCESS_TOKEN}` },
        timeout: 500, // 500ms timeout
      });
      
      const newNumbers = response.data.numbers;
      const uniqueNumbers = [...new Set([...currState, ...newNumbers])].slice(-10);
      
      setPrevState(currState);
      setCurrState(uniqueNumbers);
      setNumbers(newNumbers);
      setAverage(uniqueNumbers.length ? (uniqueNumbers.reduce((a, b) => a + b, 0) / uniqueNumbers.length).toFixed(2) : null);
    } catch (err) {
      setError("Failed to fetch numbers");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-gray-100 shadow-lg rounded-xl text-center">
      <h1 className="text-2xl font-bold mb-4">Average Calculator</h1>
      <div className="flex justify-center gap-4 mb-4">
        <button onClick={() => fetchNumbers("primes")} className="bg-blue-500 text-white px-4 py-2 rounded">Prime</button>
        <button onClick={() => fetchNumbers("fibo")} className="bg-green-500 text-white px-4 py-2 rounded">Fibonacci</button>
        <button onClick={() => fetchNumbers("even")} className="bg-purple-500 text-white px-4 py-2 rounded">Even</button>
        <button onClick={() => fetchNumbers("rand")} className="bg-red-500 text-white px-4 py-2 rounded">Random</button>
      </div>
      {loading && <p className="text-blue-600">Fetching numbers...</p>}
      {error && <p className="text-red-600">{error}</p>}
      <div className="mt-4 p-4 bg-white shadow rounded-lg">
        <h2 className="text-lg font-semibold">Previous State</h2>
        <p className="text-gray-700">{JSON.stringify(prevState)}</p>
      </div>
      <div className="mt-4 p-4 bg-white shadow rounded-lg">
        <h2 className="text-lg font-semibold">Current State</h2>
        <p className="text-gray-700">{JSON.stringify(currState)}</p>
      </div>
      <div className="mt-4 p-4 bg-white shadow rounded-lg">
        <h2 className="text-lg font-semibold">Fetched Numbers</h2>
        <p className="text-gray-700">{JSON.stringify(numbers)}</p>
      </div>
      <div className="mt-4 p-4 bg-white shadow rounded-lg">
        <h2 className="text-lg font-semibold">Average</h2>
        <p className="text-xl font-bold text-blue-600">{average ?? "N/A"}</p>
      </div>
    </div>
  );
};

export default AvgCalculator;
