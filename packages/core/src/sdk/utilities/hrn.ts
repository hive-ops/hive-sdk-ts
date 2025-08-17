import { HiveResourceName, Resource } from "../../gen";

const resourceMap: { [group: string]: { [type: string]: Resource } } = {
  iam: {
    user: Resource.IAM_USER,
    organization: Resource.ORGANIZATION,
    project: Resource.PROJECT,
  },
};

/**
 * HRN (Hive Resource Name) is a string that represents a resource in the format:
 * hrn:<resource_group>:<resource_type>:<organization_name>:<project_name>:<resource_name>.
 * @param hrn
 * @returns
 */
const getHRNFromString = (hrn: string): HiveResourceName => {
  const [_, resourceGroup, resourceType, organizationName, projectName, resourceName] = hrn.split(":");
  return new HiveResourceName({
    organizationName,
    projectName,
    resourceName,
  });
};
