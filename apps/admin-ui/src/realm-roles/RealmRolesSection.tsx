import { PageSection } from "@patternfly/react-core";
import { KeyIcon, ShieldAltIcon } from "@patternfly/react-icons";
import { ReportStats } from "../components/report-stats/ReportStats";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useAdminClient } from "../admin-client";
import { RolesList } from "../components/roles-list/RolesList";
import { ViewHeader } from "../components/view-header/ViewHeader";
import { useAccess } from "../context/access/Access";
import { useRealm } from "../context/realm-context/RealmContext";
import helpUrls from "../help-urls";
import { toAddRole } from "./routes/AddRole";
import { toRealmRole } from "./routes/RealmRole";

export default function RealmRolesSection() {
  const { adminClient } = useAdminClient();

  const { realm } = useRealm();
  const { hasAccess } = useAccess();
  const isManager = hasAccess("manage-realm");
  const { t } = useTranslation();
  const [rolesCount, setRolesCount] = useState(0);

  useEffect(() => {
    // Roles usually don't have a direct count endpoint in strict types, using any.
    // If not available, we might fetch first page.
    // adminClient.roles.find() returns array.
    // There isn't a simple "count" for roles in keycloak admin API sometimes.
    // But let's try casting or just find().then(roles => length)
    // Actually listing all roles (max 1000) might work for count if partial.
    (adminClient.roles as any).find({}).then((roles: any[]) => setRolesCount(roles.length));
  }, [realm]);

  const loader = (first?: number, max?: number, search?: string) => {
    const params: { [name: string]: string | number } = {
      first: first!,
      max: max!,
    };

    const searchParam = search || "";

    if (searchParam) {
      params.search = searchParam;
    }

    return adminClient.roles.find(params);
  };

  return (
    <>
      <ViewHeader
        titleKey="titleRoles"
        subKey="roleExplain"
        helpUrl={helpUrls.realmRolesUrl}
      />
      <PageSection variant="light" className="pf-v5-u-p-lg">
        <ReportStats
          items={[
            {
              title: t("totalRoles"),
              value: rolesCount,
              icon: <KeyIcon />,
              variant: "purple",
            },
            {
              title: t("compositeRoles"),
              value: "-", // Placeholder
              icon: <ShieldAltIcon />,
              variant: "blue",
            }
          ]}
        />
      </PageSection>
      <PageSection variant="light" padding={{ default: "noPadding" }}>
        <RolesList
          loader={loader}
          toCreate={toAddRole({ realm })}
          toDetail={(roleId) =>
            toRealmRole({ realm, id: roleId, tab: "details" })
          }
          isReadOnly={!isManager}
        />
      </PageSection>
    </>
  );
}
