import "./assets/styles/App.css";
import ControlPanel from "./components/control-panel/control-panel.component";

function App() {
  return (
    <div>
      <div id="container">
        <h2>4 em Linhas</h2>
        Este é o Componente App
      </div>
      <ControlPanel />
    </div>
  );
  
}

export default App;
// Esta linha também poderia ser eliminada
// e adefinição da funsão ser substituida
// export default function App() {