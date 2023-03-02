import * as fs from 'fs/promises';

export async function existFolder(path: string): Promise<boolean> {
    try {
        await fs.access(path);
        return true;
    } catch(e) {
        return false;
    }
}
