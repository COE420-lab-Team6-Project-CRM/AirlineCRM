# Critical Path

Team 6, Airline CRM, Lab 4 (Exercises 6 and 7). Contributor: Rizwanul Abidin Asim (b00099449).

**Critical path:** T1 → T2 → T4 → T5 → T6 → T9 → T10 → T11

**Expected project duration:** 60 days (5 + 7 + 8 + 10 + 9 + 6 + 6 + 9)

The network diagram is in [Network_Schedule/PERT.png](Network_Schedule/PERT.png) and the tasks are defined in [WBS.md](WBS.md).

## Forward and backward passes

Day numbering is inclusive, so a task that starts on day 1 and lasts 5 days finishes on day 5 (EF = ES + duration - 1).

- **Forward pass.** Each task starts the day after the latest EF among its predecessors. Where a task has two predecessors the later one is used, so T4 starts on day 13 after T2 ends on day 12, and T9 starts on day 40 after T6 ends on day 39. T11 finishes on day 60.
- **Backward pass.** LF of T11 is set to day 60 and the pass works back with LS = LF - duration + 1, taking the LF of a task as one day before the earliest LS of its successors.
- **Slack** is LS - ES.

| Task | Duration | ES | EF | LS | LF | Slack |
|---|---:|---:|---:|---:|---:|---:|
| T1 | 5 | 1 | 5 | 1 | 5 | 0 |
| T2 | 7 | 6 | 12 | 6 | 12 | 0 |
| T3 | 6 | 6 | 11 | 7 | 12 | 1 |
| T4 | 8 | 13 | 20 | 13 | 20 | 0 |
| T5 | 10 | 21 | 30 | 21 | 30 | 0 |
| T6 | 9 | 31 | 39 | 31 | 39 | 0 |
| T7 | 7 | 31 | 37 | 33 | 39 | 2 |
| T8 | 6 | 31 | 36 | 40 | 45 | 9 |
| T9 | 6 | 40 | 45 | 40 | 45 | 0 |
| T10 | 6 | 46 | 51 | 46 | 51 | 0 |
| T11 | 9 | 52 | 60 | 52 | 60 | 0 |

T1, T2, T4, T5, T6, T9, T10 and T11 have zero slack and form an unbroken chain from the start of the project to the end, so a delay of one day on any of them delays the whole project. Their durations add up to 60 days, which matches the forward pass. The other tasks have slack because each runs alongside a longer branch: T3 has 1 day against T2, T7 has 2 days against T6, and T8 has 9 days because T10 must wait for T9.

## Verification

The passes were checked with the online CPM calculator on [atozmath.com](https://cbom.atozmath.com/CBOM/PertCPM.aspx), entering the same eleven tasks, durations and predecessors. The calculator numbers days from zero instead of one, so its start times are one day earlier than ours, but it gave the same critical path (T1-T2-T4-T5-T6-T9-T10-T11), the same slack for every task and the same project duration of 60 days.
