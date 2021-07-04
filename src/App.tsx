import React from "react";
import "styles/App.scss";
import { Debug } from "./components/debug";
import { Display } from "./components/display";
import { GameBar } from "./components/gamebar";
import { Hierarchy } from "./components/hierarchy";
import { Painel, PainelSlot } from "./components/painel";


function App() {
  return (
    <div id="App">
      <PainelSlot
        horizontal={true}
        painels={[
          {
            ratio: 0.8,
            render: (props) => (
              <Painel
                {...props}
                pages={[
                  {
                    name: "display",
                    element: () => <Display />,
                  },
                ]}
              />
            ),
          },
          {
            ratio: 0.2,
            render: (props) => (
              <PainelSlot
                {...props}
                painels={[
                  {
                    render: (props) => (
                      <Painel
                        {...props}
                        pages={[
                          {
                            name: "Hierarquia",
                            element: () => <Hierarchy />,
                          },
                          {
                            name: "display",
                            element: () => <Display />,
                          },
                        ]}
                      />
                    ),
                  },
                  {
                    render: (props) => (
                      <Painel
                        {...props}
                        pages={[
                          {
                            name: "Console",
                            element: () => <Debug/>,
                          },
                          {
                            name: "display",
                            element: () => <Display />,
                          },
                        ]}
                      />
                    ),
                  },
                ]}
              />
            ),
          },
        ]}
      />
      <GameBar />
    </div>
  );
}

export default App;
