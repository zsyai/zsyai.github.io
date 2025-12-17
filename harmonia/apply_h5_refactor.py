import os
import re

# Mapping of Template ID to Filename
templates_map = {
    'tmpl_home_day': 'content_home_day.html',
    'tmpl_home_night': 'content_home_night.html',
    'tmpl_home_admin_day': 'content_home_admin_day.html',
    'tmpl_home_admin_night': 'content_home_admin_night.html',
    
    'tmpl_forum_day': 'content_forum_day.html',
    'tmpl_forum_night': 'content_forum_night.html',
    'tmpl_forum_admin_night': 'content_forum_admin_night.html',
    
    'tmpl_devblog_day': 'content_dev_blog_integration.html',
    'tmpl_devblog_night': 'content_dev_blog_integration_night.html',
    'tmpl_devblog_admin_night': 'content_dev_blog_integration_admin_night.html',
    
    'tmpl_it_support_day': 'content_it_support_day.html',
    'tmpl_it_support_night': 'content_it_support_night.html',
    'tmpl_it_support_admin_night': 'content_it_support_admin_night.html',
    
    'tmpl_it_ticket_8841_day': 'content_it_ticket_8841.html',
    'tmpl_it_ticket_8841_night': 'content_it_ticket_8841_night.html',
    
    'tmpl_base64_vulnerability_night': 'content_base64_vulnerability_night.html',
    
    'tmpl_post_mindlink_day': 'content_post_mindlink_day.html',
    'tmpl_post_mindlink_night': 'content_post_mindlink_night.html',
    
    'tmpl_post_philosophy_day': 'content_post_philosophy.html',
    'tmpl_post_philosophy_night': 'content_post_philosophy_night.html',
    
    'tmpl_post_award_day': 'content_post_award.html',
    'tmpl_post_award_night': 'content_post_award_night.html',
    'tmpl_post_award_admin_night': 'content_post_award_admin_night.html',
    
    'tmpl_post_art_contest_day': 'content_post_art_contest.html',
    'tmpl_post_art_contest_night': 'content_post_art_contest_night.html',
    'tmpl_post_art_contest_admin_night': 'content_post_art_contest_admin_night.html',
    
    'tmpl_post_dark_mode_joke_day': 'content_post_dark_mode_joke.html',
    'tmpl_post_dark_mode_joke_night': 'content_post_dark_mode_joke_night.html',
    
    'tmpl_post_bug_report_day': 'content_post_bug_report_day.html',
    'tmpl_post_bug_report_night': 'content_post_bug_report_night.html',
    
    'tmpl_post_canteen_day': 'content_post_canteen.html',
    'tmpl_post_canteen_night': 'content_post_canteen_night.html',
    'tmpl_post_canteen_admin_night': 'content_post_canteen_admin_night.html',
    
    'tmpl_admin_tools_day': 'content_admin_tools_day.html',
    'tmpl_admin_tools_night': 'content_admin_tools_night.html',
    
    'tmpl_encrypted_communication_day': 'content_encrypted_communication_day.html',
    'tmpl_encrypted_communication_night': 'content_encrypted_communication_night.html',
    
    'tmpl_file_browser_day': 'content_file_browser_day.html',
    'tmpl_file_browser_night': 'content_file_browser_night.html',
    
    'tmpl_sys_map_view_qzone_7456_day': 'content_quarantine_map_day.html',
    'tmpl_sys_map_view_qzone_7456_night': 'content_quarantine_map_night.html',
    
    'tmpl_emergency_broadcast': 'content_emergency_broadcast.html',
    
    'tmpl_profile_settings_day': 'content_profile_settings_day.html',
    'tmpl_profile_settings_night': 'content_profile_settings_night.html',
    'tmpl_profile_settings_admin_day': 'content_profile_settings_admin_day.html',
    'tmpl_profile_settings_admin_night': 'content_profile_settings_admin_night.html',
}

