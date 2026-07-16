import { writeFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, '..');
const BASE_URL = 'https://birthday-sayang-vert.vercel.app';

const assets = [
  // Hero image
  { url: `${BASE_URL}/images/head.jpeg`, dest: 'public/images/head.jpeg' },
  // Letter/Surat image
  { url: `${BASE_URL}/images/surat.jpeg`, dest: 'public/images/surat.jpeg' },
  // Timeline images
  { url: `${BASE_URL}/images/tak-terlupakan1.jpeg`, dest: 'public/images/tak-terlupakan1.jpeg' },
  { url: `${BASE_URL}/images/tak-terlupakan2.jpeg`, dest: 'public/images/tak-terlupakan2.jpeg' },
  { url: `${BASE_URL}/images/tak-terlupakan3.jpeg`, dest: 'public/images/tak-terlupakan3.jpeg' },
  { url: `${BASE_URL}/images/tak-terlupakan4.jpeg`, dest: 'public/images/tak-terlupakan4.jpeg' },
  { url: `${BASE_URL}/images/tak-terlupakan5.jpeg`, dest: 'public/images/tak-terlupakan5.jpeg' },
  { url: `${BASE_URL}/images/tak-terlupakan6.jpeg`, dest: 'public/images/tak-terlupakan6.jpeg' },
  // Gallery images
  { url: `${BASE_URL}/images/momen-indah1.jpeg`, dest: 'public/images/momen-indah1.jpeg' },
  { url: `${BASE_URL}/images/momen-indah2.jpeg`, dest: 'public/images/momen-indah2.jpeg' },
  { url: `${BASE_URL}/images/momen-indah3.jpeg`, dest: 'public/images/momen-indah3.jpeg' },
  { url: `${BASE_URL}/images/momen-indah4.jpeg`, dest: 'public/images/momen-indah4.jpeg' },
  { url: `${BASE_URL}/images/momen-indah5.jpeg`, dest: 'public/images/momen-indah5.jpeg' },
  { url: `${BASE_URL}/images/momen-indah6.jpeg`, dest: 'public/images/momen-indah6.jpeg' },
  { url: `${BASE_URL}/images/momen-indah7.jpeg`, dest: 'public/images/momen-indah7.jpeg' },
  { url: `${BASE_URL}/images/momen-indah8.jpeg`, dest: 'public/images/momen-indah8.jpeg' },
  { url: `${BASE_URL}/images/momen-indah9.jpeg`, dest: 'public/images/momen-indah9.jpeg' },
  { url: `${BASE_URL}/images/momen-indah10.jpeg`, dest: 'public/images/momen-indah10.jpeg' },
  { url: `${BASE_URL}/images/momen-indah11.jpeg`, dest: 'public/images/momen-indah11.jpeg' },
  { url: `${BASE_URL}/images/momen-indah12.jpeg`, dest: 'public/images/momen-indah12.jpeg' },
  { url: `${BASE_URL}/images/momen-indah13.jpeg`, dest: 'public/images/momen-indah13.jpeg' },
  { url: `${BASE_URL}/images/momen-indah14.jpeg`, dest: 'public/images/momen-indah14.jpeg' },
  // Footer image
  { url: `${BASE_URL}/images/footer.jpeg`, dest: 'public/images/footer.jpeg' },
  // Video
  { url: `${BASE_URL}/videos/momen-indah-video.mp4`, dest: 'public/videos/momen-indah-video.mp4' },
];

async function downloadFile(url, dest) {
  const fullPath = join(projectRoot, dest);
  const dir = dirname(fullPath);
  if (!existsSync(dir)) {
    await mkdir(dir, { recursive: true });
  }
  
  try {
    const response = await fetch(url);
    if (!response.ok) {
      console.error(`❌ Failed: ${url} (${response.status})`);
      return false;
    }
    const buffer = Buffer.from(await response.arrayBuffer());
    await writeFile(fullPath, buffer);
    console.log(`✅ Downloaded: ${dest} (${(buffer.length / 1024).toFixed(1)}KB)`);
    return true;
  } catch (err) {
    console.error(`❌ Error downloading ${url}:`, err.message);
    return false;
  }
}

async function main() {
  console.log(`\n🚀 Downloading ${assets.length} assets from ${BASE_URL}...\n`);
  
  // Download in batches of 4
  const batchSize = 4;
  let success = 0;
  let failed = 0;
  
  for (let i = 0; i < assets.length; i += batchSize) {
    const batch = assets.slice(i, i + batchSize);
    const results = await Promise.all(
      batch.map(asset => downloadFile(asset.url, asset.dest))
    );
    success += results.filter(Boolean).length;
    failed += results.filter(r => !r).length;
  }
  
  console.log(`\n📊 Results: ${success} downloaded, ${failed} failed out of ${assets.length} total`);
}

main();
