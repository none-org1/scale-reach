# Test Plan: ScaleReach.ai Clone Vertical Slice

## Flows to Test
- **F01**: Ingest & Process Video (Dashboard to Clip Review)
- **F02**: Review & Edit Clip
- **F03**: Batch Export

## Test Cases
| ID | Case | Description |
|---|---|---|
| F01-H1 | Happy Path | User submits a YouTube URL via Upload Modal. Backend accepts & returns status 'fetching'. |
| F01-E1 | Empty Input | Upload Modal submits with empty URL; validation shows error. |
| F01-E2 | Invalid URL | Upload Modal submits with non-YouTube/invalid URL; validation shows error. |
| F02-H1 | Edit Clip | User trims video in Editor; saving triggers re-render. |
| F03-H1 | Batch Export | User selects 3 clips in library and triggers batch download. |

## Accessibility Checklist
- [ ] Keyboard navigation for modal triggers.
- [ ] Accessible modal close button.
- [ ] Proper semantic headings for dashboard.
- [ ] ARIA labels for loading state.
