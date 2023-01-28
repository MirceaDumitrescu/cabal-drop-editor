export const appendNewItem = async (selectedEl) => {
  const tbody = document.querySelector("#dropListTable > tbody");
  const html = `
    <tr item_id=${selectedEl.id || 0} class="item">
      <td><button class="btn btn-danger btn-sm deleteRow" id="delete">X</button></td>
      <td><input class="itemNumber" type="string" value="0" style="width: 40px;"></td>
      <td><input class="terrainIdx" type="string" value="0" style="width: 40px;"></td>
      <td colspan="2">
        <span class="itemLabel">${selectedEl.name || ""}</span>
      </td>
      <td><input class="dungeonId" type="string" value="0" style="width: 60px;"></td>
      <td><input class="TerrainMob" type="string" value="0" style="width: 60px;"></td>
      <td><input class="itemID" type="string" value=${selectedEl.id || 0} style="width: 60px;"></td>
      <td><input class="itemOpt" type="string" value="0" style="width: 60px;"></td>
      <td><input class="dropRate" type="string" value="0"></td>
      <td><input class="minLv"  type="string" value="0" style="width: 60px;"></td>
      <td><input class="maxLv" type="string" value="0" style="width: 60px;"></td>
      <td><input class="optPoolIdx" type="string" value="0" style="width: 60px;"></td>
      <td><input class="durationIdx" type="string" value="0" style="width: 60px;"></td>
    </tr>`;
  tbody.innerHTML += html;
};
