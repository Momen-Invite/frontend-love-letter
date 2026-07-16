import { readdirSync, writeFileSync, statSync } from 'fs';
import { join, extname } from 'path';

const GALLERY_BASE_PATH = 'public/images/gallery';
const OUTPUT_PATH = 'src/lib/gallery-manifest.json';

const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
const VIDEO_EXTENSIONS = ['.mp4', '.webm', '.mov'];

function scanGalleryFolder(categoryPath, categoryName) {
  try {
    const files = readdirSync(categoryPath);
    const items = [];
    let itemCounter = 1;

    for (const file of files) {
      const filePath = join(categoryPath, file);
      const stat = statSync(filePath);
      
      if (stat.isFile()) {
        const ext = extname(file).toLowerCase();
        const filenameWithoutExt = file.replace(ext, '');
        
        // Generate title from filename (capitalize first letter of each word)
        const title = filenameWithoutExt
          .replace(/[-_]/g, ' ')
          .split(' ')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
        
        if (IMAGE_EXTENSIONS.includes(ext)) {
          items.push({
            id: String(itemCounter).padStart(2, '0'),
            type: 'image',
            src: `/images/gallery/${categoryName}/${file}`,
            title: title,
            description: `Photo dari koleksi ${categoryName}`,
            category: categoryName
          });
          itemCounter++;
        } else if (VIDEO_EXTENSIONS.includes(ext)) {
          items.push({
            id: String(itemCounter).padStart(2, '0'),
            type: 'video',
            src: `/images/gallery/${categoryName}/${file}`,
            title: title,
            description: `Video dari koleksi ${categoryName}`,
            category: categoryName
          });
          itemCounter++;
        }
      }
    }

    return items;
  } catch (error) {
    console.warn(`Warning: Could not read category folder "${categoryName}":`, error.message);
    return [];
  }
}

function generateGalleryManifest() {
  const categories = ['romance', 'adventure', 'celebration'];
  const allItems = [];

  console.log('🖼️  Scanning gallery folders...');

  for (const category of categories) {
    const categoryPath = join(GALLERY_BASE_PATH, category);
    const items = scanGalleryFolder(categoryPath, category);
    
    console.log(`  ✓ ${category}: ${items.length} items found`);
    allItems.push(...items);
  }

  const manifest = {
    categories: categories.map(cat => ({
      id: cat,
      label: cat.charAt(0).toUpperCase() + cat.slice(1)
    })),
    items: allItems,
    generatedAt: new Date().toISOString()
  };

  writeFileSync(OUTPUT_PATH, JSON.stringify(manifest, null, 2), 'utf-8');
  console.log(`\n✅ Gallery manifest generated: ${allItems.length} total items`);
  console.log(`   Output: ${OUTPUT_PATH}\n`);
}

// Run the script
generateGalleryManifest();
