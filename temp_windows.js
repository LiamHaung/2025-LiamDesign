// Windows 98 Style 視窗 - 添加經典導覽列
const windows98Window = `
          {/* 加粗框線視窗 1 - Windows 98 Style */}
          <div style={{
            background: 'white',
            border: '6px solid #000',
            borderRadius: '0',
            padding: '0',
            boxShadow: '8px 8px 0px #333',
            fontFamily: 'var(--font-zpix), monospace',
            position: 'relative',
            overflow: 'hidden'
          }}>
            {/* Windows 98 標題列 */}
            <div style={{
              background: 'linear-gradient(to bottom, #c0c0c0 0%, #808080 100%)',
              borderBottom: '2px solid #000',
              padding: '4px 8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontSize: '12px',
              fontWeight: 'bold',
              color: '#000'
            }}>
              <span>Windows 98 Style</span>
              <div style={{ display: 'flex', gap: '4px' }}>
                <div style={{
                  width: '16px',
                  height: '14px',
                  background: '#c0c0c0',
                  border: '1px solid #808080',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}>_</div>
                <div style={{
                  width: '16px',
                  height: '14px',
                  background: '#c0c0c0',
                  border: '1px solid #808080',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}>□</div>
                <div style={{
                  width: '16px',
                  height: '14px',
                  background: '#c0c0c0',
                  border: '1px solid #808080',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}>×</div>
              </div>
            </div>
            
            {/* 導覽列 */}
            <div style={{
              background: '#f0f0f0',
              borderBottom: '1px solid #808080',
              padding: '4px 8px',
              display: 'flex',
              gap: '8px',
              fontSize: '11px'
            }}>
              <span style={{ color: '#000', fontWeight: 'bold' }}>檔案</span>
              <span style={{ color: '#000' }}>編輯</span>
              <span style={{ color: '#000' }}>檢視</span>
              <span style={{ color: '#000' }}>說明</span>
            </div>
            
            {/* 內容區域 */}
            <div style={{ padding: '20px' }}>
              <h1 style={{
                fontSize: '24px',
                fontWeight: 'bold',
                color: '#000',
                margin: '0 0 15px 0',
                textAlign: 'center',
                textTransform: 'uppercase',
                letterSpacing: '2px'
              }}>
                Windows 98 Style
              </h1>
              <p style={{
                fontSize: '14px',
                lineHeight: '1.6',
                color: '#333',
                margin: '0',
                textAlign: 'justify'
              }}>
                這是一個模擬Windows 98風格的視窗，具有加粗的黑色邊框和經典的像素字體。內容包含純文字展示，適合用於標題和說明文字。
              </p>
            </div>
          </div>`;

// Modern Retro 視窗 - 添加現代導覽列
const modernRetroWindow = `
          {/* 加粗框線視窗 3 - Modern Retro */}
          <div style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            border: '10px solid #4a5568',
            borderRadius: '0',
            padding: '0',
            boxShadow: '15px 15px 0px #2d3748',
            fontFamily: 'var(--font-zpix), monospace',
            position: 'relative',
            color: 'white',
            overflow: 'hidden'
          }}>
            {/* 現代標題列 */}
            <div style={{
              background: 'rgba(0,0,0,0.3)',
              borderBottom: '2px solid rgba(255,255,255,0.2)',
              padding: '8px 16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontSize: '14px',
              fontWeight: 'bold',
              color: '#fff',
              textShadow: '1px 1px 2px rgba(0,0,0,0.5)'
            }}>
              <span>Modern Retro</span>
              <div style={{ display: 'flex', gap: '6px' }}>
                <div style={{
                  width: '20px',
                  height: '18px',
                  background: 'rgba(255,255,255,0.1)',
                  border: '1px solid rgba(255,255,255,0.3)',
                  borderRadius: '3px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  color: '#fff'
                }}>_</div>
                <div style={{
                  width: '20px',
                  height: '18px',
                  background: 'rgba(255,255,255,0.1)',
                  border: '1px solid rgba(255,255,255,0.3)',
                  borderRadius: '3px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  color: '#fff'
                }}>□</div>
                <div style={{
                  width: '20px',
                  height: '18px',
                  background: 'rgba(255,0,0,0.3)',
                  border: '1px solid rgba(255,0,0,0.5)',
                  borderRadius: '3px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  color: '#fff'
                }}>×</div>
              </div>
            </div>
            
            {/* 現代導覽列 */}
            <div style={{
              background: 'rgba(0,0,0,0.2)',
              borderBottom: '1px solid rgba(255,255,255,0.1)',
              padding: '6px 16px',
              display: 'flex',
              gap: '16px',
              fontSize: '12px'
            }}>
              <span style={{ color: '#fff', fontWeight: 'bold', textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}>Home</span>
              <span style={{ color: 'rgba(255,255,255,0.8)' }}>About</span>
              <span style={{ color: 'rgba(255,255,255,0.8)' }}>Portfolio</span>
              <span style={{ color: 'rgba(255,255,255,0.8)' }}>Contact</span>
            </div>
            
            {/* 內容區域 */}
            <div style={{ padding: '30px' }}>
              <h1 style={{
                fontSize: '32px',
                fontWeight: 'bold',
                color: '#fff',
                margin: '0 0 25px 0',
                textAlign: 'center',
                textTransform: 'uppercase',
                letterSpacing: '4px',
                textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
              }}>
                Modern Retro
              </h1>
              <p style={{
                fontSize: '18px',
                lineHeight: '2',
                color: '#f7fafc',
                margin: '0',
                textAlign: 'center',
                textShadow: '1px 1px 2px rgba(0,0,0,0.3)'
              }}>
                現代復古風格視窗，結合漸層背景和深色邊框。適合用於展示創意內容或作為主要視覺元素。
              </p>
            </div>
          </div>`;

