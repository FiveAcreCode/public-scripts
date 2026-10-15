# Internal-tool operations

- Primary operator/workflow: `TODO`
- Local-only or hosted: `TODO`
- Supported commands or entry points: `TODO`
- Read-only mode: `TODO`
- Mutating/destructive modes and approval boundary: `TODO`
- Scheduling/trigger: manual until deliberately configured
- Observability and failure reporting: `TODO`
- Backup/restore/rollback: `TODO`
- Support owner: `TODO`

Every repeated run should expose its inputs, target, observation/execution time,
result, partial failures, and whether state changed. A failed read must not
replace the last good observation with fabricated healthy data.
