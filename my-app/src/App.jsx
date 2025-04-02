import AvgCalculator from "./AvgCalculator";

function App() {
  return (
    <div>
      <AvgCalculator numberType="even" />
      <AvgCalculator numberType="primes" />
      <AvgCalculator numberType="fibo" />
      <AvgCalculator numberType="rand" />
    </div>
  );
}

export default App;
