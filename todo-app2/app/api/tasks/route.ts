

import Database from 'better-sqlite3';
import { NextResponse } from 'next/server';

// SQLite データベース接続
const db = new Database('todo.db');

// テーブル作成 (初回のみ実行)
db.exec(`
  CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    text TEXT NOT NULL,
    completed INTEGER NOT NULL DEFAULT 0
  );
`);

// API ハンドラ
export async function GET() {
  const tasks = db.prepare('SELECT * FROM tasks').all();
  return NextResponse.json(tasks);
}

export async function POST(req: Request) {
  const { text } = await req.json();
  const stmt = db.prepare('INSERT INTO tasks (text, completed) VALUES (?, 0)');
  stmt.run(text);
  return NextResponse.json({ success: true });
}

export async function PATCH(req: Request) {
  const { id } = await req.json();
  const task = db.prepare('SELECT completed FROM tasks WHERE id = ?').get(id);
  const newStatus = task.completed ? 0 : 1;
  db.prepare('UPDATE tasks SET completed = ? WHERE id = ?').run(newStatus, id);
  return NextResponse.json({ success: true });
}

export async function DELETE(req: Request) {
  const { id } = await req.json();
  db.prepare('DELETE FROM tasks WHERE id = ?').run(id);
  return NextResponse.json({ success: true });
}



