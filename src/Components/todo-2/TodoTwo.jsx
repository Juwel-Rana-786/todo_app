import React, { useEffect, useState } from "react";
import { BiPlusMedical } from "react-icons/bi";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
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
  const [toggle, setToggle] = useState(true);
  const [isEditItem, setIsEditItem] = useState(null);

  //new item added
  const addNewItem = () => {
    if (!addItems) {
      alert("Please fill Data");
    } else if (addItems && !toggle) {
      setStoreItems(
        storeItems.map((elem) => {
          if (elem.id === isEditItem) {
            return { ...elem, name: addItems };
          }
          return elem;
        })
      );
      setToggle(true);
      setItems("");
      setIsEditItem(null);
    } else {
      let allInputData = {
        id: new Date().getTime().toString(),
        name: addItems,
      };
      setStoreItems([...storeItems, allInputData]);
      setItems("");
    }
  };

  // remove each item
  const removeItem = (index) => {
    const updateItem = storeItems.filter((value) => {
      return index !== value.id;
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
  //edit items
  const editItem = (id) => {
    let newEditItem = storeItems.find((value) => {
      return value.id === id;
    });
    // console.log(newEditItem);
    setItems(newEditItem.name);
    setIsEditItem(id);
    setToggle(false);
  };
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
              {toggle ? <BiPlusMedical /> : <FaEdit />}
            </button>
          </div>

          <div className="listItems">
            {storeItems.map((item) => {
              return (
                <div key={item.id} className="item">
                  <span>{item.name}</span>
                  <div>
                    <span
                      className=" edit"
                      titel="Edit Item"
                      onClick={() => editItem(item.id)}
                    >
                      <FaEdit />
                    </span>
                    <span
                      className="remove"
                      onClick={() => removeItem(item.id)}
                    >
                      <MdDelete />
                    </span>
                  </div>
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
