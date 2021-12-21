import { ROUTERS, MATERIALS } from './constants.jsx';

export const rpmCalculator = (sfm, bitDiameter, router) => {
  let rpms = sfm / (0.2618 * bitDiameter);
  if (router) {
    if (rpms > ROUTERS[router].maxRpms) {
      rpms = ROUTERS[router].maxRpms;
    } else if (rpms < ROUTERS[router].minRpms) {
      rpms = ROUTERS[router].minRpms;
    }
  }
  return Math.round(rpms);
};

export const plungeRateCalculator = (feedRate) => {
  return 0.5 * feedRate;
};

export const chipLoadCalculator = (bitDiameter, sfm) => {
  return (0.025 * bitDiameter) + (sfm/5000000);
};

export const feedRateCalculator = (rpm, fluteCnt, chipLoad) => {
  return rpm * fluteCnt * chipLoad;
};

export const dialNumCalculator = (rpms, router) => {
  if (router === 'Makita') {
    return rpms * 0.00025 - 1.5;
  } else if (router === 'DeWalt') {
    return rpms * 0.0005 - 7.5;
  }
  return 0;
};

export const stepOverCalculator = (bitDiameter) => {
  return 0.3 * bitDiameter;
};

export const renderUnit = (val, selectedUnit, suffix, numDec) => {
  if(selectedUnit === 'inches') {
    return `${val.toFixed(numDec)} ${selectedUnit}${suffix}`;
  }
  return `${(val * 25.4).toFixed(numDec)} ${selectedUnit}${suffix}`;
};

export const depthOfCutCalculator = (bitDiameter, material, model) => {
  if (model === 'E Series') {
    return 0.0119 * Math.pow(bitDiameter, -0.564) / MATERIALS[material].dFactor;
  } else if (model === 'KL7 Series') {
    return (0.1606 * Math.pow(bitDiameter, 5) - 0.9537 * Math.pow(bitDiameter, 4) + 2.0856 * Math.pow(bitDiameter, 3)
      - 2.0053 * Math.pow(bitDiameter, 2) + 0.7268 * bitDiameter + 0.015) / MATERIALS[material].dFactor;
  }
  return (-0.1414 * Math.pow(bitDiameter, 6) + 1.0412 * Math.pow(bitDiameter, 5)
    - 3.0450 * Math.pow(bitDiameter, 4) + 4.444 * Math.pow(bitDiameter, 3)
    - 3.2646 * Math.pow(bitDiameter, 2) + 0.9803 * bitDiameter + 0.0005) / MATERIALS[material].dFactor;
};