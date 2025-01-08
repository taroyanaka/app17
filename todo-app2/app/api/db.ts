// app/api/db.ts
import Database from 'better-sqlite3';

// データベース接続
const db = new Database('todo.db');

// タスクの全取得
export function getAllTasks() {
  const stmt = db.prepare('SELECT * FROM tasks');
  return stmt.all();
}

// タスクの追加
export function addTask(text: string) {
  const stmt = db.prepare('INSERT INTO tasks (text, completed) VALUES (?, 0)');
  stmt.run(text);
}

// タスクの更新 (完了状態の切り替え)
export function toggleTask(id: number) {
  const task = db.prepare('SELECT completed FROM tasks WHERE id = ?').get(id);
  const newStatus = task.completed ? 0 : 1;
  db.prepare('UPDATE tasks SET completed = ? WHERE id = ?').run(newStatus, id);
}

// タスクの削除
export function deleteTask(id: number) {
  db.prepare('DELETE FROM tasks WHERE id = ?').run(id);
}
