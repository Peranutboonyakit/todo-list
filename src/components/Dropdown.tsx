import { Observer } from "mobx-react-lite";
import { useState } from "react";

interface DropdownProps {
  value: string;
  options: Array<{ title: string; value: string }>;
  onClick: (value: string) => void;
}

const Dropdown = (props: DropdownProps) => {
  // ---------------
  //    STATE
  // ---------------
  const [openDropdown, setOpenDropdown] = useState<boolean>(false);

  // ---------------
  //    RENDER
  // ---------------
  return (
    <Observer>
      {() => (
        <div
          className="dropdown-section"
          onClick={() => setOpenDropdown(!openDropdown)}
        >
          <p style={{ fontWeight: 400, fontSize: "13px", color: "black" }}>
            {props.value || "-"}
          </p>
          <img
            src="/images/arrow-down.png"
            alt="arrow-down"
            style={{
              width: "10px",
              height: "7px",
              transform: openDropdown ? "rotate(180deg)" : "rotate(0)",
              transitionDuration: "500ms",
            }}
          />
          {openDropdown && (
            <div className="dropdown-menu">
              {props.options.map((item) => (
                <div
                  key={item?.value}
                  className="menu"
                  style={{
                    color: props?.value === item?.value ? "white" : "black",
                    backgroundColor:
                      props?.value === item?.value ? "#585292" : "",
                  }}
                  onClick={() => props.onClick(item?.value)}
                >
                  {item?.title || "-"}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </Observer>
  );
};

export default Dropdown;
