
# game-center

## Initial administrator

Set `ADMIN_EMAIL` and `ADMIN_PASSWORD` in the backend environment before starting
the API to provision the initial administrator account. The password must be at
least 12 characters. Use a unique, strong password and keep it in your deployment
secret manager; do not commit credentials.

On startup, the backend creates the configured account with the administrator
role if the email is unused. It does not change an existing administrator's
password. If the email already belongs to a non-admin account, startup fails
with an explicit error rather than promoting that account. If neither variable
is set, automatic provisioning is skipped and a warning is logged.

Sign in through the admin portal at `/admin/login`. The backend accepts admin
sign-ins at `POST /auth/admin/login` and restricts administrator-only API
operations to accounts with the administrator role.
