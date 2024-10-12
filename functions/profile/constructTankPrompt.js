const { TAlENT_TANK_TYPE, PITCH_TANK_TYPE, PRODUCT_TANK_TYPE } = require("../util/constants");
const { constructTalentPrompt } = require("./talent/constructTalentPrompt");
const { constructPitchPrompt } = require("./pitch/constructPitchPrompt");
const { constructProductPrompt } = require("./product/constructProductPrompt");

// TODO - fix logic
const constructTankPrompt = (Tank, JobDescription, Links, VCList) => {
   if (Tank === TAlENT_TANK_TYPE) {
    return constructTalentPrompt(JobDescription, Links);
   }

   else if (Tank === PITCH_TANK_TYPE) {
    return constructPitchPrompt(VCList, Links);
   }

   else if (Tank === PRODUCT_TANK_TYPE) {
    return constructProductPrompt(Links);
   }

   else {
    throw new Error(`Failed to construct Tank Prompt. Invalid tank type: ${Tank}`);
   }
};

module.exports = {
    constructTankPrompt
};