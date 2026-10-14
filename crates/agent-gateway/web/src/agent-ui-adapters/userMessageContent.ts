import { tokenizeUserMessage as tokenizeSharedUserMessage } from "@oneagent/ui/lib/chat/userMessageContent";

export {
  extractGitHubCommitSha,
  extractGitHubFileReference,
} from "@oneagent/ui/lib/chat/userMessageContent";

export function tokenizeUserMessage(...args: Parameters<typeof tokenizeSharedUserMessage>) {
  const [text, pastedTextFiles, options] = args;
  return tokenizeSharedUserMessage(text, pastedTextFiles, {
    ...options,
    legacyInlineFileMentions: true,
  });
}
