/**
 * Harmonia Virtuals - Core Game Logic (v3 - Refined UI)
 */
document.addEventListener('DOMContentLoaded', () => {
      // --- 1. STATE MANAGEMENT ---
      const state = {
          currentUser: localStorage.getItem('currentUser'),
          debugModeEnabled: localStorage.getItem('debugModeEnabled') === 'true',
          isNight: localStorage.getItem('nightModeActive') === 'true',
      };
      let toast;

      // --- 2. ROUTER & CONTENT LOADER ---
      const contentRoutes = {
          'home': {
              day: { url: 'content_home_day.html', title: '我的工作台' },
              night: { url: 'content_home_night.html', title: '[LOG] USER_DASHBOARD' },
              admin_day: { url: 'content_home_admin_day.html', title: '管理员工作台' },
              admin_night: { url: 'content_home_admin_night.html', title: '[LOG] ADMIN_DASHBOARD' }
          },
          'forum': {
              day: { url: 'content_forum_day.html', title: '社区中心' },
              night: { url: 'content_forum_night.html', title: '[LOG] 社区中心' },
              admin_night: { url: 'content_forum_admin_night.html', title: '[ADMIN] 社区中心' }
          },
                  'devblog': {
                      day: { url: 'content_dev_blog_integration.html', title: 'Project Atlas 博客' },
                      night: { url: 'content_dev_blog_integration_night.html', title: '[LOG] Project_Atlas_Blog_Decompiled' },
                      admin_night: { url: 'content_dev_blog_integration_admin_night.html', title: '[LOG] Project_Atlas_Blog_Decompiled' }
                  },
                  'it_support': {
                      day: { url: 'content_it_support_day.html', title: 'IT 支持' },
                      night: { url: 'content_it_support_night.html', title: 'IT 支持' },
                      admin_night: { url: 'content_it_support_admin_night.html', title: '[ADMIN] IT 支持' }
                  },
                  'it_ticket_8841': {
                      day: { url: 'content_it_ticket_8841.html', title: 'IT 支持工单 #8841' },
                      night: { url: 'content_it_ticket_8841_night.html', title: '[LOG] IT Ticket #8841' }
                  },
                  'base64_vulnerability': { url: 'content_base64_vulnerability_night.html', title: '【特别重大】安全漏洞' },
                  'post_mindlink': {
                      day: { url: 'content_post_mindlink_day.html', title: '帖子详情' },
                      night: { url: 'content_post_mindlink_night.html', title: '[LOG] MindLink Session' }
                  },
                  'post_philosophy': {
                      day: { url: 'content_post_philosophy.html', title: '帖子详情' },
                      night: { url: 'content_post_philosophy_night.html', title: '[LOG] Philosophy Discussion' }
                  },
                  'post_award': {
                      day: { url: 'content_post_award.html', title: '帖子详情' },
                      night: { url: 'content_post_award_night.html', title: '[LOG] Subject_S.Chen: Decommissioned' },
                      admin_night: { url: 'content_post_award_admin_night.html', title: '[LOG] Subject_S.Chen: Decommissioned' }
                  },
                  'post_art_contest': {
                      day: { url: 'content_post_art_contest.html', title: '帖子详情' },
                      night: { url: 'content_post_art_contest_night.html', title: '[LOG] AI Art Contest Results' },
                      admin_night: { url: 'content_post_art_contest_admin_night.html', title: '[LOG] AI Art Contest Results' }
                  },
                  'post_dark_mode_joke': {
                      day: { url: 'content_post_dark_mode_joke.html', title: '帖子详情' },
                      night: { url: 'content_post_dark_mode_joke_night.html', title: '[LOG] Dark Mode Joke' }
                  },
                          'post_bug_report': {
                              day: { url: 'content_post_bug_report_day.html', title: '帖子详情' },
                              night: { url: 'content_post_bug_report_night.html', title: '帖子详情' }
                          },
                                  'admin_tools': {
          day: { url: 'content_admin_tools_day.html', title: '管理员工具' },
          night: { url: 'content_admin_tools_night.html', title: '[LOG] 管理员工具' }
      },
                                  'encrypted_communication': {
                                      day: { url: 'content_encrypted_communication_day.html', title: '加密通讯' },
                                      night: { url: 'content_encrypted_communication_night.html', title: '加密通讯' }
                                  },
                                  'file_browser': {
                                      day: { url: 'content_file_browser_day.html', title: '系统文件浏览器' },
                                      night: { url: 'content_file_browser_night.html', title: '系统文件浏览器' }
                                  },
                          'search_results': { url: 'content_search_results.html', title: '搜索结果' },
                          'purchase_order': { url: 'content_purchase_order.html', title: '采购单' },
                          'sys_map_view_qzone_7456': {
              day: { url: 'content_quarantine_map_day.html', title: '隔离区地图' },
              night: { url: 'content_quarantine_map_night.html', title: '[LOG] QUARANTINE_ZONE_MAP' }
          },
                          'emergency_broadcast': { url: 'content_emergency_broadcast.html', title: '紧急广播协议' },
                          'profile_settings': {
                              day: { url: 'content_profile_settings_day.html', title: '个人资料设置' },
                              night: { url: 'content_profile_settings_night.html', title: '[LOG] USER_PROFILE' },
                              admin_day: { url: 'content_profile_settings_admin_day.html', title: '管理员资料设置' },
                                          admin_night: { url: 'content_profile_settings_admin_night.html', title: '[LOG] ADMIN_PROFILE' }
                                      },
                                  };
      async function loadContent(hash) {
          const page = hash || 'home';
          const contentArea = document.getElementById('content-area');
          const routeDef = contentRoutes[page];

          // Access Control
          const restrictedPages = ['admin_tools', 'encrypted_communication', 'file_browser', 'sys_map_view_qzone_7456'];
          if (state.currentUser === 'initiate' && restrictedPages.includes(page)) {
              const modal = document.getElementById('access-denied-modal');
              if (modal) {
                  modal.classList.remove('hidden');
                  document.getElementById('access-denied-close').onclick = () => {
                      modal.classList.add('hidden');
                      window.location.hash = '#home';
                  };
              }
              // Stop further content loading
              if (contentArea.innerHTML === '') { // if the page is blank (direct URL access)
                  loadContent('home'); // Load home page in the background
              }
              return; 
          }

          if (!routeDef || !contentArea) return;

          const isNight = state.debugModeEnabled && state.isNight;
          let route;

          if ((page === 'forum' || page === 'it_support' || page === 'post_art_contest' || page === 'devblog' || page === 'post_award') && state.currentUser === 'admin_7456' && isNight) {
              route = routeDef.admin_night;
          } else if ((page === 'home' || page === 'profile_settings') && state.currentUser === 'admin_7456') {
              route = isNight ? (routeDef.admin_night || routeDef.night) : (routeDef.admin_day || routeDef.day);
          } else {
              route = (isNight && routeDef.night) ? routeDef.night : (routeDef.day || routeDef);
          }

          try {
              const response = await fetch(route.url);
              if (!response.ok) throw new Error(`Content not found for route: ${page}`);
              contentArea.innerHTML = await response.text();
              
              if (page === 'forum') {
                  localStorage.setItem('visited_forum', 'true');
              }

              UI.updateAll(page);
              UI.markTasksAsCompleted();
          } catch (error) {
              contentArea.innerHTML = `<p class="log-error">Error loading page: ${error.message}</p>`;
          }
      }

      // --- 3. UI & DYNAMIC CONTENT ---
      const UI = {
          markTasksAsCompleted: () => {
              const visitedCorp = localStorage.getItem('visited_corp_homepage') === 'true';
              const visitedForum = localStorage.getItem('visited_forum') === 'true';

              if (visitedCorp) {
                  const productLi = document.getElementById('task-product-li');
                  if (productLi) {
                      const icon = productLi.querySelector('.task-icon');
                      const text = document.getElementById('task-product-text');
                      if (icon) {
                          icon.className = 'w-5 h-5 flex items-center justify-center bg-green-500 rounded-full task-icon';
                          icon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check"><polyline points="20 6 9 17 4 12"/></svg>';
                      }
                      if (text) {
                          text.classList.add('text-gray-500', 'line-through');
                      }
                  }
              }

              if (visitedForum) {
                  const forumLi = document.getElementById('task-forum-li');
                  if (forumLi) {
                      const icon = forumLi.querySelector('.task-icon');
                      const text = document.getElementById('task-forum-text');
                      if (icon) {
                          icon.className = 'w-5 h-5 flex items-center justify-center bg-green-500 rounded-full task-icon';
                          icon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check"><polyline points="20 6 9 17 4 12"/></svg>';
                      }
                      if (text) {
                          text.classList.add('text-gray-500', 'line-through');
                      }
                  }
              }
          },

          applyMode: () => {
              const isNight = state.debugModeEnabled && state.isNight;
              document.body.classList.toggle('night-mode', isNight);
              document.body.classList.toggle('day-mode', !isNight);
              
              const toggler = document.getElementById('mode-toggle-button');
              if (toggler) {
                  const sunIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>`;
                  const moonIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>`;
                  toggler.innerHTML = isNight ? moonIcon : sunIcon;
                  toggler.classList.toggle('disabled', !state.debugModeEnabled);
                  toggler.title = state.debugModeEnabled ? '切换调试模式' : '调试模式已禁用';
              }
          },

          updateHeader: () => {
              const usernameEl = document.getElementById('username-display');
              const userAvatarEl = document.getElementById('user-avatar');
              if (usernameEl) usernameEl.textContent = state.currentUser === 'admin_7456' ? '管理员' : 'Harmonia 员工';
              
              if (userAvatarEl) {
                  if (state.currentUser === 'admin_7456') {
                      userAvatarEl.src = "images/avatar_user_admin.svg";
                      userAvatarEl.alt = "Admin 头像";
                      userAvatarEl.classList.remove('border-blue-100');
                      userAvatarEl.classList.add('border-orange-200');
                  } else {
                      userAvatarEl.src = "images/avatar_user_default.svg";
                      userAvatarEl.alt = "用户头像";
                      userAvatarEl.classList.remove('border-orange-200');
                      userAvatarEl.classList.add('border-blue-100');
                  }
              }
              
              const userLevelEl = document.getElementById('user-level-display');
              if (userLevelEl) userLevelEl.textContent = `Lv.${state.currentUser === 'admin_7456' ? '2 (admin)' : '1 (initiate)'}`;

              const mobileTitle = document.getElementById('page-title-mobile');
              const hash = window.location.hash.substring(1) || 'home';
              const routeDef = contentRoutes[hash];
              if (mobileTitle && routeDef) {
                  const isNight = state.debugModeEnabled && state.isNight;
                  const route = (isNight && routeDef.night) ? routeDef.night : (routeDef.day || routeDef);
                  mobileTitle.textContent = route.title;
              }
          },

          updateNav: () => {
              const adminToolsNav = document.getElementById('admin-tools-nav');
              if (adminToolsNav) {
                  adminToolsNav.remove();
              }

              if (state.currentUser === 'admin_7456' && state.isNight) {
                  const itSupportNav = document.getElementById('nav-it_support');
                  if (itSupportNav) {
                      const adminNavItem = document.createElement('li');
                      adminNavItem.id = 'admin-tools-nav';
                      adminNavItem.innerHTML = `
                          <a href="#admin_tools" id="nav-admin_tools" class="flex items-center gap-3 px-4 py-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900 rounded-lg font-medium transition-colors duration-200">
                              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-shield-check"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>
                              <span>管理员工具</span>
                          </a>
                      `;
                      itSupportNav.parentElement.insertAdjacentElement('afterend', adminNavItem);
                  }
              }
              
              // Highlight active link
              const hash = window.location.hash.substring(1) || 'home';
              document.querySelectorAll('#sidebar a').forEach(a => {
                  a.classList.remove('text-blue-700', 'bg-blue-50');
                  if (a.href.endsWith(`#${hash}`)) {
                      a.classList.add('text-blue-700', 'bg-blue-50');
                  }
              });
          },

          updateAll: (pageName) => {
              UI.applyMode();
              UI.updateHeader();
              UI.updateNav();
              Renderers.runAll();
              Events.initPageSpecificListeners(pageName);
          },

          showToast: (message, type) => {
              const toastSpan = toast.querySelector('span');
              toastSpan.textContent = message;
              toast.classList.remove('bg-gray-600', 'bg-green-600', 'bg-red-600');
              if (type === 'green') {
                  toast.classList.add('bg-green-600');
              } else if (type === 'red') {
                  toast.classList.add('bg-red-600');
              } else {
                  toast.classList.add('bg-gray-600');
              }
              toast.classList.remove('opacity-0', '-translate-y-10');
              toast.classList.add('opacity-100', 'translate-y-0');
              setTimeout(() => {
                  toast.classList.remove('opacity-100', 'translate-y-0');
                  toast.classList.add('opacity-0', '-translate-y-10');
              }, 2000);
          }
      };

      // --- 4. PAGE-SPECIFIC RENDERERS ---
      const Renderers = {
          runAll: () => {
              // Renderers.awardPost(); // No longer needed as loadContent handles it
              // Renderers.artContestPost(); // No longer needed as loadContent handles it
              // Renderers.devBlogPost(); // No longer needed as loadContent handles it
          },
          updateSeparatorLines: () => {
              const terminal = document.querySelector('.terminal-bg');
              if (!terminal) return;

              const sep1 = document.getElementById('separator-1');
              const sep2 = document.getElementById('separator-2');
              if (!sep1 || !sep2) return;

              // Create a temporary element to measure character width
              const charMeasure = document.createElement('span');
              charMeasure.textContent = '=';
              charMeasure.style.visibility = 'hidden';
              charMeasure.style.position = 'absolute';
              terminal.appendChild(charMeasure);
              const charWidth = charMeasure.getBoundingClientRect().width;
              terminal.removeChild(charMeasure);

              if (charWidth === 0) return; // Avoid division by zero

              const containerWidth = terminal.clientWidth - (parseInt(getComputedStyle(terminal).paddingLeft) * 2);
              const numChars = Math.floor(containerWidth / charWidth);

              const separatorLine = ''.padEnd(numChars, '=');
              
              sep1.textContent = separatorLine;
              sep2.textContent = separatorLine;
          }
      };
      const Events = {
          handleModeToggle: () => {
              if (!state.debugModeEnabled) return;
              state.isNight = !state.isNight;
              localStorage.setItem('nightModeActive', state.isNight);
              loadContent(window.location.hash.substring(1) || 'home');
          },
          handleMenuToggle: () => {
              const sidebar = document.getElementById('sidebar');
              const overlay = document.getElementById('sidebar-overlay');
              const menuToggle = document.getElementById('menu-toggle');
              sidebar.classList.toggle('-translate-x-full');
              sidebar.classList.toggle('hidden');
              overlay.classList.toggle('hidden');
              if (menuToggle) menuToggle.classList.toggle('hidden');
          },
          initPageSpecificListeners: (pageName) => {
              // This function now attaches listeners for content inside #content-area
              // Example:
              const dataRetrievalButton = document.getElementById('data-retrieval-button');
              if (dataRetrievalButton) {
                  dataRetrievalButton.addEventListener('click', () => {
                      // ... logic
                  });
              }

              if (pageName === 'profile_settings') {
                  const debugCheckbox = document.getElementById('debug-mode');
                  const adminOverrideCheckbox = document.getElementById('admin-override');

                  if (debugCheckbox) {
                      debugCheckbox.checked = state.debugModeEnabled;
                      debugCheckbox.addEventListener('change', function() {
                          state.debugModeEnabled = this.checked;
                          localStorage.setItem('debugModeEnabled', this.checked);

                          if (!state.debugModeEnabled) {
                              state.isNight = false;
                              localStorage.setItem('nightModeActive', 'false');
                          }
                          loadContent(window.location.hash.substring(1) || 'home');
                          UI.showToast(this.checked ? '调试模式已启用，亮度调节功能已解锁' : '调试模式已禁用', this.checked ? 'green' : 'gray');
                      });
                  }

                  if (adminOverrideCheckbox && state.currentUser === 'admin_7456') {
                      adminOverrideCheckbox.checked = localStorage.getItem('adminOverrideEnabled') === 'true';
                      adminOverrideCheckbox.addEventListener('change', function() {
                          localStorage.setItem('adminOverrideEnabled', this.checked);
                          UI.showToast(this.checked ? '设置已保存：系统覆盖模式已启用' : '设置已保存：系统覆盖模式已禁用', this.checked ? 'red' : 'gray');
                      });
                  }
              } else if (pageName === 'encrypted_communication') {
                  const keyForm = document.getElementById('key-form');
                  const keyInput = document.getElementById('access-key');
                  const messageArea = document.getElementById('message-area');
                  const correctKey = "SuChen1995"; // GDD P26

                  if (keyForm) {
                      keyForm.addEventListener('submit', function(event) {
                          event.preventDefault();
                          const enteredKey = keyInput.value.trim();

                          if (enteredKey === correctKey) {
                              messageArea.className = "mt-4 text-base h-12 whitespace-pre-wrap word-break-all terminal-log-ok";
                              messageArea.textContent = "[ACCESS GRANTED]\n[LOADING SECURE CHAT... PLEASE WAIT]";
                              
                              // Simulate redirection to fragment_chat.html
                              setTimeout(() => {
                                  window.location.href = 'fragment_chat.html';
                              }, 2000);

                          } else if (enteredKey) {
                              messageArea.className = "mt-4 text-base h-12 whitespace-pre-wrap word-break-all terminal-log-error";
                              messageArea.textContent = `[ACCESS DENIED]\n[REASON: INVALID_KEY ('${enteredKey}')]`;
                              keyInput.value = ""; // Clear incorrect input
                          } else {
                              messageArea.className = "mt-4 text-base h-12 whitespace-pre-wrap word-break-all terminal-log-wait";
                              messageArea.textContent = "[ERROR: KEY_CANNOT_BE_EMPTY]";
                          }
                      });
                  }
                  // Initial drawing of separators
                  Renderers.updateSeparatorLines();
                  const switchToNightModeButtonEncryptedComm = document.getElementById('switch-to-night-mode-button-encrypted-comm');
                  if (switchToNightModeButtonEncryptedComm) {
                      switchToNightModeButtonEncryptedComm.addEventListener('click', () => {
                          state.isNight = true;
                          localStorage.setItem('nightModeActive', 'true');
                          loadContent(window.location.hash.substring(1) || 'home');
                      });
                  }
              } else if (pageName === 'admin_tools') {
                  const emergencyLink = document.getElementById('emergency-broadcast-link');
                  if (emergencyLink && localStorage.getItem('fragmentChatUnlocked') === 'true') {
                      emergencyLink.classList.remove('hidden');
                      emergencyLink.addEventListener('click', (e) => {
                          e.preventDefault();
                          const modal = document.getElementById('emergency-broadcast-modal');
                          if (modal) {
                              modal.classList.remove('hidden');
                          }
                      });
                  }
                  const switchToNightModeButton = document.getElementById('switch-to-night-mode-button');
                  if (switchToNightModeButton) {
                      switchToNightModeButton.addEventListener('click', () => {
                          state.isNight = true;
                          localStorage.setItem('nightModeActive', 'true');
                          loadContent(window.location.hash.substring(1) || 'home');
                      });
                  }
              } else if (pageName === 'file_browser') {
                  const fileBrowserForm = document.getElementById('file-browser-form');
                  const filePathInput = document.getElementById('file-path');
                  const messageArea = document.getElementById('message-area');
                  const correctPath = "//SYSTEM/QZONE_LAYOUT.MAP";

                  if (fileBrowserForm) {
                      fileBrowserForm.addEventListener('submit', function(event) {
                          event.preventDefault();
                          const enteredPath = filePathInput.value.trim();

                          if (enteredPath === correctPath) {
                              messageArea.className = "mt-4 text-base h-12 whitespace-pre-wrap word-break-all terminal-log-ok";
                              messageArea.textContent = "[ACCESS GRANTED]\n[LOADING MAP... PLEASE WAIT]";
                              
                              setTimeout(() => {
                                  window.location.href = 'intranet.html#sys_map_view_qzone_7456';
                              }, 1500);

                          } else if (enteredPath) {
                              messageArea.className = "mt-4 text-base h-12 whitespace-pre-wrap word-break-all terminal-log-error";
                              messageArea.textContent = `[ACCESS DENIED]\n[REASON: INVALID_PATH ('${enteredPath}')]`;
                              filePathInput.value = ""; // Clear incorrect input
                          } else {
                              messageArea.className = "mt-4 text-base h-12 whitespace-pre-wrap word-break-all terminal-log-wait";
                              messageArea.textContent = "[ERROR: PATH_CANNOT_BE_EMPTY]";
                          }
                      });
                  }
                  // Initial drawing of separators
                  Renderers.updateSeparatorLines();
                  const switchToNightModeButtonFileBrowser = document.getElementById('switch-to-night-mode-button-file-browser');
                  if (switchToNightModeButtonFileBrowser) {
                      switchToNightModeButtonFileBrowser.addEventListener('click', () => {
                          state.isNight = true;
                          localStorage.setItem('nightModeActive', 'true');
                          loadContent(window.location.hash.substring(1) || 'home');
                      });
                  }
			                        } else if (pageName === 'sys_map_view_qzone_7456') {
			                            if (!state.isNight) {
			                                // DAY MODE: Attach listener only to the specific day-mode link
			                                const h08DayLink = document.getElementById('h08-day-link');
			                                if (h08DayLink) {
			                                    h08DayLink.addEventListener('click', (event) => {
			                                        event.preventDefault();
			            
			                                        const modal = document.getElementById('h08-warning-modal');
			                                        if (modal) {
			                                            modal.classList.remove('hidden');
			                                        }
			            
			                                        // Set state to night mode and re-render behind the modal
			                                        state.isNight = true;
			                                        state.debugModeEnabled = true;
			                                        localStorage.setItem('nightModeActive', 'true');
			                                        localStorage.setItem('debugModeEnabled', 'true');
			                                        loadContent('sys_map_view_qzone_7456');
			            
			                                        // After a delay, hide modal and navigate
			                                        setTimeout(() => {
			                                            if (modal) {
			                                                modal.classList.add('hidden');
			                                            }
			                                            window.location.href = 'h08_quarantine_log.html';
			                                        }, 2000); // 2 second delay
			                                    });
			                                }
			                            } else {
			                                // NIGHT MODE: Initialize the modal for all racks
			                                Events.initRackModal();
			                            }
			                        }
          },
          initRackModal: function() {
              const modal = document.getElementById('rack-modal');
              if (!modal || !state.isNight) return; // Only run in night mode

              const closeModal = document.getElementById('close-modal');
              const modalTitle = document.getElementById('modal-title');
              const modalContent = document.getElementById('modal-content');
              const contentArea = document.getElementById('content-area');

              const zoneNameMapping = {
                  'A': 'ATLAS', 'B': 'BACKUP', 'C': 'COGNITIVE', 'D': 'DATA',
                  'H': 'HARMONIA', 'N': 'NEXUS', 'S': 'SYSTEM', 'Q': 'QUARANTINE'
              };

              // Use event delegation on the content area
              if (contentArea) {
                  contentArea.addEventListener('click', (event) => {
                      if (!state.isNight) return; // Do not trigger modal in day mode

                      const rack = event.target.closest('.rack');
                      if (!rack) return;

                      // In night mode, H-08 is a direct link. Let it navigate normally.
                      if (rack.hasAttribute('href') && rack.getAttribute('href').includes('quarantine_log')) {
                          return;
                      }
                      
                      // For all other racks, prevent default and show the modal.
                      event.preventDefault();

                      const rackText = rack.textContent.trim();
                      const rackId = rackText.substring(1, rackText.length - 1);

                      let serverType = 'Quantum Cognitive Core (Mk. IV)';
                      let coreId = '';
                      let detailButtonHTML = '';

                      if (rackId === 'Q-04') {
                          serverType = 'Quantum Cognitive Core (Mk. IV)';
                          coreId = 'NEXUS-QUARANTINE-004';
                          detailButtonHTML = `<a href="./p39a_dead_end.html" class="rack-detail-button-q04 mt-4 inline-block bg-red-500 text-white px-4 py-2 rounded-sm hover:bg-red-400 transition-colors text-sm font-bold">查看严重错误</a>`;
                      } else {
                          const [zone, number] = rackId.split('-');
                          const zoneFullName = zoneNameMapping[zone] || 'UNKNOWN';
                          const paddedNumber = number.padStart(3, '0');
                          coreId = `NEXUS-${zoneFullName}-${paddedNumber}`;
                      }

                      modalTitle.textContent = `机架详情: ${rackId}`;
                      modalContent.innerHTML = `
                          <p class="font-bold text-green-500 border-b border-green-900/30 pb-1 mb-2">硬件信息</p>
                          <p><span class="text-green-600 font-semibold">服务器类型:</span> ${serverType}</p>
                          <p><span class="text-green-600 font-semibold">数字核心识别码:</span> ${coreId}</p>
                          ${detailButtonHTML}
                      `;

                      modal.classList.remove('hidden');
                  });
              }

              if (closeModal) {
                  closeModal.addEventListener('click', () => modal.classList.add('hidden'));
              }

              modal.addEventListener('click', (event) => {
                  if (event.target === modal) {
                      modal.classList.add('hidden');
                  }
              });
          },
          init: () => {
              const page = window.location.pathname.split('/').pop().replace('.html', '');
              if (page === 'intranet') {
                  toast = document.getElementById('toast');
                  if (!state.currentUser) {
                      window.location.replace('login.html');
                      return;
                  }
                  // Attach listeners for the main shell
                  const menuToggle = document.getElementById('menu-toggle');
                  if (menuToggle) {
                      menuToggle.addEventListener('click', Events.handleMenuToggle);
                  }
                  const menuClose = document.getElementById('menu-close');
                  if (menuClose) {
                      menuClose.addEventListener('click', Events.handleMenuToggle);
                  }
                  const sidebarOverlay = document.getElementById('sidebar-overlay');
                  if (sidebarOverlay) {
                      sidebarOverlay.addEventListener('click', Events.handleMenuToggle);
                  }

                  // Hide mobile menu after clicking a link
                  const sidebar = document.getElementById('sidebar');
                  if (sidebar) {
                      sidebar.addEventListener('click', (e) => {
                          if (e.target.closest('a')) {
                              const overlay = document.getElementById('sidebar-overlay');
                              if (overlay && !overlay.classList.contains('hidden')) {
                                  Events.handleMenuToggle();
                              }
                          }
                      });
                  }

                  const modeToggleButton = document.getElementById('mode-toggle-button');
                  if (modeToggleButton) {
                      modeToggleButton.addEventListener('click', Events.handleModeToggle);
                  }
                  const logoutLink = document.querySelector('a[href="#logout"]');
                  if (logoutLink) {
                      logoutLink.addEventListener('click', () => {
                          localStorage.clear();
                          window.location.replace('login.html');
                      });
                  }
                  window.addEventListener('hashchange', () => loadContent(window.location.hash.substring(1)));
                  window.addEventListener('resize', Renderers.updateSeparatorLines);
                  
                  // Modal button listeners (only if modal exists)
                  const modalOpenLink = document.getElementById('modal-open-link');
                  const modalDeletePage = document.getElementById('modal-delete-page');
                  const modalClose = document.getElementById('modal-close');
                  const emergencyBroadcastModal = document.getElementById('emergency-broadcast-modal');

                  if (modalOpenLink) {
                      modalOpenLink.addEventListener('click', () => {
                          window.location.href = 'ending_sos_protocol.html';
                          if (emergencyBroadcastModal) emergencyBroadcastModal.classList.add('hidden');
                      });
                  }
                  if (modalDeletePage) {
                      modalDeletePage.addEventListener('click', () => {
                          window.location.href = 'ending_warm_hearted_colleague.html';
                          if (emergencyBroadcastModal) emergencyBroadcastModal.classList.add('hidden');
                      });
                  }
                  if (modalClose) {
                      modalClose.addEventListener('click', () => {
                          if (emergencyBroadcastModal) emergencyBroadcastModal.classList.add('hidden');
                      });
                  }

                                    // Initial Load
                                    loadContent(window.location.hash.substring(1) || 'home');
                  
                                    // Intercept "返回" links
                                    document.body.addEventListener('click', (e) => {
                                        const link = e.target.closest('a');
                                        if (link && link.textContent.trim().startsWith('返回')) {
                                            e.preventDefault();
                                            window.history.back();
                                        }
                                    });
                                            }
                                            else if (page === 'login') {                                    // Standalone login page logic
                                    localStorage.clear();
                                    // Explicitly clear task flags just in case clear() missed something specific or for clarity
                                    localStorage.removeItem('visited_corp_homepage');
                                    localStorage.removeItem('visited_forum');
                  
                                    document.getElementById('login-form').addEventListener('submit', (e) => {                      e.preventDefault();
                      const user = document.getElementById('username').value;
                      const pass = document.getElementById('password').value;
                      if (user === 'initiate' && pass === 'harmony123') {
                          localStorage.setItem('currentUser', 'initiate');
                          window.location.replace('intranet.html');
                      } else if (user === 'admin_7456' && pass === 'integration') {
                          localStorage.setItem('currentUser', 'admin_7456');
                          localStorage.setItem('debugModeEnabled', 'true');
                          window.location.replace('intranet.html');
                      } else {
                          document.getElementById('error-message').classList.remove('hidden');
                      }
                  });
              }
          }
      };

      // --- 6. INITIALIZATION ---
      Events.init();
});
