import { createSessionWorkbenchFeature } from "@oneagent/ui/lib/workbench/featureFlags";

export const sessionWorkbench = createSessionWorkbenchFeature(
  import.meta.env.VITE_ONEAGENT_SESSION_WORKBENCH,
);
