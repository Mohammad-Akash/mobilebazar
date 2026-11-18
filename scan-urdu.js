const fs = require('fs');
const path = require('path');

const urduWords = [
  'karein', 'kare', 'karo', 'nahi', 'nahin', 'ke liye', 'bhejein', 'bheja', 'shukriya', 'zaroori',
  'tayyar', 'rabta', 'qeemat', 'paise', 'mehfooz', 'ishtehaar', 'gunjaish', 'darj',
  'maloomat', 'waqt', 'chahiye', 'lekin', 'bohot', 'bohat', 'shuru', 'pehle', 'mil kar',
  'apna', 'apni', 'apne', 'muntakhib', 'tasveer', 'tasweer', 'madad', 'hoga', 'hogi', 'bhai',
  'hain', 'aap', 'hum', 'mujhe', 'khareed', 'farokht', 'behtar', 'munasib', 'asani', 'silsilay'
];

function scan(dir) {
  if (!fs.existsSync(dir)) return;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name !== 'node_modules' && entry.name !== '.next') {
        scan(full);
      }
    } else if (entry.name.endsWith('.ts') || entry.name.endsWith('.tsx')) {
      const content = fs.readFileSync(full, 'utf8');
      const found = urduWords.filter(w => new RegExp('\\b' + w + '\\b', 'i').test(content));
      if (found.length > 0) {
        console.log(full.replace(process.cwd() + path.sep, '') + ' => ' + found.join(', '));
      }
    }
  }
}

scan('app');
scan('src');
