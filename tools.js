import fs from "fs";
import path from "path";

// ===== 可配置区域 =====
const INPUT_FILE = "./remix-app/public/data/states.json"; // 或 ./data/cities.json
const OUTPUT_DIR = "./public/data"; // 输出目录
// =====================

async function splitJSON() {
  if (!fs.existsSync(INPUT_FILE)) {
    console.error(`❌ 输入文件不存在: ${INPUT_FILE}`);
    return;
  }

  const type = INPUT_FILE.includes("city") ? "cities" : "states";
  const rawData = JSON.parse(fs.readFileSync(INPUT_FILE, "utf-8"));
  const targetDir = path.join(OUTPUT_DIR, type);

  fs.mkdirSync(targetDir, { recursive: true });

  let count = 0;

  for (const [countryCode, items] of Object.entries(rawData)) {
    if (!Array.isArray(items)) continue;
    const filePath = path.join(targetDir, `${countryCode}.${type}.json`);

    // ✅ 只保留数组结构，不包国家层级
    const json = JSON.stringify(items);
    fs.writeFileSync(filePath, json);

    count++;
  }

  console.log(`✅ 已拆分 ${count} 个国家文件到 ${targetDir}`);
}

splitJSON().catch((err) => {
  console.error("💥 处理失败:", err);
});
