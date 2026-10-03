# Privacy, Confidentiality & Security Invariants

These rules are strict, non-negotiable invariants. The agent must strictly respect all entries configured in `.antigravityignore`.

## Strictly Prohibited Files and Folders
Under NO circumstances should you inspect, read, view, print, grep, cat, output, copy, or execute tools/commands targeting the following files or folders:

1. **Environment & Secrets**:
   - Any `.env` file or `.env.*` file (e.g. `.env`, `.env.local`, `.env.production`, `.env.staging`, etc.). Only safe template files named `.env.example` with placeholder values may be read.
   - `credentials.json` or any credential files.
   - Any files or directories inside `secrets/` or `private/`.
   - Any files or directories inside `~/.ssh/` or any `.ssh/` folder.
   - Any certificate or private key files (`*.pem`, `*.key`).
   - Any startup files or scripts matching `startup*` (e.g. `startup.sh`, `startup.js`).
   - Any files or directories inside `ApsonaServer/`.

## Mandatory Behavior
- NEVER run shell commands (`cat`, `grep`, `head`, `tail`, `awk`, `sed`, `less`, `more`, `strings`, `python`, `node`, etc.) that read or print the contents of any of the above forbidden files.
- NEVER use file tools (`view_file`, `replace_file_content`, `write_to_file`) to inspect or overwrite any of the above forbidden files.
- If an environment variable or configuration value is missing, suspected to be incorrect, or needs verification:
  - You must ONLY provide the variable name (e.g. `B2_KEY_ID`).
  - Ask the user to verify or add the variable in their private editor.
  - NEVER attempt to check the value yourself.
