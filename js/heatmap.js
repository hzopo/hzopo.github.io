const fs = require('fs');
const path = require('path');

hexo.extend.generator.register('heatmap', function () {

  const posts = hexo.locals.get('posts').toArray();

  const map = {};

  posts.forEach(post => {
    const date = new Date(post.date).toISOString().slice(0, 10);

    if (!map[date]) map[date] = 0;
    map[date] += 1;
  });

  const dir = path.join(hexo.public_dir, 'data');
  const file = path.join(dir, 'heatmap.json');

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  fs.writeFileSync(file, JSON.stringify(map, null, 2));
});