// Neon Style 視窗 - 添加霓虹導覽列
const neonStyleWindow = `
          {/* 加粗框線視窗 6 - Neon Style */}
          <div style={{
            background: '#000',
            border: '8px solid #00d2ff',
            borderRadius: '25px',
            padding: '0',
            boxShadow: '0 0 30px rgba(0, 210, 255, 0.5)',
            fontFamily: 'var(--font-zpix), monospace',
            position: 'relative',
            color: 'white',
            overflow: 'hidden'
          }}>
            {/* 霓虹標題列 */}
            <div style={{
              background: 'linear-gradient(90deg, rgba(0,210,255,0.1) 0%, rgba(0,210,255,0.2) 100%)',
              borderBottom: '2px solid #00d2ff',
              padding: '8px 16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontSize: '14px',
              fontWeight: 'bold',
              color: '#00d2ff',
              textShadow: '0 0 10px rgba(0, 210, 255, 0.8)',
              boxShadow: '0 0 20px rgba(0, 210, 255, 0.3)'
            }}>
              <span>Neon Style</span>
              <div style={{ display: 'flex', gap: '6px' }}>
                <div style={{
                  width: '20px',
                  height: '18px',
                  background: 'rgba(0,210,255,0.2)',
                  border: '1px solid #00d2ff',
                  borderRadius: '3px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  color: '#00d2ff',
                  textShadow: '0 0 5px rgba(0, 210, 255, 0.8)',
                  boxShadow: '0 0 10px rgba(0, 210, 255, 0.3)'
                }}>_</div>
                <div style={{
                  width: '20px',
                  height: '18px',
                  background: 'rgba(0,210,255,0.2)',
                  border: '1px solid #00d2ff',
                  borderRadius: '3px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  color: '#00d2ff',
                  textShadow: '0 0 5px rgba(0, 210, 255, 0.8)',
                  boxShadow: '0 0 10px rgba(0, 210, 255, 0.3)'
                }}>□</div>
                <div style={{
                  width: '20px',
                  height: '18px',
                  background: 'rgba(255,0,0,0.3)',
                  border: '1px solid #ff0000',
                  borderRadius: '3px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  color: '#ff0000',
                  textShadow: '0 0 5px rgba(255, 0, 0, 0.8)',
                  boxShadow: '0 0 10px rgba(255, 0, 0, 0.3)'
                }}>×</div>
              </div>
            </div>
            
            {/* 霓虹導覽列 */}
            <div style={{
              background: 'rgba(0,0,0,0.5)',
              borderBottom: '1px solid rgba(0,210,255,0.3)',
              padding: '6px 16px',
              display: 'flex',
              gap: '16px',
              fontSize: '12px',
              boxShadow: '0 0 15px rgba(0, 210, 255, 0.2)'
            }}>
              <span style={{ 
                color: '#00d2ff', 
                fontWeight: 'bold', 
                textShadow: '0 0 8px rgba(0, 210, 255, 0.8)' 
              }}>SYSTEM</span>
              <span style={{ 
                color: 'rgba(0,210,255,0.7)',
                textShadow: '0 0 5px rgba(0, 210, 255, 0.5)'
              }}>DATA</span>
              <span style={{ 
                color: 'rgba(0,210,255,0.7)',
                textShadow: '0 0 5px rgba(0, 210, 255, 0.5)'
              }}>NETWORK</span>
              <span style={{ 
                color: 'rgba(0,210,255,0.7)',
                textShadow: '0 0 5px rgba(0, 210, 255, 0.5)'
              }}>SECURITY</span>
            </div>
            
            {/* 內容區域 */}
            <div style={{ padding: '25px' }}>
              <h1 style={{
                fontSize: '24px',
                fontWeight: 'bold',
                color: '#00d2ff',
                margin: '0 0 20px 0',
                textAlign: 'center',
                textTransform: 'uppercase',
                letterSpacing: '2px',
                textShadow: '0 0 10px rgba(0, 210, 255, 0.8)'
              }}>
                Neon Style
              </h1>
              <p style={{
                fontSize: '16px',
                lineHeight: '1.8',
                color: '#fff',
                margin: '0',
                textAlign: 'center',
                textShadow: '0 0 5px rgba(0, 210, 255, 0.6)'
              }}>
                霓虹風格視窗，具有發光效果和深色背景。適合用於科技感或未來感的設計主題。
              </p>
            </div>
          </div>`;

console.log('Windows created successfully');
