# Final Compile Checklist

状态：pending
Owner：worker-3 + leader

## Current loop snapshot
- 当前阶段：Pass B 初审已完成，已开出 `CRPG-01` ~ `CRPG-04`。
- 当前 compile gate：**BLOCK**。
- 直接原因：`docs/design/03-side-studies-and-loadout.md` 尚未完成，mixed-build / 精修 / tax-pick 审计不能放行。
- 复测前提：worker-1 完成 canon 返修后，worker-3 需按 `docs/working/crpg-systems-pressure-report.md` 的 Retest focus 逐项复测。

## Canon readiness
- [ ] `docs/design/00-rule-bible.md` remains the schema authority.
- [ ] `docs/design/01-main-disciplines.md` has 8 complete main disciplines.
- [ ] `docs/design/02-inheritances.md` has 24 inheritances at equal blueprint depth.
- [ ] `docs/design/03-side-studies-and-loadout.md` has no `TBD`.
- [ ] `docs/design/04-build-examples-and-audit.md` records final fantasy and CRPG verdicts.

## Loop readiness
- [ ] `docs/working/revision-tickets.md` has no open block ticket.
- [ ] `docs/working/revision-tickets.md` has no unresolved revise ticket.
- [ ] Wuxia fantasy pressure report has pass evidence.
- [ ] CRPG systems pressure report has pass evidence.

## Verification
- [ ] `git diff --check` passes.
- [ ] Placeholder boundary is preserved:
  - `LOADOUT_INTERFACE_PENDING`
  - `MERIDIAN_SLOT_COUNT_PENDING`
  - `SLOT_PRESSURE_ASSUMPTION_ONLY`
- [ ] Final change log is updated.
