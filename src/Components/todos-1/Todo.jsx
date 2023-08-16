import React, { useState } from "react";
import "./style.scss";

function Todo() {
  const [inputItems, setInputItems] = useState("");
  const [items, setItems] = useState([]);

  const inputI = (event) => {
    setInputItems(event.target.value);
  };
  const addNewItems = () => {
    // setItems((oldItem) => {
    //   return [...oldItem, inputItems];
    // });
    setItems([...items, inputItems]);
    setInputItems("");
  };

  const removeItems = (id) => {
    setItems((oldItem) => {
      return oldItem.filter((arrElem, index) => {
        return index !== id;
      });
    });
  };
  return (
    <>
      <div className="main_div">
        <div className="center_div">
          <br />
          <h1>ToDo List</h1>
          <br />
          <input
            required
            type="text"
            placeholder="Add a Items"
            value={inputItems}
            onChange={inputI}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                addNewItems();
              }
            }}
          />
          <button onClick={addNewItems}>+</button>

          <br />
          <div className="ol">
            {items.map((value, id) => {
              return (
                <span key={id} className="li">
                  <button
                    className="delete"
                    onClick={() => {
                      removeItems(id);
                    }}
                  >
                    X
                  </button>
                  {value}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default Todo;
