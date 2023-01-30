/**
 * @description - reads the file and returns the data
 * @param {*} file
 * @returns - a promise that resolves to the file data
 */
const fileReader = async (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => resolve(event.target.result);
    reader.onerror = (error) => reject(error);
    reader.readAsText(file.target.files[0]);
  });
};

/**
 * @description - processes the cabal_msg.dec file and returns an array of strings
 * @param {*} reader
 * @returns - array of strings
 */
const processMsgData = async (reader) => {
  return new Promise((resolve, reject) => {
    try {
      let result = reader.result.split("<item_msg>")[1].split('<msg id="item_desc1"')[0];
      result = result.replaceAll("msg", "option");
      result = result.replaceAll('id="item', 'value="');
      result = result.replaceAll('cont="', ">");
      result = result.replaceAll('" />', "</option>");
      result = result.replaceAll('"/>', "</option>");
      result = result.replaceAll("\t", "");
      result = result.replaceAll("\r", "");
      let splitByRow = result.split("\n");
      resolve(splitByRow);
    } catch (err) {
      reject(err);
    }
  });
};

/**
 * @description - get all monsters from the file
 */
const getMonsters = async (reader) => {
  return new Promise((resolve, reject) => {
    try {
      let result = reader.result.split("<mob_msg>")[1].split("</mob_msg>")[0];
      result = result.replaceAll('<msg id="', "id=");
      result = result.replaceAll('cont="', "name=");
      result = result.replaceAll('"', "");
      result = result.replaceAll('" />', "");
      result = result.replaceAll('"/>', "");
      result = result.replaceAll("/>", "");
      result = result.replaceAll("\t", "");
      result = result.replaceAll("\r", "");
      let splitByRow = result.split("\n");
      resolve(splitByRow);
    } catch (err) {
      reject(err);
    }
  });
};

/**
 * @description - processes the cabal_terrain_drop.dec file and returns an array of strings
 * @param {*} data
 * @returns - array of strings
 */
const processTerrainData = async (data) => {
  return new Promise((resolve, reject) => {
    try {
      let result = data
        .split(
          "[WorldDrop]	Terrain_World	DungeonID	Terrain_Mob	ItemKind	ItemOpt	DropRate	MinLv	MaxLv	Group	MaxDropCnt	OptPoolIdx	DurationIdx	DropSvrCh	EventDropOnly"
        )[1]
        .split("[")[0]
        .split("\n")
        .filter((el) => el !== "")
        .map((el) => el.split("\t"));
      resolve(result);
    } catch (err) {
      reject(err);
    }
  });
};

/**
 * @description - creates the drop down list for the terrain drop table
 * @param {*} data
 * @returns - array of objects
 */
const createTerrainDropList = async (data) => {
  return new Promise((resolve, reject) => {
    try {
      const itemsList = [];

      data.forEach((el) => {
        if (el != "" && el != "\r" && el != "\t\t") {
          let newOption = new Option(
            el.split('" >')[1].split("<")[0],
            el.split('value="')[1].split('" ')[0],
            true,
            true
          );

          const select = document.querySelector(".select2");
          select.appendChild(newOption);

          itemsList.push({
            value: el.split('value="')[1].split('" ')[0],
            text: el.split('" >')[1].split("<")[0],
          });

          resolve(itemsList);
        }
      });
    } catch (err) {
      reject(err);
    }
  });
};

export { fileReader, processMsgData, processTerrainData, createTerrainDropList, getMonsters };
