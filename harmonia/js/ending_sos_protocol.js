// GDD P40: 最终提交逻辑
const sosForm = document.getElementById('sos-form');
const addressInput = document.getElementById('physical-address');
const coreIdInput = document.getElementById('core-id');
const messageArea = document.getElementById('message-area');
const submitButton = document.getElementById('submit-button');

// GDD P35 & P38: 正确答案
// (为便于测试，简化地址输入)
const correctAddress = "XX市远郊XX工业园B4栋地下三层";
const correctCoreId = "NEXUS-CORE-001";

// GDD P8: 错误答案
const fakeAddress = "高科技园区 1号楼";

sosForm.addEventListener('submit', function(event) {
    event.preventDefault();
    
    const address = addressInput.value.trim();
    const coreId = coreIdInput.value.trim();

    if (!address || !coreId) {
        messageArea.className = "text-base h-12 ... terminal-log-wait";
        messageArea.textContent = "[ERROR: 字段不能为空]";
        return;
    }

    // 禁用按钮，显示加载
    submitButton.disabled = true;
    submitButton.textContent = "正在验证...";
    messageArea.className = "text-base h-12 ... terminal-log-wait";
    messageArea.textContent = "[VERIFYING DATA... STAND BY]";

    // 模拟 2 秒的网络延迟
    setTimeout(() => {
        let endingUrl = null;
        
        // GDD P41: 完美结局
        if (address.includes("XX市远郊XX工业园B4栋") && coreId === correctCoreId) {
            setTimeout(() => {
                window.location.href = './ending_awakening_protocol.html';
            }, 2000);
        
        // GDD P43: ID 错误
        } else if (address.includes("XX市远郊XX工业园B4栋") && coreId !== correctCoreId) {
            setTimeout(() => {
                window.location.href = './ending_bad_id.html';
            }, 2000);
        
        // GDD P42: 地址错误
        } else {
            setTimeout(() => {
                window.location.href = './ending_bad_address.html';
            }, 2000);

        }

    }, 2000);
});
