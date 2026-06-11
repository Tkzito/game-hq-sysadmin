import { Challenge } from "../types";
import { MOD1_CHALLENGES } from "./challenges/mod1";
import { MOD1_GENERATED } from "./challenges/mod1_generated";
import { MOD2_CHALLENGES } from "./challenges/mod2";
import { MOD3_CHALLENGES } from "./challenges/mod3";
import { MOD4_CHALLENGES } from "./challenges/mod4";
import { MOD5_CHALLENGES } from "./challenges/mod5";
import { MOD6_CHALLENGES } from "./challenges/mod6";
import { MOD7_CHALLENGES } from "./challenges/mod7";
import { MOD8_CHALLENGES } from "./challenges/mod8";

export const CHALLENGES: Challenge[] = [
  ...MOD1_CHALLENGES,
  ...MOD1_GENERATED,
  ...MOD2_CHALLENGES,
  ...MOD3_CHALLENGES,
  ...MOD4_CHALLENGES,
  ...MOD5_CHALLENGES,
  ...MOD6_CHALLENGES,
  ...MOD7_CHALLENGES,
  ...MOD8_CHALLENGES
];
