/**
 * @description - processes the cabal_terrain_drop.dec file and returns an array of strings
 * @param {*} data
 * @returns - array of strings
 */
const processTerrainData = async (data) => {
  return new Promise((resolve, reject) => {
    try {
      let result = data
        .split("[MobsDrop]	TerrainIdx	SpeciesIdx	ItemKind	ItemOpt	DropRate	MinLv	MaxDropCnt	OptPoolIdx	DurationIdx")[1]
        .split("[")[0]
        .split("\n")
        .filter((el) => el !== "" || el !== "\r" || el !== "\t\t")
        .map((el) => el.split("\t"))
        .filter((el) => el.length > 1);
      console.log(result);
      resolve(result);
    } catch (err) {
      reject(err);
    }
  });
};

/**
 * @description creates item index number
 */

const createItemNumber = (el) => {
  const itemNumber = document.querySelectorAll(".itemNumber");

  if (itemNumber.length == 0) {
    el.value = 0;
    return;
  }

  const index = Array.from(itemNumber).indexOf(el);

  return index;
};

export { processTerrainData, createItemNumber };
