import type { SharedModelOption } from "@oneagent/ui/lib/models/modelOptions";
import type { ProviderId } from "../settings";

export type ModelOption = SharedModelOption<ProviderId>;
export { parseModelValue, toModelValue } from "@oneagent/ui/lib/models/modelValue";
export {
  assistantMessageToText,
  normalizeErrorMessage,
} from "@oneagent/ui/lib/providers/errorMessage";
