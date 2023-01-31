import { fileReader, processTerrainData } from "./fileReader.js";

const render = async (data) => {
  const tbody = document.querySelector("#dropListTable > tbody");
  let html = "";
  data.forEach((el) => {
    console.log(el);
    html += `
      <tr item_id="${el[2]}" class="item">
      <td><button class="btn btn-danger btn-sm deleteRow" id="delete">X</button></td>
      <td><input class="itemNumber" type="string" value="${el[0]}" style="width: 40px;"></td>
      <td><input class="terrainIdx" type="string" value="${el[1]}" style="width: 40px;"></td>
      <td><input class="itemID" type="string" value="${el[2]}" style="width: 60px;"></td>
      <td><input class="itemOpt" type="string" value="${el[3]}" style="width: 60px;"></td>
      <td><input class="dropRate" type="string" value="${el[4]}" style="width: 60px;"></td>
      <td><input class="minLv"  type="string" value="${el[5]}" style="width: 60px;"></td>
      <td><input class="maxLv" type="string" value="${el[6]}" style="width: 60px;"></td>
      <td><input class="group" type="string" value="${el[7]}" style="width: 60px;"></td>
      <td><input class="optPoolIdx" type="string" value="${el[9]}" style="width: 60px;"></td>
      <td><input class="durationIdx" type="string" value="${el[10]}" style="width: 60px;"></td>
      <td colspan="2">
      <span class="itemLabel"></span>
      </td>
      </tr>`;
  });

  tbody.innerHTML += html;
};

export const getItemDropList = async (e) => {
  const result = await fileReader(e);
  const data = await processTerrainData(result);
  return data;
};

export default render;
