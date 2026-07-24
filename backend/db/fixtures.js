const bcrypt = require('bcryptjs');
const pool = require('../db');

if (process.env.ALLOW_FIXTURE_SEED !== 'YES') { console.error('Refusing fixtures without ALLOW_FIXTURE_SEED=YES for an empty disposable database.'); process.exit(2); }
const password = String(process.env.FIXTURE_PASSWORD || '');
if (password.length < 16 || password.length > 72) { console.error('FIXTURE_PASSWORD must contain 16-72 characters.'); process.exit(2); }

async function fixtures() {
  const client=await pool.connect();
  try {
    await client.query('BEGIN ISOLATION LEVEL SERIALIZABLE');
    const hash=await bcrypt.hash(password,12);
    await client.query(`INSERT INTO users(name,email,password_hash,role) VALUES
      ('Fixture Creator','creator@example.test',$1,'CREATOR'),
      ('Fixture Reviewer','reviewer@example.test',$1,'REVIEWER'),
      ('Fixture Other','other@example.test',$1,'CREATOR')
      ON CONFLICT(email) DO UPDATE SET password_hash=EXCLUDED.password_hash, role=EXCLUDED.role`,[hash]);
    await client.query('COMMIT'); return {users:3};
  } catch(error){await client.query('ROLLBACK').catch(()=>{});throw error;} finally{client.release();}
}
if(require.main===module)fixtures().then((result)=>console.log(`Fixture status: ${JSON.stringify(result)}`)).catch((error)=>{console.error(error.message);process.exitCode=1;}).finally(()=>pool.end());
module.exports=fixtures;
