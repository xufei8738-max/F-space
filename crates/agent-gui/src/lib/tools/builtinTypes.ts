import type { Tool, ToolCall, ToolResultMessage } from "@earendil-works/pi-ai";

import type { SubagentScheduler } from "../subagents/scheduler";

export * from "@oneagent/ui/contracts/builtinTools";
export type {
  TaskItem,
  TaskListResultDetails,
  TaskListState,
  TaskStatus,
} from "@oneagent/ui/contracts/task";

import type { BuiltinToolBundleShape } from "@oneagent/ui/contracts/builtinTools";

export type BuiltinToolExecutionContext = {
  parentToolCall: ToolCall;
  subagentScheduler?: SubagentScheduler;
  emitToolCall?: (toolCall: ToolCall) => void;
  emitToolExecutionStart?: (toolCall: ToolCall) => void;
  emitToolResult?: (toolCall: ToolCall, toolResult: ToolResultMessage) => void;
  emitToolStatus?: (status: string | null) => void;
};

export type BuiltinToolExecutor = (
  toolCall: ToolCall,
  signal?: AbortSignal,
  context?: BuiltinToolExecutionContext,
) => Promise<ToolResultMessage>;

export type BuiltinToolBundle<TExtra extends object = object> = BuiltinToolBundleShape<
  Tool,
  BuiltinToolExecutor,
  TExtra
>;
