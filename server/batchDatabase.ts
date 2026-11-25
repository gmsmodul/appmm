import fs from 'fs';
import path from 'path';

export interface StoredBatchRecord {
  id: string;
  batchName: string;
  year: number;
  gmsAsal?: string;
  programEvent?: string;
  createdAt: string;
  updatedAt: string;
  graduationRule: Record<string, unknown>;
  examGradingRule: Record<string, unknown>;
  data: Record<string, unknown>;
}

export interface StoredBatchDatabase {
  activeBatchId: string;
  batches: StoredBatchRecord[];
}

export class BatchDatabaseManager {
  private filePath: string;
  private store: StoredBatchDatabase;

  constructor(dataDir = path.resolve(process.cwd(), 'server/data')) {
    this.filePath = path.join(dataDir, 'batches-db.json');
    this.store = this.loadFromDisk();
  }

  private ensureDirectoryExists(): void {
    const dir = path.dirname(this.filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  }

  private loadFromDisk(): StoredBatchDatabase {
    try {
      if (fs.existsSync(this.filePath)) {
        const raw = fs.readFileSync(this.filePath, 'utf-8');
        const parsed = JSON.parse(raw) as Partial<StoredBatchDatabase>;
        if (Array.isArray(parsed.batches)) {
          return {
            activeBatchId:
              typeof parsed.activeBatchId === 'string'
                ? parsed.activeBatchId
                : parsed.batches[0]?.id || '',
            batches: parsed.batches,
          };
        }
      }
    } catch {
      // Fallback to empty store so client can seed initial batch cleanly
    }
    return { activeBatchId: '', batches: [] };
  }

  private writeToDisk(): void {
    try {
      this.ensureDirectoryExists();
      fs.writeFileSync(this.filePath, JSON.stringify(this.store, null, 2), 'utf-8');
    } catch {
      // Ignore write errors in read-only environments
    }
  }

  getStore(): StoredBatchDatabase {
    return this.store;
  }

  replaceStore(nextStore: StoredBatchDatabase): StoredBatchDatabase {
    const validBatches = Array.isArray(nextStore.batches) ? nextStore.batches : [];
    const activeExists = validBatches.some((b) => b.id === nextStore.activeBatchId);
    this.store = {
      activeBatchId: activeExists ? nextStore.activeBatchId : validBatches[0]?.id || '',
      batches: validBatches,
    };
    this.writeToDisk();
    return this.store;
  }

  upsertBatch(batch: StoredBatchRecord): StoredBatchRecord {
    const idx = this.store.batches.findIndex((b) => b.id === batch.id);
    const updatedBatch: StoredBatchRecord = {
      ...batch,
      updatedAt: batch.updatedAt || new Date().toISOString(),
    };
    if (idx >= 0) {
      this.store.batches[idx] = updatedBatch;
    } else {
      this.store.batches.push(updatedBatch);
    }
    if (!this.store.activeBatchId) {
      this.store.activeBatchId = updatedBatch.id;
    }
    this.writeToDisk();
    return updatedBatch;
  }

  setActiveBatch(batchId: string): { ok: true; activeBatchId: string } | { ok: false; error: string } {
    const exists = this.store.batches.some((b) => b.id === batchId);
    if (!exists) {
      return { ok: false, error: 'Batch not found' };
    }
    this.store.activeBatchId = batchId;
    this.writeToDisk();
    return { ok: true, activeBatchId: batchId };
  }

  deleteBatch(batchId: string): { ok: true; store: StoredBatchDatabase } | { ok: false; error: string } {
    if (this.store.batches.length <= 1) {
      return { ok: false, error: 'Minimal 1 batch harus tersimpan di database.' };
    }
    const filtered = this.store.batches.filter((b) => b.id !== batchId);
    if (filtered.length === this.store.batches.length) {
      return { ok: false, error: 'Batch tidak ditemukan.' };
    }
    this.store.batches = filtered;
    if (this.store.activeBatchId === batchId) {
      this.store.activeBatchId = filtered[0]?.id || '';
    }
    this.writeToDisk();
    return { ok: true, store: this.store };
  }
}
