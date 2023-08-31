import * as sqlite from "sqlite";
import sqlite3 from "sqlite3";

//////////////////////////////////////////
///////////////////////////////////////////
const db = await sqlite.open({
  filename: "./101.db",
  driver: sqlite3.Database,
});

await db.migrate();

// DELETE FUNCTION
export async function deleteGreetings(id) {
  const sql = `delete from greetings where id = ?`;
  await db.run(sql, [id]);
}
//await deleteGreetings(3);

// GET GREETING FUNCTION
export async function getGreetings() {
  const result = await db.all("select * from greetings");
  return result;
}
const result = await getGreetings();
console.log(result);

// UPDATE FUNCTION
export async function updateGreeting(language, greeting, id) {
  const sql = "update greetings set language = ?, greeting = ? where id = ?";
  await db.run(sql, [language, greeting, id]);
}
await updateGreeting("Venda", "NDA", 3);

// ADD GREETING FUNCTION
export async function addGreetings(language, greeting) {
  const existingGreeting = await db.get(
    "SELECT * FROM greetings WHERE language = ?",
    [language]
  );

  if (existingGreeting) {
    console.log(`Greeting for language '${language}' already exists.`);
  } else {
    const sql = `insert into greetings (language, greeting) values (?, ?)`;
    await db.run(sql, [language, greeting]);
  }
}
//await addGreetings("Xhosa", "Molo");