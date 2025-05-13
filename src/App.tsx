import { useState } from "react";
import type { Ball } from "./types/ball.type";
import { LayoutGroup, motion } from "framer-motion";

const initialState: Ball[] = [
  { id: 1, color: "red" },
  { id: 2, color: "blue" },
  { id: 3, color: "green" },
  { id: 4, color: "orange" },
  { id: 5, color: "purple" },
];

const App = () => {
  const [sourceDivBalls, setSourceDivBalls] = useState<Ball[]>(initialState);
  const [targetDivBalls, setTargetDivBalls] = useState<Ball[]>([]);
  const toggleBall = (ball: Ball, fromSource: boolean) => {
    if (fromSource) {
      setSourceDivBalls((prev) => prev.filter((b) => b.id !== ball.id));
      setTargetDivBalls((prev) => [...prev, ball]);
    } else {
      setTargetDivBalls((prev) => prev.filter((b) => b.id !== ball.id));
      setSourceDivBalls((prev) => [...prev, ball]);
    }
  };
  return (
    <LayoutGroup>
      <div className="container">
        <div className="ballContainer">
          <h2 className="text">Court A</h2>
          <div className="ballArea" id="sourceDiv">
            {sourceDivBalls.map((ball) => (
              <motion.div
                key={ball.id}
                className="ball"
                style={{ backgroundColor: ball.color }}
                onClick={() => toggleBall(ball, true)}
                layoutId={ball.id.toString()}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                {ball.id}
              </motion.div>
            ))}
          </div>
        </div>

        <div className="ballContainer" id="targetDiv">
          <div className="ballArea">
            {targetDivBalls.map((ball) => (
              <motion.div
                key={ball.id}
                className="ball"
                style={{ backgroundColor: ball.color }}
                onClick={() => toggleBall(ball, false)}
                layoutId={ball.id.toString()}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                {ball.id}
              </motion.div>
            ))}
          </div>
          <h2 className="text">Court B</h2>
        </div>
      </div>
    </LayoutGroup>
  );
};

export default App;
