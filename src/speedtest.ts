import path from 'node:path';
import {execa} from 'execa';

export async function speedtest(url: string) {
  const ps = await execa(path.resolve(`bin/speedtest-${process.platform}`), [
    '--config',
    path.resolve('bin/speedtest.config.json'),
    '--test',
    url,
  ]);

  if (ps.failed) {
    throw new Error(ps.stderr || 'Unknown error!!!');
  }

  return ps.stderr;
}
