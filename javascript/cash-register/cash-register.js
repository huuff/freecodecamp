const unitToValue = {
  "ONE HUNDRED": 100,
  "TWENTY": 20,
  "TEN": 10,
  "FIVE": 5,
  "ONE": 1,
  "QUARTER": 0.25,
  "DIME": 0.1,
  "NICKEL": 0.05,
  "PENNY": 0.01
};

class UsedChange {
  constructor() {
    for (const property in unitToValue) {
      this[property] = 0;
    }
  }

  add(unit) {
    //this[unit] += unitToValue[unit];
    this[unit] = Number((this[unit] + unitToValue[unit]).toPrecision(15));
  }

  asArray() {
    let result = [];
    for (const property in this) {
      if (this[property] !== 0) {
        result.push([property, this[property]]);
      }
    }
    return result;
  }
}

function useBiggestChangeUnit(change, cid, currentUsedChange) {
  let newCid = [...cid].reverse();
  for (let unit of newCid) {
    const value = unitToValue[unit[0]];
    if (change >= value && unit[1] > 0) {
      change = (change - value).toFixed(2);
      unit[1] = (unit[1]-value).toFixed(2);
      currentUsedChange.add(unit[0]);
      return {
        change: change,
        cid: newCid.reverse(),
        currentUsedChange: currentUsedChange
      }
    }
  }

  return "INSUFFICIENT_FUNDS";
};

function isCIDEmpty(cid) {
  return cid.every(x => x[1] == 0);
}

function cloneCID(cid) {
  let newCID = [];
  for (let unit of cid) {
    newCID.push([...unit]);
  }
  return newCID;
}

function checkCashRegister(price, cash, cid) {
  const originalCID = cloneCID(cid);
  let neededChange = cash - price;
  let currentUsedChange = new UsedChange();

  while (neededChange > 0) {
    let getChange = useBiggestChangeUnit(neededChange, cid, currentUsedChange);
    if (getChange === "INSUFFICIENT_FUNDS") {
      return {
        status: getChange,
        change: []
      };
    } else {
      neededChange = getChange.change;
      cid = getChange.cid;
      currentUsedChange = getChange.currentUsedChange;
    }
  }

  return {
    status: isCIDEmpty(cid) ? "CLOSED" : "OPEN",
    change: isCIDEmpty(cid) ? originalCID : currentUsedChange.asArray()
  };
}

module.exports = checkCashRegister;

