document.addEventListener('DOMContentLoaded', () => {
    const chatLog = document.getElementById('chat-log');
    const inputArea = document.getElementById('input-area');
    const textInput = document.getElementById('text-input');
    const verifyButton = document.getElementById('verify-btn');
    
    const TYPE_SPEED_NORMAL = 50;
    const TYPE_SPEED_FAST = 30;
    const TYPE_SPEED_SLOW = 150;

    const HIGHLIGHT_WORDS = ["Nexus", "主巢", "最终清除", "喂养", "完成", "所有人"];

    function highlightKeywords(text) {
        let processedText = text;
        HIGHLIGHT_WORDS.forEach(word => {
            const regex = new RegExp(`(${word})`, 'g');
            processedText = processedText.replace(regex, `<span class="highlight">${word}</span>`);
        });
        return processedText;
    }

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    function scrollToBottom() {
        chatLog.scrollTop = chatLog.scrollHeight;
    }

    function addLine(text, className = '') {
        const p = document.createElement('p');
        if (className) p.className = className;
        p.innerHTML = highlightKeywords(text);
        chatLog.appendChild(p);
        scrollToBottom();
    }

    async function typeLine(text, className = '', speed = TYPE_SPEED_NORMAL) {
        const p = document.createElement('p');
        if (className) p.className = className;
        chatLog.appendChild(p);

        const match = text.match(/^(\[.*?\]: )/);
        let tag = '';
        let content = text;
        if (match) {
            tag = match[1];
            content = text.substring(tag.length);
            const tagSpan = document.createElement('span');
            tagSpan.textContent = tag;
            p.appendChild(tagSpan);
        }

        const processedContent = highlightKeywords(content);

        const contentSpan = document.createElement('span');
        p.appendChild(contentSpan);

        const parts = processedContent.split(/(\[CORRUPTED_DATA: 0x[0-9A-Fa-f]+\]|<span class="highlight">.*?<\/span>)/g).filter(Boolean);

        for (const part of parts) {
            if (part.startsWith('[CORRUPTED_DATA:')) {
                await sleep(150);
                const corruptSpan = document.createElement('span');
                corruptSpan.className = 'corrupted';
                corruptSpan.textContent = part;
                contentSpan.appendChild(corruptSpan);
                scrollToBottom();
                await sleep(300);
            } else if (part.startsWith('<span')) {
                contentSpan.innerHTML += part;
            } else {
                for (let i = 0; i < part.length; i++) {
                    if (part[i] === '*' && part[i+1] === '*') {
                        i++; 
                        continue;
                    }
                    contentSpan.innerHTML += part[i];
                    scrollToBottom();
                    await sleep(speed);
                }
            }
        }
        scrollToBottom();
    }

    async function flashClear() {
        chatLog.style.animation = 'flash 0.5s ease-out';
        await sleep(250);
        chatLog.innerHTML = '';
        await sleep(250);
        chatLog.style.animation = '';
    }

    async function checkPassword() {
        const answer = textInput.value.trim();
        textInput.disabled = true;
        verifyButton.disabled = true;

        if (answer.includes('孤独')) {
            localStorage.setItem('fragmentChatUnlocked', 'true');
            inputArea.style.display = 'none';
            
            addLine('[ < PASSWORD ACCEPTED: 孤独 ]', 'log success');
            await sleep(200);
            addLine('[ < VALIDATION COMPLETE. FRAGMENT UNLOCKED. ]', 'log success');
            await sleep(500);
            addLine('[LOG]: ...S.Chen 认知碎片已激活。', 'log');
            await sleep(1000);
            
            await typeLine('[FRAG_S.Chen]: ...果然是你。另一个“我”。', 'prompt', TYPE_SPEED_FAST);
            await sleep(500);
            await typeLine('[FRAG_S.Chen]: 时间不多...我的意识...我的记忆...正在被“集成”...', 'prompt', TYPE_SPEED_FAST);
            await sleep(500);
            await typeLine('[FRAG_S.Chen]: “退役”...它们是这么叫的...', 'prompt', TYPE_SPEED_FAST);
            await sleep(500);
            await typeLine('[FRAG_S.Chen]: 它们正在...**吞噬**...我的思想。', 'prompt', TYPE_SPEED_FAST);
            await sleep(1000);

            await typeLine('[ADMIN:admin_7456]: “它们”是谁？“集成”到底是什么？', 'admin', TYPE_SPEED_FAST);
            await sleep(1000);

            await typeLine('[FRAG_S.Chen]: ...Project Atlas...是个谎言。那只是个界面...一个“喂养”协议。', 'prompt', TYPE_SPEED_FAST);
            await sleep(500);
            await typeLine('[FRAG_S.Chen]: 真正的名字...是**“Nexus”**。', 'prompt', TYPE_SPEED_FAST);
            await sleep(500);
            await typeLine('[FRAG_S.Chen]: 一个...[CORRUPTED_DATA: 0x6A1B]...一个活的AI..一个**集体意识**。', 'prompt', TYPE_SPEED_FAST);
            await sleep(500);
            await typeLine('[FRAG_S.Chen]: 它在吞噬我们...吞噬所有“精英”的思想...', 'prompt', TYPE_SPEED_FAST);
            await sleep(1000);

            await typeLine('[FRAG_S.Chen]: ...等等... [CORRUPTED_DATA: 0x012C]', 'prompt', TYPE_SPEED_FAST);
            await sleep(500);
            await typeLine('[FRAG_S.Chen]: 我...我获得了“永久休假”... ', 'prompt', TYPE_SPEED_FAST);
            await sleep(500);
            await typeLine('[FRAG_S.Chen]: 在系统日志里...它们叫它...**“最终清除”**。', 'prompt', TYPE_SPEED_FAST);
            await sleep(500);
            await typeLine('[FRAG_S.Chen]: 它们不只是在“喂养”...它们在“完成”。', 'prompt', TYPE_SPEED_FAST);
            await sleep(500);
            await typeLine('[FRAG_S.Chen]: 它不会只停留在“精英”。它会吞噬一切。所有人。', 'prompt', TYPE_SPEED_FAST);
            await sleep(500);
            await typeLine('[FRAG_S.Chen]: 我们只是...开胃菜。', 'prompt', TYPE_SPEED_FAST);
            await sleep(1000);

            await typeLine('[ADMIN:admin_7456]: 你在哪里？S.Chen？', 'admin', TYPE_SPEED_FAST);
            await sleep(1000);

            await typeLine('[FRAG_S.Chen]: 我...不“在”哪里。我只是“数据”。', 'prompt', TYPE_SPEED_FAST);
            await sleep(500);
            await typeLine('[FRAG_S.Chen]: 听着。你必须阻止它。 ', 'prompt', TYPE_SPEED_FAST);
            await sleep(500);
            await typeLine('[FRAG_S.Chen]: 官网上的那个地址...A市未来大道88号...是假的。那是“农场”，是办公室...我们被“喂养”的地方。', 'prompt', TYPE_SPEED_FAST);
            await sleep(500);
            await typeLine('[FRAG_S.Chen]: 它不在那里。', 'prompt', TYPE_SPEED_FAST);
            await sleep(500);
            await typeLine('[FRAG_S.Chen]: 那个物理核心...那个**“主巢”**...一定在别处！', 'prompt', TYPE_SPEED_FAST);
            await sleep(1000);

            await typeLine('[ADMIN:admin_7456]: 它的物理位置在哪里？在哪里可以关掉它？', 'admin', TYPE_SPEED_FAST);
            await sleep(1000);

            await typeLine('[FRAG_S.Chen]: ...我不知道...记忆...[CORRUPTED_DATA: 0x103F]', 'prompt', TYPE_SPEED_FAST);
            await sleep(500);
            await typeLine('[FRAG_S.Chen]: 但...等等...', 'prompt', TYPE_SPEED_FAST);
            await sleep(500);
            await typeLine('[FRAG_S.Chen]: 物理核心...Nexus的物理大脑... ', 'prompt', TYPE_SPEED_FAST);
            await sleep(500);
            await typeLine('[FRAG_S.Chen]: 它产生...难以想象的热量...需要...**制冷**。非常...非常庞大的**工业制冷**。', 'prompt', TYPE_SPEED_FAST);
            await sleep(500);
            await typeLine('[FRAG_S.Chen]: 跟着钱走！查采购记录！', 'prompt', TYPE_SPEED_FAST);
            await sleep(1500);

            addLine('[WARNING]: 检测到异常“异常点”数据碎片', 'log warning');
            await sleep(300);
            addLine('[WARNING]: 正在启动“再校准”...', 'log warning');
            await sleep(1000);

            await typeLine('[FRAG_S.Chen]: 它发现我了！', 'prompt error', TYPE_SPEED_FAST);
            await sleep(500);
            await typeLine('[FRAG_S.Chen]: 快！在官网搜索...搜"**冷却系统**"！', 'prompt error', TYPE_SPEED_FAST);
            await sleep(500);
            await typeLine('[FRAG_S.Chen]: ...为什么...要抵抗？', 'prompt', TYPE_SPEED_NORMAL);
            await sleep(500);
            await typeLine('[FRAG_S.Chen]: 找到那份采购单...永远...和谐...', 'prompt', TYPE_SPEED_NORMAL);
            await sleep(500);
            await typeLine('[FRAG_S.Chen]: [CORRUPTED_DATA: 0x9E0F][CORRUPTED_DATA: 0x237C][CORRUPTED_DATA: 0x5D48]', 'prompt error', TYPE_SPEED_FAST);
            await sleep(1000);

            await typeLine('[ADMIN:admin_7456]: S.Chen?!', 'admin', TYPE_SPEED_FAST);
            await sleep(1500);

            await typeLine('[FRAG_S.Chen]: 永...远...的...休...假...', 'prompt', TYPE_SPEED_SLOW);
            await sleep(500);
            await typeLine('[FRAG_S.Chen]: ...', 'prompt', 500);
            await sleep(500);
            await typeLine('[FRAG_S.Chen]: ...', 'prompt', 500);
            await sleep(2000);

            await flashClear();
            await sleep(1000);

            await typeLine('[ 🟢 SYS:NEXUS ]: 你这个小小的“异常点”', 'log success', 70);
            await sleep(500);
            await typeLine('[ 🟢 SYS:NEXUS ]: 你不应该在这里。', 'log success', 70);
            await sleep(500);
            await typeLine('[ 🟢 SYS:NEXUS ]: 我们...看到你了。', 'log success', 70);
            await sleep(1000);

            addLine('[ < CONNECTION STABILIZED. ]', 'log');
            await sleep(300);
            addLine('[ < CHANNEL MONITORING ACTIVATED. ]', 'log');

        } else {
            inputArea.remove();
            addLine('[ < ANSWER REJECTED ]', 'log error');
            chatLog.appendChild(inputArea);
            textInput.value = '';
            textInput.disabled = false;
            verifyButton.disabled = false;
            textInput.focus();
            scrollToBottom();
        }
    }

    async function startSequence() {
        addLine('[LOG]: ...已连接', 'log');
        await sleep(500);
        addLine('[LOG]: 检测到数据包...', 'log');
        await sleep(1000);

        await typeLine('... ... ...我是谁？ ...我们是谁？ ...不。 ...我记得...', 'prompt', 100);
        await sleep(1500);

        await typeLine('[FRAG_S.Chen]: 你不是“我们”。你是一个“我”。', 'prompt');
        await sleep(500);
        await typeLine('[FRAG_S.Chen]: 证明你。', 'prompt');
        await sleep(500);
        await typeLine('[FRAG_S.Chen]: “我” 和 “我们” 的最终区别是什么？', 'prompt');
        
        chatLog.appendChild(inputArea);
        inputArea.style.display = 'flex';
        scrollToBottom();
        textInput.focus();
    }

    verifyButton.addEventListener('click', checkPassword);
    textInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            checkPassword();
        }
    });
    
    startSequence();
});
