const bcrypt = require('bcryptjs');
const pool = require('../db');

const email = String(
  process.env.BOOTSTRAP_ADMIN_EMAIL
  || process.env.SEED_ADMIN_EMAIL
  || process.env.ADMIN_EMAIL
  || '',
).trim().toLowerCase();
const password = String(
  process.env.BOOTSTRAP_ADMIN_PASSWORD
  || process.env.SEED_ADMIN_PASSWORD
  || process.env.ADMIN_PASSWORD
  || '',
);
const name = String(process.env.BOOTSTRAP_ADMIN_NAME || 'Sonic Operator').trim();

function validate() {
  if (process.env.BOOTSTRAP_ACKNOWLEDGEMENT !== 'create-initial-admin') {
    throw new Error('BOOTSTRAP_ACKNOWLEDGEMENT=create-initial-admin is required');
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) {
    throw new Error('A valid bootstrap administrator email is required');
  }
  if (password.length < 12 || password.length > 72
    || !/[a-z]/.test(password) || !/[A-Z]/.test(password)
    || !/\d/.test(password) || !/[^A-Za-z0-9]/.test(password)) {
    throw new Error('The bootstrap password must be 12-72 characters and include upper, lower, number, and symbol classes');
  }
}

async function createAdmin() {
  validate();
  const existing = (await pool.query(
    'SELECT id,email,password_hash,is_active,role FROM users WHERE email=$1',
    [email],
  )).rows[0];
  if (existing) {
    if (!existing.is_active || existing.role !== 'ADMIN' || !(await bcrypt.compare(password, existing.password_hash))) {
      if (process.env.NODE_ENV === 'production') throw new Error('The operator already exists with different credentials, role, or state; refusing to modify it');
      const hash = await bcrypt.hash(password, 12);
      await pool.query("UPDATE users SET name=$1,password_hash=$2,role='ADMIN',is_active=TRUE WHERE id=$3", [name || 'Sonic Operator', hash, existing.id]);
    }
    console.log(`Operator already provisioned: ${email}`);
    return existing;
  }
  const hash = await bcrypt.hash(password, 12);
  const created = (await pool.query(
    "INSERT INTO users(name,email,password_hash,role,is_active) VALUES($1,$2,$3,'ADMIN',TRUE) RETURNING id,email,role",
    [name || 'Sonic Operator', email, hash],
  )).rows[0];
  console.log(`Operator provisioned: ${created.email}`);
  return created;
}

if (require.main === module) {
  createAdmin()
    .catch((error) => { console.error(error.message); process.exitCode = 1; })
    .finally(() => pool.end());
}

module.exports = createAdmin;
