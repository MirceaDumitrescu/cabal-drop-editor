import render, { getItemDropList } from "./render.js";
import { processMsgData, createTerrainDropList } from "./fileReader.js";
import { insertItemNames } from "./itemNames.js";
import { appendNewItem } from "./addItem.js";

const terrainFileInput = document.querySelector("#terrainFile");
const itemsFile = document.querySelector("#itemsFile");
const newItemBtn = document.querySelector(".addItemButton");
const generateListButton = document.querySelector(".generateListButton");

let itemDropList = [];
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
  const deleteRowBtn = document.querySelectorAll("#delete");
  deleteRowBtn.forEach((el) => {
    el.addEventListener("click", function (e) {
      removeItem(e);
    });
  });
});

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

      $(".select2").select2();
      insertItemNames(itemsList);
    } catch (err) {
      console.error(err);
    }
  };
});

// /**
//  * @description Inserts the item names into the drop list table and changes the ID next to the drop down list
//  * based on the selected row in the drop list table
//  */
// document.querySelector("#dropListTable > tbody").addEventListener("click", function (event) {
//   if (event.target.tagName == "TD") {
//     let activeRows = document.querySelectorAll("tr.active");
//     for (const element of activeRows) {
//       element.classList.remove("active");
//     }
//     event.target.parentElement.classList.add("active");
//     let itemId = event.target.parentElement.getAttribute("item_id");
//     document.querySelector("#selectedItemId").textContent = itemId;
//     selectedRow = itemId;
//     selectedEl = event.target;
//     document.querySelector(".select2").value = itemId;
//     let evt = new Event("change");
//     document.querySelector(".select2").dispatchEvent(evt);
//   }
// });

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
    console.log(el);
    const itemNumber = el.querySelector(".itemNumber").value;
    const terrainIdx = el.querySelector(".terrainIdx").value;
    const dungeonID = el.querySelector(".dungeonId").value || 0;
    const TerrainMobID = el.querySelector(".TerrainMob").value || 0;
    const itemLabel = el.querySelector(".itemLabel").textContent || null;
    const itemID = el.querySelector(".itemID").value;
    const itemOpt = el.querySelector(".itemOpt").value || 0;
    const dropRate = el.querySelector(".dropRate").value || 0;
    const minLv = el.querySelector(".minLv").value || 1;
    const maxLv = el.querySelector(".maxLv").value || 200;
    const group = 0;
    const maxDropCnt = 0;
    const optPoolIdx = el.querySelector(".optPoolIdx").value || 0;
    const durationIdx = el.querySelector(".durationIdx").value || 0;
    const dropSvrCh = 0;
    const eventDropOnly = 0;

    list += `${itemNumber}\t${terrainIdx}\t${dungeonID}\t${TerrainMobID}\t${itemID}\t${itemOpt}\t${dropRate}\t${minLv}\t${maxLv}\t${group}\t${maxDropCnt}\t${optPoolIdx}\t${durationIdx}\t${dropSvrCh}\t${eventDropOnly}\t// ${
      itemLabel ? itemLabel : ""
    }\r`;
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
