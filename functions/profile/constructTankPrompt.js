const { TAlENT_TANK_TYPE, PITCH_TANK_TYPE, PRODUCT_TANK_TYPE } = require("../util/constants");
const JEFF_BEZOS_PROFILE = require("./product/jeffBezos");
const PATTY_MCCORD_PROFILE = require("./talent/pattyMcCord");
const REID_HOFFMAN_PROFILE = require("./talent/reidHoffman");
const { constructTalentPrompt } = require("./talent/constructTalentPrompt");
const { constructPitchPrompt } = require("./pitch/constructPitchPrompt");
const { constructProductPrompt } = require("./product/constructProductPrompt");

// TODO - fix logic
const constructTankPrompt = ({Tank}) => {   
   if (Tank === TAlENT_TANK_TYPE) {
    return constructTalentPrompt({PATTY_MCCORD_PROFILE});
   }

   else if (Tank === PITCH_TANK_TYPE) {
    return constructPitchPrompt({REID_HOFFMAN_PROFILE});
   }

   else if (Tank === PRODUCT_TANK_TYPE) {
    return constructProductPrompt({JEFF_BEZOS_PROFILE});
   }

   else {
    throw new Error(`Failed to construct Tank Prompt. Invalid tank type: ${Tank}`);
   }
};

module.exports = {
    constructTankPrompt
};