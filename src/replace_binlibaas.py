import os, re

def replace_case_aware(match):
    text = match.group(0)
    if text.isupper():
        return 'TAWAKKAL'
    elif text.istitle() or text[0].isupper():
        return 'Tawakkal'
    else:
        return 'tawakkal'

dir_path = r'c:\Users\Arman\Desktop\Tawakkal\src'

pattern = re.compile(r'bin[- ]?libaas|bin[- ]?libas', re.IGNORECASE)

for root, dirs, files in os.walk(dir_path):
    for file in files:
        if file.endswith(('.js', '.jsx', '.css', '.html')):
            filepath = os.path.join(root, file)
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
            
            new_content, count = pattern.subn(replace_case_aware, content)
                
            if count > 0:
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                print(f"Updated {filepath} ({count} replacements)")
