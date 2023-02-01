import { fileReader, processMsgData } from "./fileReader.js";

/**
 * @description Inserts the item names into the drop list table
 * @param {*} itemsList - array of objects
 */
const insertItemNames = async (itemsList) => {
  const items = document.querySelectorAll(".item");
  items.forEach((el) => {
    let itemId = el.getAttribute("item_id");
    let index = itemsList.map((e) => e.value).indexOf(itemId);
    let itemText = el.querySelector(".itemLabel");

    if (itemsList[index] == undefined) {
      itemText.textContent = "undefined";
      return;
    }

    if (itemsList[index].text == undefined) {
      itemText.textContent = "undefined";
      return;
    }

    itemText.textContent = itemsList[index].text;
  });
};

export { insertItemNames };
