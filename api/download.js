export default function handler(req, res) {
  const { file } = req.query;

  // 允许下载的文件清单（防止恶意遍历目录）
  const fileList = {
    'demo.zip': {
      name: '演示工具包',
      size: '1.2 MB',
      desc: '包含常用开发工具、配置模板和示例代码'
    }
    // 后续新增文件在这里添加即可
  };

  // 校验文件是否存在
  if (!file || !fileList[file]) {
    return res.status(404).send('文件不存在或已下架');
  }

  // TODO: 正式使用建议接入 Vercel KV 持久化存储下载次数
  // 这里先实现基础下载逻辑，后续可以扩展计数、限速、防盗链

  // 302 重定向到静态文件，触发浏览器下载
  res.redirect(302, `/downloads/${file}`);
}
