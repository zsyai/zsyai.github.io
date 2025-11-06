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
                                        <h2 class="text-xl font-semibold text-blue-700 hover:underline"><a href="intranet.html#it_ticket_8841">IT支持工单 #8841：密码重置请求</a></h2>
                                        <p class="mt-2 text-gray-600">用户 <strong>admin_7456</strong> 提交的密码重置请求...</p>
                                        <div class="mt-3 text-sm text-gray-500">
                                            <span>类型: IT支持</span>
                                        </div>
                                    `;                resultsContainer.appendChild(resultElement);
            } else if (query === '冷却系统') {
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
                resultsContainer.innerHTML = '<p class="text-gray-500">未找到相关结果或无权限查看。</p>';
            }
        }
    }
});
