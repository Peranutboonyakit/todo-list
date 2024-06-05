import { useContext, useRef, useState } from "react";
import { Observer } from "mobx-react-lite";

import { TodoListType } from "../types/types";
import { todoListContext } from "../contexts/todoList.context";
import { useClickOutside } from "../function";

interface TaskProps {
  value: TodoListType;
}

const Task = (props: TaskProps) => {
  // ---------------
  //    STATE
  // ---------------
  const [open, setOpen] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [editState, setEditState] = useState<TodoListType>({
    id: "",
    title: "",
    completed: false,
  });
  const ref: any = useRef();
  useClickOutside(ref, () => {
    setOpen(false);
  });

  // ---------------
  //    CONTEXT
  // ---------------
  const context = useContext(todoListContext);

  // ---------------
  //    RENDER
  // ---------------
  return (
    <Observer>
      {() => (
        <>
          {isEdit ? (
            <div className="edit-task">
              <input
                value={editState?.title || ""}
                placeholder="Edit your todo..."
                type="text"
                onChange={(e) => {
                  setEditState({ ...editState, title: e.target.value });
                }}
              />
              <div
                className="submit-button"
                style={{
                  cursor: editState.title === "" ? "not-allowed" : "pointer",
                  backgroundColor: editState.title === "" ? "gray" : "#454073",
                  opacity: editState.title === "" ? 0.4 : 1,
                }}
                onClick={async () => {
                  if (editState.title !== "") {
                    await context.putEditTask(editState);
                    setIsEdit(false);
                    setEditState({ id: "", title: "", completed: false });
                  }
                }}
              >
                Save
              </div>
            </div>
          ) : (
            <div className="task">
              <div style={{ display: "flex", alignItems: "center" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: props.value.completed
                      ? "#585292"
                      : "white",
                    border: "2px solid #585292",
                    width: "22px",
                    height: "22px",
                    borderRadius: "6px",
                    cursor: "pointer",
                    marginRight: "12px",
                    flexShrink: 0,
                  }}
                  onClick={async () => {
                    await context.putCheckedTask(props.value);
                  }}
                >
                  <img src="/images/check.png" width={10} height={8} />
                </div>
                <div
                  style={{
                    textDecoration: props.value.completed
                      ? "line-through"
                      : "none",
                    color: props.value.completed ? "#A9A9A9" : "#2E2E2E",
                    width: "100%",
                    paddingRight: "4px",
                    wordBreak: "break-word",
                  }}
                >
                  {props.value?.title || "-"}
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                }}
              >
                <img
                  src="/images/dots.png"
                  style={{
                    width: "19px",
                    height: "5px",
                    cursor: "pointer",
                  }}
                  ref={ref}
                  onClick={() => setOpen(!open)}
                />
                {open && (
                  <div className="container-setting">
                    <div
                      className="setting"
                      onClick={() => {
                        setIsEdit(true);
                        setEditState(props.value);
                      }}
                    >
                      Edit
                    </div>
                    <div
                      className="setting"
                      style={{ color: "#E07C7C" }}
                      onClick={async () => {
                        await context.deletedTask(props.value.id);
                      }}
                    >
                      Delete
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </>
      )}
    </Observer>
  );
};

export default Task;
