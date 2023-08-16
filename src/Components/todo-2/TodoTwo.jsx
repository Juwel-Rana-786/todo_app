import React, { useEffect, useState } from "react";
import todoImg from "./img/img.svg";
import "./todo-2Style.scss";

const getLocalItems = () => {
  let list = localStorage.getItem("lists");

  if (list) {
    return JSON.parse(localStorage.getItem("lists"));
  } else {
    return [];
  }
};
const TodoTwo = () => {
  const [addItems, setItems] = useState("");
  const [storeItems, setStoreItems] = useState(getLocalItems());

  //new item added
  const addNewItem = () => {
    if (!addItems) {
      alert("Please Write Something");
    } else {
      setStoreItems([...storeItems, addItems]);
      setItems("");
    }
  };

  // remove each item
  const removeItem = (index) => {
    const updateItem = storeItems.filter((value, id) => {
      return index !== id;
    });
    setStoreItems(updateItem);
  };

  // reomveAll data
  const reomveAll = () => {
    setStoreItems([]);
  };
  //local storage
  useEffect(() => {
    localStorage.setItem("lists", JSON.stringify(storeItems));
  }, [storeItems]);

  return (
    <>
      <div className="main_div">
        <div className="child_div">
          <figure>
            <img src={todoImg} alt="todoImage" />
          </figure>
          <figcaption>Add Your List Here ✌️</figcaption>
          <div className="addItems">
            <input
              type="text"
              placeholder="✍️ Add Items..."
              value={addItems}
              onChange={(e) => setItems(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  addNewItem();
                } else {
                }
              }}
            />
            <button title="Add item" onClick={addNewItem}>
              +
            </button>
          </div>

          <div className="listItems">
            {storeItems.map((item, index) => {
              return (
                <div key={index} className="item">
                  <span>{item}</span>
                  <span className="remove" onClick={() => removeItem(index)}>
                    X
                  </span>
                </div>
              );
            })}
          </div>
          <div
            className="removeAll button-26 "
            role="button"
            onClick={reomveAll}
          >
            Remove All{" "}
          </div>
        </div>
      </div>
    </>
  );
};

export default TodoTwo;
