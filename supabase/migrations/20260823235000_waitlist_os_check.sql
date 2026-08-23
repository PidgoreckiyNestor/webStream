alter table public.waitlist
  add constraint waitlist_os_check
  check (os is null or os in ('Windows', 'macOS', 'Linux'))
  not valid;

-- NOT VALID protects deployment if historical rows contain older free-form values.
-- PostgreSQL still enforces the constraint for new inserts and updates.
