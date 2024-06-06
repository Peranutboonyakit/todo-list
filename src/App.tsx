import { useContext, useEffect } from "react";
import { Observer } from "mobx-react-lite";

import "./App.css";
import { todoListContext } from "./contexts/todoList.context";
import Dropdown from "./components/Dropdown";
import Task from "./components/Task";
import LoadingIcon from "./components/Loading";
import Progress from "./components/Progress";

const App = () => {
  // ---------------
  //    STATE
  // ---------------
  const dropdownMenus = [
    { title: "All", value: "All" },
    { title: "Done", value: "Done" },
    { title: "Undone", value: "Undone" },
  ];

  // ---------------
  //    CONTEXT
  // ---------------
  const context = useContext(todoListContext);

  // ---------------
  //    EFFECT
  // ---------------
  useEffect(() => {
    context.getTodoList();
  }, [context]);
  // ---------------
  //    RENDER
  // ---------------
  return (
    <Observer>
      {() => (
        <div className="container">
          <div className="container-box">
            <div className="container-inner">
              <Progress />
              <div className="container-filter">
                <p
                  style={{ fontWeight: 500, fontSize: "24px", color: "black" }}
                >
                  Tasks
                </p>
                <Dropdown
                  value={context.selectedDropdown || "All"}
                  options={dropdownMenus || []}
                  onClick={async (v) => {
                    context.selectedDropdown = v;
                    await context.getTodoList();
                  }}
                />
              </div>
              <div style={{ marginTop: "16px" }}>
                {context.isLoading ? (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <LoadingIcon size={60} />
                  </div>
                ) : (
                  <>
                    <div className="task-section">
                      {context.todoList.map((item, i) => (
                        <div key={`${item?.title}_${i}`}>
                          <Task value={item} />
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
              <div className="add-task">
                <input
                  value={context.valueAddText || ""}
                  placeholder="Add your todo..."
                  type="text"
                  onChange={(e) => (context.valueAddText = e.target.value)}
                  onKeyDown={async (e) => {
                    if (e.key === "Enter" && context.valueAddText !== "") {
                      await context.postCreatedTask();
                    }
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </Observer>
  );
};

export default App;
