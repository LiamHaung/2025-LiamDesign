#!/usr/bin/env node

/**
 * Liam Design Studio - 測試頁面驗證腳本
 * Test Pages Validation Script
 */

const fs = require('fs');
const path = require('path');

// 測試頁面列表
const testPages = [
  { path: '/test-site', name: '測試網站主頁', file: 'src/app/test-site/page.tsx' },
  { path: '/component-test', name: '元件測試頁面', file: 'src/app/component-test/page.tsx' },
  { path: '/card-test', name: '卡片測試頁面', file: 'src/app/card-test/page.tsx' },
  { path: '/parallax-test', name: '視差效果測試', file: 'src/app/parallax-test/page.tsx' },
  { path: '/vertical-demo', name: '垂直滾動測試', file: 'src/app/vertical-demo/page.tsx' },
  { path: '/wave-boat-test', name: '波浪船隻測試', file: 'src/app/wave-boat-test/page.tsx' }
];

// 檢查文件是否存在
function checkFileExists(filePath) {
  const fullPath = path.join(process.cwd(), filePath);
  return fs.existsSync(fullPath);
}

// 檢查文件內容是否有效
function checkFileContent(filePath) {
  const fullPath = path.join(process.cwd(), filePath);
  try {
    const content = fs.readFileSync(fullPath, 'utf8');
    // 基本檢查：包含 React 組件和 export default
    const hasExportDefault = content.includes('export default');
    const hasReactContent = content.includes('React') || 
                           content.includes('useState') || 
                           content.includes('motion') ||
                           content.includes('notFound') ||
                           content.includes('Metadata');
    
    return hasExportDefault && hasReactContent;
  } catch (error) {
    return false;
  }
}

// 主驗證函數
function validateTestPages() {
  console.log('🧪 Liam Design Studio - 測試頁面驗證');
  console.log('🧪 Liam Design Studio - Test Pages Validation\n');

  let allValid = true;
  const results = [];

  testPages.forEach((page, index) => {
    const exists = checkFileExists(page.file);
    const valid = exists ? checkFileContent(page.file) : false;
    
    results.push({
      name: page.name,
      path: page.path,
      file: page.file,
      exists,
      valid,
      status: valid ? '✅ 有效' : exists ? '❌ 無效' : '❌ 不存在'
    });

    if (!valid) allValid = false;
  });

  // 顯示結果
  console.log('📋 驗證結果：');
  console.log('📋 Validation Results:\n');

  results.forEach((result, index) => {
    console.log(`${index + 1}. ${result.name}`);
    console.log(`   URL: http://localhost:3000${result.path}`);
    console.log(`   文件: ${result.file}`);
    console.log(`   狀態: ${result.status}`);
    console.log('');
  });

  // 總結
  const validCount = results.filter(r => r.valid).length;
  const totalCount = results.length;

  console.log('📊 總結：');
  console.log('📊 Summary:');
  console.log(`   有效頁面: ${validCount}/${totalCount}`);
  console.log(`   Valid pages: ${validCount}/${totalCount}`);

  if (allValid) {
    console.log('\n🎉 所有測試頁面都有效！');
    console.log('🎉 All test pages are valid!');
    console.log('\n🚀 可以啟動測試網站：');
    console.log('🚀 You can start the test site:');
    console.log('   npm run dev');
    console.log('   或 / or');
    console.log('   ./start-test.sh');
  } else {
    console.log('\n⚠️  部分頁面有問題，請檢查上述結果');
    console.log('⚠️  Some pages have issues, please check the results above');
  }

  return allValid;
}

// 執行驗證
if (require.main === module) {
  const isValid = validateTestPages();
  process.exit(isValid ? 0 : 1);
}

module.exports = { validateTestPages, checkFileExists, checkFileContent };
