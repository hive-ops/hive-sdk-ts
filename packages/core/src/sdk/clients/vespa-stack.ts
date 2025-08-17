import { Organization, VespaDatabaseStack } from "../../gen";
import { createBeekeeperClient } from "./beekeeper";
import { createDroneClient } from "./drone";

export const getOrganizationByName = async (organizationName: string): Promise<Organization> => {
  const orgRes = await createDroneClient().getOrganizationByName({
    name: organizationName,
  });
  if (!orgRes.organization) {
    throw new Error(`Organization with name ${organizationName} not found`);
  }
  return orgRes.organization;
};

export const getProjectByName = async (organization: Organization, projectName: string) => {
  const projectRes = await createDroneClient().getProjectByName({
    hri: organization.hri,
    name: projectName,
  });
  if (!projectRes.project) {
    throw new Error(`Project with name ${projectName} not found`);
  }
  return projectRes.project;
};

export const getVespaDatabaseStackByHRNString = async (hrnStr: string): Promise<VespaDatabaseStack> => {
  const { organizationName, projectName, resourceName } = parseHRNString(hrnStr, "vespa", "stack");
  const organization = await getOrganizationByName(organizationName);
  const project = await getProjectByName(organization, projectName);

  const vespaStackRes = await createBeekeeperClient().getVespaDatabaseStackByName({
    hri: project.hri,
    stackName: resourceName,
  });
  if (!vespaStackRes.stack) {
    throw new Error(`Vespa database stack with HRN ${hrnStr} not found`);
  }
  return vespaStackRes.stack;
};
