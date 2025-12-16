import os

# Base HTML file
base_file = 'intranet.html'
output_file = 'intranet_v2.html'

# Mapping of Template ID to Filename
templates = {
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

def migrate():
    # Read Base HTML
    if not os.path.exists(base_file):
        print(f"Error: {base_file} not found.")
        return

    with open(base_file, 'r', encoding='utf-8') as f:
        html_content = f.read()

    # 1. Update script reference
    html_content = html_content.replace('src="js/script.js"', 'src="js/script_v2.js"')

    # 2. Prepare Templates
    templates_html = ""
    for tmpl_id, filename in templates.items():
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

    # Write Output
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write(html_content)
    
    print(f"Successfully created {output_file}")

if __name__ == "__main__":
    migrate()
