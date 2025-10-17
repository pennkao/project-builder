import os 

def get_router_path(page_name: str) -> str:
    return f"app/routes/{page_name}" 
def get_page_path(page_name: str) -> str: 
    return f"app/pages/{page_name}"

def router_content(page_name: str):
    router_path = get_router_path(page_name)
    component_name = page_name.replace(' ', '').capitalize()
    router_content = """//routes/#page_name#.tsx
import #component_name#Page from "@/pages/#page_name#";
import type { Route } from "./+types/#page_name#";

export const loader = async () => {
  return {};
};
export const clientLoader = async () => {
  return {};
};
export default function #component_name#({ loaderData }: Route.ComponentProps) {
  const data = loaderData;
  return (<><#component_name#Page data={data} /></>);
}
    
    """
    conent = router_content.replace("#page_name#", page_name).replace("#component_name#", component_name)
    with open(f"{router_path}.tsx", "w", encoding="utf-8") as f:
        f.write(conent)

def page_content(page_name: str):
    page_path = get_page_path(page_name)
    component_name = page_name.replace(' ', '').capitalize()
    content = """
import styles from './styles.module.css';
const #component_name#Page = ({ data }: any) => {{
    return (
        <div>#component_name#</div>
    );
}};
export default #component_name#Page;
""" 
    content = content.replace("#component_name#", component_name)
    with open(f"{page_path}/index.tsx", "w", encoding="utf-8") as f:
        f.write(content) 

def css_content(page_name: str):
    css_path = f"{get_page_path(page_name)}/styles.module.css"
    css_content = """
.default{
}
"""
    with open(css_path, "w", encoding="utf-8") as f:
        f.write(css_content)
def router_config(page_name: str) :
    router_config = f"route('{page_name}', 'routes/{page_name}.tsx'),"
    print(router_config)
        
if __name__ == "__main__":
    page_name = input("input page name: ")
    page_path = get_page_path(page_name)
    os.makedirs(page_path, exist_ok=True)
    
    page_content(page_name)
    css_content(page_name)
    css_content(page_name)
    router_content(page_name)    
    router_config(page_name)