def generate_intranet_v2():
    base_file = 'intranet.html'
    output_file = 'intranet_v2.html'
    
    if not os.path.exists(base_file):
        print(f"Error: {base_file} not found.")
        return

    with open(base_file, 'r', encoding='utf-8') as f:
        html_content = f.read()

    # 1. Update script reference
    html_content = html_content.replace('src="js/script.js"', 'src="js/script_v2.js"')

    # 2. Prepare Templates
    templates_html = ""
    for tmpl_id, filename in templates_map.items():
        if os.path.exists(filename):
            with open(filename, 'r', encoding='utf-8') as f:
                content = f.read()
                templates_html += f'\n<template id="{tmpl_id}">\n{content}\n</template>'
        else:
            print(f"Warning: File {filename} for {tmpl_id} not found.")

    # 3. Inject Templates before </body>
    if '</body>' in html_content:
        html_content = html_content.replace('</body>', f'{templates_html}\n</body>')
    else:
        html_content += templates_html

    with open(output_file, 'w', encoding='utf-8') as f:
        f.write(html_content)
    print(f"Successfully created {output_file}")

def generate_script_v2():
    base_script = 'js/script.js'
    output_script = 'js/script_v2.js'

    if not os.path.exists(base_script):
        print(f"Error: {base_script} not found.")
        return

    with open(base_script, 'r', encoding='utf-8') as f:
        js_content = f.read()

    # 1. Generate New ContentRoutes
    new_routes_js = """const contentRoutes = {
          'home': {
              day: { templateId: 'tmpl_home_day', title: '我的工作台' },
              night: { templateId: 'tmpl_home_night', title: '[LOG] USER_DASHBOARD' },
              admin_day: { templateId: 'tmpl_home_admin_day', title: '管理员工作台' },
              admin_night: { templateId: 'tmpl_home_admin_night', title: '[LOG] ADMIN_DASHBOARD' }
          },
          'forum': {
              day: { templateId: 'tmpl_forum_day', title: '社区中心' },
              night: { templateId: 'tmpl_forum_night', title: '[LOG] 社区中心' },
              admin_night: { templateId: 'tmpl_forum_admin_night', title: '[ADMIN] 社区中心' }
          },
          'devblog': {
              day: { templateId: 'tmpl_devblog_day', title: 'Project Atlas 博客' },
              night: { templateId: 'tmpl_devblog_night', title: '[LOG] Project_Atlas_Blog_Decompiled' },
              admin_night: { templateId: 'tmpl_devblog_admin_night', title: '[LOG] Project_Atlas_Blog_Decompiled' }
          },
          'it_support': {
              day: { templateId: 'tmpl_it_support_day', title: 'IT 支持' },
              night: { templateId: 'tmpl_it_support_night', title: 'IT 支持' },
              admin_night: { templateId: 'tmpl_it_support_admin_night', title: '[ADMIN] IT 支持' }
          },
          'it_ticket_8841': {
              day: { templateId: 'tmpl_it_ticket_8841_day', title: 'IT 支持工单 #8841' },
              night: { templateId: 'tmpl_it_ticket_8841_night', title: '[LOG] IT Ticket #8841' }
          },
          'base64_vulnerability': { templateId: 'tmpl_base64_vulnerability_night', title: '【特别重大】安全漏洞' },
          'post_mindlink': {
              day: { templateId: 'tmpl_post_mindlink_day', title: '帖子详情' },
              night: { templateId: 'tmpl_post_mindlink_night', title: '[LOG] MindLink Session' }
          },
          'post_philosophy': {
              day: { templateId: 'tmpl_post_philosophy_day', title: '帖子详情' },
              night: { templateId: 'tmpl_post_philosophy_night', title: '[LOG] Philosophy Discussion' }
          },
          'post_award': {
              day: { templateId: 'tmpl_post_award_day', title: '帖子详情' },
              night: { templateId: 'tmpl_post_award_night', title: '[LOG] Subject_S.Chen: Decommissioned' },
              admin_night: { templateId: 'tmpl_post_award_admin_night', title: '[LOG] Subject_S.Chen: Decommissioned' }
          },
          'post_art_contest': {
              day: { templateId: 'tmpl_post_art_contest_day', title: '帖子详情' },
              night: { templateId: 'tmpl_post_art_contest_night', title: '[LOG] AI Art Contest Results' },
              admin_night: { templateId: 'tmpl_post_art_contest_admin_night', title: '[LOG] AI Art Contest Results' }
          },
          'post_dark_mode_joke': {
              day: { templateId: 'tmpl_post_dark_mode_joke_day', title: '帖子详情' },
              night: { templateId: 'tmpl_post_dark_mode_joke_night', title: '[LOG] Dark Mode Joke' }
          },
          'post_canteen': {
              day: { templateId: 'tmpl_post_canteen_day', title: '帖子详情' },
              night: { templateId: 'tmpl_post_canteen_night', title: '[LOG] Nutrient_Intake_Analysis' },
              admin_night: { templateId: 'tmpl_post_canteen_admin_night', title: '[LOG] Nutrient_Intake_Analysis_FULL' }
          },
          'post_bug_report': {
              day: { templateId: 'tmpl_post_bug_report_day', title: '帖子详情' },
              night: { templateId: 'tmpl_post_bug_report_night', title: '帖子详情' }
          },
          'admin_tools': {
              day: { templateId: 'tmpl_admin_tools_day', title: '管理员工具' },
              night: { templateId: 'tmpl_admin_tools_night', title: '[LOG] 管理员工具' }
          },
          'encrypted_communication': {
              day: { templateId: 'tmpl_encrypted_communication_day', title: '加密通讯' },
              night: { templateId: 'tmpl_encrypted_communication_night', title: '加密通讯' }
          },
          'file_browser': {
              day: { templateId: 'tmpl_file_browser_day', title: '系统文件浏览器' },
              night: { templateId: 'tmpl_file_browser_night', title: '系统文件浏览器' }
          },
          'sys_map_view_qzone_7456': {
              day: { templateId: 'tmpl_sys_map_view_qzone_7456_day', title: '隔离区地图' },
              night: { templateId: 'tmpl_sys_map_view_qzone_7456_night', title: '[LOG] QUARANTINE_ZONE_MAP' }
          },
          'emergency_broadcast': { templateId: 'tmpl_emergency_broadcast', title: '紧急广播协议' },
          'profile_settings': {
              day: { templateId: 'tmpl_profile_settings_day', title: '个人资料设置' },
              night: { templateId: 'tmpl_profile_settings_night', title: '[LOG] USER_PROFILE' },
              admin_day: { templateId: 'tmpl_profile_settings_admin_day', title: '管理员资料设置' },
              admin_night: { templateId: 'tmpl_profile_settings_admin_night', title: '[LOG] ADMIN_PROFILE' }
          },
      };
"""

    # Replace contentRoutes
    js_content = re.sub(r"const contentRoutes = \{[\s\S]*?\};", new_routes_js, js_content, count=1)

    # 2. Generate New loadContent function
    new_load_content = """async function loadContent(hash) {
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

          if ((page === 'forum' || page === 'it_support' || page === 'post_art_contest' || page === 'devblog' || page === 'post_award' || page === 'post_canteen') && state.currentUser === 'admin_7456' && isNight) {
              route = routeDef.admin_night;
          } else if ((page === 'home' || page === 'profile_settings') && state.currentUser === 'admin_7456') {
              route = isNight ? (routeDef.admin_night || routeDef.night) : (routeDef.admin_day || routeDef.day);
          } else {
              route = (isNight && routeDef.night) ? routeDef.night : (routeDef.day || routeDef);
          }

          try {
              const target = route || routeDef;
              if (!target.templateId) throw new Error(`Template ID not found for route: ${page}`);
              
              const template = document.getElementById(target.templateId);
              if (!template) throw new Error(`Template element not found: ${target.templateId}`);
              
              contentArea.innerHTML = template.innerHTML;
              UI.updateAll(page);
          } catch (error) {
              contentArea.innerHTML = `<p class="log-error">Error loading page: ${error.message}</p>`;
              console.error(error);
          }
      }
"""

    # Replace loadContent
    js_content = re.sub(
        r"async function loadContent\(hash\) \{[\s\S]*?(?=\s*// --- 3. UI & DYNAMIC CONTENT ---)", 
        new_load_content + "\n\n      ", 
        js_content, 
        count=1
    )

    with open(output_script, 'w', encoding='utf-8') as f:
        f.write(js_content)
    print(f"Successfully created {output_script}")

if __name__ == "__main__":
    generate_intranet_v2()
    generate_script_v2()