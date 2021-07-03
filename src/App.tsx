import React from "react";
import "styles/App.scss";
import { Display } from "./components/display";
import { GameBar } from "./components/gamebar";
import { Painel, PainelSlot } from "./components/painel";

function App() {
  return (
    <div id="App">
      <PainelSlot>
        <Painel pages={[
          {
            name: 'display',
            element: ()=><Display/>
          },
          {
            name: 'display',
            element: ()=><Display/>
          }
        ]} />
      </PainelSlot>
      <GameBar/>
    </div>
  );
}

export default App;
