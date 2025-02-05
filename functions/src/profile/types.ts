import {
  Boolean,
  Dictionary,
  Optional,
  Array,
  Record,
  Static,
  String
} from "runtypes"
import { Role } from "../auth/types"
import { Nullable } from "../common"

export const ProfileMember = Record({
  district: String,
  id: String,
  name: String
})
export type ProfileMember = Static<typeof ProfileMember>

export const Profile = Record({
  displayName: Optional(String),
  role: Optional(Role),
  representative: Optional(ProfileMember),
  senator: Optional(ProfileMember),
  public: Optional(Boolean),
  about: Optional(String),
  social: Optional(Dictionary(String)),
  organization: Optional(Boolean),
  orgCategories: Optional(Array(Nullable(String)))
})
export type Profile = Static<typeof Profile>
