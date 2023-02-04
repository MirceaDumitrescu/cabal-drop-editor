import render, { getItemDropList } from "./render.js";
import { processMsgData, createTerrainDropList, getMonsters } from "./fileReader.js";
import { insertItemNames } from "./itemNames.js";
import { appendNewItem } from "./addItem.js";
import { createItemNumber } from "../../utils/utils.js";

const terrainFileInput = document.querySelector("#terrainFile");
const itemsFile = document.querySelector("#itemsFile");
const newItemBtn = document.querySelector(".addItemButton");
const generateListButton = document.querySelector(".generateListButton");

let itemDropList = [];
let cabalMsgDec;
let itemsList = [];
let selectedEl = {
  name: "",
  id: 0,
};

/**
 * @description - processes the terrain file and renders the drop list table
 */
terrainFileInput.addEventListener("change", async function (e) {
  itemDropList = await getItemDropList(e);
  render(itemDropList);
  calculateTotalDropRate();
  const deleteRowBtn = document.querySelectorAll("#delete");
  deleteRowBtn.forEach((el) => {
    el.addEventListener("click", function (e) {
      removeItem(e);
    });
  });
});

const calculateTotalDropRate = () => {
  const dropRate = document.querySelectorAll(".dropRate");
  let total = 0;
  dropRate.forEach((el) => {
    if (el.value == "") {
      return;
    }
    total += Number(el.value);
  });
  document.querySelector("#totalDropRate").textContent = total;
};

/**
 * @description - adds a new item to the drop list table
 */
newItemBtn.addEventListener("click", function () {
  if (itemDropList.length == 0) {
    return;
  }
  appendNewItem(selectedEl);
});

/**
 * @description - processes the cabal_msg.dec file and creates the drop down list for the terrain drop table
 * and implements the select2 library on the drop down list
 */
itemsFile.addEventListener("change", function () {
  const reader = new FileReader();
  reader.readAsText(this.files[0]);
  reader.onload = async function () {
    try {
      const result = await processMsgData(reader);
      itemsList = await createTerrainDropList(result);
      cabalMsgDec = await getMonsters(reader);
      $(".select2").select2();
      insertItemNames(itemsList);
    } catch (err) {
      console.error(err);
    }
  };
});

$(".select2").on("change", function () {
  const selected = document.querySelector(".select2");

  selectedEl.id = selected.value;
  selectedEl.name = selected.options[selected.selectedIndex].text;

  document.querySelector("#selectedItemId").textContent = selectedEl.id;
});

generateListButton.addEventListener("click", function () {
  if (itemDropList.length == 0) {
    return;
  }

  const items = document.querySelectorAll(".item");
  let list = "";
  items.forEach((el) => {
    const itemNumber = createItemNumber(el.querySelector(".itemNumber"));
    const terrainIdx = el.querySelector(".terrainIdx").value;
    const itemLabel = el.querySelector(".itemLabel").textContent || null;
    const itemID = el.querySelector(".itemID").value;
    const itemOpt = el.querySelector(".itemOpt").value || 0;
    const dropRate = el.querySelector(".dropRate").value || 0;
    const minLv = el.querySelector(".minLv").value || 1;
    const maxLv = el.querySelector(".maxLv").value || 200;
    const group = el.querySelector(".group").value || 0;
    const maxDropCnt = 0;
    const optPoolIdx = el.querySelector(".optPoolIdx").value || 0;
    const durationIdx = el.querySelector(".durationIdx").value || 0;

    const label = itemLabel ? itemLabel : "Undefined";

    list += `${itemNumber}\t${terrainIdx}\t${itemID}\t${itemOpt}\t${dropRate}\t${minLv}\t${maxLv}\t${group}\t${maxDropCnt}\t${optPoolIdx}\t${durationIdx}\t#${label}\r`;
  });
  $("#itemListModal").modal("show");
  $("#itemListContent").html(list);
});

export const removeItem = async (e) => {
  const item = e.target.parentElement.parentElement;
  item.remove();

  const itemId = item.getAttribute("item_id");
  const index = itemDropList.map((e) => e[4]).indexOf(itemId);
  itemDropList.splice(index, 1);
};
