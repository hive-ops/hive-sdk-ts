/**
 * HRN (Hive Resource Name) is a string that represents a resource in the format:
 * hrn:<resource_group>:<resource_type>:<organization_name>:<project_name>:<resource_name>.
 * @param hrn
 * @returns
 */
const parseHRNString = (hrn: string, group: string, type: string): { organizationName: string; projectName: string; resourceName: string } => {
  if (!hrn.startsWith("hrn:")) {
    throw new Error(`Invalid HRN format: ${hrn}`);
  }

  const parts = hrn.split(":");
  if (parts.length !== 6) {
    throw new Error(`Invalid HRN format: ${hrn}`);
  }

  const [_, _resourceGroup, _resourceType, organizationName, projectName, resourceName] = parts;

  if (_resourceGroup !== group || _resourceType !== type) {
    throw new Error(`HRN ${hrn} does not match expected format`);
  }

  return {
    organizationName,
    projectName,
    resourceName,
  };
};
