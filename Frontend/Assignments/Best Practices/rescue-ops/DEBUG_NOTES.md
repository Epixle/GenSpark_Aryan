Frontend Rescue Ops

In this file, I will go over 5 bugs that I introduced intentionally and how I fixed them

## 1) Hook used outside component
- Bug: Called `useState()` at top-level of a module (outside a component).
- Repro: App crashed with “Invalid hook call”.
- Correction: Moved hook usage into a component/custom hook (`useTasks`).

Bug 1 - App showed a blank page.  
- Cause: When BoardPage called the components, some parameters were misspelt.
- Correction: Corrected spelling

Bug 2 - makeID not importing properly
- Cause: Doing `export default makeID` in makeID.jsx did not work with `import { makeID } from ../components/makeID.jsx`
- Correction: Removed brackets and turned into `import makeID from ../components/makeID.jsx`

Bug 3 - Console warning: “Each child in a list should have a unique key prop.”
- Cause: Rendered tasks with `tasks.map(t => <TaskCard task={t} />)` but did not include `key` parameter.
- Correction: Added `key = {task.id}` in `Column.jsx`.

Bug 4 - Pressing Enter refreshed the page and duplicated behavior
- Cause: Form submit handler didn’t call `e.preventDefault()`.
- Correction: Added `e.preventDefault()` in `TaskForm.jsx` submit handler.

Bug 5 - UI was not update properly.
Cause: Was modifying the state directly instead of using an immutable update.
Fix: Used immutable update `setTasks(prev => [...prev, newTask])`