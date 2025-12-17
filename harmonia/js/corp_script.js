document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const searchInput = document.getElementById('global-search');

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    if (searchInput) {
        searchInput.addEventListener('keypress', function(event) {
            if (event.key === 'Enter') {
                event.preventDefault(); // Stop the browser's default action
                const query = document.getElementById('global-search').value.trim(); // Trim whitespace
                if (!query) {
                    return; // Do nothing if query is empty
                }
                console.log('Search query before saving to localStorage:', query);
                localStorage.setItem('corpSearchQuery', query);
                window.location.href = 'corp_search_results.html';
            }
        });
    }

    // Handle search results on the search results page
    if (window.location.pathname.includes('corp_search_results')) {
        const query = localStorage.getItem('corpSearchQuery');
        const globalSearchInput = document.getElementById('global-search');
        
        if (globalSearchInput) {
            globalSearchInput.value = query || '';
        }
        
        const searchQuerySpan = document.getElementById('search-query');
        const resultsContainer = document.getElementById('search-results-container');
        
        if (searchQuerySpan) {
            searchQuerySpan.textContent = query || '';
        }
        
        if (resultsContainer) {
            resultsContainer.innerHTML = ''; // Clear previous results
            
            if (query === 'YWRtaW5fNzQ1Ng==') {
                const resultElement = document.createElement('div');
                resultElement.className = 'bg-white p-6 rounded-lg shadow-md border border-gray-200';
                                    resultElement.innerHTML = `
                                        <h2 class="text-xl font-semibold text-blue-700 hover:underline"><a href="it_ticket_8841.html">IT支持工单 #8841：密码重置请求</a></h2>
                                        <p class="mt-2 text-gray-600">用户 <strong>admin_7456</strong> 提交的密码重置请求...</p>
                                        <div class="mt-3 text-sm text-gray-500">
                                            <span>类型: IT支持</span>
                                        </div>
                                    `;                resultsContainer.appendChild(resultElement);
            } else if (query.includes('Atlas')) {
                const resultElement = document.createElement('div');
                resultElement.className = 'bg-white p-6 rounded-lg shadow-md border border-gray-200';
                resultElement.innerHTML = `
                                        <h2 class="text-xl font-semibold text-blue-700 hover:underline"><a href="corp_atlas.html">Atlas 项目：核心技术</a></h2>
                                        <p class="mt-2 text-gray-600">了解 Harmonia Virtuals 的核心技术，<strong>Atlas</strong> 项目...</p>
                                        <div class="mt-3 text-sm text-gray-500">
                                            <span>类型: 公司技术</span>
                                        </div>
                                    `;
                resultsContainer.appendChild(resultElement);
            } else if (query.includes('关于')) {
                const resultElement = document.createElement('div');
                resultElement.className = 'bg-white p-6 rounded-lg shadow-md border border-gray-200';
                resultElement.innerHTML = `
                                        <h2 class="text-xl font-semibold text-blue-700 hover:underline"><a href="corp_about.html">关于我们 - Harmonia Virtuals</a></h2>
                                        <p class="mt-2 text-gray-600">了解 Harmonia Virtuals 的愿景、使命和团队...</p>
                                        <div class="mt-3 text-sm text-gray-500">
                                            <span>类型: 公司信息</span>
                                        </div>
                                    `;
                resultsContainer.appendChild(resultElement);
            } else if (query.includes('地址')) {
                const resultElement = document.createElement('div');
                resultElement.className = 'bg-white p-6 rounded-lg shadow-md border border-gray-200';
                resultElement.innerHTML = `
                                        <h2 class="text-xl font-semibold text-blue-700 hover:underline"><a href="corp_contact.html">联系我们 - Harmonia Virtuals</a></h2>
                                        <p class="mt-2 text-gray-600">查找 Harmonia Virtuals 的办公<strong>地址</strong>和联系方式...</p>
                                        <div class="mt-3 text-sm text-gray-500">
                                            <span>类型: 联系信息</span>
                                        </div>
                                    `;
                resultsContainer.appendChild(resultElement);
            } else if (query === '李明' || query === 'Li Ming') {
                const resultElement = document.createElement('div');
                resultElement.className = 'bg-white p-6 rounded-lg shadow-md border border-gray-200';
                resultElement.innerHTML = `
                                        <h2 class="text-xl font-semibold text-blue-700 hover:underline"><a href="corp_about.html">团队成员：李明</a></h2>
                                        <p class="mt-2 text-gray-600">了解 Harmonia Virtuals 的团队成员 <strong>李明</strong>...</p>
                                        <div class="mt-3 text-sm text-gray-500">
                                            <span>类型: 公司信息</span>
                                        </div>
                                    `;
                resultsContainer.appendChild(resultElement);
            } else if (query.includes('伊芙琳') || query.includes('里德') || query.includes('Evelyn') || query.includes('Reed')) {
                const resultElement = document.createElement('div');
                resultElement.className = 'bg-white p-6 rounded-lg shadow-md border border-gray-200';
                resultElement.innerHTML = `
                                        <h2 class="text-xl font-semibold text-blue-700 hover:underline"><a href="corp_about.html">团队成员：伊芙琳·里德</a></h2>
                                        <p class="mt-2 text-gray-600">了解 Harmonia Virtuals 的团队成员 <strong>伊芙琳·里德</strong>...</p>
                                        <div class="mt-3 text-sm text-gray-500">
                                            <span>类型: 公司信息</span>
                                        </div>
                                    `;
                resultsContainer.appendChild(resultElement);
            } else if (query.includes('马库斯') || query.includes('凯勒') || query === 'Marcus Keller') {
                const resultElement = document.createElement('div');
                resultElement.className = 'bg-white p-6 rounded-lg shadow-md border border-gray-200';
                resultElement.innerHTML = `
                                        <h2 class="text-xl font-semibold text-blue-700 hover:underline"><a href="corp_about.html">团队成员：马库斯·凯勒</a></h2>
                                        <p class="mt-2 text-gray-600">了解 Harmonia Virtuals 的团队成员 <strong>马库斯·凯勒</strong>...</p>
                                        <div class="mt-3 text-sm text-gray-500">
                                            <span>类型: 公司信息</span>
                                        </div>
                                    `;
                resultsContainer.appendChild(resultElement);
            } else if (query === 'Y29uZmlkZW50aWFs') {
                const resultElement = document.createElement('div');
                resultElement.className = 'bg-white p-6 rounded-lg shadow-md border border-gray-200';
                resultElement.innerHTML = `
                                        <h2 class="text-xl font-semibold text-gray-500">内部机密文件（已屏蔽）</h2>
                                        <p class="mt-2 text-gray-600">此文件为内部机密，无法查看。</p>
                                        <div class="mt-3 text-sm text-gray-500">
                                            <span>类型: 机密文件</span>
                                        </div>
                                    `;
                resultsContainer.appendChild(resultElement);
            } else if (query.includes('MindLink')) {
                const resultElement = document.createElement('div');
                resultElement.className = 'bg-white p-6 rounded-lg shadow-md border border-gray-200';
                resultElement.innerHTML = `
                                        <h2 class="text-xl font-semibold text-blue-700 hover:underline"><a href="corp_atlas.html">MindLink 技术：连接未来</a></h2>
                                        <p class="mt-2 text-gray-600">探索 Harmonia Virtuals 的创新 <strong>MindLink</strong> 技术...</p>
                                        <div class="mt-3 text-sm text-gray-500">
                                            <span>类型: 公司技术</span>
                                        </div>
                                    `;
                resultsContainer.appendChild(resultElement);
            } else if (query === '冷却系统' || query === '5Ya35Y2057O757uf') {
                 const resultElement = document.createElement('div');
                resultElement.className = 'bg-white p-6 rounded-lg shadow-md border border-gray-200';
                                    resultElement.innerHTML = `
                                        <h2 class="text-xl font-semibold text-blue-700 hover:underline"><a href="purchase_order.html">采购单 #PO-2025-734</a></h2>
                                        <p class="mt-2 text-gray-600">采购项目：大功率工业级<strong>冷却系统</strong>...</p>
                                        <div class="mt-3 text-sm text-gray-500">
                                            <span>类型: 采购文件</span>
                                        </div>
                                    `;                resultsContainer.appendChild(resultElement);
            } else {
                let failedCount = parseInt(localStorage.getItem('failedSearchCount') || '0');
                failedCount++;
                localStorage.setItem('failedSearchCount', failedCount);
                let html = '<p class="text-gray-500">未找到相关结果或无权限查看。</p>';
                if (failedCount >= 5) {
                    html += '<p class="text-sm text-blue-700 mt-4 italic">匿名备注:“别在搜索框里浪费时间了。回到那些歌功颂德的帖子去……阳光指引路口，黑暗显露真相。”</p>';
                }
                resultsContainer.innerHTML = html;
            }
        }
    }
});
