import { useMutation, UseMutationOptions } from "@tanstack/react-query"
import { textOnly } from "../services/promptService"

type MutationVars = { text: string };
type MutationData = string;
type MutationError = unknown;
type MutationContext = { loadingId: string }; // 👈 context type!

export const GetTextOnly = (
  options?: UseMutationOptions<
    MutationData,
    MutationError,
    MutationVars,
    MutationContext // 👈 context generic goes here!
  >
) => {
  return useMutation<
    MutationData,
    MutationError,
    MutationVars,
    MutationContext // 👈 context generic here too
  >({
    mutationFn: ({ text }: MutationVars) => {
      return textOnly(text); // your API function
    },
    ...options,
  });
};