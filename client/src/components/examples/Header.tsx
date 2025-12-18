import Header from "../Header";

export default function HeaderExample() {
  return <Header isDark={false} onToggleTheme={() => console.log("Theme toggled")} />;
}
