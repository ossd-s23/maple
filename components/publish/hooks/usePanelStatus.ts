import { hasDraftChanged } from "components/db"
import { isUndefined } from "lodash"
import { useAuth } from "../../auth"
import { usePublishState } from "./usePublishState"

export type PanelStatus =
  | "signedOut"
  | "unverified"
  | "loading"
  | "noTestimony"
  | "createInProgress"
  | "published"
  | "editInProgress"

/** What to display on the testimony panel on the bill detail page */
export const usePanelStatus = (): PanelStatus => {
  const { draft, publication, sync } = usePublishState()
  const { authenticated, user } = useAuth()
  const loading = sync !== "synced"

  if (!authenticated) {
    return "signedOut"
  } else if (loading) {
    return "loading"
  } else if (!user?.emailVerified) {
    return "unverified"
  } else if (!draft && !publication) {
    return "noTestimony"
  } else if (draft && !publication) {
    return "createInProgress"
  } else if (draft && hasDraftChanged(draft, publication)) {
    return "editInProgress"
  } else {
    return "published"
  }
}
