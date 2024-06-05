import { Observer } from "mobx-react-lite";
import { useContext } from "react";
import { todoListContext } from "../contexts/todoList.context";

const Progress = () => {
  // ---------------
  //    CONTEXT
  // ---------------
  const context = useContext(todoListContext);

  // ---------------
  //    HANDLE
  // ---------------
  const calculatePercent = () => {
    let result = (context.countCompleteTasks / context.totalTasks) * 100;
    return `${result.toFixed(2) || 0}%`;
  };

  // ---------------
  //    RENDER
  // ---------------
  return (
    <Observer>
      {() => (
        <div className="progress-section">
          <p style={{ fontWeight: 500, fontSize: "28px", color: "white" }}>
            Progress
          </p>
          <div className="percent-section">
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                backgroundColor: "white",
                width: calculatePercent(),
                height: "100%",
                borderRadius: "999px",
                transitionDuration: "1s",
              }}
            />
          </div>
          <p
            style={{
              fontWeight: 400,
              fontSize: "16px",
              color: "#EBB9B8",
              marginTop: "12px",
            }}
          >
            {context.countCompleteTasks || 0} completed
          </p>
        </div>
      )}
    </Observer>
  );
};

export default Progress;
