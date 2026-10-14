import type { BuiltinToolBundleShape } from "@oneagent/ui/contracts/builtinTools";
import type { Tool, ToolCall, ToolResultMessage } from "../agentTypes";

export * from "@oneagent/ui/contracts/builtinTools";
export type {
  TaskItem,
  TaskListResultDetails,
  TaskListState,
  TaskStatus,
} from "@oneagent/ui/contracts/task";

export type BuiltinToolExecutor = (
  toolCall: ToolCall,
  signal?: AbortSignal,
) => Promise<ToolResultMessage>;

export type BuiltinToolBundle<TExtra extends object = object> = BuiltinToolBundleShape<
  Tool,
  BuiltinToolExecutor,
  TExtra
>;
