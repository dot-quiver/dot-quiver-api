import { defaultOrganization } from "./defaults";
import _, { isArray, union, intersection, isObject } from "lodash";

/*-------------------------*\
 | Organization            |
\*-------------------------*/

// Possible organization key strings
export const possibleOrganizationKeys = Object.keys(defaultOrganization);

export const isOrganization = (candidate) => {
  const candidateKeys = Object.keys(candidate);
  const organizationCandidateKeysUnion = union(possibleOrganizationKeys, candidateKeys);
  
  const isObject_ = isObject(candidate);
  const objectKeysLowerEqualThan3 = candidateKeys.length <= 3;
  const areOrganizationKeys = organizationCandidateKeysUnion.length === 3;
  
  return isObject_ && objectKeysLowerEqualThan3 && areOrganizationKeys; 
}

export const areOrganizations = (candidates) => candidates.map(
  (candidate) => isOrganization(candidate)
);  

/*-------------------------*\
 | Assert items            |
\*-------------------------*/

// Default item key strings
let item2LengthKeys, item3LengthKeys;
item2LengthKeys = ["result", "expectation"];
item3LengthKeys = [...item2LengthKeys, "assertionMap"];

export const isAssertItem = (item) => {
  let keysCardinalityCondition;
  let necessaryKeysCondition;
  let functionTypeCondition;

  if (isArray(item)) {
    const item_length = item.length;
    keysCardinalityCondition = item_length === 2 || item_length === 3;
    functionTypeCondition = typeof item[1] === "function";

    return keysCardinalityCondition && functionTypeCondition;
  } else if (isObject(item)) {
    const object_keys = Object.keys(item);

    keysCardinalityCondition =
      object_keys.length === 2 || object_keys.length === 3;
    necessaryKeysCondition =
      intersection(object_keys, item2LengthKeys).length === 2 ||
      intersection(object_keys, item3LengthKeys).length === 3;
    functionTypeCondition = typeof item.assertionMap === "function";

    return (
      keysCardinalityCondition &&
      necessaryKeysCondition &&
      functionTypeCondition
    );
  } else return false;
};

export const areAssertItem = (candidates) => candidates.map(
  (candidate) => isAssertItem(candidate)
);