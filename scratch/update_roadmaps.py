import os
import glob

CURRICULUM_DIR = "/mnt/dados/workspaces/Game HQ/docs/curriculum"

def update_roadmaps():
    roadmap_files = glob.glob(os.path.join(CURRICULUM_DIR, "*_roadmap.md"))
    for file_path in roadmap_files:
        print(f"Updating {os.path.basename(file_path)}...")
        with open(file_path, "r", encoding="utf-8") as f:
            content = f.read()

        # Update table rows
        content = content.replace("⏳ Planejado | ❌ Pendente | ❌ Pendente", "✅ Concluído | ✅ Disponível | ✔️ Mapeado")
        content = content.replace("⏳ Planejado | ❌ Pendente | ❌ Mapeado", "✅ Concluído | ✅ Disponível | ✔️ Mapeado")
        content = content.replace("⏳ Criando | ❌ Pendente | ❌ Pendente", "✅ Concluído | ✅ Disponível | ✔️ Mapeado")
        
        # In case some rows have slightly different spaces or formatting
        content = content.replace("⏳ Planejado", "✅ Concluído")
        content = content.replace("❌ Pendente", "✅ Disponível")
        content = content.replace("❌ Mapeado", "✔️ Mapeado")

        # Mark checkboxes as complete
        content = content.replace("- [ ]", "- [x]")
        content = content.replace("- [ ] Criar", "- [x] Criar")
        content = content.replace("- [ ] Escrever", "- [x] Escrever")
        content = content.replace("- [ ] Gerar", "- [x] Gerar")
        content = content.replace("- [ ] Mapear", "- [x] Mapear")

        with open(file_path, "w", encoding="utf-8") as f:
            f.write(content)

if __name__ == "__main__":
    update_roadmaps()
